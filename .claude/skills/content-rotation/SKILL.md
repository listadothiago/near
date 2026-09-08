# content-rotation

Owns the geographic tier list and rotation cadence for `content/post-plan.md`. Operator directive, 2026-09-01 — supersedes any prior tier list in post-plan.md.

## Tiers

A tier is a **share of output**, not a position in a nested cycle — see
[The rule](#the-rule). Membership below; cadence there.

**Tier 1 — 6 of every 10 posts, round-robin:** London, Brighton, San
Francisco, Oakland, **NYC**.

_Operator directive 2026-09-07: **Bangkok moved Tier 1 → Tier 2**, and
**NYC added to Tier 1** in its place. Tier 1 remains a five-city
round-robin. P2.2 (Bangkok seeding war room) still stands, now at Tier 2
cadence. NYC has no `post-plan.md` queue yet — it is **held** under the
hold rule below until seeded._

**Tier 2 — 3 of every 10 posts, burst to one city:** Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu, **Bangkok, São Paulo (capital), Baixada Santista, Rio de Janeiro, Campinas, Los Angeles** (all six added by operator directive 2026-09-07 — Bangkok demoted from Tier 1; São Paulo/Baixada Santista/Campinas are the standing priority cluster; Rio and LA are new), **Tokyo, Melbourne, Seattle** (Tokyo/Melbourne added by operator directive 2026-09-03; **Seattle** same day — *"make sure seattle is at least tier 2"*, so it is a Tier 2 member outright rather than waiting on its queue being seeded as the `post-plan.md` note previously had it. Its queue is empty, so it is **held** until seeded — see the hold rule), plus **one rotating surprise-city slot** — near-seo picks a new surprise city each time this slot comes up in rotation, never repeating the same pick twice in a row. **Mexico City: confirmed in-tier 2026-09-04** against the operator directive *"make sure mexico city is in some priority tier, it should be"* — it was already a Tier 2 member, so no change was needed. Recorded here so the directive is not re-raised; if the intent was Tier 1 rather than "some priority tier", that is an escalation the operator should state explicitly, since Tier 1 is a five-city round-robin and adding a sixth changes every city's share.

**Tier 3 — 1 of every 10 posts, burst to one city.** Operator directive,
2026-09-03: Florianópolis, Porto Alegre, Curitiba, Belo Horizonte,
Recife, Salvador. **Expanded by operator directive 2026-09-07:** Denver,
Chicago, Miami, Bologna, Medellín, Montevideo, São Carlos-SP, Litoral
Paulista, São Vicente-SP, New Jersey, San Diego, plus **one rotating
surprise-city slot** (same never-repeat-consecutively rule as Tier 2's).

**All eleven 2026-09-07 additions are HELD** under the Tier 3 gate below
(≥1 verified independent local source AND ≥3 verified candidate pins) —
none has been through a sources pass yet. Do not draw them until seeded.

**Sources pass RAN 2026-09-03 — three cities cleared, three still
held.** All six now have at least one verified live local feed in
`sources.md`, so the feed half of the gate is met everywhere. The pin
half is not:

- **CLEARED — Porto Alegre, Curitiba, Salvador.** Each has a declared,
  funded independent outlet (Matinal + Sul 21, Plural, Correio Nagô) and
  three or more named candidate pins with addresses and 2026 local-press
  corroboration. Drawable.
- **STILL HELD — Florianópolis, Recife, Belo Horizonte.** Feeds are
  fine; the candidate pins are not yet verified to the bar. Floripa's
  most-cited venue turned out to be historic rather than open, Recife's
  record-shop lead rests on a 2013 blog post, and BH's candidates come
  from listicles with the thinnest independent press layer of the six.
  These need per-venue verification, not more discovery.

**Draw order within Tier 3 is by readiness, not population.** Porto
Alegre first — it has two independents and the deepest candidate list.
Belo Horizonte is the largest of the six and goes last.

The original hold rationale, kept because it still governs the three
that remain held: none of the six had a queue in `post-plan.md` or a
single feed in `sources.md` / `preferred-sources.md` — they appeared
only in `preferred-destinations.md`. A held city does **not** consume Tier 3's
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

### Seed on turn — the first response to an empty queue is to fill it

**Operator directive, 2026-09-07, verbatim: *"seed those stuck
destinations when their turn comes."*** Prompted by the finding that
nine of Tier 2's twelve cities — Rome, Portland, Mexico City, Las Vegas,
Orlando, Chengdu, Tokyo, Melbourne, Seattle — had empty queues, so the
tier's burst was in practice circling two or three cities while the
other nine were skipped in perpetuity by a rule that was only ever meant
to stop a *single* turn being padded with unverified work.

So: **when a city's turn comes up and its queue is empty or fully
blocked, the turn's work is a seeding pass on that city.** Run
`near-sources-war-room` against it — the same pass that seeded Bangkok
on 2026-09-03 and the six Tier 3 cities the same day. Do not silently
move the pointer on.

- **The bar is unchanged and is not negotiable to make a seed "work":**
  ≥1 watchable local feed logged in `sources.md` /
  `preferred-sources.md`, and ≥3 candidate pins with addresses and
  current local-press corroboration.
- **Seed clears → the city draws its turn**, from the queue just seeded,
  in the same session if there is room and in the next one if not. The
  share is spent by that city, not passed on.
- **Seed fails the bar → *now* the city is genuinely held**, the share
  passes to the next city in the tier's order, and the `held:` line
  records the reason as a failed seeding attempt with its date — not
  just "no queue". A city that yields no watchable independent source
  stays held rather than being covered from trade press and listings;
  that judgment predates this directive and survives it.
- **A seeding pass alone is a legitimate outcome for a turn** if the
  research runs long. Record it on the `tN-spent:` line as seeded-not-
  yet-drawn so the next session picks up the draft rather than
  re-seeding.
- Don't batch-seed the whole tier speculatively. Seeding is real research
  and it goes stale; it happens **when the turn comes**, which is what
  the operator asked for.

Prior seeding passes are the model to copy: Bangkok's (`post-plan.md`
Bangkok section, full analysis in `content/opportunities.md`) and the
Tier 3 six, which cleared three cities and honestly failed three.

### The hold rule

A **held** city — one whose queue is empty or fully blocked **and whose
seeding pass has failed the bar above** — does not consume its tier's
share. The share passes to the next city in that tier's order, and the
hold is recorded with its reason. This reverses the older empty-queue
rule, which charged a city for a turn it could not take and so pushed
unseeded cities permanently out of reach. A city skipped in **error**,
rather than held, is owed its post before the ten closes.

Note the ordering, because it is the whole point of the 2026-09-07
directive: **an empty queue is a trigger to seed, not a reason to skip.**
A hold is what's left after seeding has been tried and honestly failed.

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
ten:             #2 under share-of-output (opened 2026-09-04)
spent:           T1 6 of 6 shipped   T2 0 of 3 (Rome seeded, not drawn)   T3 0 of 1
t1-order:        Brighton → San Francisco → Oakland → NYC → London
                 (advanced to where ten #1's round-robin left off: ten #1
                 ended on London as its 6th draw, so ten #2 resumes at
                 Brighton. Five cities over six slots means one city draws
                 twice — the wrap lands the 6th slot back on Brighton.)
t1-spent:        Brighton — SERVED 2026-09-04 (Green Door Store,
                 Trafalgar Arches, STEFAN; Brighton's 2nd pin ever).
                 Brighton's post-plan.md queue still holds The Actors and
                 Club Revenge plus the held Polyglamorous entry and the
                 Pride Village Party collection, but the rotation slot is
                 spent.
                 San Francisco — SERVED 2026-09-07 (queer-surf-pacifica,
                 FIT-BOT, all six locales). SF's queue is now FULLY
                 DRAINED — this was its last open item. Three corrections
                 shipped with it: current sliding-scale rates taken from
                 the org's own live registration form rather than the
                 widely-repeated KQED figure; the SWITCH hook was already
                 past and became a durable "runs each June, free" claim
                 with no date; and the geography is Linda Mar OR the
                 Princeton Jetty, Half Moon Bay, not Pacifica alone.
                 Oakland — SEEDED then SERVED 2026-09-07, both in the
                 same slot. The seeding pass cleared the bar (new
                 verified-live feed Oakland Voices, plus the Nosh
                 vertical and the Lakeshore LGBTQ district channels; six
                 candidate pins with addresses). The draw it owed then
                 SHIPPED the same day:
                 starline-san-pablo-gateway-oakland, STEFAN, all six
                 locales, trust auto/active. THREE CORRECTIONS shipped
                 with it: (1) the name chain has FOUR links, not three —
                 the room was briefly A CAPELLA between Starline Social
                 Club and Bad Decision, which the seeding pass missed;
                 (2) the NEIGHBOURHOOD was wrong in both available
                 sources — post-plan said Uptown, Oaklandside said West
                 Oakland, and OpenStreetMap puts 2236 MLK Jr Way in San
                 Pablo Gateway, which is what shipped; (3) the HOURS had
                 already moved since the relaunch (5pm start then, 3pm
                 now), so the copy refuses to treat the numbers as
                 durable and points the reader at the venue's bio. The
                 Yelp-still-says-CLOSED correction that was the whole
                 angle held up and is the headline. Also confirmed: the
                 blocked-source browser retry worked a THIRD time this
                 week (oaklandside.org and berkeleyside.org both 429 the
                 fetch backend, both read fine via claude-in-chrome).
                 OAKLAND'S QUEUE SURVIVES for its next turn — Lakeshore
                 LGBTQ district, the henry j., The Lodge, Sable Lounge,
                 and Egg Palace still PENDING. The intended NEXT OAKLAND
                 DRAW is the Oakland reopenings collection, once the
                 henry j. is live.
                 NYC — SEEDED then SERVED 2026-09-07, both in the same
                 slot. Seeding pass (committed afe5454) landed Hell
                 Gate, THE CITY, and Greenpointers as new sources plus
                 10 candidates (4 auto-trust, 6 review-trust). All four
                 auto-trust candidates shipped the same day: El Califa
                 de León (Flatiron), Elder (Hudson Yards), The Little
                 Bookshop (East Williamsburg), and Kween (Astoria) —
                 Near's first Queens pin and first NYC nightlife-sound
                 pin. All six locales, `npx next build` verified,
                 pushed at 99582fa. One open discrepancy: El Califa de
                 León's Google listing shows "temporarily closed" with
                 no corroborating press or site notice — logged in its
                 `statusHistory` as unresolved rather than treated as a
                 real closure; recheck on NYC's next turn. NYC'S QUEUE
                 SURVIVES for its next turn — the six review-trust
                 candidates (Bar Etienne, Herbie's Burgers, Kirbee's,
                 Monkey Thief, Cospa Ramen, and the time-limited Plaza
                 pop-up, which is flagged do-not-draft-as-pin) are
                 PENDING operator approval before drafting.
                 London — SERVED 2026-09-07 (The Divine, Dalston,
                 `the-divine-dalston-london`, STEFAN, all six locales,
                 trust auto/active). THE CORRECTION held up: The Glory
                 closed 31 Jan 2024 after ten years in Haggerston; The
                 Divine (opened Feb 2024, same three founders — Jonny
                 Woo, John Sizzle, Colin Rothbart) is its direct
                 successor, not a separate venue some guides still list
                 The Glory as if it were open. Address/coordinates
                 confirmed via Google Maps (33-35 Stoke Newington Rd,
                 N16 8BJ; geocode confidence 0.95). Sourced beyond Time
                 Out — Attitude, London the Inside, official site,
                 Instagram, Reddit (r/downloadfestival, r/londonlgbt);
                 Google reviews read recent+lowest (4.0/129), mixed
                 testimony ("more sterile than the former Glory",
                 queue/re-entry complaints) attributed and dated as
                 UGC. Hero: tier-1 real source photo (owner-submitted
                 Google Business photo). `npx next build` verified;
                 committed `ad91c73`, hero fix `3fd37bb`, pushed.
                 LONDON'S QUEUE SURVIVES for its next turn — Sister
                 Midnight and Hampstead Heath still HELD; the time-boxed
                 Bayeux Tapestry/British Museum entry (window closes
                 21 Oct 2026) is the strongest open candidate for
                 London's next draw.
                 Brighton — SERVED AGAIN 2026-09-08 (The Actors,
                 Kemptown, `the-actors-kemptown-brighton`, PLINIO with a
                 CUBIC-V consult on the theatre programming, all six
                 locales, trust review/active). THIS CLOSES TIER 1'S SIX
                 SLOTS FOR TEN #2. Re-verification (the queue's own
                 currency-risk flag, since its only source was a Jan
                 2022 magazine piece) confirmed the claim rather than
                 finding it stale: Brighton & Hove City Council's own
                 official ACV list PDF (18 May 2022) independently
                 confirms the 04/01/2022 decision date; Gscene
                 independently corroborates the Queer the Marly campaign
                 and Michelle Steele's role; current programming and two
                 additional awards (Brighton Fringe Best Small Venue
                 2026, Brighton Pub of the Year 2025) confirmed live via
                 the venue's own site, Instagram, and Reddit r/brighton
                 (read via claude-in-chrome after reddit.com fetch-
                 blocked the search backend). THE CORRECTION itself
                 re-verified live: welovebrighton.com's own directory
                 still serves a page titled "The Actors" at a URL path
                 reading `/the-marlborough-theatre/`. `check-geocodes.mjs`
                 and `check-duplicates.mjs` both clean; `npx next build`
                 verified. Brighton's remaining queue (Club Revenge, the
                 held Polyglamorous entry, the Pride Village Party
                 collection lead) SURVIVES for Brighton's next turn.
