const emojiRegex = require("emoji-regex");
const slugify = require("slugify");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require('eleventy-plugin-toc');
const { default: Image, generateHTML: generateImageHTML } = require("@11ty/eleventy-img");
const packageVersion = require("./package.json").version;
const filters = require('./src/_11ty/filters');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss.rssPlugin);
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);
  eleventyConfig.addPlugin(pluginTOC);

  // Caps how many entries the RSS feed emits (feed.njk) — without this the
  // feed grows unbounded with every post ever published (280+ items today).
  eleventyConfig.addFilter("limit", (array, limit) => array.slice(0, limit));

  eleventyConfig.addWatchTarget("./src/sass/");

  // Filtro per formattare la data in HTML (ISO 8601)
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return dateObj.toISOString().split('T')[0]; // Es: 2025-07-16
  });

  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  /* Date */

  eleventyConfig.addFilter("dateDisplay", require("./src/filters/dates.js"));

  /* Ricerca */

  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Ordina dal più recente al più vecchio
  };  

  eleventyConfig.addCollection("searchIndex", function (collection) {
    // Italian posts (year folders), English posts (posts/eng/), pages and
    // projects. Pages with an English `lang` carry `lang: "en"` so search.js can flag them.
    const posts = collection.getFilteredByGlob([
      "./src/posts/20*/*.md",
      "./src/posts/eng/*.md",
      "./src/pages/*.md",
      "./src/posts/progetti/*.md"
    ]).filter((item) => item.data.title); // about/projects non hanno né title né sommario: non potrebbero mai uscire come risultato

    return posts.map(post => ({
      title: post.data.title,
      excerpt: post.data.sommario || "",
      url: post.url,
      ...(String(post.data.lang || "").startsWith("en") ? { lang: "en" } : {}),
    }));
  });

  /* Collezioni */

  // Italian posts live in per-year folders (posts/2013/, posts/2014/, ...);
  // English ones live together in posts/eng/ regardless of year, since
  // there are few enough of them that browsing by year isn't useful and
  // grouping them makes translation pairs (see the `translation` frontmatter
  // field) easier to find. Layout (postita/posteng/postesp) still decides
  // which collection a post lands in — it's not inferred from the folder.
  //
  // "blog" backs the RSS feed (declared it-IT), so it stays Italian-only on
  // purpose — an English post must never become the newest item there just
  // because it's the most recently dated file. The homepage teaser uses
  // "latestPost" below instead, which does include English posts.
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob("./src/posts/20*/*.md")
      .filter((item) => item.data.layout === "postita")
      .reverse();
  });
  // Pagina "Tutti" (/blog-N/): post italiani + inglesi insieme, i più recenti
  // prima. `blog` resta solo italiano perché alimenta il feed RSS italiano.
  eleventyConfig.addCollection("blogTutti", function(collection) {
    return collection.getFilteredByGlob(["./src/posts/20*/*.md", "./src/posts/eng/*.md"])
      .filter((item) => item.data.layout === "postita" || item.data.layout === "posteng")
      .sort((a, b) => b.date - a.date);
  });
  // Homepage "latest post" teaser: newest post in either language.
  eleventyConfig.addCollection("latestPost", function(collection) {
    return collection.getFilteredByGlob(["./src/posts/20*/*.md", "./src/posts/eng/*.md"])
      .filter((item) => item.data.layout === "postita" || item.data.layout === "posteng")
      .sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection("blogita", function(collection) {
    return collection.getFilteredByGlob("./src/posts/20*/*.md")
      .filter((item) => item.data.layout === "postita")
      .reverse();
  });
  // English posts now live in their own posts/eng/ folder (moved out of the
  // year folders for easier browsing), so this globs that directly instead
  // of filtering year folders by layout.
  eleventyConfig.addCollection("blogeng", function(collection) {
    return collection.getFilteredByGlob("./src/posts/eng/*.md")
      .filter((item) => item.data.layout === "posteng")
      .reverse();
  });
  eleventyConfig.addCollection("blogesp", function(collection) {
    return collection.getFilteredByGlob("./src/posts/20*/*.md")
      .filter((item) => item.data.layout === "postesp")
      .reverse();
  });
  eleventyConfig.addCollection("progetti", function(collection) {
    return collection.getFilteredByGlob("./src/posts/progetti/*.md").reverse();
  });

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  // i .psd sorgente restano nel repo ma non vanno online (13 MB, nessuna
  // pagina li usa); le opzioni passano a recursive-copy
  eleventyConfig.addPassthroughCopy("./src/img", { filter: ["**/*", "!**/*.psd"] });
  eleventyConfig.addPassthroughCopy("./src/audio");
  // src/video (i video del live Opeth, ~318 MB) resta nel repo ma non va
  // più online: nessuna pagina li usa e consumavano banda Netlify.
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  // Impronta del contenuto per il cache-busting (style.css?v=abc123): il CSS
  // può stare in cache un anno (vedi netlify.toml) e cambia indirizzo da solo
  // a ogni modifica. Legge il file compilato in public/ (sass gira prima di
  // eleventy in "npm run build"), altrimenti quello in src/.
  const assetHashes = new Map();
  eleventyConfig.on("eleventy.before", () => assetHashes.clear());
  eleventyConfig.addShortcode("assetHash", (p) => {
    if (!assetHashes.has(p)) {
      const fs = require("fs");
      const file = [`./public${p}`, `./src${p}`].find((f) => fs.existsSync(f));
      const hash = file
        ? require("crypto").createHash("md5").update(fs.readFileSync(file)).digest("hex").slice(0, 10)
        : packageVersion;
      assetHashes.set(p, hash);
    }
    return assetHashes.get(p);
  });
  eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`);

  // Post/project hero images are the LCP element on those pages, and were
  // being served at their original size (some 1-4MB) with no width/height
  // — hurting both LCP and CLS. This resizes+converts local images
  // (src="/img/...") to responsive WebP/JPEG at build time via
  // eleventy-img. Hotlinked third-party images (src="http...", the
  // majority across a decade of posts) are left alone: fetching hundreds
  // of old external URLs on every build would be slow and would break the
  // build the moment any one of them goes offline — they just get the
  // eager/high-priority loading hints instead.
  // Immagini dentro i post: ogni <img> locale (/img/..., non già ottimizzata,
  // non svg/gif) diventa un <picture> webp + formato originale a 480/960/1600px,
  // con width/height per evitare salti di layout. Le immagini remote restano
  // come sono (niente download a ogni build); se un file manca, resta l'<img>.
  eleventyConfig.addTransform("ottimizza-immagini-post", async function (content) {
    const out = this.page.outputPath || "";
    if (!out.endsWith(".html") || !this.page.url.startsWith("/posts/")) return content;
    const tags = content.match(/<img\b[^>]*>/g) || [];
    for (const tag of new Set(tags)) {
      const m = tag.match(/\ssrc="(\/img\/[^"]+)"/);
      if (!m || m[1].startsWith("/img/optimized/") || /\.(svg|gif)$/i.test(m[1])) continue;
      const attrs = {};
      for (const [, k, v] of tag.matchAll(/\s([a-zA-Z:-]+)="([^"]*)"/g)) attrs[k] = v;
      try {
        const metadata = await Image(`./src${decodeURI(m[1])}`, {
          widths: [480, 960, 1600],
          formats: ["webp", "auto"],
          outputDir: "./public/img/optimized/",
          urlPath: "/img/optimized/",
        });
        delete attrs.src;
        const html = generateImageHTML(metadata, {
          alt: "",
          ...attrs,
          loading: attrs.loading || "lazy",
          decoding: "async",
          sizes: "(min-width: 820px) 760px, 100vw",
        });
        content = content.split(tag).join(html);
      } catch (e) {
        console.warn(`ottimizza-immagini-post: ${m[1]} lasciata com'è (${e.message})`);
      }
    }
    return content;
  });

  // Miniatura delle card del blog (archivi + home). Le immagini locali
  // diventano webp/jpeg da 480/800px (una card non supera ~400px di
  // larghezza), le esterne restano così ma in lazy-load: il riquadro a
  // rapporto fisso in _postcard.scss le uniforma comunque tutte.
  // `eager` (numero o booleano): le prime card non vanno in lazy-load.
  eleventyConfig.addAsyncShortcode("cardImage", async function (src, alt, eager) {
    if (!src) return "";
    const isEager = eager === true || (typeof eager === "number" && eager <= 2);
    const attrs = {
      alt: alt || "",
      class: "post-card__img",
      loading: isEager ? "eager" : "lazy",
      decoding: "async",
    };
    const plainImg = () =>
      `<img src="${src}" ${Object.entries(attrs)
        .map(([key, value]) => `${key}="${String(value).replace(/"/g, "&quot;")}"`)
        .join(" ")}>`;

    if (/^https?:\/\//.test(src)) return plainImg();

    try {
      const metadata = await Image(`./src${src}`, {
        widths: [480, 800],
        formats: ["webp", "jpeg"],
        outputDir: "./public/img/optimized/",
        urlPath: "/img/optimized/",
      });
      return generateImageHTML(metadata, {
        ...attrs,
        sizes: "(min-width: 1100px) 360px, (min-width: 700px) 45vw, 100vw",
      });
    } catch (e) {
      console.warn(`cardImage: could not process ${src}: ${e.message}`);
      return plainImg();
    }
  });

  eleventyConfig.addAsyncShortcode("heroImage", async function (src, alt) {
    if (!src) return "";

    const commonAttrs = {
      alt,
      title: alt,
      itemprop: "image",
      loading: "eager",
      fetchpriority: "high",
      decoding: "async",
    };

    const plainImg = () =>
      `<img src="${src}" ${Object.entries(commonAttrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")}>`;

    if (/^https?:\/\//.test(src)) {
      return plainImg();
    }

    try {
      const metadata = await Image(`./src${src}`, {
        widths: [400, 800, 1200, null],
        formats: ["webp", "jpeg"],
        outputDir: "./public/img/optimized/",
        urlPath: "/img/optimized/",
      });

      return generateImageHTML(metadata, {
        ...commonAttrs,
        sizes: "(min-width: 800px) 800px, 100vw",
      });
    } catch (e) {
      console.warn(`heroImage: could not process ${src}: ${e.message}`);
      return plainImg();
    }
  });

  // Used only by the print layout of /resume: splits the rendered resume
  // HTML (a flat run of <h3 id="...">...</h3> + <table>/<p> pairs) into
  // groups by heading id, keeping only the requested ids and in the given
  // order — regardless of their original order in the document. This lets
  // the print stylesheet render "Contacts, Skills, Languages, Certifications"
  // as one contiguous sidebar column and "Work Experience, Publications,
  // Education" as a separate main column, each flowing independently, while
  // the on-screen page keeps the original single-column reading order.
  // Strips each section's id (only the print duplicate's copy) to avoid two
  // elements sharing the same id in the final page.
  eleventyConfig.addFilter("resumeSection", (html, ids) => {
    if (!html || !Array.isArray(ids)) return "";

    const sections = {};
    html.split(/(?=<h3 id="[^"]*")/).forEach((chunk) => {
      const match = chunk.match(/^<h3 id="([^"]*)"/);
      if (match) {
        sections[match[1]] = chunk.replace(/ id="[^"]*"/, "");
      }
    });

    return ids.map((id) => sections[id] || "").join("\n");
  });

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) {
      return;
    }

    const regex = emojiRegex();
    // Remove Emoji first
    let string = str.replace(regex, "");

    return slugify(string, {
      lower: true,
      replacement: "-",
      remove: /[*+~·,()'"`´%!?¿:@\/]/g,
    });
  });

  /* Note */

  let markdownItFootnote = require("markdown-it-footnote");

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "tdbc-anchor",
    permalinkSymbol: "",
    permalinkSpace: false,
    level: [1, 2, 3],
    slugify: (s) =>
      s
        .trim()
        .toLowerCase()
        .replace(/[\s+~\/]/g, "-")
        .replace(/[().`,%·'"!?¿:@*]/g, ""),
  }).use(markdownItFootnote);

  // Lazy-load images embedded in post content — they're below the fold by
  // definition (the hero image is rendered separately, outside markdown),
  // so deferring them cuts initial page weight without affecting LCP.
  const defaultImageRender =
    markdownLibrary.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };
  markdownLibrary.renderer.rules.image = function (tokens, idx, options, env, self) {
    tokens[idx].attrSet("loading", "lazy");
    tokens[idx].attrSet("decoding", "async");
    return defaultImageRender(tokens, idx, options, env, self);
  };

  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};
