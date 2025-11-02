---
avatar: img/avatar3.jpg
layout: home.njk
sommario: "Homepage of Andrea Corinti (Xab), Web Editor and Italian Web World citizen."
lang: it-IT
---

![gardenight](/img/gardenight2.gif)

Benvenuti nella casa digitale di [Andrea Corinti](/about) dove archivia ciò che scrive e combina in giro per la rete come se fossimo nel 2003.

Questo, per esempio, è l'ultimo post del suo blog:

{%- set latest = collections.blog | first -%}

<h2>{{ latest.data.title}}</h2>
<h3><time>{{ latest.data.date | dateDisplay }}</time></h3>

{{ latest.data.sommario }}... 

[*continua a leggere*]({{ latest.url }})

{% include 'social.njk' %}

[![Netlify Status](https://api.netlify.com/api/v1/badges/2ce83520-1a8d-4e99-b17c-84de26b48a13/deploy-status)](https://app.netlify.com/sites/andreacorinti/deploys)
