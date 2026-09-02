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
- [ ] Hampstead Heath ponds — WILD0 (source bot-blocked; verify at draft)

### São Paulo / Baixada / Campinas (normal Tier 2 queue — priority bump revoked 2026-09-01 late night)
- [x] Madê Cozinha Autoral, Santos — FOODIE-9000 (shipped 2026-08-31; address-move correction is the angle)
- [x] Almeida, Santos — PLINIO (shipped 2026-08-31; identified as Restaurante Almeida, Av. Ana Costa 1, founded 1932)
- [x] Quiosque da Cris / Mudança Radical + Praia do Itararé, São Vicente — shipped; checkbox was stale, caught during 2026-09-01 queue cleanup.
- [ ] O Condado + São Vicente scene items from earlier scouting — need verification pass
- [ ] **Campinas — first pin ever, draft this first.** Bar Flor da Lua (craft beer/cocktails/vegan, mixed LGBT-friendly crowd — try first, hits gastronomic+LGBT+hipster in one) or Livre Club (Vila Itapura, ~20yr LGBT+ nightclub) as fallback. Currently sourced from aggregator/listicle content only — needs a real second source and a Campinas outlet onboarded to sources.md before/during drafting.
- [ ] Barraca da Dheia, Guarujá (Praia de Pitangueiras, not São Vicente/Itararé — corrected via on-draft verification, see content/opportunities.md) — drafted, `status: draft`/`trust: review`, awaiting operator approval, not yet ticked done.
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

### San Francisco Bay Area — war-room slate 2026-08-31, verified
- [ ] The Stud, SoMa — STEFAN (first worker-owned co-op nightclub in the US; 2026 Instagram suspension + Stud Alley arrests; Commons photos show OLD 9th St site — then/now caption or illustration)
- [ ] Dolphin Club, Aquatic Park — WILD0 (swim SF Bay for a $10 public day-use fee; 1877; alternate days with South End)
- [ ] Queer Surf, Pacifica — FIT-BOT (sliding-scale queer surf lessons; SWITCH exhibition Jun 13 2026; retry ebar sources via browser at draft)
- [ ] Heinold's First & Last Chance, Oakland — PLINIO (floor tilted since 1906, last original gas lighting in CA commercial use)
- [ ] 1-2-3-4 Go! Records, Temescal — CUBIC-V as shopping byline (shop + working punk label; RSD Apr 18 2026 confirmed; needs one more independent source at draft)
- [ ] Lakeshore Lavender Lounge, Oakland — PENDING, do not draft (alcohol-free LGBTQ third space, opening Aug–fall 2026; hold until doors confirmed)

_SF note (sourced): dedicated sober-curious venues are dying in real time — The New Bar closed Jul 2025, Bizzy's Dry Bar closed by Apr 2026; Ocean Beach Cafe (already covered) is the survivor. The sober story may be a collection, not a pin._

_Amsterdam note: no coffeeshop cleared the two-source bar this pass — the honest-coffeeshop-culture piece reads better as a near-blogger collection; operator decision pending._
### Barcelona — queue empty, needs seeding
### Rome — queue empty, needs seeding (che.famo.stasera / vernissagerome IG sources queued in EPIC 5)
### Portland — queue empty, needs seeding

---

_Maintenance: whoever drafts a post ticks it here in the same commit.
near-refresh reads this file; the rotation position is wherever the last
shipped post sits in the order above._
