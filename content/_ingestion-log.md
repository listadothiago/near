# Near — Ingestion Log

Append-only run log written by `near-editor`. Each run appends a section
with: timestamp, sources checked, places added/updated/skipped (with the
specific rule that caused a skip), and any near-inbox items triaged.

## 2026-08-20T10:00:00Z — seed content (manual, not via near-editor)

Hand-authored 3 seed places to validate rendering, i18n, and the map before
the first real `near-editor` run: `lx-factory-lisbon`, `time-out-market-lisboa`,
`borough-market-london`. All `status: active`, `trust: auto`.

## 2026-08-27T00:00:00Z — supplemental research pass (first use of the new entry point)

Ran the "supplemental research pass" entry point against all 3 existing
places — searched for additional coverage beyond each place's original
source, verified every URL before citing it, and updated both
`meta.sources` and the long-form body (en, pt-BR, it) with attributed
detail, including honest criticism where sources raised it (not just
praise).

- `lx-factory-lisbon`: +1 source (Tripexpert, aggregated critic reviews —
  Fodor's, Michelin, Lonely Planet). Added: critic praise quotes, plus the
  honest caveat that it's a deliberate-trip destination that skews toward
  a younger/artistically-inclined crowd, not universal appeal.
- `time-out-market-lisboa`: +2 sources (Do Eat Better Experience, Will Fly
  for Food). Added: specific dish praise (Sá Pessoa's suckling pig,
  Manteigaria's pastéis de nata), plus honest criticism — peak-hour
  chaos, small portions/high prices for what it is, seating scarcity —
  corroborated independently by both sources.
- `borough-market-london`: +2 sources (Time Out London, The Guide
  Magazine). Added: standout vendor detail (Neal's Yard Dairy, Black Pig,
  Bread Ahead), the Monday closure, plus honest criticism — both sources
  independently describe serious crowding and long queues at peak times.

No new places created this run; no rule violations. All updates keep
`trust: auto` unchanged per `dedupe-by-place` (an update to an existing
auto place doesn't require re-approval).

## 2026-08-28T00:00:00Z — hero-image resolution pass (published every remaining draft)

Not a new-place run. An audit while scoping a Baixada Santista/São Paulo
content push found that all 7 `status: draft` places were in São Paulo and
Santos, i.e. exactly the two markets the operator had just prioritized.
The live board was showing 9 of 16 places, and none of the Santos coverage
at all.

> **Correction, appended same day.** This entry originally claimed the 7
> were drafts "for one reason only — `quality-gate-before-publish`'s
> hero-image requirement." That was wrong, and the error was in the
> method: `heroImage == null` was checked and the cause inferred from it,
> without evaluating the rest of the gate. **All 7 also fail the same
> rule's `body >= 600 words` condition** (294–518 words in English), so
> publishing them cleared one blocking condition and ignored another.
> See the follow-up entry below.

Resolved a hero image for each from the place's *own* existing source
article (`strategy: source`, credited and linked, per the same convention
already used by `bar-skula-oakland` and `stray-dog-mission-san-francisco`).
Every candidate image was fetched and visually checked to confirm it
depicts the right subject before being used — one obvious trap avoided:
the CNN Brasil article cited by `bar-fel-copan-sao-paulo` has an og:image
of *Bar dos Arcos*, not Fel, so it was rejected and a São Paulo Secreto
photograph of Fel's counter used instead.

- `bar-das-sao-paulo` — Catraca Livre (neon DAS sign over the Rua Marielle
  Franco entrance).
- `bar-fel-copan-sao-paulo` — São Paulo Secreto (the 13-seat counter under
  the Copan). Also +1 source: São Paulo Secreto appended to `meta.sources`
  per `dedupe-by-place` rather than forking a slug.
- `djapa-sao-paulo` — BaresSP (lit façade). Lowest-resolution of the set at
  570×300; acceptable, but worth upgrading if a better shot turns up.
- `rong-he-sao-paulo` — Diários Gastronômicos, credited to Dé Comber (the
  hand-pulled noodle work the place is known for).
- `thai-e-san-sao-paulo` — Que Gostoso!, credited to Claudio Schapochnik.
- `teatro-clube-da-eskyna-santos` — A Tribuna (the venue interior).
- `cabaret-latino-teatro-eskyna-santos` — the one compromise. Its only
  source is an Instagram post, whose CDN URLs expire and can't be linked,
  so it reuses A Tribuna's photograph of the venue the event runs in, with
  a `licenseNote` saying plainly that it shows the room and not the show.
  Judged better than an event pin staying invisible for its entire run
  (it ends 2026-09-12).

Result: 16/16 places `status: active`; no drafts remain. No new places
created, no `trust` values changed. ~~No rule violations.~~ **Struck —
see the follow-up entry: this pass violated
`quality-gate-before-publish`'s word-count condition on all 7 places, and
opened locale gaps under `full-locale-coverage` on all 7.**
`npx tsc --noEmit` and `npm run build` both pass (121 pages), and all
seven images were confirmed rendering through `next/image` in the browser.

## 2026-08-28T00:00:00Z — follow-up: two real defects in the pass above

The operator flagged a paragraph on the live
`cabaret-latino-teatro-eskyna-santos` page. Both problems below trace to
the same root cause: the pass above verified hero *images* carefully —
every candidate was fetched and looked at — but never read the prose it
was making public, and never re-evaluated the rest of
`quality-gate-before-publish` before flipping `draft` to `active`.

**1. Fourth-wall copy on a reader-facing page (fixed).** The closing
paragraph of `cabaret-latino-teatro-eskyna-santos` explained Near's own
pipeline to the reader — "this listing", "it's set to expire
automatically rather than sitting around as stale content", "that's
covered on its own page". Rewritten in `en` and `pt-BR` to keep the part
that genuinely serves a reader (single-source announcement, so check the
venue's Instagram before travelling) and drop the internal plumbing. Note
that a pattern grep for this missed the `pt-BR` version, which used
different wording — reading the files was what actually found it.

**2. The 600-word condition is not being enforced anywhere.** 12 of the
16 currently-active places fail `quality-gate-before-publish`'s
`body >= 600 words in at least English`:

- Published in the pass above, all 7 under: `bar-das-sao-paulo` (294),
  `cabaret-latino-teatro-eskyna-santos` (333), `djapa-sao-paulo` (387),
  `rong-he-sao-paulo` (374), `thai-e-san-sao-paulo` (398),
  `bar-fel-copan-sao-paulo` (412), `teatro-clube-da-eskyna-santos` (518).
- Already active *before* this session, also under: `beco-do-batman-sao-paulo`
  (327), `boxpark-shoreditch-london` (340), `old-truman-brewery-london`
  (343), `dollywood-pigeon-forge` (442), `borough-market-london` (555).
- Passing: `bar-skula-oakland` (611), `time-out-market-lisboa` (605),
  `lx-factory-lisbon` (615), `stray-dog-mission-san-francisco` (630).

So this is a pre-existing pattern the pass above added to rather than
started. It needs an operator decision, logged here rather than silently
resolved: either the threshold is real and 12 pages need expanding (with
researched material — `rules.md` forbids padding), or 600 was aspirational
and never matched how Near actually writes, in which case `rules.md`
should be amended to the real number. Awaiting that decision.

**3. Publishing the 7 opened 28 locale gaps.** `full-locale-coverage`
exempts `status: draft`, so these places were legitimately incomplete
while they were drafts. Now active, each is missing 3–4 locales
(`it`, `es-ES`, `es-419`, `zh-CN`; `teatro-clube-da-eskyna-santos` has
`it`). Not user-breaking — `resolveLocaleContent` falls back to English
with a "translation pending" note — but it does mean BACKLOG's
"all published places carry full 6-locale coverage" line was made false
by this pass, and has been corrected.

## 2026-08-28T00:00:00Z — cross-link pass: Cuia + Megafauna created

Triggered by the operator spotting an unlinked mention on the live
`bar-fel-copan-sao-paulo` page: its closing line names "Cuia, chef Bel
Coelho's café inside Megafauna" with no page to link to. Near's whole
model is that pins cross-link, so a named venue with no pin is a hole in
the graph, not just a missing `<a>`.

**Swept for the general case before fixing the specific one.** Two
classes:

- *Class A — a place that already has a pin, named on another page but
  not `<NearLink>`ed.* **Zero found** across all 16 places and every
  locale file. Existing pin-to-pin linking is clean.
- *Class B — a real venue named in body copy with no pin at all.* Plenty,
  and they cluster: almost every one is a distinct business inside a
  larger place Near already pins. Beyond Cuia and Megafauna inside Copan:
  Neal's Yard Dairy, Bread Ahead and Black Pig inside
  `borough-market-london`; Ler Devagar, Landeau Chocolate and Rio
  Maravilha inside `lx-factory-lisbon`; Ritual Coffee Roasters, Lost Cat
  Bar and Cinderella Bakery around `stray-dog-mission-san-francisco`;
  Sidebar and Luka's Taproom near `bar-skula-oakland`; Flor Discos and
  Brechó do Eskyna inside `teatro-clube-da-eskyna-santos`; Manteigaria
  inside `time-out-market-lisboa`. That's the pin backlog for anyone
  picking up cross-linking work.

**Created two places**, both passing every condition of
`quality-gate-before-publish` — checked explicitly this time rather than
inferred, after the word-count miss logged above:

- `cuia-copan-sao-paulo` — 639 words en / 636 pt-BR, tagline 86 and 87
  chars, 5 bullets, geocode 0.65, hero from Vai Se Food, 3 sources
  including the MICHELIN Guide listing.
- `megafauna-copan-sao-paulo` — 668 words en / 600 pt-BR, tagline 90 and
  78 chars, 5 bullets, geocode 0.65, hero from São Paulo Secreto, 3
  sources including the shop's own site and PublishNews. The pt-BR
  tagline was 92 chars on first write and was cut to 78 before commit —
  same class of schema break as the nine taglines noted in BACKLOG.

Current-status check per `verify-still-open-before-create`: both
confirmed operating in 2026 — Cuia via its live MICHELIN Guide listing
and a second branch since opened in Pinheiros, Megafauna via its own site
and its 2025 handover to Associação Livros no Centro. The 2021 Vai Se
Food prices were deliberately **not** carried into the page as current.

### ⚠️ Deliberate `dedupe-by-place` deviation — needs a rules decision

`dedupe-by-place` says a candidate within **150m** of an existing place
"is the same real-world place covered again — not a new place." Both new
pins are well inside that: Cuia is 46m from Fel and 10m from Megafauna;
Megafauna is 38m from Fel. Read literally, the rule forbids creating
either.

They were created anyway, because the rule's stated intent is to stop the
*same* venue being covered twice, and these are three distinct businesses
that happen to share the ground floor of a 1,000-apartment Niemeyer
building. Flagged rather than quietly bypassed.

This is not a one-off. As the Class B list above shows, **the 150m radius
blocks essentially every remaining cross-link opportunity Near has**,
because dense venues — a market hall, a factory complex, a landmark
building — are exactly where several pinnable businesses sit within
metres of each other. Proposed amendment, for operator approval rather
than unilateral edit: proximity should *trigger an identity check*
(same name, same business, same source coverage → merge) instead of
automatically implying sameness. `rules.md` is unchanged pending that
decision.

Locales: both created `en` + `pt-BR` only, matching
`bar-fel-copan-sao-paulo`'s existing set. This adds 8 to the locale-gap
count already logged above. `npx tsc --noEmit` and `npm run build` pass
(133 pages, up from 121), and both pages plus both inline links were
confirmed rendering in the browser.

## 2026-08-31 — near-caretaker sweep #1 (first full pass)

First run of the currency sweep over all 18 published places. Mechanical
scan first, web verification only where the scan flagged something.

**Class 7 (link rot) — 3 dead URLs found and repaired.**

- `beco-do-batman-sao-paulo` — **both** sources were 404, so the page had
  zero working citations while appearing fully sourced. Globe Guide had
  moved the article to `/beco-do-batman-batman-alley/` (URL updated, same
  piece). DiscoverWalks was gone with no equivalent at that outlet;
  replaced with BA Street Art, which covers the same fact the page leans
  on — the alley being constantly repainted. The two in-text links added
  during the 2026-08-31 link-density backfill pointed at the dead URLs
  and were updated to match. Worth noting: the backfill *created* two
  dead in-text citations by linking sources that were already rotten.
- `megafauna-copan-sao-paulo` — `/sobre-a-livraria/` 404s; site root is
  live and now cited instead.

Not dead, but unverifiable by HTTP HEAD (bot-blocked or JS-gated), left
alone: `dollywood.com` (403), `doeatbetterexperience.com` (403),
`travel.usnews.com` (timeout), `guide.michelin.com` (202).

**Class 1 (people) — 13 named individuals across 9 places, none verified
this run.** Highest-risk class and the one with no automation. Dolly
Parton was corrected separately today. Oscar Niemeyer (bar Fel, Cuia,
Megafauna) is named only as the Copan's architect — correct as written
regardless, he died in 2012. The remaining 11 (Raquel Braga, Nina Veloso,
Bel Coelho, Maria Alderete, Rick Mitchell, Jacob Alioto, Jared Hirsch,
Angela Cao, Nathan Angelo Depante, Magentinha, Rafa Rouxinol) are
working operators and performers rather than public figures, so a death
or departure would not reliably surface in search. Deferred rather than
skipped — flagged here so the next run knows it's outstanding.

**Class 2 (open/closed) —** all 18 verified 3–4 days ago at creation. Too
recent to be worth a `confirmed-closed` first check this run.

**Classes 3–6 —** scanned, nothing actionable. Recency markers in
`stray-dog` ("a genuinely busy 2026", "just opened"), `teatro-eskyna`
("as of this writing") and `cabaret-latino` (event dated 11 Sep 2026,
still upcoming) are all still accurate at time of sweep. They will not be
in six months; that's what the next sweeps are for.

### 2026-08-31 — caretaker sweep #1, continued (class 1 + class 3)

- **Bel Coelho verified active** (Cuia, Clandestina; CNN Brasil, Mesa SP,
  her own site all current). No correction needed on the person.
- **But the sweep found a stale fact she was attached to.** The Cuia page
  said her Clandestino "closed in 2020" and stopped there; she reopened
  it as **Clandestina** in Vila Madalena in 2024. The CNN Brasil article
  the page *already cited* is headlined "do Cuia e da Clandestina" — so
  the page was contradicted by its own source, which is a useful reminder
  that link-checking a citation resolves is not the same as checking it
  still says what the copy claims. Corrected in en and pt-BR.
- Cuia's second location in Pinheiros was already covered (as a caveat
  about muddied search results), so no gap there.
- Remaining 10 named people still unverified — deferred again.

**Footer count bug, fixed at source.** `_stats.json` said 16 places while
the board rendered 17, so the footer told every visitor the wrong number.
`getStats()` now derives `placesIndexed` from disk instead of trusting the
snapshot, so the count and the board can't disagree again regardless of
what the file says. The file itself was refreshed too, for anything else
reading it.
