# content-rotation

Owns the geographic tier list and rotation cadence for `content/post-plan.md`. Operator directive, 2026-09-01 — supersedes any prior tier list in post-plan.md.

## Tiers

A tier is a **share of output**, not a position in a nested cycle — see
[The rule](#the-rule). Membership below; cadence there.

**Tier 1 — 6 of every 10 posts, round-robin:** London, Brighton, San
Francisco, Oakland, **Bangkok**.

**Tier 2 — 3 of every 10 posts, burst to one city:** Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu, **Tokyo, Melbourne, Seattle** (Tokyo/Melbourne added by operator directive 2026-09-03; **Seattle** same day — *"make sure seattle is at least tier 2"*, so it is a Tier 2 member outright rather than waiting on its queue being seeded as the `post-plan.md` note previously had it. Its queue is empty, so it is **held** until seeded — see the hold rule), plus **one rotating surprise-city slot** — near-seo picks a new surprise city each time this slot comes up in rotation, never repeating the same pick twice in a row.

**Tier 3 — 1 of every 10 posts, burst to one city.** Operator directive,
2026-09-03: Florianópolis, Porto Alegre, Curitiba, Belo Horizonte,
Recife, Salvador.

**All six are HELD until a sources pass clears them** (operator decision,
same day). None has a queue in `post-plan.md` or a single feed in
`sources.md` / `preferred-sources.md` — they appear only in
`preferred-destinations.md`. A held city does **not** consume Tier 3's
share; the share passes to the next cleared city, and if none is
cleared, Tier 3's slot goes back to Tier 2 for that ten. Clearing a city
means the `near-sources-war-room` pass found **≥1 watchable local feed
and ≥3 verified candidate pins**, exactly as Bangkok's seeding pass
worked. A city that yields no watchable independent source stays held
rather than being covered from trade press and listings — that is the
Bangkok sustainability question arriving early, and it is cheaper to
answer before the city is in rotation than after.

Worth stating plainly, because the tier name understates it: **Brazil is
already Near's second-largest bloc** — 25 pins across São Paulo (11),
Santos (5), Guarujá (2), São Vicente (2), Praia Grande, Paraty,
Ilhabela, Rio and Trancoso, against London's 22. Tier 3 is not "Brazil
is low priority"; it is the *unopened* Brazilian cities, while the
Baixada Santista / São Paulo cluster continues to sit in Tier 2 as deep
existing coverage.

**Bangkok promoted Tier 2 → Tier 1, operator directive 2026-09-02:**
*"Bangkok is most visited city in the world, bump to tier 1."* This is
the only Tier 1 city with **zero pins**, so its first turns are net-new
coverage rather than deepening, and its queue in `post-plan.md` has to be
seeded before its turn can be drawn. MOTOSAI is its locale editor and his
debut is unblocked by this promotion.

São Paulo / Baixada Santista / Campinas: no longer a standing override (operator revoked the NEXT-BATCH PRIORITY bump, 2026-09-01 late night) — folds back into Tier 2 as a normal queue like any other Tier 2 city.

## The rule

**A tier is a share of every ten posts.** Six go to Tier 1, three to
Tier 2, one to Tier 3.

- **Tier 1 spends its six round-robin**, one post per city in `order`,
  wrapping when it reaches the end. Deepening cities that already rank
  is what the tier is for.
- **Tier 2 and Tier 3 spend their share as a burst on ONE city** —
  three consecutive posts for one Tier 2 city, one for a Tier 3 city —
  not spread a post each across the membership. Next ten, the next city
  in that tier's order gets the burst.
- The ten is a **ledger, not a queue**: within a ten the posts can be
  drawn in any order, and a piece drawn out of turn for a dated reason
  (a festival window closing) spends its tier's share like any other.

### Why share-of-output, and why bursts

Replaced the nested "Tier 1 ×4, then Tier 2 ×1" cycle on 2026-09-03,
after the Product Trio review the operator asked for. Three reasons,
all of which the old rule failed on:

1. **Nested cycles made lower tiers unreachable, silently.** Tier 2 had
   grown to 13 slots, so a super-cycle was 33 posts and Tier 3 "after
   Tier 2 runs twice" put Florianópolis **66 posts out** — more than the
   75 pins the site had published in its entire existence. Nobody
   decided that; it fell out of the arithmetic.
2. **Adding a city used to change the cadence for everyone.** Tokyo,
   Melbourne, Seattle and the surprise slot all joined Tier 2 in one
   day, diluting every Tier 2 city *and* pushing Tier 3 further away.
   Under a share, adding a city splits **that tier's** share more ways
   and touches nothing else. That property is the point.
3. **Round-robin below Tier 1 manufactured thin content, which is the
   opposite of the SEO goal.** Ten cities sit at exactly one pin. A
   one-pin city ranks for nothing, has no internal linking mass and no
   collection to hang it on — it is an orphan, a mild negative rather
   than a down payment. A city is worth opening when it can reach
   cluster depth in a short window, so the share goes in as a burst:
   several pins plus a collection that links them.

Tier vocabulary is deliberately kept — it is how the operator thinks
about geography and it renders straightforwardly in a dashboard as
share-of-output bars.

## Where the count lives

The share needs a counter and it is **not** derivable from
`post-plan.md`'s checkboxes, which record what shipped and not which ten
it belonged to. Track `posts-this-ten` and the per-tier spend in the
ROTATION-STATE block below.

A **held** city (empty or fully-blocked queue) does not consume its
tier's share — the share passes to the next city in that tier's order,
and the hold is recorded with its reason. This reverses the old
empty-queue rule, which charged a city for a turn it could not take and
so pushed unseeded cities permanently out of reach. A city skipped in
**error**, rather than held, is owed its post before the ten closes.

If a tier cannot spend its share at all — every member held — the
remainder falls to the tier above it, and the shortfall is recorded on
the `held:` line rather than passing unremarked.

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
ten:             #1 under share-of-output (opened 2026-09-03)
spent:           T1 4 of 6   T2 3 of 3 (SPENT)   T3 0 of 1
t1-order:        London → Brighton → San Francisco → Oakland → Bangkok
t1-spent:        Brighton (Legends, 2026-09-02)
                 London — SATISFIED, see note
                 San Francisco (dolphin-club-san-francisco, 2026-09-03)
                 Oakland (1234-go-records-temescal-oakland, 2026-09-03)
t2-spent:        Barcelona & Region — Sitges burst, 4 pins + collection,
                 2026-09-03. Exactly the burst shape the new rule wants,
                 and it landed before the rule existed. See note.
t3-spent:        nothing — all six Tier 3 cities HELD pending the
                 sources pass. Share does not carry; see hold rule.
NEXT-UP:         Bangkok (Tier 1) — queue SEEDED 2026-09-03, live
then:            London, to close Tier 1's six
held:            Seattle (T2, no queue) · all of Tier 3 (no sources)
```
<!-- CORRECTION, 2026-09-03: San Francisco's turn was briefly marked
UNSERVED here on the belief that its Dolphin Club pin had never shipped.
That was wrong and is reversed. `dolphin-club-san-francisco` IS live,
six locales, WILD0. The stashed folder was `dolphin-club-aquatic-park-
san-francisco` — a DUPLICATE of the same venue under a second slug,
which is a dedupe-by-place violation, not a missing pin. SF's turn
stands as served. The general lesson survives the specific error: verify
a slug is live with a curl before ticking, and check for a near-miss
slug before concluding a piece is missing. RESOLVED 2026-09-03: the
duplicate folder is deleted. Its research was a subset of the live
pin's, so nothing needed merging. Note for `dedupe-by-place`: the two
slugs differ by a whole locality segment, so string similarity would
never have flagged them — match on venue name + coordinates instead. -->

**Note on the Sitges push (2026-09-03) — BARCELONA'S TIER 2 TURN IS
SPENT.** Four Sitges pins and a collection shipped that day off the
operator's directive (*"we should probably have a sitges push with the
major queer and cinema events"*). This was **first recorded as an
override and that was wrong** — the operator corrected it the same day
(*"i didnt mean to override with sitges take my input as any backlog
item by default"*), so it was an ordinary backlog item drawn out of turn
and it counts. Sitges is not itself in either tier's order, but it is
Barcelona & Region (STEFAN's remit), so **Barcelona's Tier 2 turn is
marked served** rather than left waiting to be drawn again. `NEXT-UP`
stays **Bangkok** — Sitges was drawn ahead of it, which does not consume
Bangkok's turn. Side effect worth knowing: `post-plan.md`'s Barcelona
entry is no longer an empty queue — it now carries three drafted-and-
verified leads plus one explicitly held one, which is exactly what
Barcelona's *next* turn should draw from.

The stated reason for drawing out of turn, per the rule that this must
be written down: the Sitges Film Festival's 8–18 October window closes,
and the piece would have been worth less after it.

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
Momentum, art4d). Bangkok takes its post for real rather than being
held; Tier 1's six close at London once it has shipped.

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

**Reading the pointer:** `NEXT-UP` is the city whose post is next, full
stop. Before drafting for it, check its queue in `post-plan.md`: if the
queue is empty or every remaining item is blocked, the city is **held —
it does not consume its tier's share**. Move `NEXT-UP` to the next city
in that tier's order and record the hold and its reason on the `held:`
line. Never pad a share with an unverified post.

**Writing the pointer:** whoever ships a post edits this block — move
`NEXT-UP` on, increment the right counter on `spent:`, and append to the
matching `tN-spent:` line. When all three shares are spent, open the
next ten: reset `spent:` to zeroes, advance `t1-order` to where the
round-robin left off, and hand Tier 2's and Tier 3's bursts to the next
cleared city in each. `near-seo` picks the surprise city fresh whenever
that slot takes Tier 2's burst.

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

**An operator request is NOT an override by default.** Operator
directive, 2026-09-03, verbatim: *"i didnt mean to override with sitges
take my input as any backlog item by default."* Anything the operator
asks for enters `BACKLOG.md` as an ordinary candidate, gets RICE/MoSCoW
scored against everything else in `near-backlog`'s menu, and — when it
ships — **counts against rotation accounting exactly like any other
piece**. It is not exempt from the cadence just because he asked for it.

An **override** is the narrower thing: the operator explicitly
*suspending* the cadence for a city or theme ("London only", say). That
requires him to say so. If he has not, it is a normal item. When he
does:

- Record the override **with its date, and quote the operator verbatim**,
  so its provenance is never in doubt later.
- Pieces shipped under an override do **not** advance `NEXT-UP`, `spent`,
  or any `tN-spent` line — they do not come out of a tier's share.
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
