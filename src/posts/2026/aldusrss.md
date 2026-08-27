---
layout: postita
title: "AldusRSS"
subtitle: "Il tuo giornale, composto da te"
sommario: "So che parlare di AI è sempre complicato, e il vibe coding pratica tendenzialmente esecrata (con più di qualche ragione), però ero curioso di provare"
immagine: /img/aldusrss.png
tags: ["internet"]
date: 2026-08-27
lang: it-IT
---

So che parlare di AI è sempre complicato, e il [_vibe coding_](https://it.wikipedia.org/wiki/Vibe_coding) pratica tendenzialmente esecrata (con più di qualche ragione), però ero curioso di provare e rispolverare un vecchio progettino che avevo da anni nel cassetto: 

un semplice programmino per gestire i feed RSS avvicinandolo il più possibile alla lettura di un giornale, senza nessun feed precotto o ciarpame di Google News e affini.

Oltre a questo, notavo che ho smesso di utilizzare ottimi lettori RSS come [NewsFlash](https://apps.gnome.org/it/NewsFlash/) perché il mio OCD rendeva insopportabili tutte le notifiche da articoli "non letti"...

Per intenderci: 

aprendo il feed, più che a leggere gli articoli mi affrettavo a selezionare tutto come già letto (probabilmente lavorando tanto con l'email 'sta cosa è diventata cronica), procedimento che nei fatti smorzava la mia curiosità.

Quindi ho ragionato un po', pensando ai social e quanto molta gente li utilizzi non per tenersi in contatto con le persone ma proprio come fonti d'aggiornamento generiche di ciò che seguono, ovviamente mostrate secondo logiche algoritmico-pubblicitarie brutte e fatte apposta per non far mai uscire l'user dal proprio ecosistema: 

in soldoni, leggi il post dentro facebook, ma il link esterno facebook te lo penalizza perché non vuole che esca da lui (da cui la diffusione di video/immagini/titolacci/flame).

### AldusRSS

Aldus nella mia idea è come la semplice app di un giornale, che però pesca da altri giornali scelti da chi lo utilizza.

Non c'è una divisione per testata, ma per argomento che idealmente pesca da più fonti possibili (anche qui, a descrizione dell'utente finale).

Tutto ovviamente gratuito, opensource e con [licenza MIT](https://github.com/andreacorinti/aldusrss?tab=MIT-1-ov-file) per cui ci si può praticamente far quel che si vuole.

qualche screen:

![Sezione Sport](/img/aldusrss/aldusrss-sport.jpg) ![Sezione Cultura](/img/aldusrss/aldusrss-cultura.jpg)

C'è anche la modalità notte (ovviamente 😌)

![Modalità notte](/img/aldusrss/aldusrss-dark-mode.jpg)

Al momento sto pensandolo principalmente per Android e, aldilà della connessione internet, **non richiede nessun altro tipo di permesso strano e non traccia nulla.**

Il codice sorgente è già pubblico [su GitHub](https://github.com/andreacorinti/aldusrss): 

la pubblicazione su Google Play resta un work in progress (tra revisioni e burocrazie varie di Google che di certo non sono la parte divertente), quindi per ora chi vuole già provarla può scaricare l'APK direttamente dalle [release del repository](https://github.com/andreacorinti/aldusrss/releases).

Ho aperto anche una [pagina progetto](/projects/aldusrss/) qui sul sito, che terrò aggiornata mano a mano che l'app cresce (se lo fa eh!)