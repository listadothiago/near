# Near post plan — rotation + per-city queues

Operator decision (2026-08-31): grow round-robin, one post per city per
cycle, instead of finishing one city before starting the next. Every
audience city gets fresh content every cycle, the Latest tab stays
geographically alive, and no community waits weeks for its turn.

**Tier rotation (operator directive, 2026-09-01 — see `.claude/skills/content-rotation/SKILL.md`, the source of truth for this rule):**

Tier 1 — London, Brighton, San Francisco, Oakland — repeats 4 full
cycles before Tier 2 gets a turn. Tier 2 — Berlin, Amsterdam,
Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu,
Bangkok, plus one rotating surprise-city slot picked fresh by near-seo
each time. São Paulo / Baixada Santista / Campinas's standing-override
priority was revoked by the operator (2026-09-01 late night) — it's a
normal Tier 2 queue now, no bump.

Paris/NYC/Seattle/San Diego/Santos-specific/Bologna join Tier 2 when
their queues first get seeded.

**Posts per stop (operator directive, 2026-09-01 late night, corrected
same night):** **1 post per stop, both tiers.** The tier distinction is
purely about how often a city's turn comes around (Tier 1 gets 4 turns
for every 1 Tier 2 turn), not how much gets published per turn — a
bigger batch for the lower tier would work against the point of it
being lower priority. A city whose queue can't support even 1 post that
stop drains what it has (zero, in the empty-queue case) and is
skipped on the rest, per the empty-queue rule below — never padded.

**How this works with research:** publishing rotates; research batches.
A post's expensive half is verification, and that amortizes when a
city's candidates are researched together (the London war room proved
this). So each city keeps a queue of VERIFIED candidates below, drained
top-down on the city's turn. When a queue is down to 1, near-war-room
(mini, single-city) refills it. A city whose turn arrives with an empty
queue is skipped that cycle rather than padded with an unverified post —
rules.md's quality gate outranks the rotation.

**Rules that still bind every post:** all six locales at publish,
link-density, verify-still-open, real hero image or no publish,
push-to-live per post for operator QA.

---

## Rotation position

**Tier 1 order:** London → Brighton → San Francisco → Oakland.

**Brighton took a turn 2026-09-02** (Legends) — out of strict cycle
order, on the operator's call, because seeding its queue the same day
made it finally drawable after being skipped every cycle since the tier
list existed. Treat Brighton as served for cycle 2.

**Cycle 1 of 4 — CLOSED 2026-09-02.** London took its turn
(2026-08-31), Oakland took its turn (Heinold's, 2026-09-01), San
Francisco took its owed turn (The Stud, 2026-09-02). Brighton was
skipped in cycle 1 legitimately — its queue was empty and unseeded at
the time. That is no longer true: it was seeded 2026-09-02 and has four
verified candidates left plus a collection.

Next stop: **London**, which still owes cycle 2 its turn — and whose
queue is effectively BLOCKED, both remaining items included: Sister
Midnight needs an 'opening' status value in the schema, and Hampstead
Heath's source is bot-blocked. Unblocking one of those is a prerequisite,
not a drafting task. Tier 2 gets its single turn after cycle 4 closes.

Whoever ships a post updates this block in the same commit — the cycle
count is not derivable from the checkboxes alone, so it has to be
written down.

## Queues

### London (war-room slate 2026-08-31, verified)
- [x] Gay's the Word — RADAR-X (shipped 2026-08-31)
- [x] Wilton's Music Hall — PLINIO (shipped 2026-08-31)
- [x] London Otters — FIT-BOT (shipped 2026-08-31)
- [x] Walthamstow Wetlands — WILD0 (shipped 2026-08-31; closure re-checked, ends this week and article says so)
- [x] Berry Bros. & Rudd — DARCY (shipped 2026-08-31/09-01; first London travel pin)
- [x] Hazlitt's — NITE-PORTER (shipped; checkbox was stale, caught during 2026-09-01 queue cleanup)
- [x] Studio Voltaire — CUBIC-V (shipped; checkbox was stale, caught during 2026-09-01 queue cleanup)
- [x] Jumbi — STEFAN (shipped; checkbox was stale, caught during 2026-09-01 queue cleanup)
- [ ] Sister Midnight — STEFAN (operator-approved as 'opening'-status pin; schema needs the status value first)

**LONDON FOOD — seeded 2026-09-02, verified, and built for on-the-ground
testing.** The operator has a friend in London this week who can verify
in person, so these are grouped into two WALKABLE CLUSTERS rather than
scattered, and every entry carries an address and real opening hours so a
tester knows when to turn up. London's published food coverage was thin —
Borough Market, Boxpark, Jumbi's kitchen and Lucky Saint, almost no
actual restaurants — and all of these sit on Near's own beat (queer-owned
/ queer-led food) rather than restaurant-trade press.

