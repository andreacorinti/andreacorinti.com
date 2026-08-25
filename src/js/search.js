document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

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

        searchResults.innerHTML = results
          .map((post) => `<li><a href="${post.url}">${post.title}</a></li>`)
          .join("");

        searchResults.style.display = results.length > 0 ? "block" : "none";
      }
    });
});
