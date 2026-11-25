import {
  injectCommentStyles,
  respondToVisibility,
  isEnglishPage,
  registerFediverseLoader,
  loadFediverseThread,
} from "./comments-common.js";

// Commenti dal fediverso sulla copia bridgiata (Bridgy Fed) di un post Bluesky.
//
// Uso: <fediverse-comments url="https://mastodon.social/@andreacorinti.com@bsky.brid.gy/<id>"></fediverse-comments>
// (front matter `fediverse`, vedi fediverse-comments.njk)
//
// 1. /api/v1/statuses/{id}/context sul server della copia → descendants.
// 2. Per ogni risposta nata su un altro server Mastodon, ricavo host e ID
//    originali dal suo uri/url e chiedo anche lì il /context: recupera le
//    risposte che il primo server non ha ricevuto (es. le mie risposte via
//    Bridgy, consegnate solo al server di chi avevo risposto). Un solo livello,
//    massimo MAX_EXTRA server, timeout breve; chi non risponde viene saltato.
// 3. Unisco tutto usando `uri` come chiave (identico su tutti i server) e
//    ricostruisco l'albero mappando in_reply_to_id (ID locali di ogni server)
//    sugli uri.
//
// Tutto nel browser come gli altri commenti: le API Mastodon rispondono con
// Access-Control-Allow-Origin: *. Il contenuto dei toot è HTML di server terzi:
// passa da DOMPurify (caricato da base.njk sui post), altrimenti diventa testo.

const MAX_EXTRA = 12;
const TIMEOUT_MAIN = 10000;
const TIMEOUT_EXTRA = 5000;
const BRIDGY_BSKY = "https://bsky.brid.gy/";
const ME = {
  acct: "andreacorinti.com@bsky.brid.gy",
  name: "Xab",
  handle: "@andreacorinti.com",
  profile: "https://bsky.app/profile/andreacorinti.com",
};

const t = isEnglishPage()
  ? {
      title: "Comments from the Fediverse",
      intro: "You can comment from the Fediverse (Mastodon & co.) by replying to ",
      introLink: "this post",
      reply: "Reply from the Fediverse",
      loading: "Loading comments...",
      error: "Couldn't load comments from the Fediverse right now.",
      empty: "No replies yet: be the first!",
      inReplyTo: "in reply to",
      locale: "en-US",
    }
  : {
      title: "Commenti dal Fediverso",
      intro: "Puoi commentare dal Fediverso (Mastodon & co.) rispondendo a ",
      introLink: "questo post",
      reply: "Rispondi dal Fediverso",
      loading: "Caricamento commenti...",
      error: "Al momento non riesco a caricare i commenti dal Fediverso.",
      empty: "Ancora nessuna risposta: fatti avanti!",
      inReplyTo: "in risposta a",
      locale: "it-IT",
    };

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== undefined && v !== null) node.setAttribute(k, v);
  }
  for (const c of children) if (c !== null && c !== undefined) node.append(c);
  return node;
}

function safeUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}

