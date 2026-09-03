# Search Console indexing scare — audit, 2026-09-03

**Operator question (BACKLOG.md ~line 3503):** Search Console, last updated
27/08/2026, shows *"Não foi possível indexar nenhuma página nos últimos 90
dias"* while the sitemap row reports 630 pages found and `Processado`.
He asked: **"normal?"**

## Verdict

**Yes — normal.** Nothing is wrong with near.tips's indexability. No
remediation is required. The verdict does **not** depend on how the
ambiguous Portuguese string is read: the site is seven days old, so both
readings are benign.

Investigation only, per brief. **No application code, config, or content was
changed.** Two pre-existing defects are reported below for someone else to
decide on; neither blocks indexing.

---

## Step 1 — What the string actually says

The two candidate readings were:

- **(a)** zero pages indexed in 90 days — alarming;
- **(b)** empty state of the *"Por que as páginas não são indexadas"*
  panel, i.e. nothing *failed* — good news.

**Best-supported answer: (a) is the more likely literal meaning, and it is
still not a problem here.** How that was established, and its limits:

- The exact English sibling string exists in Google's own community forum as
  a thread title: *"Is this a bug or real? **'No pages could be indexed in
  the last 90 days'** on index report?"*
  (support.google.com/webmasters/thread/188567630). The Portuguese is a
  direct translation of that string, so the string is real UI copy and not a
  rendering artefact.
- Grammatically it pairs with the **indexed** card, not the not-indexed one.
  "*could be* indexed" = "were able to be indexed" → count zero. The
  not-indexed panel's empty state would have to read "no pages *could not*
  be indexed", which Google does not write.
- The operator's own paste supports this: `check_circle` → *"Páginas
  indexadas"* → *"Estas páginas podem ser exibidas no Google"* → the string.
  That is the header, subtitle and chart empty-state of the **Indexed**
  card in the Page indexing report, in that order. The green check is the
  card's fixed icon, not a health signal.

