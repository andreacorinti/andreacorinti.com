document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  if (!searchInput || !searchResults) return;

  // Strips accents so "citta" matches "città" -- most of this site's
  // content is Italian, where that's the rule rather than the exception.
  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const MAX_RESULTS = 20;
  const MIN_QUERY_LENGTH = 2;

  fetch("/search-index.json")
    .then((response) => response.json())
    .then((data) => {
      const indexed = [...data].reverse().map((post) => ({
        ...post,
        _title: normalize(post.title || ""),
        _excerpt: normalize(post.excerpt || ""),
      }));

      let debounceTimer;
      searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => runSearch(), 120);
      });

      function runSearch() {
        const query = normalize(searchInput.value.trim());

        if (query.length < MIN_QUERY_LENGTH) {
          searchResults.innerHTML = "";
          searchResults.style.display = "none";
          return;
        }

        // Title matches first (more relevant), then excerpt-only matches
        const titleMatches = [];
        const excerptMatches = [];
        for (const post of indexed) {
          if (post._title.includes(query)) {
            titleMatches.push(post);
          } else if (post._excerpt.includes(query)) {
            excerptMatches.push(post);
          }
        }
        const results = [...titleMatches, ...excerptMatches].slice(0, MAX_RESULTS);

        // DOM + textContent instead of an HTML string: titles are now raw
        // JSON (not pre-escaped), so "&" or "<" in a title stay plain text.
        searchResults.replaceChildren(
          ...results.map((post) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = post.url;
            a.textContent = post.title;
            if (post.lang === "en") {
              a.lang = "en";
              a.hreflang = "en";
              const flag = document.createElement("span");
              flag.className = "search-lang";
              flag.textContent = " 🇬🇧";
              flag.setAttribute("aria-label", "(in English)");
              a.append(flag);
            }
            li.append(a);
            return li;
          })
        );

        searchResults.style.display = results.length > 0 ? "block" : "none";
      }
    });
});
