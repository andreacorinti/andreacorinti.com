---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<meta property="og:title" content="{{ title }}">
<meta property="og:description" content="{{ sommario }}">
<meta property="og:image" content="{{ immagine }}">
<meta property="og:url" content="https://andreacorinti.com{{ page.url }}">
<meta name="twitter:card" content="{{ immagine }}">

<p class="date">
  🕑 <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>

<img src="{{ immagine }}" alt="{{ title }}" title="{{ title }}">

<main>
  {{ content | safe }}
  <div class="footnote">
    {%- if medium -%}
    <p class="medium">
    🖊️ Any thougts? Let me now on <a href="{{ medium }}" target="blank">medium</a>!
    </p>
    {%- endif -%}
  </div>
</main>
