// I saggi leggibili sul sito (src/libri/ in italiano, src/books/ in inglese):
// un indice per libro + una pagina per capitolo. I libri stanno solo qui:
// niente link a negozi (Amazon) né a itch.io.
// I capitoli li raccoglie la collezione `capitoliLibri` (.eleventy.js).
// Embargo: un libro con `inLineaDal` non esce nella build di produzione prima
// di quella data (pagine, EPUB, hreflang e link dall'altra lingua spariscono);
// in locale (npm start) si vede sempre, come le bozze. Il primo deploy dopo la
// data lo pubblica da solo. `visibile` è calcolato qui sotto, a ogni build.
const prod = process.env.ELEVENTY_ENV === "prod";
const oggi = new Date();

// Colori presi dalle copertine: fondo e inchiostro per la testata (fissi,
// uguali nei due temi), accento per capolettera, numeri e barra (in tema
// chiaro la variante più scura, per il contrasto sul fondo crema).
const coloriTroppoSocial = { fondo: "#123c4a", inchiostro: "#f4efe6", accento: "#e7553e", accentoChiaro: "#b8341f" };
const coloriGiochiTroppo = { fondo: "#f56e99", inchiostro: "#17140f", accento: "#f56e99", accentoChiaro: "#c2185b" };

const ccByNc = {
  name: "CC BY-NC 4.0",
  url: "https://creativecommons.org/licenses/by-nc/4.0/",
};

const libri = {
  "troppo-social": {
    colori: coloriTroppoSocial,
    title: "Troppo Social",
    lang: "it-IT",
    url: "/libri/troppo-social/",
    epub: "/libri/troppo-social/troppo-social.epub",
    cover: "/img/libri/troppo-social/cover.jpg",
    coverAlt: "Copertina di Troppo Social: un'icona di app con il badge rosso «99+» su fondo blu petrolio",
    datePublished: "2025-07-04",
    // prima pubblicazione (solo testo, nessun link: i libri ora stanno solo qui)
    primaEdizione: "Pubblicato per la prima volta nel 2025 su itch.io.",
    license: ccByNc,
    translation: "too-social",
  },
  "too-social": {
    colori: coloriTroppoSocial,
    title: "Too Social",
    lang: "en-US",
    url: "/books/too-social/",
    epub: "/books/too-social/too-social.epub",
    cover: "/img/libri/too-social/cover.jpg",
    coverAlt: "Cover of Too Social: an app icon with a red “99+” badge on a petrol blue background",
    datePublished: "2025",
    primaEdizione: "First published in 2025 on Amazon and itch.io.",
    license: ccByNc,
    translation: "troppo-social",
    translationOf: "troppo-social",
  },
  "giochi-troppo": {
    colori: coloriGiochiTroppo,
    title: "Giochi Troppo!",
    subtitle: "Spegni il computer e vai a dormire!",
    lang: "it-IT",
    url: "/libri/giochi-troppo/",
    epub: "/libri/giochi-troppo/giochi-troppo.epub",
    cover: "/img/libri/giochi-troppo/cover.jpg",
    coverAlt: "Copertina di Giochi Troppo!: un personaggio disegnato dall'aria stanca e il fumetto «Giochi troppo! Spegni il computer e vai a dormire» su fondo rosa",
    datePublished: "2022",
    primaEdizione: "Pubblicato per la prima volta nel 2022 su Amazon e nel 2025 su itch.io.",
    // in KDP Select (esclusiva digitale Amazon) fino a fine gennaio 2027
    inLineaDal: "2027-02-01",
    license: ccByNc,
    translation: "too-much-gaming",
  },
  "too-much-gaming": {
    colori: coloriGiochiTroppo,
    title: "Too Much Gaming!",
    subtitle: "Turn off the computer and go to sleep!",
    lang: "en-US",
    url: "/books/too-much-gaming/",
    epub: "/books/too-much-gaming/too-much-gaming.epub",
    cover: "/img/libri/too-much-gaming/cover.jpg",
    coverAlt: "Cover of Too Much Gaming!: a tired-looking cartoon character with the Italian title “Giochi troppo!” in a speech bubble on a pink background",
    datePublished: "2025",
    primaEdizione: "First published in 2025 on Amazon.",
    license: ccByNc,
    translation: "giochi-troppo",
    translationOf: "giochi-troppo",
  },

  // Testi dell'interfaccia, per lingua
  ui: {
    it: {
      index: "Indice",
      prev: "Capitolo precedente",
      next: "Capitolo successivo",
      contents: "Capitoli",
      chapterOf: "Capitolo {n} di {tot}",
      download: "Scarica l'EPUB",
      license: "Licenza",
      by: "di",
      otherLang: "Read it in English",
      // in fondo a ogni capitolo
      cta: "Ti sta piacendo? Puoi {epub}, seguire il blog {rss} o {coffee}.",
      ctaEpub: "scaricare l'EPUB",
      ctaRss: "via RSS",
      ctaCoffee: "offrirmi un caffè su Liberapay",
      rss: "/feed.xml",
    },
    en: {
      index: "Contents",
      prev: "Previous chapter",
      next: "Next chapter",
      contents: "Chapters",
      chapterOf: "Chapter {n} of {tot}",
      download: "Download the EPUB",
      license: "License",
      by: "by",
      otherLang: "Leggilo in italiano",
      cta: "Enjoying it? You can {epub}, follow the blog {rss} or {coffee}.",
      ctaEpub: "download the EPUB",
      ctaRss: "via RSS",
      ctaCoffee: "buy me a coffee on Liberapay",
      rss: "/feed-en.xml",
    },
  },
};

for (const [id, libro] of Object.entries(libri)) {
  if (id === "ui") continue;
  libro.visibile = !prod || !libro.inLineaDal || oggi >= new Date(libro.inLineaDal);
}

module.exports = libri;