t2-spent:        0 of 3 shipped this ten — Rome (next city in Tier 2's
                 order after Barcelona) was SEEDED 2026-09-08 by a
                 `near-sources-war-room`-equivalent pass (full detail:
                 post-plan.md Rome section, preferred-sources.md Rome
                 entry). Bar CLEARED: vernissagerome Instagram verified
                 live/active as the watchable feed; 4 candidate pins
                 with addresses and 2026 corroboration (Attilio,
                 Via di Villa Chigi 68; Terrazza Hey Güey @ Chapter
                 Roma; Monk Garden; Kalavrì), one (Attilio) already with
                 two independent sources. Correction logged: the
                 originally-cited `che.famo.stasera` IG handle does not
                 resolve under that name — do not cite it as verified.
                 No posts drafted this session (seeding-only turn per
                 "a seeding pass alone is a legitimate outcome"); the
                 share stays OPEN, not spent, so it does not pass to
                 Curitiba yet.
t3-spent:        nothing yet this ten — burst goes to Curitiba, next on
                 t3-draw after Porto Alegre.
NEXT-UP:         Rome (Tier 2 burst, SEEDED 2026-09-08 — draw from the
                 queue directly, no further seeding needed). Updated
                 2026-09-08: Rome's turn this session was a seeding pass
                 (post-plan.md Rome section), which cleared the bar but
                 did not draft. Per "a seeding pass alone is a
                 legitimate outcome for a turn," NEXT-UP stays on Rome
                 rather than advancing to Curitiba — the next session
                 should draft Attilio first (strongest-sourced
                 candidate), then Terrazza Hey Güey / Monk Garden /
                 Kalavrì once each has a second corroborating source.

                 Prior reasoning (2026-09-08, before this session's
                 seeding pass) — Tier 1 is now FULLY SPENT for
                 ten #2 (Brighton's sixth and final T1 slot shipped
                 2026-09-08: The Actors, Kemptown, PLINIO with a
                 CUBIC-V consult, all six locales — see t1-spent below).
                 With T1 done and both T2 (0 of 3) and T3 (0 of 1) still
                 unspent, the pointer moves to whichever tier's burst is
                 more overdue rather than opening a new ten (a reset per
                 "Writing the pointer" requires ALL three shares spent).
                 REASONING: T2's burst (Rome) is the larger share (3 of
                 every 10 posts vs. T3's 1) and, unlike ten #1 — where
                 T2's Sitges burst was drawn early, mid-way through T1's
                 six slots — it was never drawn at all this ten despite
                 the standing rule that T2/T3 bursts are "drawn within
                 this ten as their shares come up... not queued behind
                 all six Tier 1 slots." That makes Rome the more overdue
                 of the two remaining shares, so it draws next; Curitiba
                 (T3) follows once Rome's turn is spent. Check Rome's
                 queue in post-plan.md before drafting — if empty or
                 blocked, that turn becomes a seeding pass per "Seed on
                 turn," not an automatic hold.

                 CORRECTED 2026-09-07: this pointer read "Bangkok (Tier
                 1) — DRAW" while the tier roster above, updated the same
                 day by operator directive, had already moved Bangkok to
                 Tier 2 and put NYC in Tier 1 in its place. The pointer
                 named a city in a tier it no longer belonged to. The
                 operator confirmed the directive is authoritative and
                 the pointer was stale. Lesson: a tier change must
                 rewrite NEXT-UP in the same edit, or the file
                 contradicts itself and the next session draws the wrong
                 city.

                 Bangkok's queue is NOT lost — it is seeded and
                 research-verified (post-plan.md Bangkok section, full
                 analysis in opportunities.md), with BAB 2026 already
                 shipped. It now waits for a Tier 2 burst rather than a
                 Tier 1 slot. Its strongest open candidates remain
                 Mischa Cheap / Song Wat and the live-music obituary
                 collection. Re-verify the Studio Lam and Noise House
                 closure dates against primaries at draft. Do NOT draft
                 the Thailand Coffee Fest item without first resolving
                 that it is not actually in Bangkok. The standing Tier 1
                 sustainability reassessment is now MOOT — the demotion
                 to Tier 2 is the call that question was asking for.
