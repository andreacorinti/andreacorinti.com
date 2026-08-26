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

## Backlog / prossimi passi

Cose grosse o rischiose rimandate apposta, per tenerne traccia:

- Valutare "post correlati" in fondo ai post: con solo 6 tag ampi il match automatico sarebbe più "altri post della categoria" che correlazione vera — o etichettarlo come tale, o aggiungere un campo frontmatter manuale per i post dove conta di più
- `social.andreacorinti.com`: record DNS rimosso da Namecheap (puntava a Fedilab/fedihost, dove girava la vecchia istanza GoToSocial) — alla verifica successiva risolveva ancora su `lb.fedihost.co`, presumibilmente propagazione DNS in corso. Da ricontrollare tra qualche ora/giorno che risulti irraggiungibile, poi eventualmente chiedere la rimozione a Google Search Console se continua a comparire nei risultati
- `src/img/` contiene diverse immagini orfane mai referenziate nei post (es. `avatar2.jpg`, `baseavatar.jpg`, `test-avatar.png`, `test-avatar.webp`) — utile un giro di pulizia, ma da fare con calma: con centinaia di post storici serve un controllo puntuale prima di cancellare
- Molti link `target="_blank"` nei post più vecchi non hanno `rel="noopener"` (piccolo rischio di reverse tabnabbing). Sistemato nei template condivisi (`social.njk`, `about.md`), ma resta da fare un passaggio sui contenuti storici in `src/posts/`
- Manca ancora una Content-Security-Policy in `netlify.toml`, lasciata fuori di proposito: un decennio di post embeddano iframe/immagini da decine di host diversi (Spotify, YouTube, Bandcamp, blogspot/tumblr/wordpress d'epoca), quindi richiederebbe un audit dei domini usati prima di poterla scrivere senza rompere vecchi post
- Structured data (`BlogPosting`/`CreativeWork` JSON-LD) aggiunto su post e progetti — prossimo passo naturale sarebbe validarlo periodicamente con il [Rich Results Test](https://search.google.com/test/rich-results) di Google dopo il deploy
- Varie ed eventuali
