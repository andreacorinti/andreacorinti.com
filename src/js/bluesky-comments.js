import { injectCommentStyles, respondToVisibility, isEnglishPage } from "./comments-common.js";

// Commenti da Bluesky: legge le risposte pubbliche a un post tramite l'API
// pubblica dell'AppView (nessun login, nessuna dipendenza) e le rende con lo
// stesso markup e le stesse classi dei commenti Mastodon.
//
// Uso: <bluesky-comments url="https://bsky.app/profile/<handle o did>/post/<rkey>" did="did:plc:..."></bluesky-comments>
// `did` serve quando l'URL contiene un handle: evita una chiamata di risoluzione.
//
// Sicurezza: niente innerHTML con contenuti remoti. Il testo è inserito come
// textContent, link/menzioni/hashtag sono ricostruiti dai facets accettando
// solo URL http(s).

const API = "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread";
const NO_UNAUTH = "!no-unauthenticated";

const t = isEnglishPage()
  ? {
      title: "Comments from Bluesky",
      intro: "You can comment from Bluesky by replying to ",
      introLink: "this post",
      reply: "Reply on Bluesky",
      loading: "Loading comments...",
      error: "Couldn't load comments from Bluesky right now.",
      notFound: "The Bluesky post for these comments can't be found.",
      badUrl: "The Bluesky link for this post isn't valid.",
      hidden: (n) => n === 1
        ? "1 reply is only visible on Bluesky."
        : `${n} replies are only visible on Bluesky.`,
      locale: "en-US",
    }
  : {
      title: "Commenti da Bluesky",
      intro: "Puoi commentare da Bluesky rispondendo a ",
      introLink: "questo post",
      reply: "Rispondi su Bluesky",
      loading: "Caricamento commenti...",
      error: "Al momento non riesco a caricare i commenti da Bluesky.",
      notFound: "Il post Bluesky di questi commenti non si trova.",
      badUrl: "Il link Bluesky di questo post non è valido.",
      hidden: (n) => n === 1
        ? "1 risposta visibile solo su Bluesky."
        : `${n} risposte visibili solo su Bluesky.`,
      locale: "it-IT",
    };

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== undefined && v !== null) node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c !== null && c !== undefined) node.append(c);
  }
  return node;
}

// Restituisce l'URL solo se è http(s), altrimenti null (niente javascript: e simili).
function safeUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}

function profileUrl(author) {
  const id = author.handle && author.handle !== "handle.invalid" ? author.handle : author.did;
  return `https://bsky.app/profile/${encodeURIComponent(id)}`;
}

function postUrl(post) {
  const rkey = post.uri.split("/").pop();
  return `${profileUrl(post.author)}/post/${encodeURIComponent(rkey)}`;
}

// Aggiunge il testo a `parent` trasformando gli a capo in <br>.
function appendText(parent, text) {
  text.split("\n").forEach((line, i) => {
    if (i > 0) parent.append(el("br"));
    if (line) parent.append(document.createTextNode(line));
  });
}

// I facets indicano posizioni in byte UTF-8, non in caratteri JS.
function renderRichText(text, facets) {
  const p = el("p");
  const bytes = new TextEncoder().encode(text || "");
  const decoder = new TextDecoder();
  const slice = (a, b) => decoder.decode(bytes.slice(a, b));

  const sorted = (facets || [])
    .filter(f => f && f.index && Array.isArray(f.features) && f.features.length)
    .sort((a, b) => a.index.byteStart - b.index.byteStart);

  let cursor = 0;
  for (const f of sorted) {
    const { byteStart, byteEnd } = f.index;
    if (byteStart < cursor || byteEnd > bytes.length || byteStart >= byteEnd) continue;
    appendText(p, slice(cursor, byteStart));

    const label = slice(byteStart, byteEnd);
    const feature = f.features[0];
    let href = null;
    if (feature.$type === "app.bsky.richtext.facet#link") {
      href = safeUrl(feature.uri);
    } else if (feature.$type === "app.bsky.richtext.facet#mention" && feature.did) {
      href = `https://bsky.app/profile/${encodeURIComponent(feature.did)}`;
    } else if (feature.$type === "app.bsky.richtext.facet#tag" && feature.tag) {
      href = `https://bsky.app/hashtag/${encodeURIComponent(feature.tag)}`;
    }

    if (href) {
      const a = el("a", { href, rel: "nofollow noopener ugc" });
      a.textContent = label;
      p.append(a);
    } else {
      appendText(p, label);
    }
    cursor = byteEnd;
  }
  appendText(p, slice(cursor));
  return p;
}