**Honest limit on this:** the forum thread body is JavaScript-rendered and
could not be retrieved (three attempts, WebFetch and raw curl — the fetch
returns only chrome and navigation). Google's own
[Page indexing report help page](https://support.google.com/webmasters/answer/7440203)
documents the report's statuses but **never quotes this empty-state string
at all**, in `hl=en` or `hl=pt-BR`. So reading (a) rests on the forum thread
title plus grammar, not on a Google definition. It is the responsible
reading, but it is an inference.

That inference was deliberately not allowed to carry the verdict. Step 2 was
run independently, and it settles the question either way.

## Step 2 — Empirical findings (verified live, 2026-09-03)

### The decisive fact: the site is one week old

```
$ git log --reverse --format="%ad %s" --date=short | head -1
2026-08-27  Initial commit from Create Next App
```

**near.tips's first commit is 2026-08-27.** The Search Console panel the
operator pasted is stamped **"Última atualização: 27/08/2026"** — the same
day. The sitemap was not submitted until **02/09**.

So the indexed-pages panel's data was last refreshed *before the site had
content and before Google had been told the sitemap existed*. A zero on that
panel is not a report that indexing failed; it is a report from a moment
when there was nothing to index and no submission to act on. And an empty
90-day window on a 7-day-old domain is arithmetically unavoidable — 83 of
those 90 days predate the domain having any pages at all.

This also matches the previously-diagnosed scare recorded in BACKLOG.md
§"Search Console reality check (2026-09-02)", where GSC reported *"não foi
possível buscar o sitemap"* and 0 pages while the sitemap was live and
serving 390 URLs. Same pattern: **GSC panels lag, and lag independently of
each other.** The sitemap row (02/09, `Processado`, 630 pages) is the fresh
panel; the indexing row (27/08) is the stale one. Reading them as one
consistent snapshot is what makes the pair look alarming.

### Sitemap

- `https://near.tips/sitemap.xml` → **200**, 524,836 bytes, valid XML.
- **726 `<loc>` entries** — 121 URLs × 6 locales exactly
  (`en`, `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`), perfectly balanced.
- 726 `<lastmod>` entries (one per URL) and **4,356 `xhtml:link` alternates**
  (726 × 6) — full hreflang annotation inside the sitemap.
- GSC read 630 on 02/09; 726 today. The delta is one day of publishing
  (Dolphin Club, Aquatic Park and the V&A East Storehouse all landed in
  recent commits, six locales each). **Growth, not disagreement.**

### robots.txt

```
User-Agent: *
Allow: /

Sitemap: https://near.tips/sitemap.xml
```

Nothing disallowed. Sitemap declared. Clean.

### noindex sweep — negative, site-wide

Checked `/en`, `/pt-BR`, `/en/place/lita-pinheiros-sao-paulo`, `/en/guides`:

- All **HTTP 200**.
- All emit `<meta name="robots" content="index, follow">`.
- All emit `max-image-preview:large, max-snippet:-1`.
- **No `X-Robots-Tag` header on any response.** Verified by header dump, not
  by reading source.
- Source side: indexing is governed by `app/robots.ts` and `app/sitemap.ts`
  only. No stray `noindex` in app/lib, no middleware setting robots headers,
  no staging leftover.

**There is no noindex on this site, in markup or in headers.**

Worth correcting a stale note while here: BACKLOG.md's Discover section
claims *"the `max-image-preview:large` robots directive is the usual gate —
**Near does not currently set it**"*. **It is set now**, on every page
checked. That line is out of date.

### Canonical / hreflang / locale routing

- Canonicals are self-referential and locale-correct
  (`/en/place/lita…` → canonical `https://near.tips/en/place/lita…`), and
  match the sitemap `<loc>` exactly. No duplicate-canonical trap.
- hreflang ships as an HTTP `Link:` header with all six locales **plus
  `x-default`**, on both the locale roots and place pages. Coherent, and
  reciprocal via the sitemap's `xhtml:link` block.
- `/` → **307** → `/en`. `x-default` points at the unprefixed URL, which
  itself 307s to `/en`. Legal and Google handles it, though pointing
  `x-default` straight at a 200 would be marginally cleaner. **Not a defect,
  not worth a change on its own.**

### Reachability and outside index presence

Site is up and serving 200s from Vercel with `x-vercel-cache: HIT`.

`site:near.tips` was attempted via both WebSearch and Bing. **Neither
returned any near.tips URL — and neither honoured the `site:` operator at
all**, returning generic "near me tips" articles and Google support pages
instead. A targeted exact-phrase search for near.tips content likewise
surfaced nothing. **Treat all of this as no evidence rather than negative
evidence**: automated `site:` queries are unreliable, the operators were
demonstrably ignored, and a 7-day-old domain would not be expected to show
up regardless. The only trustworthy read on index presence is the operator's
own URL Inspection tool.

### RSS feeds

- `https://near.tips/feed.xml` → **200**, `<?xml version="1.0"
  encoding="UTF-8"?>`, `<rss version="2.0">`, `<atom:link rel="self">`
  present, `<language>en</language>`, items carry `<guid isPermaLink="true">`
  and absolute links. **Valid RSS 2.0.**
- Five feeds exist: `/feed.xml`, `/column/feed.xml`, `/the-setlist/feed.xml`,
  `/the-pass/feed.xml`, `/ladies-and-gentlethem/feed.xml`.

## Two real defects found — reported, not fixed

Neither causes the symptom. Both are for `near-tech-lead` /
`google-discover-audit` to decide on; a wrong "fix" to indexing config has
high blast radius, so nothing was touched.

1. **No per-locale RSS feeds.** `/pt-BR/feed.xml`, `/es-419/feed.xml` and
   `/zh-CN/feed.xml` all return **404**. Only the English feed exists, and
   it declares `<language>en</language>` (a bare code rather than a
   locale-qualified tag such as `en-US`). Five of six locales therefore have
   no feed surface at all — directly relevant to
   `google-discover-audit`'s prerequisite that feeds stay valid.
   Source: `app/feed.xml/`, which has no `[locale]` segment.

2. **No RSS autodiscovery in the HTML head.** `/en` emits no
   `<link rel="alternate" type="application/rss+xml">`, so the feed is
   undiscoverable to any reader that does not already know the URL.

Also noted, already logged elsewhere and unchanged by this audit: the two
`app/sitemap.ts` items from the 2026-09-02 diagnosis (drop `<priority>`;
`lastmod` on the three static per-locale entries uses `new Date()` and so
churns on every build). Still open, still cosmetic relative to this question.

## Step 3 — What to do

**Nothing urgent.** The correct action is to wait, and it was already the
recorded action from 02/09: resubmit, then wait.

For the operator specifically — these need Search Console access, which no
agent has:

1. **Run URL Inspection on three live URLs** (suggested: `/en`,
   `/pt-BR/place/lita-pinheiros-sao-paulo`, `/en/guides`). This is the only
   authoritative check of index presence, and it takes about a minute. If it
   says "URL is on Google" or "Crawled — currently not indexed", everything
   in this document is confirmed and the panel is simply stale.
2. **Re-check the Páginas indexadas panel after its date moves past
   02/09.** The 27/08 stamp is the whole story; a panel that still reads
   zero *with a September date and a fortnight of crawl behind it* would be
   a different conversation.
3. **Do not request indexing on 726 URLs.** The sitemap is submitted and
   processed; manual requests add nothing and the quota is small.

**Escalate only if,** two to three weeks from now, the panel is refreshed to
a recent date and still reports zero indexed while "Não indexadas" also
shows nothing meaningful. That combination would suggest a property-level
problem (wrong property type, verification scope) rather than a site
problem — and the site side is, per everything above, clean.

## What was checked and found healthy — summary

| Check | Result |
|---|---|
| `sitemap.xml` resolves, valid, URL count | 200, valid XML, 726 URLs (121 × 6 locales) |
| `lastmod` / hreflang alternates in sitemap | 726 lastmod, 4,356 `xhtml:link` |
| `robots.txt` | `Allow: /`, sitemap declared, nothing blocked |
| Meta robots on live pages | `index, follow` on all sampled |
| `X-Robots-Tag` header | **absent everywhere** — no header-level noindex |
| `max-image-preview:large` | present (BACKLOG note saying otherwise is stale) |
| App source (`app/robots.ts`, `app/sitemap.ts`, middleware) | no stray noindex |
| HTTP status | 200 on all sampled; `/` → 307 → `/en` as designed |
| Canonicals | self-referential, match sitemap `<loc>` |
| hreflang | 6 locales + `x-default`, via `Link:` header, reciprocal |
| Main RSS feed | valid RSS 2.0, UTF-8, `<language>`, atom:self |
| Per-locale RSS feeds | **404 — defect, reported not fixed** |
| RSS autodiscovery link | **absent — defect, reported not fixed** |

## Sources

- [Relatório de indexação de páginas — Ajuda do Search Console (pt-BR)](https://support.google.com/webmasters/answer/7440203?hl=pt-BR)
- [Page indexing report — Search Console Help (en)](https://support.google.com/webmasters/answer/7440203?hl=en)
- [Is this a bug or real? "No pages could be indexed in the last 90 days" on index report? — Google Search Central Community](https://support.google.com/webmasters/thread/188567630/is-this-a-bug-or-real-no-pages-could-be-indexed-in-the-last-90-days-on-index-report?hl=en)
- [Os possíveis motivos para os problemas de indexação (pt-BR)](https://support.google.com/webmasters/answer/156336?hl=pt-BR)
- [Por que minha página não está na Pesquisa Google? (pt-BR)](https://support.google.com/webmasters/answer/7474347?hl=pt-BR)
- Live fetches of `near.tips` sitemap, robots, feeds, headers and page source, 2026-09-03.
