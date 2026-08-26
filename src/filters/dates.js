/*
A locale-aware date formatter filter for Nunjucks
*/
module.exports = function(date, locale) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(locale || "it-IT", options);
}
