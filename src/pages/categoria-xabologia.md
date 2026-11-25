---
layout: archivio
lang: it-IT
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Xabologia - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Xabologia{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Post personali, di vita e sul blog stesso / Personal posts, about life and this blog - pagina/page {{ pagination.pageNumber | plus: 1 }}.{% else %}Post personali, di vita e sul blog stesso. Personal posts, about life and this blog.{% endif %}"
pagination:
    data: collections.xabologia
    size: 8
    alias: postita
    reverse: true
permalink: "/categoria/xabologia-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  {% include 'categorie-nav.njk', attivo: 'xabologia' %}
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
