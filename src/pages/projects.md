---
layout: archivio
lang: it-IT
---
<main id="main-content" class="tdbc-container">
  <div class="tdbc-section">

    <h2 class="projects-heading">Progetti personali</h2>
    {%- comment -%} stesse card del blog (_postcard.scss); "progetto" e non
    "page" come variabile, per non coprire la page di Eleventy {%- endcomment -%}
    <ul class="post-grid">
      {%- for progetto in collections.progetti -%}
      <li class="post-card"{% if progetto.data.lang %} lang="{{ progetto.data.lang }}"{% endif %}>
        <div class="post-card__media">
          {% cardImage progetto.data.immagine, progetto.data.title, forloop.index %}
        </div>
        <div class="post-card__body">
          {%- if progetto.data.subtitle %}<p class="post-card__kicker">{{ progetto.data.subtitle }}</p>{% endif %}
          <h2 class="post-card__title"><a href="{{ progetto.data.link | default: progetto.url }}">{{ progetto.data.title }}</a></h2>
          {%- if progetto.data.sommario %}<p class="post-card__summary">{{ progetto.data.sommario }}</p>{% endif %}
        </div>
      </li>
      {%- endfor -%}
    </ul>

    {% include 'work-box.njk' %}
  </div>
</main>
