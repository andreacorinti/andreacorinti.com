---
title: Contact
subtitle: For work, comments or anything!
layout: layouts/base.njk
---

<form name="contact" method="POST" data-netlify="true">
  <p>
    <label>Your Name: <input type="text" name="name" /></label>   
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>
    <textarea name="message" placeholder="Write here your message / Scrivi qui il tuo messaggio"></textarea>
    </label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
