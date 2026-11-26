# andreacorinti.com

Il blog e sito personale di Andrea Corinti (**Xab**), *Italian Web World Citizen*. Riflessioni su internet e fediverso, videogiochi, musica, cinema/serie TV, fumetti e varie xabologie, online dal 2013.

Sito statico costruito con [Eleventy (11ty)](https://www.11ty.dev/), Sass e Nunjucks, distribuito su [Netlify](https://www.netlify.com/).

## Sviluppo

```bash
npm install       # installa le dipendenze
npm start         # dev server con live reload (Sass + Eleventy)
npm run build     # build di produzione (quella che gira su Netlify)
npm run lint      # lint dei file Sass (stylelint)
npm run lint:fix  # lint con autofix
npm run bump      # bump di versione, es. npm run bump patch
```

## Struttura

- `src/posts/` — i post del blog, organizzati per anno (`2013/`, `2014/`, ...). `src/posts/bozze/` contiene le bozze: non vengono mai pubblicate in produzione (vedi `src/posts/bozze/bozze.11tydata.js`)
- `src/pages/` — pagine statiche (about, resume, contatti, categorie...)
- `src/_includes/` — layout e componenti Nunjucks
- `src/sass/` — fogli di stile, un partial per componente
- `src/_generate/` — template che generano file speciali (`feed.xml`, `sitemap.xml`, `robots.txt`)

## Regole per i post nuovi

- **Slug**: l'URL di un post viene dal nome del file (`/posts/{{ page.fileSlug }}/`), quindi il nome del file *è* lo slug. Per i post nuovi: solo minuscole, parole separate da trattini, niente spazi, accenti o altri caratteri speciali (es. `italian-linux-society.md`, non `Italian Linux Society.md` né `perché-linux.md`). Se il nome del file non va bene, si fissa lo slug con `permalink:` nel front matter
- I vecchi URL con spazi o maiuscole (es. `/posts/NOBUO%20UEMATSU-con-TIKI-SHOW/`, `/posts/I%20molti%20santi%20del%20New%20Jersey/`, `/posts/mastodon%20e%20fediverso/`) **non vanno toccati**: hanno link esterni, rinominarli li romperebbe
- Post modificato in modo sostanziale dopo l'uscita: aggiungere `updated: AAAA-MM-GG` nel front matter (finisce nel `dateModified` del JSON-LD)

## Backlog / prossimi passi

Cose grosse o rischiose rimandate apposta, per tenerne traccia:

- "Post correlati" in fondo ai post (`related-posts.njk`, filtro `relatedPosts` in `.eleventy.js`): fatti, stessa lingua e categoria, con priorità ai tag in comune. Con soli 6 tag ampi sono di fatto "altri post della categoria": se un giorno serve correlazione vera, aggiungere tag tematici (come `linux`) o un campo front matter manuale
- `social.andreacorinti.com`: record DNS rimosso da Namecheap (puntava a Fedilab/fedihost, dove girava la vecchia istanza GoToSocial) — alla verifica successiva risolveva ancora su `lb.fedihost.co`, presumibilmente propagazione DNS in corso. Da ricontrollare tra qualche ora/giorno che risulti irraggiungibile, poi eventualmente chiedere la rimozione a Google Search Console se continua a comparire nei risultati
- `src/img/` contiene diverse immagini orfane mai referenziate nei post (es. `avatar2.jpg`, `baseavatar.jpg`, `test-avatar.png`, `test-avatar.webp`) — utile un giro di pulizia, ma da fare con calma: con centinaia di post storici serve un controllo puntuale prima di cancellare
- Molti link `target="_blank"` nei post più vecchi non hanno `rel="noopener"` (piccolo rischio di reverse tabnabbing). Sistemato nei template condivisi (`social.njk`, `about.md`), ma resta da fare un passaggio sui contenuti storici in `src/posts/`
- Manca ancora una Content-Security-Policy in `netlify.toml`, lasciata fuori di proposito: un decennio di post embeddano iframe/immagini da decine di host diversi (Spotify, YouTube, Bandcamp, blogspot/tumblr/wordpress d'epoca), quindi richiederebbe un audit dei domini usati prima di poterla scrivere senza rompere vecchi post
- Structured data (`BlogPosting`/`CreativeWork` JSON-LD) aggiunto su post e progetti — prossimo passo naturale sarebbe validarlo periodicamente con il [Rich Results Test](https://search.google.com/test/rich-results) di Google dopo il deploy
- Varie ed eventuali
