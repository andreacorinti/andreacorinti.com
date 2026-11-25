---
layout: archivio
lang: it-IT
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Internet - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Internet{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Post su internet e il fediverso dal blog di Andrea Corinti / Posts about the internet and the fediverse from Andrea Corinti's blog - pagina/page {{ pagination.pageNumber | plus: 1 }}.{% else %}Post su internet e il fediverso dal blog di Andrea Corinti. Posts about the internet and the fediverse from Andrea Corinti's blog.{% endif %}"
pagination:
    data: collections.internet
    size: 8
    alias: postita
    reverse: true
permalink: "/categoria/internet-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  {% include 'categorie-nav.njk', attivo: 'internet' %}
  <div class="tdbc-section">
    <ul class="post-grid">
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
