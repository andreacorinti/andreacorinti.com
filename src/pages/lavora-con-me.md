---
layout: page
lang: it-IT
title: Lavora con me
description: "Siti piccoli, veloci e senza fronzoli, fatti con 11ty."
seoTitle: "Siti web veloci e leggeri con 11ty"
sommario: "Realizzo siti statici con 11ty per blogger, professionisti e piccole attività: veloci, sicuri, perfetti da telefono, senza database né plugin da aggiornare. Prezzi chiari e preventivo gratuito."
translation: /work-with-me/
permalink: /lavora-con-me/
ogImage: /img/og-lavora-con-me.jpg
ogImageAlt: "Lavora con me: siti veloci e leggeri con 11ty, andreacorinti.com, con uno screenshot della home del sito"
---

{% include 'work-status.njk' %}

Scrivo su un blog da più di dieci anni e da anni lavoro nell'e-learning, come web editor e nel supporto tecnico. Nel frattempo ho imparato a costruire siti piccoli, veloci e senza fronzoli, come questo che stai leggendo. Lavoro in italiano, inglese e spagnolo.

## Perché un sito statico

Fa per te se sei un blogger, un professionista o una piccola attività e vuoi un sito veloce e leggero, senza database né plugin da tenere aggiornati. Un sito statico è fatto di pagine già pronte, e in pratica vuol dire che:

<ul class="work-features">
  <li><strong>Veloce</strong> Si carica in un attimo, anche dal telefono con poco campo.</li>
  <li><strong>Fatto per il telefono</strong> Si legge bene su smartphone, tablet e computer, senza zoom né menu impazziti.</li>
  <li><strong>Sicuro e tranquillo</strong> Niente database né plugin: meno cose da attaccare, niente aggiornamenti continui.</li>
  <li><strong>Hosting gratuito</strong> Su servizi come Netlify o Cloudflare Pages: paghi il sito, non l'affitto del server.</li>
</ul>

## La prova: questo sito

Questo sito è fatto con 11ty, sta su Netlify e il [codice è su GitHub](https://github.com/andreacorinti/andreacorinti.com). [Speedlify](https://www.speedlify.dev/) lo misura ogni settimana con Lighthouse in modalità mobile, insieme a più di mille siti fatti con 11ty:

{% assign sl = meta.work.speedlify %}
<figure class="work-scores">
  <ul class="work-scores__list">
    <li style="--tdbc-score: {{ sl.perf }}"><span class="work-scores__num">{{ sl.perf }}</span> Prestazioni</li>
    <li style="--tdbc-score: {{ sl.a11y }}"><span class="work-scores__num">{{ sl.a11y }}</span> Accessibilità</li>
    <li style="--tdbc-score: {{ sl.best }}"><span class="work-scores__num">{{ sl.best }}</span> Buone pratiche</li>
    <li style="--tdbc-score: {{ sl.seo }}"><span class="work-scores__num">{{ sl.seo }}</span> SEO</li>
  </ul>
  <figcaption>Misurazione del {{ sl.date }}: n. {{ sl.rank }} su {{ sl.total }} siti. <a href="{{ sl.url }}">Tutti i dati su Speedlify</a></figcaption>
</figure>

## Cosa include

<ul class="work-checklist">
  <li>design semplice, leggibile e attento all'accessibilità</li>
  <li>versione per smartphone e tablet</li>
  <li>tema chiaro e scuro</li>
  <li>SEO di base: titoli, descrizioni, anteprime per i social e sitemap</li>
  <li>feed RSS, se ti serve</li>
  <li>link ai tuoi profili social</li>
  <li>messa online, dominio compreso</li>
  <li>una breve guida per aggiornarlo da solo</li>
</ul>

## Prezzi

<div class="work-prices">
  <div class="work-price">
    <p class="work-price__name">Blog o sito personale</p>
    <p class="work-price__what">fino a circa 5 pagine</p>
    <p class="work-price__amount"><span>da</span> {{ meta.work.prices.blog }} €</p>
  </div>
  <div class="work-price">
    <p class="work-price__name">Sito vetrina</p>
    <p class="work-price__what">per un professionista o una piccola attività</p>
    <p class="work-price__amount"><span>da</span> {{ meta.work.prices.vetrina }} €</p>
  </div>
</div>

- **Hosting**: gratuito.
- **Dominio**: me ne occupo io e resta intestato a te. Registrazione e rinnovo sono inclusi fino a {{ meta.work.prices.domainMax }} € l'anno (il primo anno nel prezzo del sito, poi nell'assistenza): per domini più costosi la differenza la vediamo insieme.
- **Assistenza base**: da {{ meta.work.prices.support }} €/mese, fatturata a trimestre o ad anno. Controllo, aggiornamenti tecnici e piccole modifiche, fino a circa un'ora al mese.
- **Aggiornamento contenuti**: da {{ meta.work.prices.content }} €/mese, circa 3-5 ore al mese tra nuove pagine, testi e immagini.

Preventivo gratuito, prezzi esatti dopo una chiacchierata.

## Come funziona

<ol class="work-steps">
  <li>Mi scrivi e mi racconti cosa ti serve.</li>
  <li>Facciamo due chiacchiere e ti mando un preventivo chiaro.</li>
  <li>Il sito va online e, se vuoi, ti seguo anche dopo.</li>
</ol>

<div class="work-cta">
  <p class="work-cta__title">Hai in mente un sito?</p>
  <p><a class="cat-btn work-box__btn" href="/contact/">Scrivimi <span aria-hidden="true">→</span></a></p>
  <p class="work-cta__note">Se prima vuoi sapere chi sono, c'è la pagina <a href="/about/">chi sono</a>.</p>
</div>

{% comment %} TODO: confermare la formula esatta con il commercialista, poi togliere il commento:
<small>Regime forfettario: operazione senza IVA.</small>
{% endcomment %}
