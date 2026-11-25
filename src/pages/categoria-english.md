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
  <nav class="tdbc-categorie-nav" aria-label="Categorie del blog">
    <a href="/blog-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Tutti</a>
    <a href="/categoria/videogiochi-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Videogiochi</a>
    <a href="/categoria/musica-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Musica</a>
    <a href="/categoria/internet-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Internet</a>
    <a href="/categoria/film-serie-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Film, Serie &amp; Fumettame</a>
    <a href="/categoria/xabologia-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Xabologia</a>
    <a href="/categoria/english-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small is-english is-active" lang="en" hreflang="en">🇬🇧 English</a>
  </nav>
  <div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for post in posteng -%}
      <li class="tdbc-card">
        <div class="tdbc-card__content">
          <a href="{{ post.url }}" class="tdbc-card__title">{{ post.data.title }}</a>
          <img src="{{ post.data.immagine }}" alt="{{ post.data.title }}" {% if forloop.index > 2 %}loading="lazy"{% endif %} decoding="async">
          <time>{{ post.data.date | dateDisplay: 'en-US' }}</time>
          <p>{{ post.data.sommario }}</p>
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
  <div id="avanti-indietro">
    {% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">PREVIOUS&nbsp</a>{% endif %}| 
    {% if pagination.href.next %}<a href="{{ pagination.href.next }}">NEXT</a>{% endif %}
   </div>
</main>
