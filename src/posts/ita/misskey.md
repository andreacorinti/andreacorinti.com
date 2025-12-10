---
title: "Provando Misskey"
subtitle: "prime impressioni gattare"
sommario: "Escludendo il solito mondo social-centralizzato (Threads, Bluesky), Misskey è uno dei software più utilizzati del Fediverso dopo Mastodon"
immagine: /img/mastodon/misskey.svg
date: 2025-12-10
lang: it-IT
---

Escludendo il solito mondo social-centralizzato (Threads, Bluesky), Misskey è uno dei software più utilizzati del Fediverso dopo Mastodon...

E, visto che [come detto e ridetto con Mastodon ho qualche problema](posts/ita/mastodon%20e%20fediverso), ieri mi sono messo a provarlo in modo serio - avevo già fatto un vago tentativo qualche anno fa, ma avevo mollato subito.

### Galeotta fu la spilletta

<iframe src="https://misskey.social/embed/notes/ag2k56wrtw" data-misskey-embed-id="v1_ag3c9bmlrd" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"></iframe>
<script defer src="https://misskey.social/embed.js"></script>

scherzi a parte, come detto e ridetto mastodon.social è una vera e propria _cloaca_ dove sto fondamentalmente per mera comodità e, visto che a prescindere dalla piattaforma i contatti con cui interagisco sono sempre quelli, testare nuovi software è sempre bello.

### Pro di Misskey

- _Markdown!_ 
- Emoji buffe & carine (questo merito dell'istanza misskey.social, ma a naso caratterizzano un po' l'ambiente)
- limite a 3000 caratteri, fin troppi in realtà ma goToSocial mi aveva abituato bene
- tutto bellamente matto e con le tinte otaku-wave che mi riportano a una ventina d'anni fa

### Contro di Misskey

- Pieno di chincaglierie, anche carine, ma un po' confusionarie (si può personalizzare un po' tutto, ma bisogna spenderci tempo)
- Restiamo nel medesimo contesto estemporaneo-twitter like di Mastodon, con tutti gli stessi problemi che ne conseguono ([qui per i dettagli](/posts/ita/fediversando-2025/))
- il rovescio della medaglia dell'otaku-wave di cui sopra: timore di finire nel gorgo delle schifezze tipiche di un certo mondo pedo-hentai (ma su misskey.social al momento non ho visto niente di strano per fortuna), d'altronde da [questo](https://mastodon.social/@Gargron) a [questo](https://misskey.io/@syuilo) ce ne passa!

### Le complicazione degli Import / Export

Che detta così fa molto economia aziendale, ma la tanto sbandierata _bellezza migratoria_ del Fediverso è certamente una figata, ma non esattamente all'acqua di rose (specie quando si passa da un software all'altro):

per il momento non ho intenzione di migrare (resto [qui](https://mastodon.social/@Xabacadabra) e per qualche tempo giocherò [qua](https://misskey.social/@xabacadabra) per farmi un'idea più approfondita) ma ecco, avviso a chi lo valuta:

**anche solo importare un centinaio di follower porta spesso a rate limit ingolfando tutto, richiedendo che la procedura venga ripetuta più volte.**

Ovviamente questo dipende molto anche dal server/istanza che vi ospita, ma ho ragione di credere siano caratteristiche naturali dei vari software che non sanno modulare bene le richieste.

### Integrazione commenti

Ho provato ad adattare il [solito script di dpecos](https://github.com/dpecos/mastodon-comments/tree/master) pensato per mastodon, vediamo se funziona anche con misskey!

Se tutto va bene, qua sotto dovreste vedere i commenti cicciare fuori dal solito thread fediverisco.

EDIT: nel caso dovesse servirvi, trovate il js per implementare i commenti con misskey [qui](https://github.com/andreacorinti/misskey-comments)

Tra qualche tempo farò un altro post di aggiornamento per farvi sapere come mi trovo e se l'esperimento continua, oppure resto parcheggiato nel solito mastodon.social vita natural durante!

<misskey-comments 
    host="misskey.social" 
    user="xabacadabra" 
    noteId="ag3dzppvzj" 
    style="max-width: 800px;">
</misskey-comments>
