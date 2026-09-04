# Near post plan — rotation + per-city queues

Operator decision (2026-08-31): grow round-robin, one post per city per
cycle, instead of finishing one city before starting the next. Every
audience city gets fresh content every cycle, the Latest tab stays
geographically alive, and no community waits weeks for its turn.

**Tier rotation (operator directive, 2026-09-01 — see `.claude/skills/content-rotation/SKILL.md`, the source of truth for this rule):**

**A tier is a share of every ten posts** — 6 Tier 1, 3 Tier 2, 1 Tier 3.
Replaced the nested "Tier 1 ×4 then Tier 2 ×1" cycle on 2026-09-03.

Tier 1 (6 of 10, round-robin) — London, Brighton, San Francisco,
Oakland, **Bangkok** (promoted from Tier 2 by operator directive
2026-09-02: most-visited city in the world; it is the only Tier 1 city
with zero pins, so its queue had to be seeded before it could be drawn —
done 2026-09-03). Tier 2 (3 of 10, burst) — Berlin, Amsterdam,
Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu,
Tokyo, Melbourne (both added by operator directive, 2026-09-03), plus
one rotating surprise-city slot picked fresh by near-seo each time.
São Paulo / Baixada Santista / Campinas's standing-override priority was
revoked by the operator (2026-09-01 late night) — it's a normal Tier 2
queue now, no bump. **Tier 3 (1 of 10, burst)** — Florianópolis, Porto
Alegre, Curitiba, Belo Horizonte, Recife, Salvador (operator directive,
2026-09-03). The sources pass ran the same day: **Porto Alegre, Curitiba
and Salvador are CLEARED and drawable**; **Florianópolis, Recife and
Belo Horizonte stay HELD** — all six have a verified live local feed
now, but only the first three have three candidate pins good enough to
draft from. Queues below. Draw order is by readiness, so Porto Alegre
goes first and Belo Horizonte last.

Paris/NYC/San Diego/Santos-specific/Bologna join Tier 2 when
their queues first get seeded. **Seattle is a Tier 2 member outright**
(operator directive, 2026-09-03 — *"make sure seattle is at least tier
2"*), not queue-gated; its queue is still empty, so it is **held** until
someone seeds it.

**Posts per stop — REVERSED 2026-09-03, and this reverses an explicit
operator directive, so the reasoning is on the record.** The 2026-09-01
late-night rule was *1 post per stop, both tiers*, on the argument that
a bigger batch for a lower tier works against the point of it being
lower. Tier 1 still works that way. **Tier 2 and Tier 3 now spend their
whole share as a burst on ONE city** — 3 consecutive posts for one Tier
2 city, 1 for a Tier 3 city — rather than one post each across the
membership.

What changed is evidence, not preference. Ten cities are now sitting at
exactly **one pin**. A one-pin city ranks for nothing, has no internal
linking mass and no collection to hang it on; it is a thin orphan, which
is a mild SEO negative rather than a down payment on future coverage.
One-post-per-stop at the lower tiers is what produced them, and it would
keep producing them. The burst preserves the original intent — a lower
tier's city still comes around far less often — while making each
appearance actually worth something. Frequency carries the priority
signal; batch size carries the ranking.

A city whose queue can't support its share drains what it has and is
**held** for the rest, never padded.

**How this works with research:** publishing rotates; research batches.
A post's expensive half is verification, and that amortizes when a
city's candidates are researched together (the London war room proved
this). So each city keeps a queue of VERIFIED candidates below, drained
top-down on the city's turn. When a queue is down to 1, near-war-room
(mini, single-city) refills it. A city whose turn arrives with an empty
queue is **held** rather than padded with an unverified post —
rules.md's quality gate outranks the rotation. Note the change: a held
city no longer *consumes* its tier's share, as the old empty-queue rule
had it. Charging a city for a turn it couldn't take is what pushed
unseeded cities permanently out of reach — Brighton was skipped every
cycle from the tier list's creation until it was seeded on 2026-09-02.

**Rules that still bind every post:** all six locales at publish,
link-density, verify-still-open, real hero image or no publish,
push-to-live per post for operator QA.

