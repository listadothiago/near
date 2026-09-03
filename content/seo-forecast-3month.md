# near.tips — 3-Month SEO Traffic Forecast (near-seo)

Written 2026-09-01. Covers weeks of 2026-09-01 through 2026-11-24
(roughly 12 weeks / 3 months from a 2026-08-27 launch).

## The honest framing, up front

A brand-new domain with zero backlink history and zero search-console
data does not get meaningful organic traffic in 3 months, no matter how
good the content is. Google's own trust/crawl timeline for a new domain
runs 4-12+ months before rankings stabilize into anything resembling
"where this site will actually sit" — that part is **not controllable**,
no shortcut exists, and any plan claiming otherwise is selling something.

What **is** controllable in 3 months, and what this plan actually
targets:
1. Getting every page indexed fast (IndexNow already does this — the
   controllable half of "does Google know this page exists").
2. Removing every technical reason a page could rank lower than its
   content deserves (JSON-LD, canonical URLs, internal linking, Core
   Web Vitals).
3. Building the content footprint and backlink profile that pays off
   starting month 4-6, not month 1-3 — i.e., this quarter is runway-
   laying, not results.
4. A small number of **long-tail, low-competition, high-specificity
   queries** (a specific venue name, a specific "[place] + [neighborhood
   or feature]" pattern) can realistically rank within weeks, not
   months, because there's no incumbent competing for that exact
   phrase. This is where any real month-1-3 traffic will actually come
   from — not head terms like "best bars in London."

**No invented numbers.** Where a range is given below, it's a
directional order-of-magnitude based on how long-tail-heavy,
new-domain SEO typically plays out (dozens to low hundreds of
sessions/month by month 3 is realistic for a ~50-150 page site with no
paid promotion and no existing audience; thousands is not, regardless
of content quality, until backlink authority catches up). Treat every
number below as "the shape of the curve," not a commitment.

## What's already working in Near's favor

- **IndexNow is live** (`scripts/indexnow-submit.mjs`, runs on every
  production deploy) — pages get submitted to Bing/Yandex within
  minutes of publish. This doesn't touch Google directly, but Bing
  organic + AI answer engines (Copilot, Perplexity, which use Bing's
  index) are a real, underrated traffic source most new sites ignore.
- **Structured JSON-LD** on every place/collection page, `NewsArticle`
  typing on the editorial column, and the `aeo` skill's citability
  checks — this is the technical foundation that lets Google (once it
  does crawl) and AI answer engines cite Near correctly, rather than
  something to retrofit later.
- **Six-locale coverage on every page** is a real multiplier no
  single-language competitor has — it's 6x the long-tail surface area
  per place, not 6x the effort-to-reward ratio, since translation is
  cheap relative to drafting.
- **`backlink-pr`** is already wired into every content push, so
  off-page authority-building isn't a separate initiative to remember —
  it's already the default.

## The two levers this plan pulls

**Lever 1 — get discovered at all (indexing + technical).** Mostly a
one-time setup cost in week 1-2, then maintenance.

**Lever 2 — give Google/Bing/AI answer engines something worth ranking
(content velocity + specificity + backlinks).** This is the 12-week
grind — compounds slowly, pays off starting ~week 8-12 and really
starting month 4-6.

## Week-by-week plan

### Weeks 1-2 (Sept 1-14): Close the indexing gaps — the one-time setup

