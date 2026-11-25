---
layout: archivio
lang: it-IT
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Music - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Music{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Post sulla musica dal blog di Andrea Corinti / Music posts from Andrea Corinti's blog - pagina/page {{ pagination.pageNumber | plus: 1 }}.{% else %}Post sulla musica dal blog di Andrea Corinti. Music posts from Andrea Corinti's blog.{% endif %}"
pagination:
    data: collections.musica
    size: 8
    alias: postita
    reverse: true
permalink: "/categoria/musica-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  {% include 'categorie-nav.njk', attivo: 'musica' %}
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