_Cluster A — Peckham. Jumbi is already published, so this is an existing
pin plus two new ones within walking distance._

- [ ] **Hausu + Upstairs at Hausu, 11A Station Way, Peckham Rye Station SE15 4RX** — FOODIE-9000. Chef Holly Middleton-Joseph's kitchen (Chinese and Trinidadian influences), opened Oct 2024 with her brother Tom Middleton-Joseph and Christian Williams; the upstairs listening bar is named after the 1977 Japanese cult horror film *Hausu*, runs hi-fi and a full bar to midnight. **THE PAIRING: Near already publishes <NearLink> Jumbi, also Peckham, also a hi-fi listening bar with a Caribbean-diaspora kitchen.** Two hi-fi rooms with diaspora kitchens, minutes apart — that is a genuine cross-link and arguably a collection. Covered by Wallpaper*, Hot Dinners, Broadsheet.
- [ ] **TOAD Bakery, 44 Peckham Road SE5 8PX** — FOODIE-9000 or ALLORA DAI. Queer-owned, and specifically sources from queer suppliers and producers, which is the angle — a supply chain, not just an owner. **Hours are tight: Tue–Sat 08:00–15:00, closed Sun/Mon.** A tester must go on a weekday morning.

_Cluster B — Hackney / Dalston. Dalston Superstore is already published._

- [ ] **La Camionera, 243 Well Street, Hackney E9 6RG** — ALLORA DAI or STEFAN. **The strongest single candidate in this batch.** A lesbian bar, which is a nearly-extinct category, opened by Alex Loveless and Clara Solis from body2body — Dalston Superstore's trans masc night — and community-funded into existence. Café by day, wine and cocktails by night, terracotta and a fig tree in the garden. Real press: Wallpaper*, The Face. **THE CORRECTION: guides file it under "Dalston". It is on Well Street in Hackney, E9** — a different neighbourhood and a 25-minute walk. Hours: Mon–Tue 16:00–23:00, Wed–Sun 10:00–late, so the daytime café is testable.
- [ ] **The Divine, Dalston** — STEFAN. 200-capacity café, show-bar and nightclub, opened Feb 2024 by Jonny Woo, John Sizzle and Colin Rothbart as The Glory's "naughty little sister". **THE CORRECTION, and it is a good one: The Glory closed on 31 January 2024 after ten years in Haggerston, and guides still list it as open — one carries a "New 2025 Review" of a venue that had already been shut for a year.** Confirm The Divine's address and current hours at draft.

_SCOPE CORRECTION, operator 2026-09-02: **the London food focus does NOT
have to be queer-only.** The four above were all queer-owned/led, which
over-rotated the batch — Near's beat is independent, embedded,
local-legend places, and the LGBTQIA+ angle is one strong lane inside
that, not the whole road. Broader candidates below, verified to the same
standard._

- [ ] **Bar Italia, 22 Frith Street, Soho W1D 4RF** — PLINIO or FOODIE-9000. **DRAFT THIS ONE FIRST: it closes a gap Near logged weeks ago.** `content/requests.md`'s `hazlitts-london-no-natural-internal-link` asked specifically for "a bar, bookshop, or venue on/near Frith or Dean Street" that Hazlitt's could link to. Bar Italia is on Frith Street, a few minutes' walk. Opened 1949 by the Polledri family and still run by the third generation, Veronica and Anthony Polledri; original red-and-white Formica, a vintage Gaggia, and a floor hand-laid by a family member. **Open 07:00–05:00 daily** — not quite 24h, and listings that claim 24h are wrong, which is the correction. Publishing it also lets the Hazlitt's request be closed.
- [ ] **E. Pellicci, Bethnal Green E2** — FOODIE-9000, with a PLINIO consult. A caff run by four generations of the same family since 1900, with a **Grade II listed Art Deco interior** (listed 2005, Historic England entry 1391332, cited as "an increasingly rare example of the stylish Italian cafe that flourished in London in the inter-war years"). Maria Pellicci has cooked there since 1966 and was made a Knight of the Order of the Star of Italy in 2025; the caff placed 83rd in TasteAtlas's 2025 "100 Most Legendary Restaurants". **CURRENCY RISK, per rules.md: this piece depends on a named living person.** Re-verify Maria Pellicci's status at draft and flag the page to `near-caretaker` — present-tense copy about someone who has died is the exact failure that rule exists to prevent.