- [ ] **Connect Google Search Console.** `GOOGLE_SITE_VERIFICATION` is
  already wired in code (per BACKLOG.md) — this is purely the
  operator's own Google-account step, blocked on nothing technical.
  This is the single highest-leverage action in the whole plan: it's
  the only source of real query/impression data Near will have, and
  every week without it is a week of history permanently lost (Search
  Console doesn't backfill).
- [ ] Submit the sitemap manually in Search Console once connected
  (don't just wait for Google to find it — ask).
- [ ] Verify `robots.txt` and `sitemap.xml` are both correct and
  complete (spot-check, they're already auto-generated per BACKLOG.md).
- [ ] Confirm canonical URLs are set correctly across all 6 locales per
  place (avoid Google treating locale variants as duplicate content —
  check `hreflang` tags are present and correct).
- [ ] Run a Core Web Vitals check (Lighthouse/PageSpeed Insights) on
  the board and a sample place page — fix anything glaringly bad now,
  before it's baked into Google's first impression of the site's
  quality signal.
- **Goal by end of week 2:** Search Console connected and reporting,
  100% of live pages confirmed indexable (no accidental `noindex`,
  no broken canonicals), zero Core Web Vitals red flags.

### Weeks 3-4 (Sept 15-28): First indexing signal + content velocity baseline

- [ ] Check Search Console's Coverage report — how many of Near's pages
  Google has actually indexed vs. discovered-not-indexed. A new site
  often has a real gap here in week 1; the fix is patience plus
  internal linking (Google indexes what it can find a path to and
  judges worth crawling), not resubmitting.
- [ ] Keep shipping at the current velocity (several pieces/session,
  multiple markets) — consistency here is itself a trust signal to
  Google (a site that updates regularly gets crawled more often).
- [ ] Start tracking, in `content/opportunities.md` or a simple log,
  which specific long-tail phrases each new piece is realistically
  positioned to rank for (a specific venue name + city is the actual
  near-term target, not generic category terms).
- **Goal by end of week 4:** First Search Console impressions appear
  (even single digits is a real signal — it means Google has crawled
  and is at least considering the pages). First `backlink-pr` outreach
  responses, if any, logged in `content/backlink-outreach.md`.

### Weeks 5-8 (Sept 29 - Oct 26): The long-tail window opens

This is where the first real, if small, organic clicks should start
appearing — specific venue-name searches (someone who heard about a
place from Near or elsewhere and searches its exact name) are the
lowest-competition queries that exist, and Near's pages should already
be ranking on page 1 for a good share of "[venue name]" searches by
now, simply because most small venues have thin or no web presence to
compete against.

- [ ] Check Search Console weekly for which specific queries are
  actually driving impressions/clicks — this replaces guessing with
  real data for the first time this quarter. Use it to inform which
  angles/markets to prioritize next, not just `near-seo`'s qualitative
  method.
- [ ] Continue `backlink-pr` outreach — by week 6-8, some responses
  should be landing (peer alt-weeklies/local blogs are slower than
  cold big-site targets, but higher-conversion).
- [ ] Do a first internal-linking audit pass (or extend `link-police`'s
  work) — by now there's enough content for genuinely dense cross-
  linking, which helps Google's crawl-and-trust path through the site.
- **Realistic range by end of week 8:** low tens to low hundreds of
  organic sessions/month, concentrated in exact-name and long-tail
  queries, not category terms. Bing/AI-answer-engine traffic (via
  IndexNow) may already be a meaningful fraction of this, sometimes
  larger than Google share this early.

### Weeks 9-12 (Oct 27 - Nov 24): Compounding, not a breakthrough

- [ ] Keep the content and backlink cadence — nothing changes
  mechanically here, this is where the first 8 weeks' work starts
  compounding (more indexed pages × more internal links × more
  backlinks × more crawl trust).
- [ ] First real look at which markets/angles are actually
  outperforming in Search Console data vs. which were prioritized on
  qualitative judgment alone — feed this back into `content/
  opportunities.md`'s prioritization for month 4+.
- [ ] Reassess whether category-level terms (not just exact-name
  long-tail) are showing any early movement — this is the first
  point where that's even worth checking.
- **Realistic range by end of week 12 (month 3):** continued growth
  on the same curve as weeks 5-8, likely still measured in hundreds
  of sessions/month rather than thousands — and that's a genuinely
  good outcome for a 3-month-old domain with no paid promotion. The
  inflection point where growth visibly accelerates typically lands
  month 4-6, once backlink authority and total indexed-page-count
  cross certain thresholds Google's own algorithm gates on. This plan
  is the runway for that, not the arrival.

## What would change this forecast (for better or worse)

- **Better:** a genuine viral/earned-media moment (a piece picked up by
  a larger outlet, a backlink from a high-authority site) can move the
  timeline up by months — this is real but not plannable, which is why
  `backlink-pr`'s outreach matters even though its ROI is unpredictable.
- **Worse:** any period without Search Console connected keeps Near
  flying blind on real query data, which slows every decision below it.
- **Worse:** any drop in publishing cadence resets some of the
  crawl-trust momentum being built — consistency compounds, gaps don't
  just pause the compounding, they cost some of it.

## Owner and review cadence

`near-seo` owns this file. Revisit weekly against actual Search Console
data once connected (currently: revisit only qualitatively, since
there's no data source yet). Treat any large deviation from the
realistic ranges above — in either direction — as a signal to
investigate the cause, not just update the number.
