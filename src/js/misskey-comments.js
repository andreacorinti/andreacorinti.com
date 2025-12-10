const styles = `
:root {
  --font-color: #eceef7;
  --font-size: 1.0rem;

  --block-border-width: 1px;
  --block-border-radius: 3px;
  --block-border-color: gray;
  --block-background-color: #121212;

  --comment-indent: 20px;
}

#mastodon-comments-list {
  margin: 0 auto;
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
  font-size: var(--font-size);
}

.mastodon-comment p {
  margin-bottom: 0px;
}

.mastodon-comment .author {
  padding-top:0;
  display:flex;
}

.mastodon-comment .author a {
  text-decoration: none;
}

.mastodon-comment .author .avatar img {
  margin-right:1rem;
  min-width:60px;
  border-radius: 5px;
}

.mastodon-comment .author .details {
  display: flex;
  flex-direction: column;
}

.mastodon-comment .author .details .name {
  font-weight: bold;
}

.mastodon-comment .author .details .user {
  color: #5d686f;
  font-size: medium;
}

.mastodon-comment .author .date {
  margin-left: auto;
  font-size: small;
}

.mastodon-comment .content {
  margin: 15px 20px;
}

.mastodon-comment .attachments {
  margin: 0px 10px;
}

.mastodon-comment .attachments > * {
  margin: 0px 10px;
}

.mastodon-comment .attachments img {
  max-width: 100%;
}

.mastodon-comment .content p:first-child {
  margin-top:0;
  margin-bottom:0;
}

/* Misskey non ha un mapping diretto 1:1 di queste classi, 
   ma le manteniamo per coerenza. Verranno usati renoteCount e reactions. */
.mastodon-comment .status > div {
  display: inline-block;
  margin-right: 15px;
}

.mastodon-comment .status a {
  color: #5d686f;
  text-decoration: none;
}

.mastodon-comment .status .replies.active a {
  color: #003eaa;
}

.mastodon-comment .status .reblogs.active a {
  color: #8c8dff;
}

.mastodon-comment .status .favourites.active a {
  color: #ca8f04;
}
`;

class MisskeyComments extends HTMLElement {
  constructor() {
    super();

    this.host = this.getAttribute("host");
    this.user = this.getAttribute("user");
    this.noteId = this.getAttribute("noteId"); // Usiamo "noteId" per chiarezza con Misskey

    this.commentsLoaded = false;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = styles;
    document.head.appendChild(styleElem);
  }

  connectedCallback() {
    this.innerHTML = `
      <h2>Commenti</h2>

      <noscript>
        <div id="error">
          Please enable JavaScript to view the comments powered by the Fediverse.
        </div>
      </noscript>

      <p>Per commentare <a class="link"
      href="https://${this.host}/notes/${this.noteId}">questo post</a> devi avere un account nel Fediverso.
      </p>
      <p id="mastodon-comments-list"></p>
    `;

    const comments = document.getElementById("mastodon-comments-list");
    const rootStyle = this.getAttribute("style");
    if (rootStyle) {
      comments.setAttribute("style", rootStyle);
    }
    this.respondToVisibility(comments, this.loadComments.bind(this));
  }

