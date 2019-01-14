---
title: "Html Lang [WebDev Log 0]" 
subtitle: a simple & dirty cheap trick in yaml
immagine: /images/yaml.png
sommario: "Now, as you may have noticed, I'm developing my site in a strange mix between Italian and English pages..."
date: 2019-01-14
---

Everyone should be familiar with the good old [**HTML lang attribute**](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).

```html
<html lang="en">
```

Now, as you may have noticed, I'm developing my site in a _strange_ mix between English and Italian pages using the amazing [11ty](https://www.11ty.io/) static site generator.

Originally I was considering doing something with [i18n libraries](https://www.npmjs.com/package/messageformat), but it didn't seem an idea that suited to my website's purposes.

## The problem

The [default layout](https://github.com/andreacorinti/andreacorinti.com/blob/0e906216d41b7c31803a01fd0abd830efcab1269/src/site/_includes/layouts/base.njk) is at the base <small>(surprise!)</small> of all the website's pages, including the [post layout](https://github.com/andreacorinti/andreacorinti.com/blob/master/src/site/_includes/layouts/post.md) (which applies to both English and Italian articles) was set with _lang="eng"_.

## A custom Italian layout ?

For a short while I thought about creating a layout completely dedicated to Italian pages, but it was clearly a bad idea: 

imagine having to scour for a problem between two almost _identical_ layouts. 

No thanks.

## The solution

Rather simple and painless, really:

```html
<html lang="{% raw  %}{%- if lang -%}{{ lang }}{%- else -%}en{%- endif -%}{% endraw %}">
```

**if** the lang attribute is found in the post's yaml, like so:

```html
---
lang: it-IT
---
```

the output will be:

```html
<html lang="it-IT">
```

**else**, the default english will apply:

```html
<html lang="en">
```

Now I can also write post in _Japanese_ (not that I know it, mind you!) by just setting the lang attribute in the yaml!