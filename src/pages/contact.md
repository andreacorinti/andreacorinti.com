---
layout: contact
title: Contact
---

## Contact Form

<p class="contact-intro">Scrivimi pure, in italiano o in inglese: rispondo appena posso! <span lang="en">Feel free to write in English too!</span></p>

<form class="contact-form" name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <p class="contact-form__trap" aria-hidden="true">
    <label>Non compilare questo campo <input name="bot-field" tabindex="-1" autocomplete="off"></label>
  </p>
  <p class="contact-form__field">
    <label for="cf-name">Nome <span lang="en">/ Name</span></label>
    <input id="cf-name" type="text" name="name" autocomplete="name" required>
  </p>
  <p class="contact-form__field">
    <label for="cf-email">Email</label>
    <input id="cf-email" type="email" name="email" autocomplete="email" required>
  </p>
  <p class="contact-form__field">
    <label for="cf-message">Messaggio <span lang="en">/ Message</span></label>
    <textarea id="cf-message" name="message" rows="7" required></textarea>
  </p>
  <p class="contact-form__actions">
    <button class="contact-form__send" type="submit"><span>Invia <span lang="en">/ Send</span></span> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 21 3l-8.5 18-2.2-7.3z"/><path d="M10.3 13.7 21 3"/></svg></button>
  </p>
</form>

<div class="freelance-box">
  <p class="freelance-box__label">🇮🇹 Freelance</p>
  <p class="freelance-box__what">Contenuti e supporto e-learning (Edizioni Edilingua)</p>
  <p class="freelance-box__piva"><span>P.IVA</span> <strong>04319490134</strong></p>
</div>

{% include 'work-box.njk' %}

{% include 'social.njk' %}
