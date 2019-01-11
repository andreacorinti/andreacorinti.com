---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<main itemscope itemtype="http://schema.org/Article">

<span itemprop="author" itemscope itemtype="http://schema.org/Person">
  <span itemprop="name">Andrea Corinti</span>
</span>

<div itemprop="publisher" itemscope itemtype="https://schema.org/Person">
    <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
      <img src="/images/logo.jpg"/>
      <meta itemprop="url" content="/images/logo.jpg">
      <meta itemprop="width" content="600">
      <meta itemprop="height" content="60">
    </div>
    <meta itemprop="name" content="Andrea Corinti">

<p class="date" itemprop="datePublished" content="{{ date }}">
  🕑 <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>

<span itemprop="headline">{{ sommario }}</span>

<img src="{{ immagine }}" alt="{{ title }}" title="{{ title }}" itemprop="image">

<main itemprop="articleBody">
  {{ content | safe }}
  <div class="footnote">
    <!--{%- if medium -%}
    <p class="medium">
    🖊️ Any thougts? Let me now on <a href="{{ medium }}" target="blank">medium</a>!
    </p>
    {%- endif -%}-->

  </div>
</main>