async function getJson(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// https://host/@user/123 o https://host/@user@dominio/123 → { host, id }
function parseFediverseUrl(raw) {
  const url = safeUrl((raw || "").trim());
  if (!url) return null;
  const u = new URL(url);
  const m = u.pathname.match(/^\/@[^/]+\/(\d+)\/?$/);
  return m ? { url, host: u.hostname, id: m[1] } : null;
}

// Dove è nato uno status e con che ID, se è un server tipo Mastodon:
// uri https://host/users/x/statuses/<id> oppure url https://host/@x/<id>.
function originOf(status) {
  for (const raw of [status.uri, status.url]) {
    const url = safeUrl(raw);
    if (!url) continue;
    const u = new URL(url);
    const m = u.pathname.match(/\/statuses\/(\d+)\/?$/) || u.pathname.match(/^\/@[^/]+\/(\d+)\/?$/);
    if (m) return { host: u.hostname, id: m[1] };
  }
  return null;
}

function isMine(status) {
  return status.account?.acct === ME.acct || (status.uri || "").startsWith(BRIDGY_BSKY);
}

// Post nati su Bluesky e bridgiati: uri https://bsky.brid.gy/convert/ap/at://...
function atUriOf(status) {
  const m = (status.uri || "").match(/^https:\/\/bsky\.brid\.gy\/convert\/ap\/(at:\/\/.+)$/);
  return m ? m[1] : null;
}

// at://did/app.bsky.feed.post/rkey → link al post su bsky.app
function bskyPostUrl(atUri) {
  const m = (atUri || "").match(/^at:\/\/([^/]+)\/app\.bsky\.feed\.post\/([^/]+)$/);
  return m ? `https://bsky.app/profile/${m[1]}/post/${m[2]}` : null;
}

async function loadThread(target) {
  const { host, id } = target;
  const [root, context] = await Promise.all([
    getJson(`https://${host}/api/v1/statuses/${id}`, TIMEOUT_MAIN),
    getJson(`https://${host}/api/v1/statuses/${id}/context`, TIMEOUT_MAIN),
  ]);

  const byUri = new Map();          // uri → status (prima copia vista vince)
  const parentUri = new Map();      // uri → uri del genitore
  const idToUri = new Map();        // "host#id locale" → uri
  const key = (h, i) => `${h}#${i}`;

  idToUri.set(key(host, root.id), root.uri);
  const pending = [];               // [server, status] da collegare al genitore

  const ingest = (server, statuses) => {
    for (const s of statuses) {
      if (!s || !s.uri) continue;
      idToUri.set(key(server, s.id), s.uri);
      pending.push([server, s]);
      if (!byUri.has(s.uri)) byUri.set(s.uri, { ...s, _server: server });
    }
  };
  ingest(host, context.descendants || []);

  // un solo livello di richieste extra, verso i server d'origine delle risposte
  const extra = new Map();
  for (const s of context.descendants || []) {
    if (isMine(s)) continue;
    const origin = originOf(s);
    if (!origin || origin.host === host) continue;
    idToUri.set(key(origin.host, origin.id), s.uri);
    if (!extra.has(s.uri) && extra.size < MAX_EXTRA) extra.set(s.uri, origin);
  }
  const results = await Promise.allSettled(
    [...extra.values()].map((o) =>
      getJson(`https://${o.host}/api/v1/statuses/${o.id}/context`, TIMEOUT_EXTRA).then((c) => [o.host, c])
    )
  );
  for (const r of results) {
    if (r.status !== "fulfilled") continue; // server non Mastodon, authorized fetch, offline...
    const [server, c] = r.value;
    for (const a of c.ancestors || []) if (a?.uri) idToUri.set(key(server, a.id), a.uri);
    ingest(server, c.descendants || []);
  }

  for (const [server, s] of pending) {
    if (s.uri === root.uri || parentUri.has(s.uri)) continue;
    const p = s.in_reply_to_id ? idToUri.get(key(server, s.in_reply_to_id)) : null;
    if (p) parentUri.set(s.uri, p);
  }

  // tengo solo ciò che discende davvero dal post (risalendo gli uri)
  const descends = (uri, seen = new Set()) => {
    if (uri === root.uri) return true;
    if (seen.has(uri)) return false;
    seen.add(uri);
    const p = parentUri.get(uri);
    return p ? descends(p, seen) : false;
  };
  const statuses = [...byUri.values()].filter((s) => s.uri !== root.uri && descends(s.uri));

  const identities = new Set();
  for (const s of statuses) {
    if (s.url) identities.add(s.url);
    identities.add(s.uri);
    const at = atUriOf(s);
    if (at) identities.add(at);
  }
  return { root, statuses, parentUri, identities };
}

class FediverseComments extends HTMLElement {
  constructor() {
    super();
    this.loaded = false;
    injectCommentStyles();
  }

  connectedCallback() {
    this.replaceChildren(el("h2", {}, t.title));
    this.target = parseFediverseUrl(this.getAttribute("url"));
    if (!this.target) return;

    // il caricamento può partire anche da <bluesky-comments> (doppioni)
    registerFediverseLoader(() => loadThread(this.target));

    const link = el("a", { href: this.target.url }, t.introLink);
    this.append(el("p", {}, t.intro, link, "."));
    this.list = el("div", { class: "fediverse-comments-list", "aria-live": "polite" });
    this.append(this.list);
    this.append(el("p", {}, el("a", { href: this.target.url, class: "tdbc-button tdbc-button--small" }, t.reply)));

    respondToVisibility(this.list, () => this.render());
  }

  async render() {
    if (this.loaded) return;
    this.list.textContent = t.loading;
    const thread = await loadFediverseThread();
    if (!thread) {
      this.list.replaceChildren(el("p", { class: "error" }, t.error));
      return;
    }
    this.loaded = true;
    this.thread = thread;
    this.list.replaceChildren();
    if (!thread.statuses.length) {
      this.list.append(el("p", {}, t.empty));
      return;
    }
    this.renderChildren(thread.root.uri, 0);
  }

  renderChildren(parent, depth) {
    const { statuses, parentUri } = this.thread;
    statuses
      .filter((s) => parentUri.get(s.uri) === parent)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .forEach((s) => {
        this.list.append(this.renderStatus(s, depth));
        this.renderChildren(s.uri, depth + 1);
      });
  }

  displayName(account) {
    const span = el("span");
    let text = account.display_name || account.username || account.acct;
    const emojis = new Map((account.emojis || []).map((e) => [`:${e.shortcode}:`, e]));
    for (const part of text.split(/(:[a-zA-Z0-9_]+:)/)) {
      const e = emojis.get(part);
      const src = e && safeUrl(e.static_url);
      span.append(src ? el("img", { src, alt: part, width: "20", height: "20", class: "emoji" }) : part);
    }
    return span;
  }

  // HTML del toot ripulito; senza DOMPurify resta solo il testo
  content(status) {
    const box = el("div", { class: "content" });
    const html = status.content || "";
    if (typeof DOMPurify !== "undefined") {
      box.innerHTML = DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });
      box.querySelectorAll("a").forEach((a) => a.setAttribute("rel", "nofollow noopener ugc"));
    } else {
      const doc = new DOMParser().parseFromString(html, "text/html");
      box.append(el("p", {}, doc.body.textContent || ""));
    }
    return box;
  }

  attachments(status) {
    const box = el("div", { class: "attachments" });
    for (const a of status.media_attachments || []) {
      const full = safeUrl(a.url);
      const preview = safeUrl(a.preview_url) || full;
      if (a.type === "image" && preview) {
        const img = el("img", { src: preview, alt: a.description || "", loading: "lazy" });
        box.append(full ? el("a", { href: full, rel: "nofollow noopener" }, img) : img);
      } else if (full) {
        box.append(el("p", {}, el("a", { href: full, rel: "nofollow noopener" }, a.type || "media")));
      }
    }
    return box;
  }

  renderStatus(s, depth) {
    const mine = isMine(s);
    const acc = s.account || {};
    const profile = mine ? ME.profile : safeUrl(acc.url);
    const avatarUrl = safeUrl(acc.avatar_static);
    const at = atUriOf(s);
    // link della data: post Bluesky se nasce lì, altrimenti l'originale o la
    // vista sul server che me l'ha dato (le risposte "ui:reply" di Bridgy non
    // hanno una pagina propria)
    const when = (mine && bskyPostUrl(at))
      || (!mine && safeUrl(s.url))
      || `https://${s._server}/@${acc.acct}/${s.id}`;
    const handle = mine ? ME.handle
      : acc.acct?.includes("@") ? `@${acc.acct}` : `@${acc.acct}@${s._server}`;

    const avatar = el("div", { class: "avatar" },
      avatarUrl
        ? el("img", { src: avatarUrl, width: "60", height: "60", alt: "", loading: "lazy" })
        : el("span", { class: "placeholder", "aria-hidden": "true" }));
    const details = el("div", { class: "details" },
      el("a", { class: "name", href: profile, rel: "nofollow" }, mine ? ME.name : this.displayName(acc)),
      el("a", { class: "user", href: profile, rel: "nofollow" }, handle));
    const date = el("a", { class: "date", href: when, rel: "nofollow" },
      el("time", { datetime: s.created_at }, new Date(s.created_at).toLocaleString(t.locale)));

    const comment = el("div", { class: `mastodon-comment${mine ? " is-mine" : ""}` },
      el("div", { class: "author" }, avatar, details, date),
      this.content(s),
      this.attachments(s));
    comment.style.marginLeft = `min(calc(var(--comment-indent) * ${depth}), 20vw)`;
    return comment;
  }
}

customElements.define("fediverse-comments", FediverseComments);
