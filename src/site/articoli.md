---
title: 🇮🇹 Articoli
subtitle: in italiano
layout: layouts/ita.njk
---

## Mamma mia!

Piccolo archivio dove tento di raccogliere tutte le varie cosacce che ho scritto in giro nel web (soprattutto nel mio vecchio blog **Xaba Cadabra**) di cui vado un minimo orgoglioso.

<ul class="listing">
{%- for page in collections.articles -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
