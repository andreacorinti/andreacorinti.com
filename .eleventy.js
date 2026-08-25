const emojiRegex = require("emoji-regex");
const slugify = require("slugify");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require('eleventy-plugin-toc');
const packageVersion = require("./package.json").version;
const filters = require('./src/_11ty/filters');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);
  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.addWatchTarget("./src/sass/");

  // Filtro per formattare la data in HTML (ISO 8601)
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return dateObj.toISOString().split('T')[0]; // Es: 2025-07-16
  });

  // Filtro per formattare la data in un formato leggibile (potrebbe richiedere un po' più di logica per mesi estesi in italiano)
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('it-IT', options); // Formatta in italiano
  });

  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  /* Date */

  eleventyConfig.addFilter("dateDisplay", require("./src/filters/dates.js"));
  eleventyConfig.addFilter("timestamp", require("./src/filters/timestamp.js"));

  /* Ricerca */

  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Ordina dal più recente al più vecchio
  };  

  eleventyConfig.addCollection("searchIndex", function (collection) {
    // ita posts now live in year folders alongside eng ones (see the
    // blog/blogita/blogeng collections above) — filter by layout instead
    // of the old ita/ folder to keep excluding English posts as before.
    const posts = collection.getFilteredByGlob([
      "./src/posts/20*/*.md", // Prima cartella
      "./src/pages/*.md",      // Seconda cartella
      "./src/posts/progetti/*.md" // Terza cartella
    ]).filter((item) => item.data.layout !== "posteng");

    return posts.map(post => ({
      title: post.data.title,
      excerpt: post.data.sommario || "",
      url: post.url,
    }));
  });

  /* Collezioni */

  // Posts used to live in per-language folders (posts/ita/, posts/eng/,
  // posts/esp/), which is what these collections originally globbed by.
  // They're now merged into per-year folders (posts/2013/, posts/2014/,
  // ...) for the author's own organization, so language is no longer a
  // folder — it's the explicit `layout` each post carries (postita/
  // posteng/postesp), which is what these filter on instead. "./src/posts/
  // 20*/*.md" scopes this to the year folders only, leaving loose files
  // directly under posts/ (e.g. fediverse-language.md) and the untouched
  // bozze/ and progetti/ folders alone, exactly as before.
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob([
      "./src/posts/*.md",
      "./src/posts/20*/*.md"
    ]).filter((item) => !/\/posts\/20\d\d\//.test(item.inputPath) || item.data.layout === "postita")
      .reverse();
  });
  eleventyConfig.addCollection("blogita", function(collection) {
    return collection.getFilteredByGlob("./src/posts/20*/*.md")
      .filter((item) => item.data.layout === "postita")
      .reverse();
  });
  eleventyConfig.addCollection("blogeng", function(collection) {
    return collection.getFilteredByGlob("./src/posts/20*/*.md")
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
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/audio");
  eleventyConfig.addPassthroughCopy("./src/video");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`);

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
