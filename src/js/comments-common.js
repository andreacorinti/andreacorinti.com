// Pezzi condivisi tra mastodon-comments.js e bluesky-comments.js:
// stile dei commenti, escape dell'HTML, caricamento pigro e lingua della pagina.
// Bluesky riusa di proposito le classi .mastodon-comment, così i due blocchi
// hanno lo stesso aspetto senza duplicare il CSS.

const styles = `
mastodon-comments,
bluesky-comments,
fediverse-comments {
  --font-color: #e0e0e0;
  --font-size: 1.0rem;
  --main-background: #1e1e1e;
  --block-border-width: 1px;
  --block-border-radius: 5px;
  --block-border-color: #333333;
  --block-background-color: #282828;
  --comment-indent: 40px;
  --heading-color: #f0f0f0;
  --link-color: #6a9fb5;
  --name-color: #ffffff;
  --user-color: #aaaaaa;
  --date-color: #888888;
  --error-color: #ff6161;

  font-size: var(--font-size);
  color: var(--font-color);
  background-color: var(--main-background);
  padding: 15px;
  display: block;
}

/* Il sito è scuro di default: il chiaro arriva solo dal toggle (data-theme="light") */
:root[data-theme="light"] mastodon-comments,
:root[data-theme="light"] bluesky-comments,
:root[data-theme="light"] fediverse-comments {
  --font-color: #2b2822;
  --main-background: #ebe8df;
  --block-border-color: #cfc9ba;
  --block-background-color: #ffffff;
  --heading-color: #17140f;
  --link-color: #2f6278;
  --name-color: #17140f;
  --user-color: #5c5949;
  --date-color: #5c5949;
  --error-color: #b00020;
}

bluesky-comments,
fediverse-comments { margin-top: 1.5rem; }

mastodon-comments h2,
bluesky-comments h2,
fediverse-comments h2 { color: var(--heading-color); margin-top: 0; margin-bottom: 1.5rem; }
mastodon-comments p,
bluesky-comments p,
fediverse-comments p { margin: 0 0 1rem 0; color: var(--font-color); }
mastodon-comments a,
bluesky-comments a,
fediverse-comments a { color: var(--link-color); }

#mastodon-comments-list,
#bluesky-comments-list {
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

.mastodon-comment .author { display:flex; flex-wrap: wrap; row-gap: 0.5rem; }
/* il sito ha una classe globale .avatar (foto in home/about) larga il 60%: qui va annullata */
.mastodon-comment .author .avatar {
  flex: 0 0 auto;
  width: auto;
  max-height: none;
  margin: 0;
  border-radius: 0;
}
.mastodon-comment .author .avatar img,
.mastodon-comment .author .avatar .placeholder {
  margin-right:1rem;
  min-width:60px;
  border-radius: 5px;
}
.mastodon-comment .author .avatar .placeholder {
  display: block;
  width: 60px;
  height: 60px;
  background-color: var(--block-border-color);
}
.mastodon-comment .author .details { display: flex; flex-direction: column; line-height: 1.2em; flex: 1 1 8rem; min-width: 0; }
.mastodon-comment .author .details .name { font-weight: bold; color: var(--name-color); }
.mastodon-comment .author .details .user { color: var(--user-color); font-size: medium; overflow-wrap: anywhere; }

.mastodon-comment .author .date {
  margin-left: auto;
  padding-left: 0.5rem;
  font-size: small;
  white-space: nowrap;
  color: var(--date-color);
}

/* il sito dà a <time> un padding globale di 2vh */
.mastodon-comment .author .date time { padding: 0; }

.mastodon-comment .content { margin: 15px 0; line-height: 1.5em; overflow-wrap: anywhere; }
.mastodon-comment .content p:last-child { margin-bottom: 0; }
.mastodon-comment .attachments img { max-width: 100%; }
/* le mie risposte (bridgiate da Bluesky) nei commenti dal fediverso */
.mastodon-comment.is-mine { border-left: 3px solid var(--link-color); }
.mastodon-comment .details .name img.emoji { display: inline; height: 1.1em; width: auto; vertical-align: -0.15em; }

mastodon-comments #error,
bluesky-comments .error,
fediverse-comments .error { color: var(--error-color); }
`;

export function injectCommentStyles() {
  if (document.getElementById("comments-common-styles")) return;
  const styleElem = document.createElement("style");
  styleElem.id = "comments-common-styles";
  styleElem.textContent = styles;
  document.head.appendChild(styleElem);
}

export function escapeHtml(s) {
  return (s || "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

// Esegue callback una sola volta, quando l'elemento entra nello schermo.
export function respondToVisibility(el, callback) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) {
      observer.disconnect();
      callback();
    }
  }, { rootMargin: "200px" });
  observer.observe(el);
}

// I post inglesi hanno lang="en-US" su <html>, gli altri sono italiani.
export function isEnglishPage() {
  return (document.documentElement.lang || "").toLowerCase().startsWith("en");
}

// Doppioni Bluesky ↔ fediverso. Il componente <fediverse-comments> registra
// qui il suo caricamento; <bluesky-comments> chiede l'insieme degli
// identificativi già mostrati dal fediverso (URL originali e at:// dei post
// bridgiati) e salta quei post. Un solo caricamento condiviso: chi chiede per
// primo lo avvia. Senza componente fediverso, o se fallisce, l'insieme è vuoto
// e Bluesky mostra tutto come prima.
let fediverseLoader = null;
let fediversePromise = null;

export function registerFediverseLoader(loader) {
  fediverseLoader = loader;
}

export function loadFediverseThread() {
  if (!fediverseLoader) return Promise.resolve(null);
  if (!fediversePromise) fediversePromise = fediverseLoader().catch(() => null);
  return fediversePromise;
}

export async function fediverseIdentities(timeoutMs = 8000) {
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), timeoutMs));
  // lo script del fediverso può arrivare dopo questo: aspetto che il suo
  // elemento sia definito (e quindi abbia registrato il caricamento)
  const run = customElements.whenDefined("fediverse-comments").then(loadFediverseThread);
  const result = await Promise.race([run, timeout]);
  return result?.identities || new Set();
}
