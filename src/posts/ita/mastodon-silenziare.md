---
title: "Cosa succede se un utente viene silenziato su Mastodon?"
subtitle: "Esperimenti e scoperte"
sommario: "Cosa succede se un'istanza di Mastodon decide di silenziare o bloccare un utente?"
immagine: https://upload.wikimedia.org/wikipedia/commons/7/72/Mastodon_La_Brea.jpg
date: 2023-07-13
lang: it-IT
---

Cosa succede se un'istanza di Mastodon decide di silenziare o bloccare[^bloccare] un utente?

[^bloccare]: Anche lì sarebbe bene capire cosa cambia nel dettaglio tra blocco e silenziamento per tutte le parti coinvolte, ma immagino ci sia documentazione in merito (eventualmente me la studierò meglio per un altro post futuro)

A intuito, direi che basicamente quell'utente non apparirà più nelle varie timeline dell'istanza (locale e federata) e non potrà più interagire con gli utenti della suddetta - e viceversa.

Ma forse c'è dell'altro, o almeno, è quello [che mi sono chiesto](https://livellosegreto.it/@xabacadabra/110708174321939635) dopo che un amico con un account su mastodon.uno [^lurker] mi ha scritto su telegram per farmi notare che non avevo più replicato a questa conversazione dopo la risposta di [caosorganizzato](https://livellosegreto.it/@caosorganizzato).

[^lurker]: Che non utilizza, è un lurido lurker

Sul momento, ho strabuzzato gli occhi temendo di essermi bevuto il cervello a causa delle mostruose temperature di Atene in questo luglio infuocato: 

_non solo_ avevo risposto a Caos, ma la conversazione è proseguita diventando un allegro delirio che ha coinvolto nell'ordine [Nikole](https://livellosegreto.it/@nikole), [CapeTaun](https://livellosegreto.it/@capetaun) e [Raffy_Baffy](https://livellosegreto.it/@Raffy_Baffy).

![basil](https://upload.wikimedia.org/wikipedia/it/thumb/1/19/Basil_l%27investigatopo.png/1200px-Basil_l%27investigatopo.png)

esempio pratico: 

* Se cercate il thread da qui [https://mastodon.uno/search](https://mastodon.uno/search) (cercate xabacadabra, trovate il mio account e scorrete un po' di post fino ad arrivare al 13 Luglio) dovreste vedere [questo](https://livellosegreto.it/@xabacadabra/110708174321939635)

* Qui invece lo stesso thread su LivelloSegreto: [https://livellosegreto.it/@xabacadabra/110707010542232435](https://livellosegreto.it/@xabacadabra/110707010542232435)

il link diretto sfortunatamente non funziona, perché da quanto vedo [https://mastodon.uno/@xabacadabra@livellosegreto.it/110707010579274088](https://mastodon.uno/@xabacadabra@livellosegreto.it/110707010579274088) reindirizza automaticamente a LivelloSegreto, ovvero l'istanza "madre" del thread stesso (lo so, che mal di testa).

## In soldoni

La mia ipotesi è la seguente: essendo Nikole bandita da mastodon.uno e coinvolta in tutte le successive risposte al thread, **tutta la conversazione è stata automaticamente oscurata dall'istanza dov'è silenziata**.

E questo a prescindere dal fatto che gli altri partecipanti _non risultino silenziati._

## Il client influisce?

[Lorenzo](https://livellosegreto.it/@lsintoni@mastodon.uno), che è utente di mastodon.uno, riesce a visualizzare il thread completo utilizzando il client [Fedilab](https://livellosegreto.it/@apps@toot.fedilab.app)

io utilizzo mastodon solo da browser (firefox sia da PC che da telefono), quindi anche questo aspetto è interessante: forse determinate app "aggirano" i silenziamenti delle istanze? 

Lorenzo del resto può vedere i post di Nikole...ma se i blocchi delle istanze sono aggirabili dai client, la situazione si complica ancora di più!

**Update:** [Lorenzo ha confermato la mia ipotesi](https://livellosegreto.it/@lsintoni@mastodon.uno/110708584486806912), visto che anche lui da browser non riesce a vedere il resto della conversazione dall'intervento di Nikole in poi.

## Considerazioni 

Come detto non date per scontato nulla visto che sto sperimentando io per primo ed è possibilissimo che mi stia sbagliando!

In ogni modo, lasciamo perdere il caso specifico, e vediamolo nell'ottica generale: 

![istanze-ban](/img/mastodon/istanze-ban.jpg)

_lo so faccio schifo coi grafici_

se l'ipotesi è confermata, temo che questa caratteristica possa rappresentare una grossa falla del sistema a istanze di Mastodon, visto che **potrebbe portare alla diffusione di discussioni parziali all'insaputa dei lettori.**

Pensate per esempio ad una conversazione con al centro un tema ben più serio, e che gli utenti di un'istanza avessero accesso solo a una _singola fetta_ dei messaggi!

Non solo: altri magari potrebbero avere accesso alla discussione completa facendosi un'idea precisa della piega presa dal topic, altri ancora potrebbero vedere _un'altra fetta_, diversa dalla prima...

![paperi](/img/mastodon/paperi-1.jpg)

_forse così è più chiaro: la parte in grigio è invisibile a Pippo e Topolino perché Paperoga è silenziato, di conseguenza le risposte che lo coinvolgono sono invisibili (Paperino lo vede perché usa Fedilab oppure sta in un'altra istanza che ho dimenticato di creare)_

Da questo punto di vista, i social commerciali sono paradossalmente meno problematici: se sei bannato, sei bannato per tutti e i post vengono oscurati "democraticamente" a prescindere da chi li sta leggendo.

## Morale

Salvo casi estremi spero che i vari admin stiano attenti a come utilizzano i vari strumenti di moderazione **poiché influiscono sull'intero ecosistema del fediverso**, compresi eventuali utenti "innocenti" che potrebbero doversi ritrovare a fare screenshot / logbook di conversazioni parzialmente oscurate in modo da dimostrare i fatti realmente accaduti per intero.

Del resto, Mastodon a dispetto del nome è ancora un giovincello quindi credo che certi aspetti siano ancora in costante evoluzione.

## Commenti

al solito, threaddino per sentire la vostra e magari chiarirmi un po' le idee (nel caso, vi offro virtualmente una birra!)

<iframe src="https://livellosegreto.it/@xabacadabra/110708655843331564/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://livellosegreto.it/embed.js" async="async"></script>

