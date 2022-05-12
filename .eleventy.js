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
  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.addWatchTarget("./src/sass/");

  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  /* Date */

  eleventyConfig.addFilter("dateDisplay", require("./src/filters/dates.js"));
  eleventyConfig.addFilter("timestamp", require("./src/filters/timestamp.js"));

  /* Collezioni */
  
  eleventyConfig.addCollection("blogita", function(collection) {
    return collection.getFilteredByGlob("./src/posts/ita/*.md").reverse();
  });
  eleventyConfig.addCollection("blogeng", function(collection) {
    return collection.getFilteredByGlob("./src/posts/eng/*.md").reverse();
  });
  eleventyConfig.addCollection("blogesp", function(collection) {
    return collection.getFilteredByGlob("./src/posts/esp/*.md").reverse();
  });
  eleventyConfig.addCollection("progetti", function(collection) {
    return collection.getFilteredByGlob("./src/posts/progetti/*.md").reverse();
  });

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`);

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
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};
