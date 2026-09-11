---
layout: postita
title: "Morrowind con la mod list Total Overhaul, su Linux Mint"
subtitle: "Note sparse sull'installazione automatica via OpenMW + umo"
sommario: "Piccola guida su come ho installato la mod list \"Total Overhaul\" di modding-openmw.com su Linux Mint, con la versione Steam di Morrowind, i problemi incontrati con gli AppImage e qualche dritta finale sul post processing."
immagine: /img/openMW/screenshot001.jpg
tags: ["videogiochi"]
date: 2026-09-11
lang: it-IT
translation: /posts/morrowind-total-overhaul-linux/
---

Visto che lo scorso agosto il meraviglioso progettone [Tamriel Rebuilt](https://www.tamriel-rebuilt.org/) ha rilasciato [_Poison Song_](https://www.tamriel-rebuilt.org/content/poison-song-released), ci sono cascato di nuovo come l'ultimo degli Achille Lauro: 

ciciclacmente mi sale la voglia improvvisa di tornare a Vvardenfell, e stavolta per comodità ho voluto provare la mod list **"Total Overhaul"** di [modding-openmw.com](https://modding-openmw.com/), il tier più pesante della loro guida (grafica, gameplay, UI, tutto quanto sopra OpenMW).

La cosa comoda è che modding-openmw.com ha una [guida automatica dedicata a Linux](https://modding-openmw.com/guides/auto/total-overhaul/linux#install-openmw), non un adattamento fatto in casa da una guida pensata per Windows: 

il grosso lavoro lo fanno due tool a riga di comando, **umo** (scarica e sincronizza la mod list da Nexus) e **MOMW Configurator** (genera l'ordine di caricamento, unisce i plugin, builda la navmesh). In teoria bastano quattro comandi. In pratica qualche inciampo l'ho trovato comunque, segnato qui sotto.

Setup di partenza: Linux Mint, Morrowind versione **Steam**, nessun uso di Wine o Lutris per l'installazione del gioco in sé perché OpenMW è già nativo su Linux.

![Cielo stellato moddato su Morrowind, visibile di notte](/img/openMW/screenshot012.jpg)

(Linux Mint è una derivata di Ubuntu e quindi Debian, perciò dovrebbe funzionare tutto allo stesso modo per tutte le distro parenti)

### 1. OpenMW: AppImage, non Flatpak

La guida consiglia esplicitamente di scaricare l'ultima versione stabile tramite tarball ufficiale o AppImage (motore, launcher, INI Importer, Navmeshtool), evitando la versione Flatpak. 

Ovviamente, _io avevo il Flatpak installato_ da un tentativo precedente quindi è toccato rimuoverlo prima di scaricare gli AppImage in:

```bash
~/Scaricati/Giochi/Morrowind/OpenMW_AppImages_0.51.0/
```

### 2. Il primo inciampo: file "sbagliati" secondo umo

![Facendo i bulli indoril](/img/openMW/screenshot009.jpg)

Al momento di puntare umo/MOMW Configurator ai singoli eseguibili, ad esempio:

```bash
openmw-iniimporter
openmw-navmeshtool
```

il tool si rifiutava di riconoscerli, dando errore tipo:

```bash
the given file does not seem to be an actual file
```

Il primo sospetto (un residuo della vecchia installazione Flatpak) era sbagliato. Le cause vere erano due, banali ma non ovvie:

- il browser aveva scaricato i file **senza estensione** in fondo al nome:

  ```bash
  .AppImage
  ```

  quindi andavano rinominati a mano prima di dare:

  ```bash
  chmod +x *.AppImage
  ```

- incollando il percorso mi era scappato un backslash in stile Windows:

  ```bash
  \
  ```

  invece dello slash di Linux:

  ```bash
  /
  ```

  che ovviamente il terminale non digerisce

Sistemati questi due dettagli, i tool hanno iniziato a riconoscere gli eseguibili senza problemi.

### 3. Cartella mod e download con umo

Per il percorso della cartella base mod, entrambi i tool vogliono la cartella "contenitore", non quella della lista specifica: quindi se creo:

```bash
~/Scaricati/Giochi/Morrowind/OpenMWMods/
```

ci penseranno loro a creare dentro la sottocartella:

```bash
total-overhaul/
```

non va indicata a mano.

Fatto il login a Nexus Mods con:

```bash
./umo setup
```

il download vero e proprio parte con:

```bash
./umo install --sync total-overhaul
```

Senza Nexus Premium bisogna cliccare manualmente "Slow Download" nel browser per ogni mod che si apre, ed è normale che ogni tanto il processo si blocchi con una sequela di errori tipo:

```bash
(42, 'Callback aborted')
```

Basta interrompere con Ctrl+C e rilanciare lo stesso comando: riprende da dove si era fermato senza riscaricare quello che c'è già.

Siccome tra le varie mod del paccone ci sono diversi mattoni, io ho fatto la prova gratuita di Nexus Premium per fare prima (poi subito annullata perché tanto, a parte Morrowind, oramai al massimo lo uso giusto per _Daggerfall Unity_ che ha generalmente mod leggere)

### 4. La configurazione: MOMW Configurator

Con tutte le mod scaricate, la generazione dell'ordine di caricamento è un comando solo, lanciato dalla cartella del MOMW Tools Pack:

```bash
./momw-configurator-linux-amd64 config --verbose --run-navmeshtool --run-validator total-overhaul
```

Durante l'esecuzione compaiono un po' di warning da Delta Plugin, tipo:

```bash
Records of type: "LUAL" are not yet supported and will be skipped
```

...ma ono normali (riguardano feature Lua recenti che il merge-tool si limita a saltare).

### 5. Il launcher mostra mod deselezionate: è normale

Finita la configurazione, il launcher grafico di OpenMW mostra parecchie voci senza spunta e qualche punto esclamativo nella scheda Content Files. 

Sembra rotto, ma non lo è: OpenMW in questo scenario non legge le spunte del launcher, legge direttamente:

```bash
openmw.cfg
```

dove MOMW Configurator ha già scritto le righe corrette:

```bash
data=
content=
```

(comprese le patch opzionali e i plugin mutuamente esclusivi lasciati fuori di proposito). 

Il launcher mostra semplicemente tutto quello che sta nella cartella mod gestita da umo, attivo o meno che sia nel:

```bash
.cfg
```

Se in futuro c'è il dubbio che qualcosa non sia andato a buon fine, si può rilanciare tranquillamente lo stesso comando:

```bash
momw-configurator
```

e si riscrive la configurazione da capo.

### 6. Problema: la notte è _troppo_ buia!

Scelta di design abbastanza nota di Morrowind moddato pesante: di notte si vede pochissimo, come nello screenshot qui sotto (credo sia True Nights?)

![Vicolo buio di Old Ebonheart di notte, quasi illeggibile senza aggiustare l'esposizione](/img/openMW/screenshot007.jpg)

Per risolvere non serve uno script, la lista Total Overhaul porta già dietro gli shader di post processing di OpenMW:

- in gioco, tasto **F2** per aprire il pannello dei post-processori
- spostare la voce **adjustments** (HDR/adaption) dalla colonna di sinistra a quella di destra per attivarla
- da lì, i cursori di esposizione permettono di schiarire un po' le ore notturne senza stravolgere il resto della resa visiva 

è un po' complicato perché le notti buie creano immersione e un utilizzo ben più importante di torce o magie, però per praticità consiglio di aumentare l'esposizione e non impazzire.

Tutto sommato, a parte i due dettagli sugli AppImage o le lentezze di Nexus, il processo si è rivelato via via più semplice di quanto temessi: 

un merito soprattutto di umo e MOMW Configurator, che si occupano loro dell'ordine di caricamento e dei merge!

![Scampagnata sulla Red Mountain](/img/openMW/screenshot013.jpg)
