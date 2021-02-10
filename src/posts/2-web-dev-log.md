---
title: "11ty, Webmentions and Bridgy part II [WebDev Log 02]" 
subtitle: "no comments but something"
immagine: https://brid.gy/static/bridgy_logo.jpg
sommario: "Works! well, sorta of..."
date: 2021-02-10
---

Yay! 

I made it! 

Ok, now for the bad news: 

Unfortunately, turns out that bridgy is way more limited than I thought (not it's fault of course, mostly a third party API thing):

> Twitter responses can be flaky for a number of reasons:
@-replies are only included if they @-mention you. Twitter's API doesn't have a way to get a tweet's replies, so Bridgy searches for @-mentions of the tweet's author to find its replies. That means it can't always find replies that omit the @-mention. (This requirement has become complicated and unclear now that Twitter hides/omits @-mentions in replies, but they're kind of still there under the covers, somewhat, sometimes.)
Also, Bridgy uses Twitter's Standard Search API, which only includes the last 7 days, and is best effort only, ie doesn't guarantee that it returns all matching tweets for a search. So, every now and then it may not find a reply, or a tweet that links to your site, which means Bridgy will miss it. Sadface.
Twitter likes (née favorites) are sadly best effort only. Their API still doesn't have a way to get a tweet's likes, so we have to scrape them from the web, which only shows the latest 25. So if you get more than 25 new likes between two times that Bridgy polls your Twitter account, we'll miss the rest in that period.
Retweets are also flaky occasionally. We've seen the API report retweet_count: 0 in tweets that do have retweets.

https://brid.gy/about#missing

Oh well, could be worse.

And personally I love the fact I can finally "merge" many different comments in one single field (Twitter works fine, I'll test out Reddit in the next few days) 

## So what you suggest for a good, "real" comment system ?

**This isn't a real blog** (it's more an old fashion website), otherwise the answer would have been definitely [**Utterances**](https://utteranc.es/).

I know: if you don't have a tech blog the Github access isn't the best, but for now I don't see a valid alternative to it.