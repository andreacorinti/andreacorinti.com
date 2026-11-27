module.exports = {
  // su Netlify arriva da URL (dominio principale, col www); il fallback è lo
  // stesso, così le build locali escono identiche a quelle di produzione
  url: process.env.URL || "https://www.andreacorinti.com",
  // Includes the "Xab" alias in every page title/H1 — there's a footballer
  // with the same name, and this alias is the clearest disambiguator.
  siteName: "Andrea Corinti (Xab)",
  siteDescription: "Blog and website of Andrea Corinti (Xab), freelance content & e-learning platform coordinator and Italian Web World citizen.",
  authorName: "Andrea Corinti",
  domain: "andreacorinti.com",
  // Link testuale "Offrimi un caffè" (footer, about, fondo dei capitoli dei saggi)
  liberapay: "https://liberapay.com/Xabacadabra/",
  // Usati dai commenti Bluesky (front matter `bluesky`) e dai link al profilo.
  bluesky: {
    handle: "andreacorinti.com",
    did: "did:plc:pftjufgriyqcvqys2av3q3o6",
    profile: "https://bsky.app/profile/andreacorinti.com"
  },
  // Pagine /lavora-con-me/ e /work-with-me/ e riquadro in cima a /projects/.
  // available: false mostra il timbro "Party al completo / Party full".
  // I prezzi (in euro, "a partire da") stanno solo qui.
  work: {
    available: false,
    prices: {
      blog: 600,       // blog o sito personale, fino a circa 5 pagine
      vetrina: 900,    // sito vetrina per professionisti / piccole attività
      support: 25,     // assistenza base, al mese
      content: 120,    // aggiornamento contenuti, al mese
      domainMax: 20    // dominio incluso fino a questa cifra l'anno
    },
    // Ultima misurazione di questo sito su Speedlify (Lighthouse, mobile):
    // da aggiornare a mano ogni tanto, la data compare sulla pagina.
    speedlify: {
      url: "https://www.speedlify.dev/site/www-andreacorinti-com/",
      date: "26 novembre 2026",
      dateEn: "26 November 2026",
      rank: 233,
      total: "1.136",
      totalEn: "1,136",
      perf: 98,
      a11y: 100,
      best: 100,
      seo: 100
    }
  }
};