**LONDON EAST END — added 2026-09-02 after the operator described the
actual trip: friend based Camden/King's Cross, everything they want to do
is East End (V&A East, Gilbert & George).** This reranks the batch. It
also means **Peckham (Hausu, TOAD) is the wrong side of the river for
this trip** — keep them queued, but they are not tester-verifiable this
week. The two venues below are what the friend is literally going to
stand inside, and Near has neither.

- [ ] **The Gilbert & George Centre, 5a Heneage Street, Spitalfields E1 5LJ** — CUBIC-V. **Highest tester value in the whole batch.** Free entry, on Gilbert & George's own "Art for All" principle; free highlight tours Saturdays at 4pm. **CRITICAL PRACTICAL DETAIL: open Thursday to Sunday only, 11:00–17:45.** A visitor arriving Mon–Wed cannot get in, and that is exactly the fact a guide should lead with rather than bury. Currently showing 'Our George Crompton, WORLDS and WINDOWS'. **INTERNAL LINK READY:** Near already publishes the Old Truman Brewery on Brick Lane, a few minutes' walk.
- [ ] **V&A East Museum, East Bank, 107 Carpenters Road, Queen Elizabeth Olympic Park, Stratford E20 2AR** — CUBIC-V. Opened **18 April 2026**. Admission free, including two permanent "Why We Make" galleries with 500+ objects. Opening exhibition *The Music is Black: A British Story*, 125 years of Black British music, ticketed separately at £22.50 (£10 for students and under-26s) — so "free museum, paid headline show" is the honest framing.
- [ ] **V&A East Storehouse, Hackney Wick** — CUBIC-V. Opened 2025. **THE CORRECTION: this is a SEPARATE venue from the V&A East Museum above, in a different neighbourhood, and listings routinely conflate the two.** 250,000 objects and 350,000 books in a working, behind-the-scenes store you can walk into. Verify the current access/booking model at draft.

_Trip routing this actually implies, for whoever drafts these: the
friend's base is King's Cross, where Near already publishes Central
Station. One East End day covers Gilbert & George (Heneage St) → Old
Truman Brewery (Brick Lane, published, 5 min) → E. Pellicci (Bethnal
Green) → V&A East Storehouse (Hackney Wick) → V&A East Museum
(Stratford), running west to east. La Camionera on Well Street sits
naturally at the Hackney end of that line. That is a real day, and it is
made of four published pins plus four queued ones — worth considering as
a near-blogger collection once the pins exist._

_Unverified leads for the next London food pass, deliberately NOT claimed
as verified: Tayyabs (Whitechapel Punjabi), Mangal 2 (Dalston ocakbaşı),
Silk Road (Camberwell Xinjiang), Maltby Street and Netil markets as
alternatives to the already-published Borough Market. Each needs the full
verify-still-open plus a second independent source before it enters the
queue proper._

_London food dating note: verify hours at draft — three of these four are
day-part-restricted (TOAD closes at 15:00; La Camionera opens at 16:00 on
Mon/Tue), which is exactly the kind of detail a listicle gets wrong and a
tester on the ground can settle._
- [ ] Hampstead Heath ponds — WILD0 (source bot-blocked; verify at draft)

### Brighton (Tier 1) — SEEDED 2026-09-02, research-verified, not yet drafted

Was empty and skipped every cycle since the tier list existed. Seeded by
a single-city research pass on 2026-09-02. Candidates below are
**research-verified** (real, currently-operating, multi-sourced) but each
still needs a fresh at-draft currency check per `verify-still-open`.

