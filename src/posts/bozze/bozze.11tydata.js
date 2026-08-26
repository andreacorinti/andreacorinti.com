module.exports = {
  eleventyExcludeFromCollections: true,
  eleventyComputed: {
    // Keeps drafts previewable with `npm start` (ELEVENTY_ENV=dev) while
    // suppressing any output file for them in the production build
    // (`npm run build`, ELEVENTY_ENV=prod / Netlify), regardless of
    // whatever permalink the individual draft sets.
    permalink: (data) => (process.env.ELEVENTY_ENV === "prod" ? false : data.permalink),
  },
};
