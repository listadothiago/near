# Near post plan — rotation + per-city queues

Operator decision (2026-08-31): grow round-robin, one post per city per
cycle, instead of finishing one city before starting the next. Every
audience city gets fresh content every cycle, the Latest tab stays
geographically alive, and no community waits weeks for its turn.

**Rotation order (operator's, verbatim):**

1. London
2. São Paulo / Baixada Santista / Campinas (one slot, operator picks or
   queue order decides)
3. Berlin (deep refresh standard applies to its posts)
4. Amsterdam
5. San Francisco Bay Area
6. Barcelona
7. Rome
8. Portland

Repeat until done. Paris/NYC/Seattle/San Diego/Santos-specific/Bologna
join the rotation when their queues first get seeded.

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
- [ ] Walthamstow Wetlands — WILD0 (verified; re-check the stale path-closure notice when drafting)
- [ ] Berry Bros. & Rudd — DARCY (verified; first London travel pin)
- [ ] Hazlitt's — NITE-PORTER (verified)
- [ ] Studio Voltaire — CUBIC-V (verified)
- [ ] Jumbi — STEFAN (needs one dated-event source)
- [ ] Sister Midnight — STEFAN (operator-approved as 'opening'-status pin; schema needs the status value first)
- [ ] Hampstead Heath ponds — WILD0 (source bot-blocked; verify at draft)

### São Paulo / Baixada / Campinas (seeded from operator requests)
- [ ] Madê Cozinha Autoral, Santos — operator request 2026-08-31 (verify + sources + hero before draft)
- [ ] Almeida, Santos — operator request 2026-08-31 (identify exact venue, then verify)
- [ ] Quiosque da Cris / Mudança Radical + Praia do Itararé, São Vicente — operator request, SPECIAL: Cris profile + place + beach significance, higher sourcing bar (first named-person profile). See BACKLOG.
- [ ] O Condado + São Vicente scene items from earlier scouting — need verification pass

### Berlin (deep) — queue empty, needs seeding war-room before its first turn
### Amsterdam — queue empty, needs seeding
### San Francisco Bay Area — queue empty; seed with sober-curious + outdoors per BACKLOG note
### Barcelona — queue empty, needs seeding
### Rome — queue empty, needs seeding (che.famo.stasera / vernissagerome IG sources queued in EPIC 5)
### Portland — queue empty, needs seeding

---

_Maintenance: whoever drafts a post ticks it here in the same commit.
near-refresh reads this file; the rotation position is wherever the last
shipped post sits in the order above._
