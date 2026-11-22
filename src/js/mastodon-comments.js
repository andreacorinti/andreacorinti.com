import { injectCommentStyles, escapeHtml, respondToVisibility, isEnglishPage } from "./comments-common.js";

// Lo stile ora sta in comments-common.js, condiviso con i commenti Bluesky.
const t = isEnglishPage()
  ? {
      title: "Comments from the Fediverse",
      noscript: "Enable JavaScript to see the comments.",
      intro: (url) => `You can comment from the Fediverse by replying to <a href="${url}">this post</a>.`,
      loading: "Loading comments...",
      error: "Error loading Mastodon comments.",
      locale: "en-US",
    }
  : {
      title: "Commenti dal Fediverso",
      noscript: "Per visualizzare i commenti abilita JavaScript.",
      intro: (url) => `Puoi commentare dal Fediverso rispondendo a <a href="${url}">questo post</a>.`,
      loading: "Caricamento commenti...",
      error: "Errore nel caricamento dei commenti Mastodon.",
      locale: "it-IT",
    };


class MastodonComments extends HTMLElement {
  constructor() {
    super();
    this.host = this.getAttribute("host");
    this.user = this.getAttribute("user");
    this.tootId = this.getAttribute("tootId");
    this.commentsLoaded = false;

    injectCommentStyles();
  }

  connectedCallback() {
    this.innerHTML = `
      <h2>${t.title}</h2>
      <noscript><div id="error">${t.noscript}</div></noscript>
      <p>${t.intro(`https://${this.host}/@${this.user}/${this.tootId}`)}</p>
      <div id="mastodon-comments-list"></div>
    `;

    const target = document.getElementById("mastodon-comments-list");
    respondToVisibility(target, this.loadComments.bind(this));
  }

  escapeHtml(s) {
    return escapeHtml(s);
  }

  user_account(account) {
    // gli account locali hanno acct senza dominio, lo ricavo dall'url
    if (account.acct.includes("@")) return `@${account.acct}`;
    return `@${account.acct}@${new URL(account.url).hostname}`;
  }

  // sostituisce gli shortcode delle emoji custom nel nome visualizzato
  displayName(account) {
    let name = this.escapeHtml(account.display_name || account.username);
    for (const emoji of account.emojis || []) {
      name = name.replaceAll(
        `:${emoji.shortcode}:`,
        `<img src="${this.escapeHtml(emoji.static_url)}" alt=":${emoji.shortcode}:" height="20" width="20">`
      );
    }
    return name;
  }

  async loadComments() {
    if (this.commentsLoaded) return;
    const container = document.getElementById("mastodon-comments-list");
    container.textContent = t.loading;

    try {
      // a differenza di Misskey, /context restituisce già tutto il thread in una volta
      const res = await fetch(`https://${this.host}/api/v1/statuses/${this.tootId}/context`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { descendants = [] } = await res.json();

      container.innerHTML = "";
      this.render_toot_tree(descendants, this.tootId, 0);

      this.commentsLoaded = true;

    } catch (err) {
      console.error("Errore:", err);
      container.innerHTML = `<p>${t.error}</p>`;
    }
  }

  render_toot_tree(toots, parentId, depth) {
    // ORDINAMENTO: dal più vecchio al più recente
    const children = toots
      .filter(t => t.in_reply_to_id === parentId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    for (let toot of children) {
      this.render_toot(toot, depth);
      this.render_toot_tree(toots, toot.id, depth + 1);
    }
  }

  render_toot(toot, depth) {
    const indent = `min(calc(var(--comment-indent) * ${depth}), 20vw)`;

    const account = toot.account;
    const content = toot.content || "";

    const attachmentsHtml = (toot.media_attachments || [])
      .map(a => {
        if (a.type === "image")
          return `<a href="${a.url}" rel="nofollow"><img src="${a.preview_url}" alt="${this.escapeHtml(a.description)}"></a>`;
        if (a.type === "video")
          return `<video controls preload="none"><source src="${a.url}"></video>`;
        if (a.type === "gifv")
          return `<video autoplay loop muted playsinline><source src="${a.url}"></video>`;
        if (a.type === "audio")
          return `<audio controls preload="none"><source src="${a.url}"></audio>`;
        return `<a href="${a.url}" rel="nofollow">${this.escapeHtml(a.type)}</a>`;
      })
      .join("");

    const html = `
      <div class="mastodon-comment" style="margin-left: ${indent}">
        <div class="author">
          <div class="avatar"><img src="${this.escapeHtml(account.avatar_static)}" width="60" alt=""></div>
          <div class="details">
            <a class="name" href="${account.url}" rel="nofollow">${this.displayName(account)}</a>
            <a class="user" href="${account.url}" rel="nofollow">${this.user_account(account)}</a>
          </div>
          <a class="date" href="${toot.url}" rel="nofollow">
            <time datetime="${toot.created_at}">${new Date(toot.created_at).toLocaleString(t.locale)}</time>
          </a>
        </div>
        <div class="content">${content}</div>
        <div class="attachments">${attachmentsHtml}</div>
      </div>
    `;

    // il contenuto dei toot è HTML che arriva da istanze terze
    const div = document.createElement("div");
    div.innerHTML = typeof DOMPurify !== "undefined"
      ? DOMPurify.sanitize(html.trim())
      : html.trim();
    document.getElementById("mastodon-comments-list").appendChild(div.firstChild);
  }

}

customElements.define("mastodon-comments", MastodonComments);
