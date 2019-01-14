const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"); // syntax
const pluginRss = require("@11ty/eleventy-plugin-rss"); // rss

module.exports = function (config) {

  // Add a date formatter filter to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js"));
  config.addFilter("timestamp", require("./filters/timestamp.js"));
  config.addFilter("squash", require("./filters/squash.js"));
  // syntax & rss
  config.addPlugin(syntaxHighlight);
  //config.addPlugin(pluginRss);

  config.addPlugin(pluginRss); // rss

  config.addPassthroughCopy('assets') // file esterni
  
  config.addPassthroughCopy('_data') // staticman

  // collections
  config.addCollection("articles", function(collection) {
    return collection.getFilteredByGlob("src/site/posts/*.md").reverse();
  });

  config.addCollection("articoli", function(collection) {
    return collection.getFilteredByGlob("src/site/posts/ita/*.md").reverse();
  });

  // note
  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  config.setLibrary("md", markdownIt(options));
  let markdownItFootnote = require("markdown-it-footnote");
  let markdownLib = markdownIt(options).use(markdownItFootnote);
  config.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };

};