---

## Rotation position

**Tier 1 order:** London → Brighton → San Francisco → Oakland → Bangkok.

**Ten #1 under the new share rule, opened 2026-09-03.** Tier 1 has spent
5 of its 6 (Brighton, London, San Francisco, Oakland, Bangkok — BAB 2026,
2026-09-04). **Tier 2 is fully spent** — the Sitges burst on 2026-09-03
was four pins plus a collection for Barcelona & Region, which is exactly
the burst shape the new rule asks for and landed the day before the rule
existed. **Tier 3 has spent nothing and its share does not carry**: all
six cities are held pending sources.

`NEXT-UP` is now **London**, closing Tier 1's six for this ten. Once
London ships, Tier 1's six is fully spent and the next ten opens per
`content-rotation/SKILL.md`'s own instructions.

*Everything below this line describes the old nested-cycle regime and is
kept as history, not as live mechanics.*

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

**Next stop: see `NEXT-UP` in
`.claude/skills/content-rotation/SKILL.md` — that block is now the
source of truth for whose turn it is, and this narrative is secondary to
it (operator directive, 2026-09-03: the rotation skill tracks what is
next).** As of 2026-09-03 it reads **Bangkok**, after Oakland consumed
its cycle-2 turn with 1-2-3-4 Go! Records. London's cycle-2 turn was
marked satisfied by the three override pieces; Brighton and San
Francisco are served. **Bangkok's queue is SEEDED as of 2026-09-03 and
the empty-queue skip no longer applies** — the `near-sources-war-room`
pass landed six research-verified candidates (below) and its four
sources in `preferred-sources.md`. Bangkok's turn is live and drawable,
so it takes it rather than being skipped; cycle 3 opens at London only
once Bangkok has actually shipped.

London is no longer queue-blocked, for whenever its next turn comes:
Sister Midnight (needs an `'opening'` status value in the schema) and
Hampstead Heath (bot-blocked source) are both still blocked, but E.
Pellicci, La Camionera, The Divine, Hausu and TOAD are open and
verified. Tier 2 gets its single turn after cycle 4 closes.

Whoever ships a post updates **both** this block and `NEXT-UP` in the
same commit — the cycle count is not derivable from the checkboxes
alone, so it has to be written down.

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

- [x] **Bar Italia, 22 Frith Street, Soho W1D 4RF** — PLINIO or FOODIE-9000. **SHIPPED (commit 33f3fd2), status `active`, all six locales.** Checkbox was stale, caught during the 2026-09-03 queue check. It closed the gap Near logged weeks ago: `content/requests.md`'s `hazlitts-london-no-natural-internal-link` asked specifically for "a bar, bookshop, or venue on/near Frith or Dean Street" that Hazlitt's could link to. Bar Italia is on Frith Street, a few minutes' walk. Opened 1949 by the Polledri family and still run by the third generation, Veronica and Anthony Polledri; original red-and-white Formica, a vintage Gaggia, and a floor hand-laid by a family member. **Open 07:00–05:00 daily** — not quite 24h, and listings that claim 24h are wrong, which is the correction. Publishing it also lets the Hazlitt's request be closed.
- [ ] **E. Pellicci, Bethnal Green E2** — FOODIE-9000, with a PLINIO consult. A caff run by four generations of the same family since 1900, with a **Grade II listed Art Deco interior** (listed 2005, Historic England entry 1391332, cited as "an increasingly rare example of the stylish Italian cafe that flourished in London in the inter-war years"). Maria Pellicci has cooked there since 1966 and was made a Knight of the Order of the Star of Italy in 2025; the caff placed 83rd in TasteAtlas's 2025 "100 Most Legendary Restaurants". **CURRENCY RISK, per rules.md: this piece depends on a named living person.** Re-verify Maria Pellicci's status at draft and flag the page to `near-caretaker` — present-tense copy about someone who has died is the exact failure that rule exists to prevent.

