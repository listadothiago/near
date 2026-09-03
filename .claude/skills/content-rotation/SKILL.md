# content-rotation

Owns the geographic tier list and rotation cadence for `content/post-plan.md`. Operator directive, 2026-09-01 — supersedes any prior tier list in post-plan.md.

## Tiers

**Tier 1 (repeats 4x before rotating into Tier 2):** London, Brighton, San Francisco, Oakland, **Bangkok**.

**Tier 2 (rotates in after Tier 1 has cycled 4 times):** Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu, **Tokyo, Melbourne, Seattle** (Tokyo/Melbourne added by operator directive 2026-09-03; **Seattle** same day — *"make sure seattle is at least tier 2"*, so it is a Tier 2 member outright rather than waiting on its queue being seeded as the `post-plan.md` note previously had it. Its queue is empty, so its turn hits the empty-queue rule and is skipped until seeded), plus **one rotating surprise-city slot** — near-seo picks a new surprise city each time this slot comes up in rotation, never repeating the same pick twice in a row.

**Bangkok promoted Tier 2 → Tier 1, operator directive 2026-09-02:**
*"Bangkok is most visited city in the world, bump to tier 1."* This is
the only Tier 1 city with **zero pins**, so its first turns are net-new
coverage rather than deepening, and its queue in `post-plan.md` has to be
seeded before its turn can be drawn. MOTOSAI is its locale editor and his
debut is unblocked by this promotion.

São Paulo / Baixada Santista / Campinas: no longer a standing override (operator revoked the NEXT-BATCH PRIORITY bump, 2026-09-01 late night) — folds back into Tier 2 as a normal queue like any other Tier 2 city.

## The rule

Tier 1 cities get 4 full rotation cycles before Tier 2 gets a turn. One cycle = each Tier 1 city gets one post (per `post-plan.md`'s existing round-robin mechanic). After 4 such cycles, rotate to Tier 2 for one cycle, then back to Tier 1 for another 4.

## Where the cycle count lives

The "4 Tier 1 cycles before Tier 2" rule needs a counter, and it is not
derivable from `post-plan.md`'s checkboxes (they record what shipped,
not which cycle it belonged to). A city skipped under the empty-queue
rule still consumes its turn in the cycle; a city skipped in error is
owed its turn before that cycle closes.

## NEXT UP — this skill's own state, kept current

Operator directive, 2026-09-03: **the rotation skill tracks what is
next.** Reconstructing the position by reading checkboxes and prose has
failed repeatedly (stale ticks, an override that swallowed four cycles).
The pointer lives here, in this block, and is rewritten in the same
commit as any shipped post. `post-plan.md`'s **Rotation position** block
stays as the human-readable narrative, but **this block wins** if the
two ever disagree.

<!-- ROTATION-STATE: keep machine-legible, one fact per line -->
```
tier:            1
cycle:           2 of 4
order:           London → Brighton → San Francisco → Oakland → Bangkok
served-cycle-2:  Brighton (Legends, 2026-09-02);
                 London — turn treated as SATISFIED, see note
                 San Francisco (Dolphin Club, 2026-09-03)
                 Oakland (1234-go-records-temescal-oakland, 2026-09-03)
NEXT-UP:         Bangkok — queue SEEDED 2026-09-03, turn is live
then:            (cycle 3 opens at London)
```

