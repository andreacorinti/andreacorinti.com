---
title: Home
subtitle: Freelance Developer
layout: layouts/base.njk
---

## Ciao!

```java
public class javaWelcome {

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }

}
```

I welcome you to my personal web place, make yourself comfortable!

Please forgive my rusty english (feel free to report me any grammar mistake on <a href="https://twitter.com/AndreaCorinti">Twitter</a>  or <a href="https://github.com/AndreaCorinti">Github</a>)

**Website work in progress!**

<ul class="listing">
{%- for page in collections.articoli -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
