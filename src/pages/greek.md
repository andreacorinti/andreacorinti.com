---
layout: archivio
lang: el
---
<main class="tdbc-container">
  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for page in collections.bloggr -%}
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