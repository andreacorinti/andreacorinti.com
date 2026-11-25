---
avatar: img/avatar3.jpg
layout: home.njk
sommario: "La casa digitale di Andrea Corinti (Xab), freelance di contenuti e supporto e-learning e Italian Web World Citizen: blog, progetti e link sparsi, come se fossimo nel 2003."
lang: it-IT
---

<img src="/img/gardenight2.gif" alt="gardenight" width="760" height="223">

Benvenuti nella casa digitale di [Andrea Corinti](/about), dove archivia ciò che scrive e combina in giro per la rete come se fossimo nel 2003.

<p class="tdbc-ink--gray" lang="en"><small>Mostly writing in Italian around here. English readers: <a href="/en/about/" hreflang="en">here's who I am</a> and <a href="/categoria/english-0/">what I write in English</a>.</small></p>

Questo, per esempio, è l'ultimo post del suo blog:

{%- set latest = collections.latestPost | first -%}
{%- set latestEn = latest.data.lang and latest.data.lang.startsWith('en') %}

{#- categoria = primo tag che non sia "english" (in Nunjucks un set dentro un for non esce dal ciclo) #}
{%- set latestCat = latest.data.tags | reject("equalto", "english") | first %}
{%- if not categorie[latestCat] %}{% set latestCat = '' %}{% endif %}

{#- stessa card degli archivi (_postcard.scss), in versione orizzontale #}
<ul class="post-grid post-grid--featured">
<li class="post-card post-card--featured{% if latestCat %} cat-btn--{{ latestCat }}{% endif %}"{% if latestEn %} lang="en"{% endif %}>
<div class="post-card__media">{% cardImage latest.data.immagine, latest.data.title, true %}{% if latestEn %}<span class="post-card__flag" lang="en"><span aria-hidden="true">🇬🇧</span>English</span>{% endif %}</div>
<div class="post-card__body">
<div class="post-card__meta">{% if latestCat %}<span class="post-card__cat">{{ categorie[latestCat] }}</span>{% endif %}<time>{% if latestEn %}{{ latest.data.date | dateDisplay('en-US') }}{% else %}{{ latest.data.date | dateDisplay }}{% endif %}</time></div>
<h2 class="post-card__title"><a href="{{ latest.url }}"{% if latestEn %} hreflang="en"{% endif %}>{{ latest.data.title }}</a></h2>
<p class="post-card__summary">{{ latest.data.sommario }}</p>
</div>
</li>
</ul>

{% include 'social.njk' %}

Qui [**il mio listone di siti belli**](/bookmarks/) (in perpetuo aggiornamento)

<a href="https://blogroll.it/"><img src="https://blogroll.it/banner-dark.gif" alt="Questo sito è su blogroll.it" width="88" height="31"></a>

<a href="https://app.netlify.com/sites/andreacorinti/deploys"><img src="https://api.netlify.com/api/v1/badges/2ce83520-1a8d-4e99-b17c-84de26b48a13/deploy-status" alt="Netlify Status" width="118" height="20"></a>

