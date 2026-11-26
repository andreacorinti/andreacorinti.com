---
layout: page
lang: en-US
title: Work with me
description: "Small, fast, no-frills websites built with Eleventy."
seoTitle: "Fast, lightweight websites with Eleventy"
sommario: "I build static websites with Eleventy (11ty) for bloggers, freelancers and small businesses: fast, secure, mobile-friendly, no database and no plugins to keep updated. Clear prices, free quote."
translation: /lavora-con-me/
permalink: /work-with-me/
---

{% include 'work-status.njk' %}

I've been blogging for more than ten years, and for years I've worked in e-learning as a web editor and in tech support. Along the way I learned to build small, fast websites with no frills, like the one you're reading. I work in English, Italian and Spanish.

## Why a static site

For bloggers, freelancers and small businesses who want a fast, lightweight site, without a database or plugins to keep updated. A static site is made of ready-made pages, which in practice means:

<ul class="work-features">
  <li><strong>Fast</strong> It loads in a blink, even on a phone with a weak signal.</li>
  <li><strong>Made for phones</strong> It reads well on smartphones, tablets and desktops, no zooming, no crazy menus.</li>
  <li><strong>Secure and low-stress</strong> No database, no plugins: less to attack, no endless updates.</li>
  <li><strong>Free hosting</strong> On services like Netlify or Cloudflare Pages: you pay for the site, not for renting a server.</li>
</ul>

## Proof: this website

This site is built with Eleventy, hosted on Netlify, and the [source code is on GitHub](https://github.com/andreacorinti/andreacorinti.com). [Speedlify](https://www.speedlify.dev/) tests it every week with Lighthouse in mobile mode, together with more than a thousand other Eleventy sites:

{% assign sl = meta.work.speedlify %}
<figure class="work-scores">
  <ul class="work-scores__list">
    <li style="--tdbc-score: {{ sl.perf }}"><span class="work-scores__num">{{ sl.perf }}</span> Performance</li>
    <li style="--tdbc-score: {{ sl.a11y }}"><span class="work-scores__num">{{ sl.a11y }}</span> Accessibility</li>
    <li style="--tdbc-score: {{ sl.best }}"><span class="work-scores__num">{{ sl.best }}</span> Best practices</li>
    <li style="--tdbc-score: {{ sl.seo }}"><span class="work-scores__num">{{ sl.seo }}</span> SEO</li>
  </ul>
  <figcaption>Tested on {{ sl.dateEn }}: #{{ sl.rank }} out of {{ sl.totalEn }} sites. <a href="{{ sl.url }}">Full data on Speedlify</a></figcaption>
</figure>

## What you get

<ul class="work-checklist">
  <li>a simple, readable design, with accessibility in mind</li>
  <li>works on phones and tablets</li>
  <li>light and dark theme</li>
  <li>basic SEO: titles, descriptions, social previews and a sitemap</li>
  <li>an RSS feed, if you need one</li>
  <li>links to your social profiles</li>
  <li>going live, domain included</li>
  <li>a short guide to update it yourself</li>
</ul>

## Prices

<div class="work-prices">
  <div class="work-price">
    <p class="work-price__name">Blog or personal site</p>
    <p class="work-price__what">up to about 5 pages</p>
    <p class="work-price__amount"><span>from</span> €{{ meta.work.prices.blog }}</p>
  </div>
  <div class="work-price">
    <p class="work-price__name">Business site</p>
    <p class="work-price__what">for a freelancer or a small business</p>
    <p class="work-price__amount"><span>from</span> €{{ meta.work.prices.vetrina }}</p>
  </div>
</div>

- **Hosting**: free.
- **Domain**: I take care of it, and it stays in your name. Registration and renewal are included up to €{{ meta.work.prices.domainMax }} a year (the first year in the site price, then in the support plan); for pricier domains we'll sort out the difference together.
- **Basic support**: from €{{ meta.work.prices.support }}/month, billed quarterly or yearly. Monitoring, technical updates and small changes, up to about one hour a month.
- **Content updates**: from €{{ meta.work.prices.content }}/month, about 3-5 hours a month of new pages, text and images.

Free quote, exact prices after a quick chat.

## How it works

<ol class="work-steps">
  <li>You write to me and tell me what you need.</li>
  <li>We have a chat and I send you a clear quote.</li>
  <li>Your site goes live and, if you want, I keep looking after it.</li>
</ol>

<div class="work-cta">
  <p class="work-cta__title">Got a site in mind?</p>
  <p><a class="cat-btn work-box__btn" href="/contact/">Write to me <span aria-hidden="true">→</span></a></p>
  <p class="work-cta__note">Want to know who I am first? Here's my <a href="/en/about/">about page</a>.</p>
</div>

{% comment %} TODO: confirm the exact wording with the accountant, then uncomment:
<small>Italian flat-rate tax scheme (regime forfettario): no VAT charged.</small>
{% endcomment %}
