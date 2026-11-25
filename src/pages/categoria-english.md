---
layout: archivio
lang: en-US
feedEn: true
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}English - page {{ pagination.pageNumber | plus: 1 }}{% else %}English{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Posts in English from Andrea Corinti's blog - page {{ pagination.pageNumber | plus: 1 }}.{% else %}Posts in English from Andrea Corinti's blog.{% endif %}"
pagination:
    data: collections.english
    size: 8
    alias: posteng
    reverse: true
permalink: "/categoria/english-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  {% include 'categorie-nav.njk', attivo: 'english' %}
  <div class="tdbc-section">
    <ul class="post-grid">
      {%- for post in posteng -%}
      {% include 'post-card.njk', post: post, indice: forloop.index, bandierina: false %}
      {%- endfor -%}
    </ul>
  </div>
  <div id="avanti-indietro">
    {% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">PREVIOUS&nbsp</a>{% endif %}| 
    {% if pagination.href.next %}<a href="{{ pagination.href.next }}">NEXT</a>{% endif %}
   </div>
</main>
