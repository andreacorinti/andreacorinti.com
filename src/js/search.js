document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  fetch("/search-index.json")
    .then((response) => response.json())
    .then((data) => {
      // Inverti l'ordine dei risultati
      const sortedData = [...data].reverse();

      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredResults = sortedData.filter((post) =>
          post.title.toLowerCase().includes(query)
        );

        searchResults.innerHTML = filteredResults
          .map(
            (post) =>
              `<li><a href="${post.url}">${post.title}</a></li>`
          )
          .join("");

        searchResults.style.display = filteredResults.length > 0 ? "block" : "none";
      });
    });
});