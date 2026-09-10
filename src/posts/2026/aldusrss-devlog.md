---
layout: postita
title: "AldusRSS, un giro di aggiornamenti"
subtitle: "Fix, test automatici e una candidatura a F-Droid"
sommario: "Piccolo devlog su cosa è successo ad AldusRSS nelle ultime due settimane: qualche fix, i primi test automatici e la sottomissione a F-Droid."
immagine: /img/aldusrss.png
tags: ["internet"]
date: 2026-09-10
lang: it-IT
---

Da quando ho [presentato AldusRSS](/posts/aldusrss/) e [parlato di RSS in generale](/posts/rss-spiegato/) è passato un po' di tempo, e nel frattempo il progettino non è rimasto fermo!

Piccolo giro di aggiornamenti, giusto per tenere traccia:

### I fix

Niente di eclatante, la solita manutenzione da "app usata sul serio tutti i giorni":

- la freccia indietro su Android chiudeva l'app invece di farti tornare dall'articolo alla lista (fastidiosissimo, sistemato)
- alcune immagini rotte (tipo quelle di GameSurf) mostravano la classica iconcina rotta del browser invece di sparire pulite
- apostrofi e virgolette tipografiche di certe fonti (Il Messaggero su tutte) venivano mostrati come "?"
- la discovery di un feed si arrendeva troppo presto se la sola home del sito non era raggiungibile, anche quando il feed vero e proprio lo era
- l'avviso "nessun articolo recente" era tarato troppo stretto, ora considera 90 giorni prima di allarmarsi

### Sotto il cofano

- ho aggiunto test automatici (Vitest) e una CI su GitHub Actions, così ogni push viene almeno un minimo verificato invece di fidarmi ciecamente
- diviso il vecchio `App.jsx` monolitico in moduli più piccoli, con un error boundary per non far crashare tutto se qualcosa va storto
- aggiunto l'import da file OPML nella scheda Feed, utile se arrivi da un altro lettore e non vuoi reinserire tutte le fonti a mano
- qualche fonte in più nel pacchetto "Fonti in inglese" (pescate dai bookmark pubblici), tolta una che non tirava fuori granché

### La novità: candidatura a F-Droid

Questa è quella più corposa: ho aperto una merge request per far entrare AldusRSS nel repository ufficiale di [F-Droid](https://f-droid.org/), lo store di app Android solo open source, senza servizi Google e con criteri piuttosto rigidi su privacy e tracciamento.

Dato che AldusRSS non ha mai avuto nulla del genere (niente Play Services, niente analytics, giusto il permesso di internet per scaricare i feed), il grosso del lavoro è stato scrivere la "ricetta" di build che permette ai server di F-Droid di compilare l'app da soli, partendo dal solo codice sorgente, senza fidarsi di un APK che gli passo io.

La pipeline di verifica è verde, ora la MR è in coda per la review dei maintainer: se e quando verrà accettata, AldusRSS si aggiungerà a GitHub Releases (e alla futura pubblicazione su Play Store, ancora in corso) come terza via per installarla, forse la più adatta a chi di questi store si fida meno.

Continuo a tenere aggiornata la [pagina progetto](/projects/aldusrss/) mano a mano che le cose si muovono.
