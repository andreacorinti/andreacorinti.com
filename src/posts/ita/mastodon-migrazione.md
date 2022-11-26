---
title: "Come migrare da un'istanza all'altra su Mastodon"
subtitle: E cosa succede
sommario: "Sono appena migrato dall'istanza mastodon.uno a livellosegreto.it! 
Dei dettagli e perché / per come del caso ne parlerò in un altro post, qui mi andava di fare una mini guida riguardo quello che il procedimento comporta..."
immagine: /img/mastodon/mastodon-migrare.jpg
date: 2022-11-24
lang: it-IT
---

Sono appena migrato dall'istanza mastodon.uno a livellosegreto.it!

Dei dettagli e perché / per come del caso ne parlerò in un altro post (edit: [**questo**](/posts/ita/mastodon-migrazione)), qui mi andava di fare una mini guida riguardo quello che il procedimento comporta, ovvero cosa succede e cosa aspettarsi visto che, [pur consultando l'ottima documentazione ufficiale](https://docs.joinmastodon.org/user/moving/), la faccenda può sembrare un più nebulosa di quello che è in realtà.

### Primo passo: iscriviti nella nuova istanza

Prima di fare qualsiasi cosa, registrati nell'istanza nuova e **magari provala per qualche giorno in parallelo, senza spostarti.** 

Se ti trovi bene, andata!

Altrimenti, **forse per te non vale la pena migrare:** 

dipende molto da quello che ti aspetti da Mastodon e quanto t'importa della timeline locale. 

Fondamentalmente, è possibilissimo avere un proprio server su misura in modo da affidarsi esclusivamente alla Home e la Federazione globale: 

**le istanze importano principalmente se cercate un concetto di community più o meno tematico, molti potrebbero trovarsi meglio facendone a meno.**

### Esempio

Se siete su mastodon.uno e volete migrare su Livello Segreto come ho fatto io, il primo step è andare qui e registrarvi: [https://livellosegreto.it/auth/sign_up](https://livellosegreto.it/auth/sign_up)

**Livello Segreto chiede una motivazione per capire il perché vogliate iscrivervi lì e l'approvazione dell'account può richiedere un po' di tempo**: 

questa è una mossa molto intelligente per un'istanza con temi abbastanza ben definiti, soprattutto in caso di eventuali altri esodi da Twitter e l'arrivo di amorevoli spettatori televisivi di programmi di dubbio gusto / account parodia di questo o quel personaggio pubblico.

### Secondo passo: imposta l'alias

Dalle impostazioni del tuo nuovo profilo, inserisci il tuo nome nell'istanza da cui stai migrando:

**non succederà nulla nell'immediato**, perché la migrazione ovviamente parte dal profilo "originale".

### Cosa succede migrando? Cosa perdo?

Con il sistema di Mastodon, **i tuoi follower verrano con te ma NON i tuoi Seguiti**: siccome seguire tutti da capo è un procedimento tedioso, per fortuna è possibile esportare questa e altre liste:

![esportazione-mastodon](/img/mastodon/export.jpg)

per poi importarle di nuovo dal profilo dove stai migrando:

![importazione-mastodon](/img/mastodon/import.jpg)

la stessa cosa vale per segnalibri, utenti silenziati e blocchi.

In ogni caso, per i tuoi follower cambierà relativamente poco: dalla home continueranno a vedere i tuoi post esattamente come prima e viceversa! 

Da notare però che, in base alle loro impostazioni o le politiche del loro server riguardo la tua nuova istanza, è possibile debbano approvare manualmente la tua richiesta di follow.

### Ma i toot / post che ho inviato?

Quelli rimarranno nel server dell'istanza dove sono stati inviati in origine: certo, puoi esportarli sul tuo computer, ma nei fatti interazioni (risposte e stelline) rimarrano vincolati al server originale.

### Perché mi scrivi alla seconda persona singolare come Salvatore Aranzulla?

Perché mi è uscito d'istinto così, ma sappi che me ne vergogno molto.

### Ultimo passo

Dal profilo dell'istanza originale, vai qui:

![sposta-mastodon](/img/mastodon/sposta.jpg)

e inserisci l'indirizzo del tuo nuovo account:

![sposta-mastodon](/img/mastodon/sposta2.jpg)

Tutto fatto, congratulazioni! (Shinji?)

### Aiuto, non capisco! 

![Nabeshin spara](/img/nabeshin.gif)

Se hai problemi o dubbi, invia pure un commento a questo post:

<iframe src="https://livellosegreto.it/@xabacadabra/109399825062698268/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://livellosegreto.it/embed.js" async="async"></script>