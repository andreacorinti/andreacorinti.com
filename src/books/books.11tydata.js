// Saggi leggibili sul sito: ogni capitolo usa libro-capitolo.njk (gli indici
// sovrascrivono il layout). Il testo è Markdown puro, niente Nunjucks dentro
// (templateEngineOverride), così una graffa nel testo non rompe la build.
module.exports = {
  layout: "libro-capitolo",
  templateEngineOverride: "md",
  eleventyComputed: {
    // libro in embargo (vedi `inLineaDal` in _data/libri.js): niente pagina
    permalink: (d) => (d.libri && d.libri[d.book] && !d.libri[d.book].visibile ? false : d.permalink),
    // gemello nell'altra lingua in embargo: niente hreflang / link verso di lui
    translation: (d) => {
      const b = d.libri && d.libri[d.book];
      return b && b.translation && !d.libri[b.translation].visibile ? "" : d.translation;
    },
    ogImage: (d) => (d.libri && d.libri[d.book] ? d.libri[d.book].cover : d.ogImage),
    seoTitle: (d) => (d.order && d.libri && d.libri[d.book] ? `${d.title} · ${d.libri[d.book].title}` : d.seoTitle),
  },
};
