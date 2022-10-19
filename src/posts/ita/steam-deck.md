---
title: "Steam Deck: prime impressioni e primi troubleshooting"
subtitle: "Un mini PC per smanettoni"
sommario: "Il 14/10 mi è arrivata la Steam Deck e, più che a giocarci, confesso che ho cominciato subito a smanettarci..."
immagine: /img/steamdeck.jpg
date: 2022-10-17
lang: it-IT
---

Il 14/10 mi è arrivata la Steam Deck (ordinata il 7/10, una settimana giusta): più che a giocarci, confesso che ho cominciato subito a smanettarci come un canguro idrofobo.

E sì, lo so, per chi ha scritto [_Giochi Troppo!_](https://www.amazon.it/gp/product/B0B9LNVLCH/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1) comprarsela è un controsenso, ma la macchina di Valve sembrava fatta apposta per me e (mi sento di confermarlo) quindi, appena le spedizioni si sono fatte più rapide, non ho potuto resistere.

## La mia Deck 

Ho optato per la 258 Giga (versione intermedia) e ci ho immediatamente montato sopra questa SSD da 512 Giga:

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-eu.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=xabacadabra-21&language=it_IT&o=29&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B09D3LP52K&linkId=2852e0e84fab853145485295ce214d4b"></iframe>

Per ora, gira perfettamente (l'ho presa soprattutto  per il discorso emulazione).

Grazie al prime day me la sono potuta accaparrare con 47 euro, quindi tenete d'occhio i periodi di sconti come il prossimo black friday.

## Problemi da installazione / aggiornamento / Wi-Fi 

Essendo abituato agli OS Linux, un po' di menate le preventivavo:

al primo avvio, complice l'orrida connessione Wi-fi che mi ritrovo al momento (ciao Eolo), ho dovuto sfruttare **l'hotspot del cellulare** per effettuare i primi aggiornamenti di rito (c'è voluto un botto, purtroppo stare in un paesello di montagna non aiuta).

Può capitare anche che l'aggiornamento s'interrompa ad **un secondo dalla fine**, la soluzione sembra essere un reboot **tenendo premuto per 10 secondi il tasto d'accensione**.

Se masticate l'inglese, consiglio assolutamente di bazzicare su [questo thread di reddit](https://www.reddit.com/r/SteamDeck/comments/t4x2q6/steamdeck_setup_stuck_at_1_second_remaining_for/) per maggiori informazioni, oltre che ovviamente tartassare il supporto tecnico di Valve e le discussioni su Steam.

Una volta superato il primo avvio, tutto diventa più gestibile perché si può accedere alla **modalità desktop**, ovvero un PC linux in ambiente grafico KDE (una specie di kubuntu diciamo, anche se le ultime versioni di SteamOS sono basate su Arch Linux).

## Wi-Fi maledetta

Il discorso wi-fi purtroppo resta uno dei tasti dolenti della Deck: 

un modo per risolvere diversi guai, specialmente il download lento, è attivare la modalità sviluppatore dalle impostazioni e **disattivare il risparmio energetico della connessione wi-fi**.

La situazione migliora **ma non aspettatevi miracoli**, specialmente se non avete una connessione di tutto rispetto (e in Italia purtroppo fuori dalle città è più che scontato).

A parte il discorso streaming, multiplayer e cloud gaming, Il wi-fi è cruciale anche per il semplice scambio di file tra PC e Deck, che ho testato in questi modi: 

- [Winpinator e Warpinator](https://winpinator.swisz.cz/), molto immediato ma non proprio il massimo secondo me
- WinSCP e SSH, che preferisco di gran lunga ([qui una buona video guida](https://www.youtube.com/watch?v=Cb1U0_KbtLQ)) anche perché lo uso già per lavoro (anche Filezilla o qualsiasi software per FTP dovrebbe andare benissimo)
- [Questa chiavetta USB-C](https://amzn.to/3yIFD1G) che mi ha permesso di salvare un sacco di tempo con i file più ciccioni

Comunque, se avete in casa la fibra e la vostra connessione mantiene le promesse, non dovreste avere problemi.

## Batteria

Qui me lo aspettavo, e confermo un po' tutto quello che si dice in giro dalla sua uscita: 

**la batteria della Deck dura un generico paio d'ore** variabili a seconda di quello che state facendo girare: 

Cemu con Zelda: Breath fo Wild per esempio ciuccia parecchio visto che sta emulando un sistema bello pesante (stesso discorso per i giochi di ultima generazione di Steam), l'emulazione di uno Snatcher su SegaCD invece garantisce decisamente molto più tempo di gioco.

Per me non è un grosso problema visto che sono abituato a giocare con laptop da diversi anni, e il discorso batteria è sempre il medesimo...ma **c'è da dire che la Deck ci mette davvero tanto per caricarsi al 100%**, parecchio di più di quanto impieghi il mio ASUS TUF.

## Form factor

Ero molto diffidente a questo proposito, ma mi sono dovuto ricredere: certo è un padellone gigante del tutto diverso dalla comoda Switch, eppure giocandoci la trovo molto più leggera e meno ingombrante di quel che potrebbe sembrare (l'ingombro in compenso lo senti tutto quando la provi a mettere in uno zaino).

Visto che _le dimensioni contano_, devo dire che quanto si perde in comodità da trasporto lo si guadagna in comodità da controlli: io sono un gigante con delle manoni non indifferenti e mi trovo spesso malissimo con joypad/console portatili (specie per i trigger dorsali), con la Deck invece ho trovato qualcosa perfettamente su misura per la mia stazza.

Di sicuro un ragazzino, una ragazza o comunque qualcuno con mani più piccole potrebbe trovarsi male (ora sapete come mi sento io con la Switch, ha!)

## Emudeck 

![emu-deck](https://www.emudeck.com/img/emulators.jpg)

[Qui un videotest con Mario Kart 8 Deluxe utilizzando Yuzu](https://t.me/xabacadabra/156)

Di gran lunga il valore aggiunto del piccolo computer di Valve, [Emudeck](https://www.emudeck.com/) semplifica enormemente il discorso emulazione garantendo un supporto eccezionale per una miriade di sistemi.

L'installazione è semplicissima ma anche qui non sono mancati i problemini, legati quasi sempre alla connessione: ho dovuto reimpostare i DNS e disabilitare l'IPv6 per far partire lo script di Emudeck.

Nel caso doveste riscontrare particolari difficoltà, consiglio un salto [sul server Discord degli sviluppatori](https://discord.com/invite/b9F7GpXtFP): sono gentilissimi e rispondono subito! Altrimenti chiedete pure nel thread del mio canale telegram linkato qui sotto.

Tenete comunque conto che Emudeck è un po' un "coordinatore" o meglio ancora un configuratore degli emulatori più disparati, se Citra, Yuzu o PCSX2 vi danno problemi consiglio di fare una capatina su reddit o nei vari siti delle relative community. 

## Considerazioni 

Si conferma un aspetto che già intuivo prima dell'acquisto: **Steam Deck è una macchina per smanettoni, non adatta a chi cerca il plug & play da console - Nintendo Switch in primis**.

Personalmente ho una buona esperienza di queste cose (lavoro nel supporto tecnico da circa quattro anni e smanetto con i PC da venti o più) perciò ho trovato il mio pane per tutto quello che concerne il discorso emulazione, tweak eccetera...ma per chi cerca qualcosa che garantisca una veloce e rapida esperienza di gioco non credo non rappresenti il dispositivo adeguato.

Di sicuro i PC gamer si sentiranno abbastanza a casa, ma non è da esculdere che chi è abiutato all'ambiente Windows possa sentirsi un po' spaesato (personalmente KDE e avere un terminale in bash sottomano mi manda in brodo di giuggiole, ma non fate caso a me).

## Vale la pena comprarla? 

### Sì se:

- Avete poco spazio in casa e nessuna console / PC di ultima generazione
- Vi spostate/traslocate spesso
- Non vi spaventa dover dipendere dall'alimentatore
- Avete una libreria Steam sconfinata
- Siete abbastanza smanettoni, ma privi di un PC "dedicato" al gaming abbastanza potente
- Vi piace il retrogaming e vi attizza l'idea di giocare sullo stesso hardware roba che spazia dal Super Nintendo alla PlayStation 3, passando per MSX, Sega Saturn o Dreamcast

### No se:

- Volete giocare senza tante menate
- Cercate una console per giocare in viaggio
- Siete abbastanza casalinghi e avete già una console / PC di ultima generazione
- Puntate ad esclusive particolari

## Competitor

Nonostante la Deck possa emularla alla grande, **una Nintendo Switch Lite nel suo ambito resta tuttora imbattibile e perfetta**, anche se con un hardware ormai osboleto, giochi davvero troppo costosi e un sistema "chiuso" come da tradizione Nintendo...però con una filosofia dietro che la rende un prodotto davvero universale e bello da possedere per chiunque. 

Per i più smanettoni, una delle retroconsole cinesi (come la ventura **Ayn Loki**) potrebbero stuzzicare l'appetito per giocare nel campionato di Deck, ma onestamente considerando il supporto e la community che la macchina di casa Valve si porta dietro secondo me puntare al mercato cinese per l'alta gamma non ha davvero senso.

Diversa storia per le retroconsole, significativamente più economiche, con un form factor invitante (spesso mutuato dalla perfezione Switch) e l'aspetto streaming da non sottovalutare: 

a tal proposito, se avete già un buon PC o una console, valuterei la **retroid pocket 3**.

## Conclusioni

Per me e per le mie esigenze, è semplicemente perfetta. Certo il discorso batteria e i problemini di configurazione da linux non favoriscono la digestione, ma personalmente sono più che rodato in questo senso e tutti i lati positivi superano nettamente quelli negativi.

Complimenti a Valve, che per una volta sembra davvero aver fatto centro anche in ambito hardware!

## Commenti Telegram

<script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-post="xabacadabra/157" data-width="100%"></script>