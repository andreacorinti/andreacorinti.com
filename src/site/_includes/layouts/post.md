---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<p class="date">
  🕑 <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>

<img src="{{ immagine }}" alt="{{ title }}" title="{{ title }}">

<main>
  {{ content | safe }}
  <div class="footnote">
    <!--{%- if medium -%}
    <p class="medium">
    🖊️ Any thougts? Let me now on <a href="{{ medium }}" target="blank">medium</a>!
    </p>
    {%- endif -%}-->

  </div>
</main>