function renderEmbed(post) {
  const box = el("div", { class: "attachments" });
  let embed = post.embed;
  if (!embed) return box;
  // recordWithMedia = citazione + immagini/video: mostro solo i media
  if (embed.$type === "app.bsky.embed.recordWithMedia#view") embed = embed.media;

  if (embed.$type === "app.bsky.embed.images#view") {
    for (const img of embed.images || []) {
      const full = safeUrl(img.fullsize);
      const thumb = safeUrl(img.thumb);
      if (!thumb) continue;
      const image = el("img", { src: thumb, alt: img.alt || "", loading: "lazy" });
      box.append(full ? el("a", { href: full, rel: "nofollow noopener" }, image) : image);
    }
  } else if (embed.$type === "app.bsky.embed.video#view") {
    // il video è uno stream HLS: rimando al post originale
    const thumb = safeUrl(embed.thumbnail);
    const link = el("a", { href: postUrl(post), rel: "nofollow noopener" });
    if (thumb) link.append(el("img", { src: thumb, alt: embed.alt || "video", loading: "lazy" }));
    else link.textContent = "video";
    box.append(link);
  } else if (embed.$type === "app.bsky.embed.external#view" && embed.external) {
    const href = safeUrl(embed.external.uri);
    // le GIF scelte dal selettore di Bluesky sono link esterni a Tenor:
    // le mostro come immagini, con la descrizione come testo alternativo
    if (href && new URL(href).hostname === "media.tenor.com") {
      box.append(el("img", { src: href, alt: embed.external.description || embed.external.title || "GIF", loading: "lazy" }));
    } else if (href) {
      const a = el("a", { href, rel: "nofollow noopener ugc" });
      a.textContent = embed.external.title || embed.external.uri;
      box.append(el("p", {}, a));
    }
  }
  return box;
}

class BlueskyComments extends HTMLElement {
  constructor() {
    super();
    this.commentsLoaded = false;
    injectCommentStyles();
  }

  connectedCallback() {
    this.replaceChildren();
    this.append(el("h2", {}, t.title));

    this.parsed = this.parseUrl(this.getAttribute("url"), this.getAttribute("did"));
    if (!this.parsed) {
      this.append(el("p", { class: "error" }, t.badUrl));
      return;
    }

    const link = el("a", { href: this.parsed.url }, t.introLink);
    this.append(el("p", {}, t.intro, link, "."));

    this.list = el("div", { id: "bluesky-comments-list", "aria-live": "polite" });
    this.append(this.list);

    const replyLink = el("a", { href: this.parsed.url, class: "tdbc-button tdbc-button--small" }, t.reply);
    this.append(el("p", {}, replyLink));

    respondToVisibility(this.list, this.loadComments.bind(this));
  }

  // https://bsky.app/profile/<handle|did>/post/<rkey>
  parseUrl(raw, fallbackDid) {
    const url = safeUrl((raw || "").trim());
    if (!url) return null;
    const m = new URL(url).pathname.match(/^\/profile\/([^/]+)\/post\/([a-z0-9]+)\/?$/i);
    if (!m || !/^(www\.)?bsky\.app$/.test(new URL(url).hostname)) return null;
    const actor = decodeURIComponent(m[1]);
    const did = actor.startsWith("did:") ? actor : fallbackDid;
    if (!did || !did.startsWith("did:")) return null;
    return { url, atUri: `at://${did}/app.bsky.feed.post/${m[2]}` };
  }

