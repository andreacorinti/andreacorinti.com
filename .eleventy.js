var env = process.env.ELEVENTY_ENV;

module.exports = function(eleventyConfig) {

// syntax highlighting plugin
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
eleventyConfig.addPlugin(syntaxHighlightPlugin, {
  templateFormats: "md"
});

// RSS plugin
const pluginRss = require("@11ty/eleventy-plugin-rss");
eleventyConfig.addPlugin(pluginRss);

  // Add a date formatter filter to Nunjucks
  eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );
  eleventyConfig.addFilter("section", require("./src/site/_filters/section.js") );
  eleventyConfig.addFilter("squash", require("./src/site/_filters/squash.js") );
  eleventyConfig.addFilter("kebab", require("./src/site/_filters/kebab.js") );

  eleventyConfig.addPassthroughCopy('assets') // file esterni
  
  /* Collezioni */

  eleventyConfig.addCollection("tutto", function(collection) {
    return collection.getFilteredByGlob(["src/site/posts/*.md","src/site/posts/ita/*.md"]); // array!
    // to add: "src/site/posts/projects/*.md"
  });
  eleventyConfig.addCollection("articles", function(collection) {
    return collection.getFilteredByGlob("src/site/posts/*.md").reverse();
  });
  eleventyConfig.addCollection("articoli", function(collection) {
    return collection.getFilteredByGlob("src/site/posts/ita/*.md").reverse();
  });

  /* Markdown */

  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  eleventyConfig.setLibrary("md", markdownIt(options));
  let markdownItFootnote = require("markdown-it-footnote");
  let markdownLib = markdownIt(options).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLib);

  // static passthroughs
  eleventyConfig.addPassthroughCopy("src/site/fonts");
  eleventyConfig.addPassthroughCopy("src/site/images");
  eleventyConfig.addPassthroughCopy("src/site/manifest.json");
  eleventyConfig.addPassthroughCopy("src/site/browserconfig.xml");

  // minify the html output
  const htmlmin = require("html-minifier");
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: false, // we need comments to identify the expcerpt split marker.
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  /* Return */

  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };

};
