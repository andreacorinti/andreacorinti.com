---
layout: archivio
lang: it-IT
---
<main class="tdbc-container">
  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for page in collections.progetti -%}
      <li class="tdbc-card">
        <div class="tdbc-card__content">
          <a href="{{ page.url }}" class="tdbc-card__title">{{ page.data.title }}</a>
          <img :first-child src="{{ page.data.immagine}}" alt="{{ page.data.title }}"></img>
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
</main>