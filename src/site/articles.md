---
title: Articles
subtitle: Work in Progress!
layout: layouts/base.njk
---


### [🇮🇹 Clicca qui per gli articoli in Italiano](/articoli)

<section class="cards">
  {%- for page in collections.articles -%}
  <article class="card">
    <p class="data-archivio">{{ page.date | dateDisplay }}</p>
    <a href="{{ page.url }}"><!--post link--> 
      <!--immagine-->
      <picture class="thumbnail">
        <img src="{{ page.data.immagine }}" alt, title="{{ page.data.title }}" class="img-archivio">
      </picture>
      <!--titolo e sommario-->
      <div class="card-content">
      <h2>{{ page.data.title }}</h2>
      <p>{{ page.data.sommario }}</p>
      </div>
    </a><!--post link-->
  </article>
  {%- endfor -%}
</section>