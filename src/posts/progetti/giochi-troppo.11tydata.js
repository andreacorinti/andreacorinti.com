// Giochi Troppo! è in embargo (KDP Select) fino a `inLineaDal` in _data/libri.js.
// Finché il libro non è visibile, questa vecchia pagina progetto resta online
// e la card punta qui; poi la pagina sparisce (il redirect 301 non forzato in
// netlify.toml porta a /libri/giochi-troppo/) e la card punta al libro.
module.exports = {
  eleventyComputed: {
    permalink: (d) => (d.libri["giochi-troppo"].visibile ? false : "projects/giochi-troppo/"),
    link: (d) => (d.libri["giochi-troppo"].visibile ? "/libri/giochi-troppo/" : "/projects/giochi-troppo/"),
  },
};
