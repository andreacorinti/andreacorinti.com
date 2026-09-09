// Turns a newly-published post into a Buttondown draft — see
// .github/workflows/newsletter.yml for how/when this gets called.
//
// Opt-in only: a post is skipped unless its frontmatter has
// `newsletter: true`. Always creates a DRAFT (never sends automatically) —
// review and hit send by hand from the Buttondown dashboard.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://andreacorinti.com";
const API_URL = "https://api.buttondown.email/v1/emails";

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: node scripts/newsletter-draft.js <path-to-post.md>");
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    // Can happen if the file was added and then removed later in the same
    // push — nothing to draft.
    console.log(`Skip: ${filePath} no longer exists.`);
    return;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);

  if (data.newsletter !== true) {
    console.log(`Skip: ${filePath} has no \`newsletter: true\` flag.`);
    return;
  }

  if (!data.title || !data.sommario) {
    console.error(`Error: ${filePath} is flagged \`newsletter: true\` but is missing title or sommario.`);
    process.exit(1);
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    console.error("Error: BUTTONDOWN_API_KEY is not set (add it as a repo secret).");
    process.exit(1);
  }

  // 11ty's fileSlug for these posts is just the filename without extension
  // (no date-prefix stripping in use here, case/spaces preserved) — see
  // src/posts/*/*.11tydata.json which sets permalink to /posts/{{ page.fileSlug }}/.
  const slug = path.basename(filePath, path.extname(filePath));
  const url = `${SITE_URL}/posts/${slug}/`;

  const body = `${data.sommario}\n\n[Continua a leggere sul sito →](${url})`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: data.title,
      body,
      status: "draft",
    }),
  });

  if (!res.ok) {
    console.error(`Buttondown API error (${res.status}) for ${filePath}: ${await res.text()}`);
    process.exit(1);
  }

  const json = await res.json();
  console.log(`Draft created for "${data.title}" (${url}) -> https://buttondown.com/emails/${json.id}`);
}

main();
