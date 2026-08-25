---
layout: archivio
lang: it-IT
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}Xabologia - pagina {{ pagination.pageNumber | plus: 1 }}{% else %}Xabologia{% endif %}"
  sommario: "{% if pagination.pageNumber > 0 %}Post personali, di vita e sul blog stesso - pagina {{ pagination.pageNumber | plus: 1 }}.{% else %}Post personali, di vita e sul blog stesso.{% endif %}"
pagination:
    data: collections.xabologia
    size: 8
    alias: postita
    reverse: true
permalink: "/categoria/xabologia-{{ pagination.pageNumber }}/"
---

<main id="main-content" class="tdbc-container">
  <nav class="tdbc-categorie-nav" aria-label="Categorie del blog">
    <a href="/blog-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Tutti</a>
    <a href="/categoria/videogiochi-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Videogiochi</a>
    <a href="/categoria/musica-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Musica</a>
    <a href="/categoria/internet-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Internet</a>
    <a href="/categoria/film-serie-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Film &amp; Serie</a>
    <a href="/categoria/fumettame-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small">Fumettame</a>
    <a href="/categoria/xabologia-0/" class="tdbc-button tdbc-button-outlined tdbc-button--small is-active">Xabologia</a>
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