  async loadComments() {
    if (this.commentsLoaded) return;
    this.list.textContent = t.loading;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(`${API}?uri=${encodeURIComponent(this.parsed.atUri)}&depth=6`, {
        signal: controller.signal,
      });
      if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.notFound = res.status === 400;
        throw err;
      }
      const { thread } = await res.json();
      if (!thread || !thread.post) throw Object.assign(new Error("thread non trovato"), { notFound: true });

      // risposte che l'autore del post ha nascosto
      this.hiddenByAuthor = new Set(thread.post.threadgate?.record?.hiddenReplies || []);
      this.hiddenCount = 0;

      this.list.replaceChildren();
      this.renderTree(thread.replies || [], 0);

      if (this.hiddenCount > 0) {
        this.list.append(el("p", { class: "hidden-replies" }, t.hidden(this.hiddenCount)));
      }
      this.commentsLoaded = true;
    } catch (err) {
      console.error("Commenti Bluesky:", err);
      this.list.replaceChildren(el("p", { class: "error" }, err.notFound ? t.notFound : t.error));
    } finally {
      clearTimeout(timer);
    }
  }

  isViewablePost(node) {
    return node && node.$type === "app.bsky.feed.defs#threadViewPost" && node.post;
  }

  // conta un ramo intero, per il messaggio "N risposte visibili solo su Bluesky"
  countBranch(node) {
    if (!this.isViewablePost(node)) return 0;
    return 1 + (node.replies || []).reduce((n, r) => n + this.countBranch(r), 0);
  }

  renderTree(nodes, depth) {
    // ORDINAMENTO: dal più vecchio al più recente, come per Mastodon
    const children = nodes
      .filter(n => this.isViewablePost(n))
      .sort((a, b) => new Date(a.post.record?.createdAt || a.post.indexedAt)
                    - new Date(b.post.record?.createdAt || b.post.indexedAt));

    for (const node of children) {
      if (this.hiddenByAuthor.has(node.post.uri)) continue;
      // chi ha chiesto di non essere visibile fuori da Bluesky: salto anche le
      // risposte sotto di lui, che senza contesto lo citerebbero comunque
      if ((node.post.author.labels || []).some(l => l.val === NO_UNAUTH)) {
        this.hiddenCount += this.countBranch(node);
        continue;
      }
      this.list.append(this.renderPost(node.post, depth));
      this.renderTree(node.replies || [], depth + 1);
    }
  }

  renderPost(post, depth) {
    const author = post.author;
    const profile = profileUrl(author);
    const created = post.record?.createdAt || post.indexedAt;
    const avatarUrl = safeUrl(author.avatar);

    const avatar = el("div", { class: "avatar" },
      avatarUrl
        ? el("img", { src: avatarUrl, width: "60", height: "60", alt: "", loading: "lazy" })
        : el("span", { class: "placeholder", "aria-hidden": "true" })
    );

    const details = el("div", { class: "details" },
      el("a", { class: "name", href: profile, rel: "nofollow" }, author.displayName || author.handle),
      el("a", { class: "user", href: profile, rel: "nofollow" }, `@${author.handle}`)
    );

    const date = el("a", { class: "date", href: postUrl(post), rel: "nofollow" },
      el("time", { datetime: created }, new Date(created).toLocaleString(t.locale))
    );

    const content = el("div", { class: "content" },
      renderRichText(post.record?.text, post.record?.facets));

    const comment = el("div", { class: "mastodon-comment" },
      el("div", { class: "author" }, avatar, details, date),
      content,
      renderEmbed(post)
    );
    comment.style.marginLeft = `min(calc(var(--comment-indent) * ${depth}), 20vw)`;
    return comment;
  }
}

customElements.define("bluesky-comments", BlueskyComments);
