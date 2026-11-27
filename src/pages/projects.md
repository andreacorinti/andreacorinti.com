---
layout: archivio
lang: it-IT
---
<main id="main-content" class="tdbc-container">
  <div class="tdbc-section">
    {%- comment -%} riquadro servizio in cima ai progetti (_work.scss): sintesi di /lavora-con-me/ {%- endcomment -%}
    <section class="work-box" aria-labelledby="work-box-title">
      {%- unless meta.work.available %}
      <p class="work-stamp work-box__stamp"><span class="work-stamp__dot" aria-hidden="true"></span>Party al completo</p>
      {%- endunless %}
      <p class="work-box__label">Lavora con me</p>
      <h2 class="work-box__title" id="work-box-title">Siti piccoli e veloci, fatti con 11ty</h2>
      <p class="work-box__text">Per blogger, professionisti e piccole attività: niente database né plugin da aggiornare, hosting gratuito, tema chiaro e scuro. Come questo sito.</p>
      <ul class="work-box__prices">
        <li><span>Blog o sito personale</span> <strong>da {{ meta.work.prices.blog }} €</strong></li>
        <li><span>Sito vetrina</span> <strong>da {{ meta.work.prices.vetrina }} €</strong></li>
      </ul>
      <p class="work-box__cta">
        <a class="cat-btn work-box__btn" href="/lavora-con-me/">Prezzi e dettagli <span aria-hidden="true">→</span></a>
        <span class="work-box__note">Preventivo gratuito</span>
      </p>
    </section>

    <h2 class="projects-heading">Progetti personali</h2>
    {%- comment -%} stesse card del blog (_postcard.scss); "progetto" e non
    "page" come variabile, per non coprire la page di Eleventy {%- endcomment -%}
    <ul class="post-grid">
      {%- for progetto in collections.progetti -%}
      <li class="post-card"{% if progetto.data.lang %} lang="{{ progetto.data.lang }}"{% endif %}>
        <div class="post-card__media">
          {% cardImage progetto.data.immagine, progetto.data.title, forloop.index %}
        </div>
        <div class="post-card__body">
          {%- if progetto.data.subtitle %}<p class="post-card__kicker">{{ progetto.data.subtitle }}</p>{% endif %}
          <h2 class="post-card__title"><a href="{{ progetto.data.link | default: progetto.url }}">{{ progetto.data.title }}</a></h2>
          {%- if progetto.data.sommario %}<p class="post-card__summary">{{ progetto.data.sommario }}</p>{% endif %}
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
</main>
