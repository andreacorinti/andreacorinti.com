(function () {
  var STORAGE_KEY = "theme";
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  function isLight() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }

  function updateLabel() {
    toggle.setAttribute(
      "aria-label",
      isLight() ? "Attiva tema scuro" : "Attiva tema chiaro"
    );
  }

  updateLabel();

  toggle.addEventListener("click", function () {
    if (isLight()) {
      document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem(STORAGE_KEY, "light");
      } catch (e) {}
    }
    updateLabel();
  });
})();
