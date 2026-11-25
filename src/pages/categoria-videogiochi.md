---
layout: archivio
lang: it-IT
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Video Games - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Video Games{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Post sui videogiochi dal blog di Andrea Corinti / Video game posts from Andrea Corinti's blog - pagina/page {{ pagination.pageNumber | plus: 1 }}.{% else %}Post sui videogiochi dal blog di Andrea Corinti. Video game posts from Andrea Corinti's blog.{% endif %}"
pagination:
    data: collections.videogiochi
    size: 8
    alias: postita
    reverse: true
permalink: "/categoria/videogiochi-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  {% include 'categorie-nav.njk', attivo: 'videogiochi' %}
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
