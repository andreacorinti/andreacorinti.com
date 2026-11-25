---
layout: archivio
lang: it-IT
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Film, Serie & Fumettame - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Film, Serie & Fumettame{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Post su film, serie tv, anime e fumetti dal blog di Andrea Corinti - pagina {{ pagination.pageNumber | plus: 1 }}.{% else %}Post su film, serie tv, anime e fumetti dal blog di Andrea Corinti.{% endif %}"
pagination:
    data: collections["film-serie"]
    size: 8
    alias: postita
    reverse: true
permalink: "/categoria/film-serie-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  {% include 'categorie-nav.njk', attivo: 'film-serie' %}
  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for post in postita -%}
      {% include 'post-card.njk', post: post, indice: forloop.index, bandierina: true %}
      {%- endfor -%}
    </ul>
  </div>
  <div id="avanti-indietro">
    {% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">PRECEDENTE&nbsp</a>{% endif %}| 
    {% if pagination.href.next %}<a href="{{ pagination.href.next }}">SUCCESSIVA</a>{% endif %}
   </div>
</main>
