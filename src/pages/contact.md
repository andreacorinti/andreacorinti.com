---
title: Contact
description: For work, comments or anything!
---

{% include 'social.njk' %}

## Form

<form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
  <p>
    <label>Your Name: <input type="text" name="name" /></label>   
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>
    <textarea name="message" placeholder="Write here your message"></textarea>
    </label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
