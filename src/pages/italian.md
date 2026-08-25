---
layout: archivio
lang: it-IT
# Each paginated page (/blog-0/, /blog-1/, ...) rendered with the same
# static title/sommario, which search engines flag as duplicate content
# across ~30 URLs. eleventyComputed re-renders these through the page's
# own (Liquid) engine per pagination instance, so each page gets a
# distinct title/description instead.
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Blog - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Blog{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Tutti i post dal blog di Andrea Corinti - pagina {{ pagination.pageNumber | plus: 1 }}.{% else %}Tutti i post dal blog di Andrea Corinti.{% endif %}"
pagination: 
    data: collections.blog
    size: 8
    alias: postita
permalink: "/blog-{{ pagination.pageNumber }}/"
---

<main class="tdbc-container">
  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for post in postita -%}
      <li class="tdbc-card">
        <div class="tdbc-card__content">
          <a href="{{ post.url }}" class="tdbc-card__title">{{ post.data.title }}</a>
          <img src="{{ post.data.immagine }}" alt="{{ post.data.title }}" {% if forloop.index > 2 %}loading="lazy"{% endif %} decoding="async">
          <time>{{ post.data.date | dateDisplay }}</time>
          <p>{{ post.data.sommario }}</p>
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
  <div id="avanti-indietro">
    {% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">PRECEDENTE&nbsp</a>{% endif %}| 
    {% if pagination.href.next %}<a href="{{ pagination.href.next }}">SUCCESSIVA</a>{% endif %}
   </div>
</main>

