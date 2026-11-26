// Plugin Netlify locale (niente da npm): a ogni deploy di produzione riuscito
// avvisa i motori IndexNow delle sole pagine nuove o modificate.
//
// Come capisce cosa è cambiato: confronta la sitemap appena pubblicata con
// quella del deploy precedente, conservata nella cache di build di Netlify.
// Nuovo = <loc> che prima non c'era; modificato = <lastmod> diverso (la
// sitemap mette lastmod solo dove c'è una data vera: `updated:` o `date:`).
//
// Regole di sicurezza:
// - gira in onSuccess: se la build fallisce non parte affatto;
// - solo sul contesto "production" (niente anteprime/branch deploy);
// - al primo giro (cache vuota) salva la sitemap di partenza e non invia
//   nulla, così non partono mai tutti gli URL insieme;
// - qualunque errore finisce nel log come avviso: la build resta verde;
// - se l'invio fallisce la sitemap salvata NON viene aggiornata, così il
//   deploy successivo ritenta gli stessi URL.

const fs = require("fs");
const path = require("path");

const CACHE_FILE = ".indexnow-cache/sitemap.xml";
const TIMEOUT_MS = 10000;
const MAX_URLS = 10000; // limite del protocollo per singola richiesta

function parseSitemap(xml) {
  const map = new Map();
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) || []) {
    const loc = (block.match(/<loc>\s*([^<]+?)\s*<\/loc>/) || [])[1];
    const lastmod = (block.match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/) || [])[1] || "";
    if (loc) map.set(loc, lastmod);
  }
  return map;
}

function changedUrls(oldMap, newMap, host) {
  const out = [];
  for (const [loc, lastmod] of newMap) {
    let sameHost = false;
    try {
      sameHost = new URL(loc).host === host;
    } catch (e) {}
    if (!sameHost) continue;
    if (!oldMap.has(loc)) out.push(loc);
    else if (lastmod && lastmod !== oldMap.get(loc)) out.push(loc);
  }
  return out;
}

async function saveSnapshot(utils, xml) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, xml);
  await utils.cache.save(CACHE_FILE);
}

module.exports = {
  async onSuccess({ constants, utils, inputs }) {
    const log = (msg) => console.log(`IndexNow: ${msg}`);
    try {
      if (process.env.CONTEXT !== "production") {
        log(`contesto "${process.env.CONTEXT || "sconosciuto"}", salto (solo production)`);
        return;
      }
      const sitemapPath = path.join(constants.PUBLISH_DIR, "sitemap.xml");
      if (!fs.existsSync(sitemapPath)) {
        log("sitemap.xml non trovata nella cartella pubblicata, salto");
        return;
      }
      const newXml = fs.readFileSync(sitemapPath, "utf8");
      const newMap = parseSitemap(newXml);

      const restored = await utils.cache.restore(CACHE_FILE);
      if (!restored || !fs.existsSync(CACHE_FILE)) {
        await saveSnapshot(utils, newXml);
        log(`primo giro: salvata la sitemap di partenza (${newMap.size} URL), nessun invio`);
        return;
      }

      const oldMap = parseSitemap(fs.readFileSync(CACHE_FILE, "utf8"));
      const urls = changedUrls(oldMap, newMap, inputs.host).slice(0, MAX_URLS);
      if (!urls.length) {
        await saveSnapshot(utils, newXml);
        log(`nessuna pagina nuova o modificata su ${newMap.size} URL, niente da inviare`);
        return;
      }

      log(`${urls.length} URL nuovi o modificati:\n  ${urls.join("\n  ")}`);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      let res;
      try {
        res = await fetch(inputs.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            host: inputs.host,
            key: inputs.key,
            keyLocation: `https://${inputs.host}/${inputs.key}.txt`,
            urlList: urls,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timer);
      }

      // 200 = ricevuto, 202 = ricevuto, chiave in verifica
      if (res.status === 200 || res.status === 202) {
        await saveSnapshot(utils, newXml);
        log(`inviati ${urls.length} URL (HTTP ${res.status})`);
      } else {
        const body = (await res.text().catch(() => "")).slice(0, 200);
        console.warn(`IndexNow: risposta HTTP ${res.status}, riprovo al prossimo deploy. ${body}`);
      }
    } catch (err) {
      // mai far fallire il deploy per IndexNow
      console.warn(`IndexNow: errore (${err.name}: ${err.message}), deploy non toccato; riprovo al prossimo`);
    }
  },
};
