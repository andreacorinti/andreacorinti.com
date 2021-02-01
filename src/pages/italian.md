---
title: "Italiano"
description: "Benvenuti nell'angolo italiano, dove tenterò di raccogliere le varie cosacce che ho scritto in giro per il web di cui vado un minimo orgoglioso."
lang: it-IT
---
<main class="tdbc-container">
  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for page in collections.blogita -%}
      <li class="tdbc-card">
        <div class="tdbc-card__content">
          <a href="{{ page.url }}" class="tdbc-card__title">{{ page.data.title }}</a>
          <img :first-child src="{{ page.data.immagine}}" alt="{{ page.data.title }}"></img>
          <time>{{ page.data.date | dateDisplay }}</time>
          <p>{{ page.data.sommario }}</p>
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
</main>