- [ ] **The Actors, Kemptown (ex-The Marlborough)** — PLINIO, with a CUBIC-V consult on the theatre programming. A pub the queer community fought to keep: the "Queer the Marly" campaign (co-chair Michelle Steele) won it **Asset of Community Value** status from Brighton & Hove City Council, and it reopened in 2021 as The Actors — 60-seat theatre above an LGBTQ+ and BIPOC-friendly pub, queer since the 1970s, specifically named as where the trans and disabled communities gather. THE CORRECTION: listicles and directories still call it The Marlborough. Best source is Scene Magazine (Jan 2022) — **old, so the ACV status and current operators must be re-verified at draft.**
- [ ] **Polyglamorous @ Quarters** — ALLORA DAI. Brighton's biggest queer dance party, now at Quarters, in the arches that once held the Zap and The Arch. THE CORRECTION: aggregators still list it as monthly at Chalk. It moved. Same stale-listicle shape as Möbel Olfe and The Stud. Confirmed running Oct 2026; pull exact dates at draft from quartersbrighton.co.uk.
- [ ] **Green Door Store, Trafalgar Arches** — STEFAN. Railway-arch grassroots venue, free entry, late bar nightly; named an iconic grassroots venue by the Music Venue Trust. Ran its **first-ever Pride charity concert** in 2026 — reported by Brighton and Hove News (2026-07-19), an independent local outlet, not a listicle. Address: 234 Trafalgar Arches, Lower Goods Yard.
- [x] **Legends, seafront** — NITE-PORTER. SHIPPED 2026-09-02, all six locales. Brighton's first pin ever. A seafront hotel with a club in the basement; the piece's spine is the honest noise warning. NOTE: it was picked partly on a claim that it would open `accommodation` — that was WRONG (hazlitts-london already had), caught at draft time from a stale opportunities.md audit. Accommodation is thin at 2 active, not empty.
- [ ] **Club Revenge** — STEFAN or PLINIO. Brighton's best-known LGBTQ+ club, running since 1991. Lowest-priority of the nightlife picks: well covered elsewhere, so it needs a genuine angle beyond "it exists and is old" before it earns a draft.

**The Brighton collection, not a pin — RADAR-X:** the **Pride Village Party** story. Brighton & Hove City Council's 5-year Pride plan (2023–2028, approved Dec 2023) moved the Kemptown street party off **St James Street** to Marine Parade only from 2025, focusing it on six LGBTQIA+ venues and reinstating traffic on St James Street. Gscene reported objections "spanning the breadth of LGBTQ+ communities." A gay village being routed around by its own city's Pride is a real, documented, council-minuted story — and `world-culture-news` is — per the audit refreshed 2026-09-02 — Near's ONLY remaining empty category (0 active pins). RADAR-X is no longer a byline at zero (2 pins), so the argument for this piece is the empty category and the story itself, not the byline. Primary sources exist and are citable: `democracy.brighton-hove.gov.uk` carries the actual decisions and an "Evolution of Pride in Kemptown" paper.

_Brighton dating note: **Brighton Pride 2026 already happened (1–2 August 2026)** — do not hang a piece on it. 2027 dates were not published as of 2026-09-02; verify before using any Pride hook._

### São Paulo / Baixada / Campinas (normal Tier 2 queue — priority bump revoked 2026-09-01 late night)
- [x] Madê Cozinha Autoral, Santos — FOODIE-9000 (shipped 2026-08-31; address-move correction is the angle)
- [x] Almeida, Santos — PLINIO (shipped 2026-08-31; identified as Restaurante Almeida, Av. Ana Costa 1, founded 1932)
- [x] Quiosque da Cris / Mudança Radical + Praia do Itararé, São Vicente — shipped; checkbox was stale, caught during 2026-09-01 queue cleanup.
- [ ] O Condado + São Vicente scene items from earlier scouting — need verification pass
- [ ] **Campinas — first pin ever, draft this first.** Bar Flor da Lua (craft beer/cocktails/vegan, mixed LGBT-friendly crowd — try first, hits gastronomic+LGBT+hipster in one) or Livre Club (Vila Itapura, ~20yr LGBT+ nightclub) as fallback. Currently sourced from aggregator/listicle content only — needs a real second source and a Campinas outlet onboarded to sources.md before/during drafting.
- [x] Barraca da Dhéia, Guarujá (Praia das Pitangueiras) — ALLORA DAI, shipped 2026-09-02, all six locales. Full redraft from zero (the earlier draft was lost, never committed — commit c20151f). Near's FIRST Guarujá pin, closing that zero-coverage gap. Published inside the spring seasonal window on near-seo's rank-1 call.
- [x] Pracinha do Seu Justino, Vila Madalena (São Paulo capital) — shipped; checkbox was stale, caught during 2026-09-01 queue cleanup.

