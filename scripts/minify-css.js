// Replaces the "postbuild" postcss-cli invocation, which was silently
// producing CSS 2-3x LARGER than the unminified input (verified: the
// postcss-cli 11 + postcss 8 + cssnano 7 combo used here never actually
// applies cssnano's optimizations — postcss's own JS API does, correctly,
// which is what this script calls directly instead.
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const cssDir = path.join(__dirname, "..", "public", "css");
const files = fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"));

const processor = postcss([autoprefixer, cssnano({ preset: "default" })]);

Promise.all(
  files.map((file) => {
    const filePath = path.join(cssDir, file);
    const css = fs.readFileSync(filePath, "utf8");
    return processor.process(css, { from: filePath, to: filePath }).then((result) => {
      fs.writeFileSync(filePath, result.css);
      console.log(`${file}: ${css.length} -> ${result.css.length} bytes`);
    });
  })
).catch((err) => {
  console.error(err);
  process.exit(1);
});
