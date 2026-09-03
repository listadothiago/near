# Search-trend feeds — mandatory check on every content run

Operator directive, 2026-09-03: *"Please SEO skill, trendsetter skill
always at every run check these trends feeds… makes sure to save those
feeds and ALWAYS check them for search trends to target"* and *"search
trends should be consulted in all content creation."*

This file is the saved copy of those feeds. It is the source of truth —
`near-seo`, `near-trendsetter`, `near-backlog`, `near-war-room` and
`near-refresh` all read it at the start of a run.

## The rule

**Skills still honour Near's angle and filter** (operator, same day:
*"skills should still honour our angle and filter but do seek
opportunities in trends like the above please"*). A trending query is an
**opportunity to check against Near's beat**, never a mandate to write
about it. Near does not cover a ground stop at LaGuardia because it is
trending; Near covers a place or an event that is genuinely on its beat
and that a trending query happens to create demand for.

So the pass is: read the feeds → pull the handful of entries that touch
a Near market, a Near beat (nightlife, food & drink, city culture,
world-culture news, wellness/fitness, travel), or a dated event → carry
those into scoping as candidates, alongside the alt-press read and the
query-gap analysis. Discard the rest without comment.

## Reading them

These are Google Trends "trending now" pages, not RSS. Fetch with
`WebFetch`; if a page is bot-blocked or renders empty, say so in the run
report rather than inventing entries — the anti-fabrication rule in
`BACKLOG.md` applies to trend data exactly as it does to venue facts.
If a better mechanism than page-fetching becomes available (operator:
*"if the skills have a better way to manage monitoring trends use that
of course"*), switch to it and update this file.

Category codes in these URLs: **4** = Entertainment, **5** = Food &
Drink, **19** = Travel & Transportation, **20** = Sports.
`hours=168` is a 7-day window; a bare URL is the default (short) window.

## Feeds — Travel & Transportation (category 19)

- https://trends.google.com/trending?geo=US&category=19&hours=168
- https://trends.google.com/trending?geo=GB&category=19&hours=168
- https://trends.google.com/trending?geo=BR&category=19&hours=168
- https://trends.google.com/trending?geo=IT&category=19&hours=168
- https://trends.google.com/trending?geo=ES&category=19&hours=168
- https://trends.google.com/trending?geo=MX&category=19&hours=168
- https://trends.google.com/trending?geo=DE&category=19&hours=168
- https://trends.google.com/trending?geo=PT&category=19&hours=168
- https://trends.google.com/trending?geo=US-CA&category=19&hours=168

## Feeds — Food & Drink (category 5)

- https://trends.google.com/trending?geo=US&category=5&hours=168
- https://trends.google.com/trending?geo=GB&category=5&hours=168
- https://trends.google.com/trending?geo=BR&category=5&hours=168
- https://trends.google.com/trending?geo=IT&category=5&hours=168
- https://trends.google.com/trending?geo=ES&category=5&hours=168
- https://trends.google.com/trending?geo=MX&category=5&hours=168
- https://trends.google.com/trending?geo=DE&category=5&hours=168
- https://trends.google.com/trending?geo=US-CA&category=5&hours=168

## Feeds — Entertainment (category 4)

- https://trends.google.com/trending?geo=DE&category=4&hours=168
- https://trends.google.com/trending?geo=GB&category=4&hours=168

## Feeds — short-window Brazil (operator's home market, no `hours` filter)

- https://trends.google.com/trending?geo=BR&category=5
- https://trends.google.com/trending?geo=BR&category=19
- https://trends.google.com/trending?geo=BR&category=20

## Candidate feeds — added by near-seo, not operator-specified

Operator, 2026-09-03: *"see what other geo regions you think could be
relevant to follow, categories, hours you want to follow."* These follow
Near's actual market list (`content/preferred-destinations.md`,
`content-rotation/SKILL.md` tiers) rather than guessing:

- https://trends.google.com/trending?geo=US-NY&category=19&hours=168 — New York is a Tier 1 rotation city.
- https://trends.google.com/trending?geo=NL&category=19&hours=168 — Amsterdam is 3rd in the refresh order.
- https://trends.google.com/trending?geo=TH&category=19&hours=168 — Bangkok is an active queue.
- https://trends.google.com/trending?geo=FR&category=5&hours=168 — Paris.
- https://trends.google.com/trending?geo=JP&category=19&hours=168 — Tokyo, added to Tier 2 on 2026-09-03.

Promote a candidate to the lists above once it has actually produced a
usable lead; drop it if it hasn't after a few runs.

## Snapshot — 2026-09-03, supplied by the operator

Kept as the last known read, not as current data. Re-fetch before using.
Near-relevant entries are marked; the rest are logged as-is.

`cbp contactless airport arrival plans` · `faa laguardia ground stop
thunderstorms` · **`academy of natural sciences`** (Philadelphia — a
place) · `uber leaves nigeria` · **`bc mountain resorts early
snowfall`** (seasonal, outdoors) · **`tiana's bayou adventure`** ·
`united airlines new nonstop routes` · `africa` · **`london`** ·
`amusement park` · `current events` · `trump triumphal arch adverse
effects` · **`universal hollywood new coaster release date`** ·
`cleveland hopkins airport` · `war of 1812` · **`brazil`** · `swimming
facility` · `klystron 9` · **`qatar airways`** · **`mallorca`**

near-seo's read of this snapshot: the usable signal is **`mallorca`**
(Spain, a market Near already writes for, and a plausible neighbour to
the Sitges/Barcelona work in the queue), **`london`** and **`brazil`**
(both already core markets — confirmation, not new direction), and the
**early-snowfall/seasonal-outdoors** pattern. The airport/airline
entries are transport-disruption news, which is not Near's beat.