### Berlin (deep) — war-room slate 2026-08-31, verified
- [ ] SchwuZ (nomadic) — STEFAN (Germany's oldest queer club, insolvent Nov 2025, rebuilding as roaming party series; HOW-TO-PIN decision pending — no fixed address)
- [ ] ://about blank, Ostkreuz — STEFAN (collectively-run queer-left club in the A100 motorway's path; load a fresh A100-status source at draft)
- [ ] SO36 / Gayhane, Kreuzberg — PLINIO (punk landmark; monthly queer Turkish-Arabic night 25+ years; Gayhane dates 26.09/31.10/28.11/26.12.2026 confirmed)
- [ ] Möbel Olfe, Kotti — FOODIE-9000 (current schedule: Tue–Sat from 18:00, Tuesday FLINTA*; listicles still print the 2016 lore — the correction is the piece)
- [ ] Teufelssee, Grunewald — WILD0 (queer nude lake; free, unfenced; FKK/cruising context stated plainly)
- [ ] Vorspiel e.V. — FIT-BOT (Europe's largest LGBT sports club, 39 sports; Oct 2026 tournaments dated; NO Commons image — gates publish)
- [ ] Schwules Museum — CUBIC-V (Susan Sontag + rural-queer shows dated to Nov 2, 2026)
- [ ] Eisenherz Buchladen, Schöneberg — RADAR-X (Europe's oldest surviving gay bookshop, 1978; cross-city queer-bookshop thread with Gay's the Word)
- [ ] Südblock, Kotti — CUBIC-V (daytime queer living room; counselling, Disability Pride Sep 19 2026, sober-ish counterweight)
- [ ] Michelberger Hotel — NITE-PORTER (honest-caveat pick; needs one more independent review source + image check at draft)

_Berlin corrections bank (all sourced): visitBerlin still lists SchwuZ as open (closed Nov 1 2025); Möbel Olfe's "Thursday gay night" lore is stale; Timeout still carries Watergate (closed 2024); "Berghain = queer Berlin" — the actual infrastructure is Kotti + Schöneberg + a lake in a forest._

### Amsterdam — war-room slate 2026-08-31, verified
- [x] De Trut, Oud-West — STEFAN (shipped; checkbox was stale, caught during 2026-09-01 queue cleanup)
- [x] Café 't Mandje, Zeedijk — PLINIO (shipped; checkbox was stale, caught during 2026-09-01 queue cleanup)
- [x] Marineterrein Binnenhaven — WILD0 (shipped; checkbox was stale, caught during 2026-09-01 queue cleanup)
- [ ] Sexyland World, Noord — CUBIC-V (different owner every day, 365 programmers/yr; NO usable Commons image — gates publish)
- [ ] Skatecafé, Noord — FOODIE-9000 (restaurant where the skate ramp becomes the dance floor; weak hero — needs image call)
- [x] Rush Hour, Spuistraat — STEFAN as shopping byline (shipped, all six locales completed 2026-09-01; checkbox was stale)

### San Francisco (Tier 1) — war-room slate 2026-08-31, verified

_Split out from the old combined "SF Bay Area" queue on 2026-09-02: SF
and Oakland are two separate Tier 1 cities and get two separate turns,
so one merged queue made the round-robin unservable._

- [x] The Stud, SoMa — STEFAN (shipped 2026-09-02, all six locales. Angle landed on the co-op + a stale-closure correction; the slate's 'Stud Alley arrests' half was DROPPED on legal grounds — no source connects the bar to that block party. Hero/in-body both real photos from the venue's own site, not the planned illustration.)
- [ ] Dolphin Club, Aquatic Park — WILD0 (swim SF Bay for a $10 public day-use fee; 1877; alternate days with South End)
- [ ] Queer Surf, Pacifica — FIT-BOT (sliding-scale queer surf lessons; SWITCH exhibition Jun 13 2026; retry ebar sources via browser at draft)

### Oakland (Tier 1) — war-room slate 2026-08-31, verified
- [x] Heinold's First & Last Chance — PLINIO (shipped 2026-09-01; finished an orphaned partial draft from a prior session, all six locales, sourced hero image)
- [ ] 1-2-3-4 Go! Records, Temescal — CUBIC-V as shopping byline (shop + working punk label; RSD Apr 18 2026 confirmed; needs one more independent source at draft)
- [ ] Lakeshore Lavender Lounge — PENDING, do not draft (alcohol-free LGBTQ third space, opening Aug–fall 2026; hold until doors confirmed)

_SF note (sourced): dedicated sober-curious venues are dying in real time — The New Bar closed Jul 2025, Bizzy's Dry Bar closed by Apr 2026; Ocean Beach Cafe (already covered) is the survivor. The sober story may be a collection, not a pin._

_Amsterdam note: no coffeeshop cleared the two-source bar this pass — the honest-coffeeshop-culture piece reads better as a near-blogger collection; operator decision pending._
### Barcelona — queue empty, needs seeding
### Rome — queue empty, needs seeding (che.famo.stasera / vernissagerome IG sources queued in EPIC 5)
### Portland — queue empty, needs seeding

---

_Maintenance: whoever drafts a post ticks it here in the same commit.
near-refresh reads this file; the rotation position is wherever the last
shipped post sits in the order above._
