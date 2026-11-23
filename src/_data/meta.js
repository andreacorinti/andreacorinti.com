module.exports = {
  url: process.env.URL || "https://andreacorinti.com",
  // Includes the "Xab" alias in every page title/H1 — there's a footballer
  // with the same name, and this alias is the clearest disambiguator.
  siteName: "Andrea Corinti (Xab)",
  siteDescription: "Blog and website of Andrea Corinti (Xab), freelance content & e-learning platform coordinator and Italian Web World citizen.",
  authorName: "Andrea Corinti",
  domain: "andreacorinti.com",
  // Usati dai commenti Bluesky (front matter `bluesky`) e dai link al profilo.
  bluesky: {
    handle: "andreacorinti.com",
    did: "did:plc:pftjufgriyqcvqys2av3q3o6",
    profile: "https://bsky.app/profile/andreacorinti.com"
  }
};
