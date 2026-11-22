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

<div{% if latestEn %} lang="en"{% endif %}>
<h2>{{ latest.data.title }}{% if latestEn %} <small lang="it" class="tdbc-ink--gray">(in inglese 🇬🇧)</small>{% endif %}</h2>
<h3><time>{% if latestEn %}{{ latest.data.date | dateDisplay('en-US') }}{% else %}{{ latest.data.date | dateDisplay }}{% endif %}</time></h3>
<p>{{ latest.data.sommario }}...</p>
</div>

[*continua a leggere*]({{ latest.url }})

{% include 'social.njk' %}

Qui [**il mio listone di siti belli**](/bookmarks/) (in perpetuo aggiornamento)

<a href="https://blogroll.it/"><img src="https://blogroll.it/banner-dark.gif" alt="Questo sito è su blogroll.it" width="88" height="31"></a>

<a href="https://app.netlify.com/sites/andreacorinti/deploys"><img src="https://api.netlify.com/api/v1/badges/2ce83520-1a8d-4e99-b17c-84de26b48a13/deploy-status" alt="Netlify Status" width="118" height="20"></a>

