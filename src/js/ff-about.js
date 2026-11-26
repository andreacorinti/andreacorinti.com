// Pagina About: la manina della finestra stile Final Fantasy fa una "mossa"
// a ogni clic. Di solito il veleno (Status: Poison, come da bio) toglie HP,
// a volte arriva una Cura; a 0 HP si va KO e il clic dopo usa una Coda di
// Fenice. Il numero salta fuori sulla foto e sparisce da solo.
(function () {
  var fig = document.querySelector(".about-photo");
  if (!fig) return;
  var btn = fig.querySelector(".about-photo__cursor");
  var hpEl = fig.querySelector(".about-photo__hp");
  var statusEl = fig.querySelector(".about-photo__status span");
  var portrait = fig.querySelector(".about-photo__portrait");
  if (!btn || !hpEl || !statusEl || !portrait) return;

  var max = parseInt(hpEl.getAttribute("data-max"), 10) || 9999;
  var hp = parseInt(hpEl.textContent, 10) || max;
  var en = (document.documentElement.lang || "").indexOf("en") === 0;

  function rnd(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
  }

  function pop(text, kind) {
    var s = document.createElement("span");
    s.className = "about-photo__pop about-photo__pop--" + kind;
    s.setAttribute("aria-hidden", "true");
    s.textContent = text;
    portrait.appendChild(s);
    setTimeout(function () {
      s.remove();
    }, 1200);
  }

  function render() {
    hpEl.textContent = hp;
    fig.classList.toggle("is-low", hp > 0 && hp < max / 4);
    fig.classList.toggle("is-ko", hp === 0);
  }

  btn.addEventListener("click", function () {
    if (hp === 0) {
      hp = Math.round(max / 4);
      statusEl.textContent = "Poison";
      pop(en ? "Phoenix Down" : "Coda di Fenice", "revive");
    } else if (Math.random() < 0.3) {
      var heal = rnd(500, 2500);
      hp = Math.min(max, hp + heal);
      pop(heal, "heal");
    } else {
      // ogni tanto un colpo critico
      var dmg = Math.random() < 0.1 ? rnd(2000, 4000) : rnd(111, 999);
      hp = Math.max(0, hp - dmg);
      pop(dmg, "dmg");
      if (hp === 0) statusEl.textContent = "KO";
    }
    render();
  });
})();