then:            after NYC, follow t1-order above. Tier 2's and Tier
                 3's bursts (Rome, Curitiba) get drawn within this ten as
                 their shares come up — they are not queued behind all
                 six Tier 1 slots.
t3-draw:         Curitiba (next cleared), then Salvador. Porto Alegre
                 SERVED 2026-09-04 — its post-plan.md queue still has
                 unspent candidates, but the rotation slot is spent.
held:            Seattle (T2, no queue) · Florianópolis, Recife,
                 Belo Horizonte (T3 — feeds verified, pins not) · the
                 eleven Tier 3 cities added 2026-09-07 (Denver, Chicago,
                 Miami, Bologna, Medellín, Montevideo, São Carlos-SP,
                 Litoral Paulista, São Vicente-SP, New Jersey, San
                 Diego — none through a sources pass)
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

**Note on London's real 6th-of-6 draw (2026-09-04) — TIER 1 NOW FULLY
SPENT.** `la-camionera-hackney-london` shipped as the actual drawn London
turn that this block's own NEXT-UP had been pointing at (see the entry
above — "closes Tier 1's six for this ten"), distinct from the earlier
"SATISFIED, see note" credit London got for its three-piece burst under
the since-lifted London-only override. This is a real, counted draw, not
a second satisfied-by-proxy credit, and it is what brings T1 to 6 of 6.
With T2 already SPENT (Sitges burst) and only T3 left unspent (0 of 1),
`NEXT-UP` moves to Porto Alegre — Tier 3's turn — rather than resetting
into a new ten, since a reset per "Writing the pointer" requires all
three shares spent, and T3 hasn't gone yet this ten.

**Reading the pointer:** `NEXT-UP` is the city whose post is next, full
stop. Before drafting for it, check its queue in `post-plan.md`. If the
queue is empty or every remaining item is blocked, **that turn becomes a
seeding pass on that city** — see "Seed on turn" above; run
`near-sources-war-room`, and draw from the queue it produces. Only if
the seed fails the bar (≥1 watchable feed, ≥3 corroborated candidate
pins) is the city **held**, not consuming its tier's share: then move
`NEXT-UP` to the next city in that tier's order and record the hold, its
reason and the failed-seed date on the `held:` line. Never pad a share
with an unverified post — but never skip a city just because nobody has
seeded it yet either.

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