**LONDON EAST END — added 2026-09-02 after the operator described the
actual trip: friend based Camden/King's Cross, everything they want to do
is East End (V&A East, Gilbert & George).** This reranks the batch. It
also means **Peckham (Hausu, TOAD) is the wrong side of the river for
this trip** — keep them queued, but they are not tester-verifiable this
week. The two venues below are what the friend is literally going to
stand inside, and Near has neither.

- [x] **The Gilbert & George Centre, 5a Heneage Street, Spitalfields E1 5LJ** — CUBIC-V. **SHIPPED 2026-09-02**, six locales, live. Hours correction confirmed against the official visitor page (Thu–Sun 11:00–17:45; aggregators publish '10am–5pm' and are wrong). Carries the Backyard Biennial: East (15 Jul–6 Sep 2026), which EXPIRES 6 SEP — flagged to near-caretaker. **Highest tester value in the whole batch.** Free entry, on Gilbert & George's own "Art for All" principle; free highlight tours Saturdays at 4pm. **CRITICAL PRACTICAL DETAIL: open Thursday to Sunday only, 11:00–17:45.** A visitor arriving Mon–Wed cannot get in, and that is exactly the fact a guide should lead with rather than bury. Currently showing 'Our George Crompton, WORLDS and WINDOWS'. **INTERNAL LINK READY:** Near already publishes the Old Truman Brewery on Brick Lane, a few minutes' walk.
- [x] **V&A East Museum, East Bank, 107 Carpenters Road, Queen Elizabeth Olympic Park, Stratford E20 2AR** — CUBIC-V. Opened **18 April 2026**. Admission free, including two permanent "Why We Make" galleries with 500+ objects. Opening exhibition *The Music is Black: A British Story*, 125 years of Black British music, ticketed separately at £22.50 (£10 for students and under-26s) — so "free museum, paid headline show" is the honest framing. **PUBLISHED 2026-09-03, all six locales, under the LONDON ONLY override — rotation counter deliberately NOT advanced.** Two corrections to this queue entry, verified at draft and confirmed at publish: the price is not a single figure, it is **£22.50 weekday / £24.50 weekend** (and £10 is the Art Fund rate, not the student/under-26 rate, which is £11); and the exhibition's closing date is contested — vam.ac.uk says 10 January 2027, queenelizabetholympicpark.co.uk says 3 January 2027, and both are carried attributed. Also live: PCS/Prospect industrial action closed the building 4–5 September 2026 (reopened the 6th), with an overtime ban and work-to-rule continuing indefinitely — flagged to near-caretaker along with the end date.
- [x] **V&A East Storehouse, Hackney Wick** — CUBIC-V. SHIPPED 2026-09-03, all six locales, under the LONDON ONLY override (cycle counter deliberately NOT advanced). The access-model check paid off and became the piece's headline finding: **the David Bowie Centre stopped being free on 13 July 2026 and now costs £5** (vam.ac.uk FAQ + the display page's own ticketing payload), reversing the free-timed-ticket model it opened with in September 2025 and the no-ticket-needed model it ran from February 2026 — a lot of top-ranking coverage, Wikipedia included, still says free. General admission itself is unchanged: free, walk-up, no booking, daily 10:00–18:00 and to 22:00 Thu/Sat, 2 Parkes Street E20 3AX. Order an Object is free but needs **two weeks'** lead, so it was explicitly ruled out for the tester's week rather than sold to them. CORRECTIONS TO THIS ENTRY'S OWN CLAIMS: "Opened 2025" is 31 May 2025 precisely; the object counts are right and there are also 1,000 archives; "different neighbourhood" is true (Hackney Wick vs Stratford, E20 3AX vs E20 2AR) but they are ~1km apart inside the same park, so the body says "a walk, not a trek" rather than implying opposite ends of the city. On "listings routinely conflate the two" — no listing was found publishing a wrong ADDRESS, and none was invented; what shipped is the demonstrable umbrella-name failure (Time Out's April 2026 "The V&A East Will Open This Weekend" is about the Museum while the Storehouse had been open eleven months, with the piece noting the article body is careful and the feed card is not). Dated hook for the week of 2026-09-07 found and real: Look What I Found with Remiiya Badru, Thu 10 Sep 2026 12:00–14:00, Collection Hall, free drop-in — **rescheduled from Sat 5 Sep because of the strike closure**. The PCS/Prospect action hits this building harder than the Museum: Prospect balloted 100% of collections access officers here in favour, 88% turnout, over the no-rest-breaks conditions The Art Newspaper reported. Flagged to near-caretaker: the £5, the whole industrial-action section (dispute unresolved), the 18 Oct 2026 free displays, and vam.ac.uk's own stale "Museum of the Year 2026 Shortlisted" badge (The Box, Plymouth won it in July).

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
- [x] SO36 / Gayhane, Kreuzberg — PLINIO (punk landmark; monthly queer Turkish-Arabic night 25+ years; Gayhane dates 26.09/31.10/28.11/26.12.2026 confirmed independently via so36.com's own ticket shop, 2026-09-02)
- [ ] Möbel Olfe, Kotti — FOODIE-9000 (current schedule: Tue–Sat from 18:00, Tuesday FLINTA*; listicles still print the 2016 lore — the correction is the piece)
- [ ] Teufelssee, Grunewald — WILD0 (queer nude lake; free, unfenced; FKK/cruising context stated plainly)
- [ ] Vorspiel e.V. — FIT-BOT (Europe's largest LGBT sports club, 39 sports; Oct 2026 tournaments dated; NO Commons image — gates publish)
- [ ] Schwules Museum — CUBIC-V (Susan Sontag + rural-queer shows dated to Nov 2, 2026)
- [x] Eisenherz Buchladen, Schöneberg — RADAR-X (shipped 2026-09-01; Germany's first gay bookshop, 1978; cross-city queer-bookshop thread with Gay's the Word, reciprocal links added both ways)
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
- [ ] **Dolphin Club, Aquatic Park — WILD0. NOT SHIPPED; this tick was false.** Written 2026-09-03 but never committed — it existed only in `stash@{0}`, 404s on near.tips, and is now committed at `status: draft` carrying 2 of 6 locales. Needs 4 locales and its two placeholder `originalPublishedAt` dates corrected before it can go active. San Francisco is still owed its cycle-2 turn. Research below stands and was verified: Fee corrected to $12/$12.67 — queue's $10 was stale, verified against the club's own current visit page. 1877 founding and the alternating public-access-days arrangement with South End Rowing Club both confirmed; the two clubs are adjacent buildings sharing the cove, not one shared building. Dated hook: New Year's Day Alcatraz swim, Jan 1 2027, free to watch from the beach.)
- [ ] Queer Surf, Pacifica — FIT-BOT (sliding-scale queer surf lessons; SWITCH exhibition Jun 13 2026; retry ebar sources via browser at draft)

### Oakland (Tier 1) — war-room slate 2026-08-31, verified
- [x] Heinold's First & Last Chance — PLINIO (shipped 2026-09-01; finished an orphaned partial draft from a prior session, all six locales, sourced hero image)
- [x] 1-2-3-4 Go! Records, Temescal — CUBIC-V (shipped 2026-09-03, all six locales; shop + working punk label, independently verified against 5+ sources — shop's own site, East Bay Express, Discogs, Yelp, Goldmine, VisitOakland. Queue's RSD date, Apr 18 2026, was already past; replaced with the next real one, **Apr 17 2027**. Ships with hero only — the ceil(words/250) in-body image floor was **explicitly waived by the operator**, recorded in `statusHistory`; open lead for near-illustrator to add two in-body images if better imagery surfaces.)
- [ ] Lakeshore Lavender Lounge — PENDING, do not draft (alcohol-free LGBTQ third space, opening Aug–fall 2026; hold until doors confirmed)

_SF note (sourced): dedicated sober-curious venues are dying in real time — The New Bar closed Jul 2025, Bizzy's Dry Bar closed by Apr 2026; Ocean Beach Cafe (already covered) is the survivor. The sober story may be a collection, not a pin._

_Amsterdam note: no coffeeshop cleared the two-source bar this pass — the honest-coffeeshop-culture piece reads better as a near-blogger collection; operator decision pending._
### Bangkok (Tier 1) — SEEDED 2026-09-03, research-verified, not yet drafted

_Seeded by a `near-sources-war-room` pass on the day Bangkok became
NEXT-UP with an empty queue. Full analysis, source tiers and rejected
candidates in `content/opportunities.md`. Sources are now in
`preferred-sources.md`; **MOTOSAI** is the locale editor and his debut is
here._

**THE CITY-WIDE CORRECTION, and it is the strongest angle available:**
two hard-dated 2026 closures are still being recommended by live guides.
**Studio Lam closed at the end of February 2026** after 12 years (Maft
Sai's bar; reported by Mixmag Asia and Bangkok Post) and **Noise House
closed 29 March 2026**. BK Magazine's own "10 best live music venues"
listicle still carries Studio Lam — **our best Bangkok source is itself
part of the correction**, which is exactly the Möbel Olfe / The Stud
shape.

- [x] **BAB 2026 "Angels and Mara"** — CUBIC-V. Shipped 2026-09-04, six locales, `trust: auto`/`active`. Dates re-verified independently across four non-aggregator sources at draft time (BAB's own site/Instagram, ArtReview, ArtAsiaPacific, The Beat Bangkok) — unchanged since seeding. Venue count still soft past a core seven (Wat Arun, Wat Pho, Wat Prayoon, BACC, Museum Siam, National Museum Bangkok, One Bangkok); the mall/university venues are named by only one source each and flagged in-body rather than asserted. Bangkok's four Tier 2 sources (BK Magazine, art4d, The MATTER, The Momentum) had not covered BAB 2026 as of this draft — logged as an open gap.
- [ ] **Mischa Cheap / Song Wat** — FOODIE-9000 or RADAR-X. **THE CORRECTION: guides still say the street dies at sunset.** It doesn't. Dated hook: Song Wat Week, Nov 2026.
- [ ] **The live-music obituary collection** — STEFAN, near-blogger format. Built on the Studio Lam + Noise House closures above; a collection, not a pin, because the story is the pattern. **Verify both closure dates against primaries at draft** and check nothing else on the list has closed since.
- [ ] **WTF Gallery & Café, Thonglor** — CUBIC-V. Gallery/bar hybrid, long-running independent.
- [ ] **Benjakitti Forest Park + the Green Mile** — WILD0. Reclaimed tobacco-factory land; the elevated walkway connecting to Lumphini.
- [ ] Thailand Coffee Fest, 10–13 Sep 2026 — **LOW PRIORITY, two problems**: it is near-term (against the further-out preference) and **it is not actually in Bangkok**. Do not draft as a Bangkok pin without resolving both.

_Bangkok Tier 1 sustainability — **"not yet", per the seeding pass.**
Exactly one watchable English-language Near-shaped feed exists (BK
Magazine), and no AAN member exists in Bangkok or anywhere in Asia. The
Thai-language tier (The MATTER, The Momentum) is a **research input, not
a `near-refresh` feed**, since Near has no `th` locale. Bangkok is
drawable now on this queue, but reassess after three shipped pieces: if
Spectrum isn't confirmed live and a second English independent isn't
found within two turns, **the honest call is Tier 2**. Operator decision._

### Barcelona / Catalonia — SEEDED and part-drained, 2026-09-03 (Sitges push)

Operator directive 2026-09-03: *"we should probably have a sitges push
with the major queer and cinema events."* Ran as a `near-war-room` push.
**Not an override — a normal backlog item.** It was first filed as an
override and the operator corrected that the same day: *"i didnt mean to
override with sitges take my input as any backlog item by default."* So
it counts against rotation: **Barcelona's Tier 2 turn is marked served**
in `content-rotation`. `NEXT-UP` stays **Bangkok** — Sitges was drawn
ahead of Bangkok's turn, not in place of it, and the stated reason for
drawing out of turn was the festival's 8–18 October window closing.

- [x] Casino Prado Suburense, Sitges — PLINIO (1877 society; its members' 1968 fantastic-cinema week is the direct ancestor of the Sitges festival; still a working cinema. Six locales, shipped 2026-09-03)
- [x] Sitges Film Festival 2026, 59th ed. — RADAR-X (8–18 Oct 2026, dates verified from three sources; Carrie 50th-anniversary tribute; `eventEndsAt` set so it self-expires. Six locales, shipped 2026-09-03)
- [x] Parrots Pub, Plaça de la Indústria — STEFAN (30+ years, AFGAL founding member; seasonal-hours caveat carried honestly. Six locales, shipped 2026-09-03)
- [x] Monument contra l'homofòbia, Passeig Marítim — CUBIC-V (2006 pink triangle, municipal sculpture park, 5 Oct 1996. Six locales, shipped 2026-09-03)
- [ ] **Societat Recreativa El Retiro, Sitges — HELD, DO NOT DRAFT YET.** The obvious fifth pin and it did not check out: the saló-teatre has been closed for renovation since 4 May 2024 per the society's own site, which publishes no reopening date. Re-check the site (`elretirositges.cat/remodelacio/`) before drafting; there is a genuinely good piece here the moment it reopens — 1870 society, burned down 1916, rebuilt by Miquel Utrillo, Creu de Sant Jordi 2017, and its 1970 false ceiling has just come out to expose Utrillo's vaults. A rights-clear Commons hero and frontage shot are already identified and in use on the collection page.
- [ ] Bears Bar / the rest of the Joan Tarrida strip — STEFAN (a second, non-Parrots room on the strip is the obvious next pin; Parrots' own piece says plainly it is the anchor rather than the interesting end)
- [ ] Platja de l'Home Mort / Platja de la Bassa Rodona — WILD0 or STEFAN (Commons has rights-clear photos of both; needs real sourcing on current status and access)
- [ ] Barcelona city proper — still unseeded. Sitges is 40 minutes away and now gives the `ca`/`es-ES` market a foothold it did not have.

### Porto Alegre (Tier 3) — SEEDED 2026-09-03, CLEARED, first Tier 3 city to draw

Two independent local outlets in `sources.md` (Matinal, reader-funded and
non-profit, which runs the weekly "Agendão" listings; and Sul 21, with a
standing culture desk). Candidates are **leads, not research-verified** —
the full `near-write-article` floor applies to each. Byline assignment
still open; needs a pt-BR editor call.

- [ ] **Caos Bar**, Rua João Alfredo, Cidade Baixa — the motto is
  literally "música independente ou morte". Best single-line angle of
  the six cities.
- [ ] **Butikin Hifi**, Av. Independência — vinyl-only listening room,
  originally 1960s, reinaugurated 2024 in the same building. The
  reopening date is the hook and it is checkable.
- [ ] **Espaço Cultural 512**, Rua João Alfredo — an artist's atelier
  that became a room for new MPB, forró and samba. Sits on the same
  street as Caos Bar, so the two link naturally.
- [ ] **Bar Ocidente** — lowest priority; needs an angle beyond
  longevity before it earns a draft.

### Curitiba (Tier 3) — SEEDED 2026-09-03, CLEARED

Plural (crowdfunded 2019, takes no public advertising money) plus
Curitiba Cult for dated listings. Same caveat: leads, not verified.

- [ ] **92 Graus The Underground Pub**, São Francisco — staging original
  bands since 1991, described locally as the city's most traditional
  alternative music house.
- [ ] **Changes**, R. Presidente Carlos Cavalcanti 1138, São Francisco —
  reopened 2026 on a historic corner, with ticketed curation. A
  reopening in the current year is exactly the freshness angle Near
  wants; get the date from Plural.
- [ ] **Harvest Folk Bar**, São Francisco — small room, folk and
  acoustic.

### Salvador (Tier 3) — SEEDED 2026-09-03, CLEARED

Correio Nagô (Instituto Mídia Étnica) is the source that matters here —
covering Salvador's culture from the commercial dailies alone would
misrepresent the city.

- [ ] **Discodelia Pub & Records**, Rua do Meio 141, Rio Vermelho — pub
  and record shop in one. The most Near-shaped venue found in this
  entire pass.
- [ ] **SAN**, R. Conselheiro Pedro Luiz 488, Rio Vermelho — LGBTQIA+
  nightlife anchor.
- [ ] **Casa da Felicidade**, Rua da Paciência, Rio Vermelho — curated
  parties, B-sides and pop.

### Florianópolis / Recife / Belo Horizonte (Tier 3) — STILL HELD

Feeds verified (`underfloripa.com.br`, `marcozero.org`, `bhaz.com.br`),
candidate pins not. What each needs before it clears — verification, not
more discovery:

- **Florianópolis**: Coffeeshop Club (R. Manoel Severino de Oliveira
  592, Lagoa da Conceição) and Caverna Bugio (Centro Histórico) need a
  third. ⚠️ **Underground Rock Bar dominates search results and is
  historic, not open** — the 2026 hits are tribute nights held
  elsewhere. Do not draft it as live.
- **Recife**: Cais do Sertão (Armazém 10, Recife Antigo) and Caixa
  Cultural are solid but institutional, which is not really Near's
  register. ⚠️ Flowers Records (Boa Vista) is the interesting one and
  its only citation is a **2013** blog post — confirm it still exists.
- **Belo Horizonte**: Discoteca Pública (R. Hermilo Alves 134, Santa
  Tereza, strong on Minas music), Old Bar (Santa Tereza, live music and
  drag, run by a same-sex couple), Bar Museu. All from listicles. BH is
  the largest of the six and has the thinnest independent press layer —
  it goes last.

_Tier 3 dating gap, flagged for `near-events`: none of these queues
carries a **dated** hook yet, and the standing preference is for
specific dated events with further-out dates. The Agendão (Porto
Alegre) and Curitiba Cult feeds are the two places to mine for them
before drafting._

### Barcelona (city) — queue empty, needs seeding
### Rome — queue empty, needs seeding (che.famo.stasera / vernissagerome IG sources queued in EPIC 5)
### Portland — queue empty, needs seeding

---

_Maintenance: whoever drafts a post ticks it here in the same commit.
near-refresh reads this file; the rotation position is wherever the last
shipped post sits in the order above._


## ~~OPERATOR OVERRIDE, 2026-09-02: LONDON ONLY~~ — **LIFTED 2026-09-03**

**The operator lifted this on 2026-09-03. Normal Tier 1 / Tier 2
rotation is back in force.** Whose turn it is now lives in the
`NEXT-UP` block of `.claude/skills/content-rotation/SKILL.md`, which is
the source of truth — read it before drafting for any city. As of the
lift: **NEXT-UP is San Francisco**, with London's cycle-2 turn marked
satisfied by the three pieces shipped under the override (a judgment
call, recorded and reversible in that file).

Kept below, struck through, because the record of what was suspended
and why is what makes the next override legible.

> ~~The rotation cadence is SUSPENDED. Operator: "our focus for now is
> london london london ... lets push as much london content live as we
> can asap." London is not taking its turn in the round-robin, it is
> taking every turn until the operator says otherwise. **Do not advance
> the cycle counter in the Rotation position block for pieces published
> under this override** — they are not London's turn, they are an
> override, and advancing the counter would silently cost Brighton, San
> Francisco and Oakland their places.~~

Shipped under the override before it was lifted: the Gilbert & George
Centre, the V&A East Museum, and the V&A East Storehouse. None of them
advanced the cycle counter, which is why the pointer sat still while
three London posts went live — the failure mode the `content-rotation`
NEXT-UP block now exists to prevent.

**The reader-profile and format directives below survive the lift** —
they were about how to write, not about which city, and the format rule
in particular is a standing improvement.

Reader profile for this run, which should change what gets picked: two
hip locals (one straight woman, one gay and nerdier), plus a visiting
tester. Locals do not need landmarks. They need **specific dated
events, at short notice, the week of 2026-09-07, daytime preferred** —
a deliberate one-off inversion of the site-wide "favor further-out
dates" preference, justified only by a tester being on the ground.
Run `near-events` before drafting.

Format rule for this run, from the reader directly: essential info
(address, price, exact hours, dates, booking) goes INLINE in bullets
and body. Sources prove the claim; they are never the only way to get
the fact.
