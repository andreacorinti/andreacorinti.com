---
layout: archivio
pagination: 
    data: collections.blogeng
    size: 8
    alias: posteng
permalink: "/english-{{ pagination.pageNumber }}/"
---

<main class="tdbc-container">
  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for post in posteng -%}
      <li class="tdbc-card">
        <div class="tdbc-card__content">
          <a href="{{ post.url }}" class="tdbc-card__title">{{ post.data.title }}</a>
          <img :first-child src="{{ post.data.immagine}}" alt="{{ post.data.title }}"></img>
          <time>{{ post.data.date | dateDisplay }}</time>
          <p>{{ post.data.sommario }}</p>
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
  <div id="avanti-indietro">
    {% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">PREVIOUS</a>{% endif %} | 
    {% if pagination.href.next %}<a href="{{ pagination.href.next }}">NEXT</a>{% endif %}
   </div>
</main>

