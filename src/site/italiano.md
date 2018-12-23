---
title: 🇮🇹 Archivio
subtitle: in italiano
layout: layouts/base.njk
---
<div lang="it-IT" xml:lang="it-IT">

## Mamma mia!

Benvenuti nell' **angolo italiano**, dove tenterò di raccogliere le varie cosacce che ho scritto in giro per il web di cui vado un minimo orgoglioso.

## Articoli in Italiano

<div class="flex-container">
{%- for page in collections.articoli -%}
<div class="card">
  <div class="card-header">{{ page.data.title }}</div>
  <div class="card-main">
    <a href="{{ page.url }}">
    <img src="{{ page.data.immagine }}" alt="{{ page.data.title }}" title="{{ page.data.title }}" class="img-archivio"></a>
    <div class="main-description">{{ page.data.sommario }}</div>
  </div>
  <div class="card-date">{{ page.data.date | dateDisplay }}</div>
</div>
{%- endfor -%}
</div>

</div>
