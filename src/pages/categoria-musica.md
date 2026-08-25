---
layout: archivio
lang: it-IT
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Musica - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Musica{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Post sulla musica dal blog di Andrea Corinti - pagina {{ pagination.pageNumber | plus: 1 }}.{% else %}Post sulla musica dal blog di Andrea Corinti.{% endif %}"
pagination:
    data: collections.musica
    size: 8
    alias: postita
    reverse: true
permalink: "/categoria/musica-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  <nav class="tdbc-categorie-nav" aria-label="Categorie del blog">
    <a href="/blog-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Tutti</a>
    <a href="/categoria/videogiochi-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Videogiochi</a>
    <a href="/categoria/musica-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small is-active">Musica</a>
    <a href="/categoria/internet-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Internet</a>
    <a href="/categoria/film-serie-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Film &amp; Serie</a>
    <a href="/categoria/fumettame-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Fumettame</a>
    <a href="/categoria/xabologia-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Xabologia</a>
  </nav>
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
