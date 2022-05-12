---
layout: contact
title: Contact
---

## Contact Form

<form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
  <p>
    <label><input type="text" name="name" placeholder="Type your Name"/></label>   
  </p>
  <p>
    <label><input type="email" name="email" placeholder="Type your e-mail"/></label>
  </p>
  <p>
    <label>
    <textarea name="message" placeholder="Write here your message" cols="40" rows="6"></textarea>
    </label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>

{% include 'social.njk' %}