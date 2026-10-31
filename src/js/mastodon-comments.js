const styles = `
mastodon-comments {
  --font-color: #e0e0e0;
  --font-size: 1.0rem;
  --main-background: #1e1e1e;
  --block-border-width: 1px;
  --block-border-radius: 5px;
  --block-border-color: #333333;
  --block-background-color: #282828;
  --comment-indent: 40px;

  font-size: var(--font-size);
  color: var(--font-color);
  background-color: var(--main-background);
  padding: 15px;
  display: block;
}

mastodon-comments h2 { color: #f0f0f0; margin-top: 0; margin-bottom: 1.5rem; }
mastodon-comments p { margin: 0 0 1rem 0; color: var(--font-color); }
mastodon-comments a { color: #6a9fb5; }

#mastodon-comments-list {
  margin: 0 auto;
  padding: 0;
}

.mastodon-comment {
  background-color: var(--block-background-color);
  border-radius: var(--block-border-radius);
  border: var(--block-border-width) var(--block-border-color) solid;
  padding: 15px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  color: var(--font-color);
}

.mastodon-comment .author { display:flex; }
.mastodon-comment .author .avatar img {
  margin-right:1rem;
  min-width:60px;
  border-radius: 5px;
}
.mastodon-comment .author .details { display: flex; flex-direction: column; line-height: 1.2em; }
.mastodon-comment .author .details .name { font-weight: bold; color: #ffffff; }
.mastodon-comment .author .details .user { color: #aaaaaa; font-size: medium; }

.mastodon-comment .author .date {
  margin-left: auto;
  font-size: small;
  color: #888888;
}

.mastodon-comment .content { margin: 15px 0; line-height: 1.5em; overflow-wrap: anywhere; }
.mastodon-comment .content p:last-child { margin-bottom: 0; }
.mastodon-comment .attachments img { max-width: 100%; }

mastodon-comments #error { color: #ff6161; }
`;


class MastodonComments extends HTMLElement {
  constructor() {
    super();
    this.host = this.getAttribute("host");
    this.user = this.getAttribute("user");
    this.tootId = this.getAttribute("tootId");
    this.commentsLoaded = false;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = styles;
    document.head.appendChild(styleElem);
  }

  connectedCallback() {
    this.innerHTML = `
      <h2>Commenti</h2>
      <noscript><div id="error">Per visualizzare i commenti abilita JavaScript.</div></noscript>
      <p>Puoi commentare dal Fediverso rispondendo a <a href="https://${this.host}/@${this.user}/${this.tootId}">questo post</a>.</p>
      <div id="mastodon-comments-list"></div>
    `;

    const target = document.getElementById("mastodon-comments-list");
    this.respondToVisibility(target, this.loadComments.bind(this));
  }

  escapeHtml(s) {
    return (s || "")
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
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
    container.innerHTML = "Caricamento commenti...";

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
      container.innerHTML = "<p>Errore nel caricamento dei commenti Mastodon.</p>";
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
            <time datetime="${toot.created_at}">${new Date(toot.created_at).toLocaleString("it-IT")}</time>
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

  respondToVisibility(el, callback) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) callback(); });
    });
    observer.observe(el);
  }
}

customElements.define("mastodon-comments", MastodonComments);