  escapeHtml(unsafe) {
    return (unsafe || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // --- Adattamento Misskey ---

  note_active(note, what) {
    // Gestione semplificata per Misskey
    if (what === "replies") return note.repliesCount > 0 ? "active" : "";
    if (what === "reblogs") return note.renoteCount > 0 ? "active" : "";
    
    // Per le reactions (favoriti), assumiamo che qualsiasi reazione sia "attiva"
    if (what === "favourites" && note.reactions) {
        return Object.keys(note.reactions).length > 0 ? "active" : "";
    }
    return "";
  }

  note_count(note, what) {
    if (what === "replies") return note.repliesCount || "";
    if (what === "reblogs") return note.renoteCount || "";
    
    // Per i favoriti/reactions, restituiamo il numero totale di reazioni uniche
    if (what === "favourites" && note.reactions) {
        let totalReactions = 0;
        for (const key in note.reactions) {
            totalReactions += note.reactions[key];
        }
        return totalReactions > 0 ? totalReactions : "";
    }
    return "";
  }

  user_account(user) {
    // Misskey fornisce username e host
    return `@${user.username}${user.host ? '@' + user.host : ''}`;
  }

  render_notes(notes, in_reply_to_id, depth) {
    // Misskey usa 'replyId' al posto di 'in_reply_to_id'
    var notesToRender = notes
      .filter((note) => note.replyId === in_reply_to_id)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      
    notesToRender.forEach((note) => this.render_note(notes, note, depth));
  }

  render_note(notes, note, depth) {
    // Misskey usa 'text' per il contenuto
    const content = note.text || ""; 
    
    // Su Misskey, il nome è in note.user.name, l'avatar in note.user.avatarUrl
    const user = note.user;
    
    // Misskey usa 'files' per gli allegati
    const attachmentsHtml = (note.files || [])
      .map((attachment) => {
        if (attachment.type.startsWith("image/")) {
            return `<a href="${attachment.url}" rel="nofollow"><img src="${
                attachment.url
            }" alt="Allegato immagine" /></a>`;
        } else if (attachment.type.startsWith("video/")) {
            return `<video controls><source src="${attachment.url}" type="${attachment.type}"></video>`;
        } else if (attachment.type.startsWith("audio/")) {
            return `<audio controls><source src="${attachment.url}" type="${attachment.type}"></audio>`;
        } else {
            return `<a href="${attachment.url}" rel="nofollow">${attachment.type}</a>`;
        }
      })
      .join("");
    
    const misskeyComment = `<div class="mastodon-comment" style="margin-left: calc(var(--comment-indent) * ${depth})">
        <div class="author">
          <div class="avatar">
            <img src="${this.escapeHtml(
              user.avatarUrl,
            )}" height=60 width=60 alt="">
          </div>
          <div class="details">
            <a class="name" href="${user.url}" rel="nofollow">${
              user.name || user.username
            }</a>
            <a class="user" href="${
              user.url
            }" rel="nofollow">${this.user_account(user)}</a>
          </div>
          <a class="date" href="${
            note.url || `https://${this.host}/notes/${note.id}`
          }" rel="nofollow">${note.createdAt.substr(
            0,
            10,
          )} ${note.createdAt.substr(11, 8)}</a>
        </div>
        <div class="content">${content}</div>
        <div class="attachments">${attachmentsHtml}</div>
        <div class="status">
          <div class="replies ${this.note_active(note, "replies")}">
            <a href="${
              note.url || `https://${this.host}/notes/${note.id}`
            }" rel="nofollow"><i class="fa fa-reply fa-fw"></i>${this.note_count(
              note,
              "replies",
            )}</a>
          </div>
          <div class="reblogs ${this.note_active(note, "reblogs")}">
            <a href="${
              note.url || `https://${this.host}/notes/${note.id}`
            }" rel="nofollow"><i class="fa fa-retweet fa-fw"></i>${this.note_count(
              note,
              "reblogs",
            )}</a>
          </div>
          <div class="favourites ${this.note_active(note, "favourites")}">
            <a href="${
              note.url || `https://${this.host}/notes/${note.id}`
            }" rel="nofollow"><i class="fa fa-star fa-fw"></i>${this.note_count(
              note,
              "favourites",
            )}</a>
          </div>
        </div>
      </div>`;

    var div = document.createElement("div");
    div.innerHTML =
      typeof DOMPurify !== "undefined"
        ? DOMPurify.sanitize(misskeyComment.trim())
        : misskeyComment.trim();
    document
      .getElementById("mastodon-comments-list")
      .appendChild(div.firstChild);

    this.render_notes(notes, note.id, depth + 1);
  }

  loadComments() {
    if (this.commentsLoaded) return;

    document.getElementById("mastodon-comments-list").innerHTML =
      "Loading comments from the Fediverse (Misskey)...";

    let _this = this;

    // Richiesta POST all'API Misskey
    fetch(
      "https://" + this.host + "/api/notes/replies", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            noteId: this.noteId,
            limit: 100 // Limite di commenti da caricare
        })
    })
      .then((response) => response.json())
      .then((data) => {
        // L'API Misskey restituisce direttamente un array di note (i commenti)
        if (Array.isArray(data) && data.length > 0) {
          document.getElementById("mastodon-comments-list").innerHTML = "";
          // Chiamiamo render_notes con la lista dei commenti e l'ID della nota radice
          _this.render_notes(data, _this.noteId, 0); 
        } else {
          document.getElementById("mastodon-comments-list").innerHTML =
            "<p>Nessun commento trovato</p>";
        }

        _this.commentsLoaded = true;
      })
      .catch(error => {
          console.error("Errore nel caricamento dei commenti Misskey:", error);
          document.getElementById("mastodon-comments-list").innerHTML =
            "<p>Errore nel caricamento dei commenti Misskey.</p>";
      });
  }

  // Funzione di utilità per caricare solo quando visibile
  respondToVisibility(element, callback) {
    var options = {
      root: null,
    };

    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          callback();
        }
      });
    }, options);

    observer.observe(element);
  }
}

// Definisci il nuovo elemento custom
customElements.define("misskey-comments", MisskeyComments);