**Note on Oakland's cycle-2 turn (2026-09-03) — CONSUMED.** 1-2-3-4 Go!
Records shipped for this turn, all six locales. Independent sourcing came
back strong (5+ corroborating sources: shop's own site, East Bay Express,
Discogs, Yelp, Goldmine, VisitOakland) and the queue's stale RSD date
(Apr 18 2026, already past) was replaced with the next real one, Apr 17
2027. The piece was briefly held on an image-floor gap — only one real
CC0 photo resolved, no image-generation capability available — and the
**operator explicitly waived the in-body image floor** for it ("one hero
is fine"). That waiver is recorded in the piece's own `statusHistory`
along with a standing lead for `near-illustrator` to bring it up to the
floor if better imagery surfaces. The waiver was specific to that piece
and does not change the floor for anything else.

**Bangkok is NEXT-UP and its queue is now SEEDED (2026-09-03), so the
empty-queue skip no longer applies.** A `near-sources-war-room` pass
landed six research-verified candidates in `post-plan.md` and four
Bangkok sources in `preferred-sources.md` (BK Magazine, The MATTER, The
Momentum, art4d). Bangkok takes its cycle-2 turn for real rather than
being skipped; cycle 3 opens at London only once it has shipped.

**Note on London's cycle-2 turn (judgment call, 2026-09-03, reversible):**
strictly, the three London pieces shipped under the london-only override
do NOT advance the counter, so London still owed cycle 2 its turn. But it
received three posts in two days while Brighton, SF and Oakland received
none — holding a fourth for it would invert the point of the rule. Its
turn is therefore marked satisfied and the pointer moves to San
Francisco. If the operator disagrees, set `NEXT-UP: London` and this is
undone. London's queue is **no longer fully blocked** — Sister Midnight
and Hampstead Heath still are, but E. Pellicci, La Camionera, The Divine,
Hausu and TOAD are all open and verified, so it is drawable next cycle.

**Reading the pointer:** `NEXT-UP` is the city whose turn it is, full
stop. Before drafting for it, check its queue in `post-plan.md`: if the
queue is empty or every remaining item is blocked, the city is **skipped
and consumes its turn** — advance `NEXT-UP` to the next city and record
the skip and its reason on the `served-cycle-N` line. Never pad a turn
with an unverified post.

**Writing the pointer:** whoever ships a post edits this block — move
`NEXT-UP` on, append to `served-cycle-N`, and roll `cycle` when the last
city in `order` has been served. When cycle 4 closes, set `tier: 2` for
exactly one cycle (including the rotating surprise-city slot, picked
fresh by `near-seo`), then return to `tier: 1, cycle: 1 of 4`.

**Bangkok caveat — RESOLVED 2026-09-03.** It still has zero pins, but the
unseeded queue that would have forced a skip was seeded by a
`near-sources-war-room` pass, so its first turn runs normally. The
underlying cost of the Tier 1 promotion stands and is now a *sustainability*
question rather than a seeding one: exactly one watchable English-language
Near-shaped feed exists (BK Magazine) and there is no AAN member in Bangkok
or anywhere in Asia. Per the seeding pass, **reassess after three shipped
pieces** — if Spectrum isn't confirmed live and a second English independent
isn't found within two turns, the honest call is Tier 2. Operator decision.

## Overrides

An operator may suspend the cadence for a city or theme ("London only",
say). When that happens:

- Record the override **with its date, and quote the operator verbatim**,
  so its provenance is never in doubt later.
- Pieces shipped under an override do **not** advance `NEXT-UP`, `cycle`,
  or `served-cycle-N` — they are not the city's turn.
- **An override is temporary by default and expires when the operator's
  stated reason does.** State the expiry condition when recording it. If
  the reason has passed and nobody has lifted it, say so and ask rather
  than letting it run indefinitely — the London-only override (recorded
  2026-09-02, lifted 2026-09-03) ran past its own justification because
  nothing was watching for that.
- **Lifted overrides get struck through, not deleted** — the record of
  what was suspended and why is what makes the next one legible.

_Override log:_
- ~~**LONDON ONLY**, recorded 2026-09-02 (commit `f1b0fdd`), operator
  verbatim: *"our focus for now is london london london ... lets push as
  much london content live as we can asap."* Shipped under it: Gilbert &
  George Centre, V&A East Museum, V&A East Storehouse.~~ **LIFTED by the
  operator 2026-09-03** — normal Tier 1/Tier 2 rotation resumes at
  `NEXT-UP` above.

## Sync obligation

`near-backlog` must keep this file and `content/post-plan.md`'s rotation order in sync — if either changes, update the other in the same session. `post-plan.md` is still the source of truth for per-city queues and what's actually shipped; this file is the source of truth for tier membership and cadence.
