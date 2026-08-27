# Near — Source Catalog

Canonical list of feeds Near watches. The `near-editor` skill parses the YAML
block below — edit this file directly to add, pause, or remove a source.

Every source has a `trust` tier:

- `auto` — curated by the operator; `near-editor` may generate and commit
  content from these automatically, gated only by `content/rules.md`.
- `review` — anything surfaced through the `near-inbox` (visitor
  submissions) or an ad-hoc chat request. `near-editor` always writes these
  as `status: draft` and never auto-commits them to the published set,
  regardless of how well they score against the rules.

Launch set is deliberately small and varied (see Stage 1 in the project
plan) — chosen to exercise both the clean-RSS path and the
Chrome-automation fallback path, plus the geocoding and hero-image chains.
The full catalog (~24 feeds) gets added here once the pipeline is proven.

```yaml
sources:
  - id: atlas-obscura
    name: "Atlas Obscura"
    category: world-culture-news
    region: global
    language: en
    feedUrl: "https://www.atlasobscura.com/feeds/latest"
    feedType: rss
    trust: auto
    status: active

  - id: eater-national
    name: "Eater"
    category: food-drink
    region: us
    language: en
    feedUrl: "https://www.eater.com/rss/index.xml"
    feedType: rss
    trust: auto
    status: active

  - id: timeout-london
    name: "Time Out London"
    category: city-culture
    region: uk
    language: en
    feedUrl: "https://www.timeout.com/london/blog/feed.rss"
    feedType: rss
    trust: auto
    status: active

  - id: catraca-livre
    name: "Catraca Livre"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://catracalivre.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Feed has historically been unreliable. If the RSS fetch fails or
      returns malformed XML, near-editor should fall back to
      claude-in-chrome navigation against the site's listing pages.

  - id: resident-advisor
    name: "Resident Advisor — News"
    category: nightlife-sound
    region: global
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: "No classic RSS feed — near-editor must use the Chrome-automation fallback against ra.co/news."
```

## Categories

- `travel-luxury` — Travel & Luxury
- `world-culture-news` — World & Culture News
- `city-culture` — City & Culture
- `food-drink` — Food & Drink
- `nightlife-sound` — Nightlife & Sound
- `wellness-fitness` — Wellness & Fitness

## Notes for `near-editor`

- Only `status: active` sources are read on a run.
- `feedType: html-extract` or a failed/malformed `rss` fetch both route to
  the same fallback: `claude-in-chrome` navigation + text extraction
  against the source's own listing page.
- A source with `feedUrl: null` always uses the fallback path.
