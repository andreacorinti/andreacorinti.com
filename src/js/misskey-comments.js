const styles = `
:root {
  --font-color: #e0e0e0; 
  --font-size: 1.0rem;
  --main-background: #1e1e1e; 
  --block-border-width: 1px;
  --block-border-radius: 5px;
  --block-border-color: #333333; 
  --block-background-color: #282828; 
  --comment-indent: 40px; 
}

misskey-comments {
  font-size: var(--font-size);
  color: var(--font-color);
  background-color: var(--main-background);
  padding: 15px; 
  display: block; 
}

h2 { color: #f0f0f0; margin-top: 0; margin-bottom: 1.5rem; }
p { margin: 0 0 1rem 0; color: var(--font-color); }
a { color: #6a9fb5; }

#misskey-comments-list {
  margin: 0 auto;
  padding: 0;
}

.misskey-comment {
  background-color: var(--block-background-color);
  border-radius: var(--block-border-radius);
  border: var(--block-border-width) var(--block-border-color) solid;
  padding: 15px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  color: var(--font-color);
}

.misskey-comment .author { display:flex; }
.misskey-comment .author .avatar img {
  margin-right:1rem;
  min-width:60px;
  border-radius: 5px;
}
.misskey-comment .author .details { display: flex; flex-direction: column; line-height: 1.2em; }
.misskey-comment .author .details .name { font-weight: bold; color: #ffffff; }
.misskey-comment .author .details .user { color: #aaaaaa; font-size: medium; }

.misskey-comment .author .date {
  margin-left: auto;
  font-size: small;
  color: #888888; 
}

.misskey-comment .content { margin: 15px 0; line-height: 1.5em; }
.misskey-comment .attachments img { max-width: 100%; }

#error { color: #ff6161; }
`;


class MisskeyComments extends HTMLElement {
  constructor() {
    super();
    this.host = this.getAttribute("host");
    this.user = this.getAttribute("user");
    this.noteId = this.getAttribute("noteId");
    this.commentsLoaded = false;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = styles;
    document.head.appendChild(styleElem);
  }

  connectedCallback() {
    this.innerHTML = `
      <h2>Commenti</h2>
      <noscript><div id="error">Per visualizzare i commenti abilita JavaScript.</div></noscript>
      <p>Puoi commentare dal Fediverso rispondendo a <a href="https://${this.host}/notes/${this.noteId}">questo post</a>.</p>
      <div id="misskey-comments-list"></div>
    `;

    const target = document.getElementById("misskey-comments-list");
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

  user_account(u) {
    return `@${u.username}${u.host ? '@' + u.host : ''}`;
  }

  async loadComments() {
    if (this.commentsLoaded) return;
    const container = document.getElementById("misskey-comments-list");
    container.innerHTML = "Caricamento commenti...";

    try {
      let rootReplies = await this.fetchReplies(this.noteId);

      // ORDINAMENTO: dal più vecchio al più recente
      rootReplies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      container.innerHTML = "";

      for (let note of rootReplies) {
        await this.render_note_tree(note, 0);
      }

      this.commentsLoaded = true;

    } catch (err) {
      console.error("Errore:", err);
      container.innerHTML = "<p>Errore nel caricamento dei commenti Misskey.</p>";
    }
  }

  async fetchReplies(noteId) {
    const res = await fetch(`https://${this.host}/api/notes/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId, limit: 100 })
    });

    return await res.json();
  }

  async fetchChildren(noteId) {
    const res = await fetch(`https://${this.host}/api/notes/children`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId, limit: 50 })
    });

    return await res.json();
  }

  async render_note_tree(note, depth) {
    this.render_note(note, depth);

    let children = await this.fetchChildren(note.id);

    // ORDINAMENTO ANCHE DEI FIGLI
    children.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    for (let child of children) {
      await this.render_note_tree(child, depth + 1);
    }
  }

  render_note(note, depth) {
    const indent = `calc(var(--comment-indent) * ${depth})`;

    const userName = this.escapeHtml(note.user.name || note.user.username);
    const content = note.text || "";

    const attachmentsHtml = (note.files || [])
      .map(f => {
        if (f.type.startsWith("image/"))
          return `<img src="${f.url}" alt="">`;
        if (f.type.startsWith("video/"))
          return `<video controls preload="none"><source src="${f.url}" type="${f.type}"></video>`;
        return `<a href="${f.url}">${this.escapeHtml(f.name)}</a>`;
      })
      .join("");

    const html = `
      <div class="misskey-comment" style="margin-left: ${indent}">
        <div class="author">
          <div class="avatar"><img src="${note.user.avatarUrl}" width="60"></div>
          <div class="details">
            <a class="name" href="${note.user.url}">${userName}</a>
            <a class="user" href="${note.user.url}">${this.user_account(note.user)}</a>
          </div>
          <a class="date" href="https://${this.host}/notes/${note.id}">
            <time datetime="${note.createdAt}">${new Date(note.createdAt).toLocaleString("it-IT")}</time>
          </a>
        </div>
        <div class="content">${content}</div>
        <div class="attachments">${attachmentsHtml}</div>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = html.trim();
    document.getElementById("misskey-comments-list").appendChild(div.firstChild);
  }

  respondToVisibility(el, callback) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) callback(); });
    });
    observer.observe(el);
  }
}

customElements.define("misskey-comments", MisskeyComments);
