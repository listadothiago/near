---
name: near-write-article
description: The one shared pipeline every Near skill uses to actually write and publish a piece — a place page, a blog post/collection, or a standing-column issue. Wraps topic confirmation (near-seo + near-trendsetter, plus near-seo's own backlink-pr consultation), research/sourcing (near-sources, near-deep-researcher), drafting in the right persona's voice per near-tov-police's discipline, near-illustrator for images, near-seo + aeo QA, a mandatory google-discover-audit feed check, near-tov-police + near-legal-counsel + chief editor sign-off, near-translator for all six locales, the mechanical publish gates, a git push, and a post-publish handoff to backlink-pr for outreach. Use this instead of improvising the sequence — near-editor, near-blogger, near-war-room, and every standing column editor should call into this rather than each reimplementing it slightly differently.
---

# near-write-article

Near has one real "write and publish a piece" pipeline. Every skill
that produces a published piece — `near-editor` (place pages),
`near-blogger` (long-form guides), `near-adiciona`, `near-war-room`,
and every standing-column editor (RADAR-X on the editorial column,
RUCIO LIBERO on The Setlist, ALLORA DAI on Ladies&Gentlethem,
FOODIE-9000 on The Pass) — should call into this instead of each
inventing its own version of the same nine steps. Consistency here is
what makes `near-tov-police`'s audit and `content/rules.md`'s gates
mean the same thing everywhere.

Mirrors `BACKLOG.md`'s own "Content Creation Flow" note: *"Agents
consult amongst themselves → Choose public persona to write → Persona
writes → Chief Editor, TOV, SEO, Legal revise → Editor/Translators
localize to all locales."* This skill is that flow, made concrete and
complete.

## The pipeline

### 1. Confirm topic and terms — `near-seo` + `near-trendsetter`

Before any drafting: what market/query gap does this fill
(`near-seo`), and is it actually current (`near-trendsetter`, the
internal research role — not to be confused with RADAR-X the byline,
who may separately end up writing the piece). This is the mandatory
joint step every standing column already codifies in its own doc
(`content/editorial-column.md`, `content/the-setlist.md`,
`content/ladies-and-gentlethem.md`, `content/gastronomic-column.md`) —
no column editor, and no other piece produced through this pipeline,
scopes an issue solo. Confirm the specific terms/keywords the piece
should actually target, not just the general topic.

**A single place page and a single dated event are not the only two
shapes a piece can take.** Operator directive, 2026-09-04, surfaced
when a thin-venue market (São Vicente/Itararé, after its handful of
real venues were already covered) got pushed to find "one more pin"
instead of the better answer. A `near-blogger` long-form guide or a
standing-column issue is **always** a live option at this step, not a
fallback reached for only when a place/event search comes up empty.
When a scene's material is real but spread thin across several
venues/observations/testimony rather than concentrated in one
venue or one dated event, tying it together as a blog piece or column
issue is usually the *better* piece, not the consolation one — weigh
it alongside place/event from the start of scoping, every time.

**Both roles read `content/trends-feeds.md` at this step** — the saved
Google Trends feeds the operator directed every content skill to check
on every run (2026-09-03). They inform the terms this piece targets;
they don't dictate the topic, because Near's angle and filter still
govern what is worth covering at all.

`near-seo` brings its own mandatory `backlink-pr` consultation into this
step (see `near-seo/SKILL.md`) — off-page outreach targets get scoped
alongside the on-page topic, not as an afterthought once the piece is
live.

### 2. Time-bound content: `near-events` first, no exceptions

**Operator directive, 2026-09-03: `near-events` is invited to EVERY
article, not just the ones that look event-shaped.** *"we love them
events!"* The old reading — run it "if the piece is hung on a dated
event" — let event-free pages ship for venues that in fact run a
programme. Every piece now asks the question.

`near-events` runs before any writing happens, per The Setlist's
mandatory-first-research-step precedent. Real, specific, dated events
only (favor further-out dates per the site-wide standing preference —
**events further out live longer**, which is the whole point); no
invented dates, no "usually happens around this time of year." If
nothing genuine turns up, that is a fine outcome — say so; but if the
piece is hung on a dated event and nothing genuine turns up, hold at
`draft` rather than publish something padded.

**Nest the events in the place page.** The reference implementation is
Teatro da Eskyna — events belong *on* the place they happen at, not
mentioned in passing in the body. If an event is substantial enough to
warrant its own article, capture it in `BACKLOG.md` and **execute it in
the same run if feasible** rather than deferring it into a queue that
may never drain.

Events expire: a dated event whose date has passed must not keep
surfacing in the main views. That filtering is a **front-end**
responsibility, not a `near-refresh` one — see `BACKLOG.md`'s events-view
directive.

### 3. Check for an existing place first — `dedupe-by-place`

Run **`node scripts/check-duplicates.mjs`** before creating any new
place, and again before committing one. It compares venue name +
coordinates across every place folder, drafts included — never slugs,
because all three duplicates that got through differed by a whole
locality segment and no slug comparison would have flagged them.

What it prints is **pairs to check, not duplicates**. Proximity triggers
an identity check, it is not automatic sameness: 150m in SoMa or Soho
covers plenty of genuinely different venues, and the current baseline is
six such pairs, all legitimately distinct. Same venue → append the new
mention to the existing place's `meta.sources`, not a new slug. Different
venue → create it and note the near-miss in the commit message.
Undecidable → hold at draft and ask. Full rule: `dedupe-by-place` in
`content/rules.md`.

### 4. Research and source — `near-sources` + `near-deep-researcher`

#### 4-A. The preferred-source shortlist comes FIRST — AAN papers first of all

**Operator directive, 2026-09-03.** Before any open-web research,
`near-sources` reads `content/preferred-sources.md` and builds a
shortlist of sources relevant to *this* piece, in this order:

1. **AAN (Association of Alternative Newsmedia) indie papers first.**
   The alt-weeklies are Near's editorial identity, not merely one source
   type among many — an East Bay Express or a Chicago Reader read on a
   venue is worth more than any number of SEO listicles saying it
   exists.
2. **Then the rest of `preferred-sources.md`**, by beat and city fit.

Run that shortlist past `near-trendsetter`, `near-seo`, the Product
Trio and the PR team (`backlink-pr`) before research proper begins —
they may know a source is stale, bot-blocked, or the wrong lens for
this beat. **Then prioritise the shortlisted sources through the rest
of the process wherever the fact can be had from them.** This is a
brand-identity and editorial-direction rule, not a convenience
ranking: a piece sourced from aggregators when an alt-weekly covered
the same venue is a worse piece even when every fact checks out.

Capture any new good source found at *any* point in the process as a
preferred-sources candidate — see the capture rule below.

**Instagram accounts are a permanent, first-class source in this
shortlist, not a fallback.** Operator directive, 2026-09-04: always
check whether the venue/destination has an Instagram account, and
actually read its recent posts, not just note it exists — in plenty of
destinations it is the best source available (no site, no RSS, but a
live feed that's the real record of events and scene shifts). Read it
for dated events specifically, feeding step 2's `near-events` pass, not
only as an image lead for step 6. Log it as a `preferred-sources.md`
candidate per the capture rule below.

#### 4-B. Verification

`near-sources` confirms the watched feed this came from still resolves
and is legitimately trusted (auto vs. review — see step 8).
`near-deep-researcher` goes further than a single-pass check whenever
the piece needs real context: cross-referencing multiple sources,
reconciling conflicts, building history/economics/safety/culture
context. Every fact, quote, or observation must trace to a real,
linked source — not just the original ingestion's `sources[0]` — per
`style-guide.md`'s attribution rule. Include genuine negatives a
source raises; don't smooth them into pure positivity.

**Capture any genuinely new source this research turns up.** Research
for a single piece routinely surfaces a source Near wasn't already
watching — a venue's own Instagram/TikTok/site, a regional listicle
site, a local aggregator. Before this piece's `meta.json` gets written,
hand the list of sources actually used to `near-sources`: anything not
already in `content/sources.md` gets logged as a candidate entry in
`content/preferred-sources.md`'s "Candidates not yet in `sources.md`"
section (name, what it's good for/beat, which piece it was found
researching, any access quirks like a login wall). This is what makes
a source *monitorable* going forward — by `near-caretaker` for currency
checks, by the relevant persona's own beat/lens, and by `near-refresh`
once it's graduated into `sources.md` proper — instead of a one-off
lookup that leaves no trace for the next piece that could use it. Don't
wait for `near-refresh`'s own periodic pass to do this; it happens
inline, every piece, the moment a new source is used.

#### 4-0. The research floor — mandatory, every article, no exceptions

**Operator directive, 2026-09-02.** `near-deep-researcher` is not
"whenever the piece needs real context" any more — it runs on **every**
article, and it is not done until all four of the following are done.
This is a floor, not a checklist to satisfy minimally.

1. **`near-deep-researcher`, always.** Multi-source, conflicts
   reconciled, not a single-pass lookup. A piece that feels obvious is
   exactly the one that ships a stale price.
2. **Reddit, every article.** The city and neighbourhood subreddits plus
   any topic sub that fits. This is where the failure modes live that no
   publication prints — the queue that is worse than listed, the place
   that changed hands, the "it's been dead since the refurb" thread.
   Search the venue name and the street name, and read the *dates*: a
   2019 complaint about a 2019 owner is not a fact about today.
3. **Google reviews, every article.** Read the **recent** ones and the
   **low** ones, not the average. What you are mining is: hours that
   contradict the official listing, queue behaviour, whether the room is
   loud, whether it is card-only, whether it is still open. The rating
   itself is close to worthless; the specifics are the point.
4. **At least five `content/preferred-sources.md` entries**, for related
   context — not five citations for one fact, five sources consulted for
   the surrounding picture. If fewer than five preferred sources have
   anything to say about this subject, that is itself a finding: either
   the subject is thinner than assumed, or the source catalogue has a
   hole in that city/beat, and the hole gets logged.

**When legs 2 and 3 are blocked — the fallback ladder.** Decided
2026-09-03, after the Sitges run found that `reddit.com` is refused
outright to the search backend and Google/Tripadvisor reviews return 403.
That made legs 2 and 3 **silently unrunnable on every article**, which
had been quietly degrading the floor rather than tripping it. Never
declare the floor met when they did not run. Work the ladder in order:

1. **Retry through the search index** — a `site:reddit.com <venue>`
   query often surfaces cached thread text even when the domain itself
   refuses a fetch.
2. **Escalate to `claude-in-chrome`.** The browser tools run in the
   operator's real Chrome session and are not subject to the fetch
   backend's refusals. This is the intended path for UGC checks and
   should be reached for before giving up, not after. Load
   `tabs_context_mcp` + `navigate` + `get_page_text` in one `ToolSearch`
   call. Do not trigger dialogs; do not log in to anything.
3. **Substitute an equivalent UGC source** where one exists for that
   market — a local forum, a Google Maps listing read through the
   browser, the venue's own social comments.
4. **If all of that fails, say so, in three places** — the piece's
   `statusHistory`, `content/preferred-sources.md`, and the run report.
   Name which leg did not run and why. An unmet floor that is recorded
   is recoverable; an unmet floor that is glossed is how a whole batch
   ships unverified.

**A blocked leg is never grounds to upgrade `trust`.** If the UGC checks
could not run, the piece has *less* corroboration than a normal one, not
the same amount.

5. **Ask the operator, when the operator would know.** Operator
   directive, same day: *"if it makes sense, feel free to check me in
   this writing checklist too."* He is a real source and Near's only
   real `Person` — for anywhere in the **Baixada Santista, São Paulo,
   Rio** or anywhere else he has actually been, ask before publishing,
   not after. The Balcão pin is the model: the managed queue and the
   Arabic-speaking regulars were both his, both unpublishable from
   research alone, and both are the best details in the piece.

   **"If it makes sense" is doing real work in that sentence** — this is
   not a prompt to ask about every venue on earth. Ask when he plausibly
   has ground truth, and ask a **specific** question ("does the queue at
   X actually move?"), never "any thoughts?". Treat it as
   **non-blocking**: if he is not in the session, note the open question
   in `statusHistory` and publish what is sourced rather than stalling.
   His answers are **curator first-hand testimony** — attributed in-body
   and linked to `/about/thiago-baraldi`, per the Balcão pattern, never
   absorbed into house voice.

**Route this through `near-trendsetter` and `near-sources`, both.**
`near-trendsetter` (RADAR-X) picks which sources are the live ones for
this subject and city rather than defaulting to whatever is at the top of
the file; `near-sources` verifies each one resolves and is legitimately
trusted, and logs anything new per the capture rule above.

**Reddit and Google reviews are testimony, not fact** — the same class as
family lore and venue self-description, and they get the same treatment:
never stated as fact, always labelled as what they are.

**Quote them, with links.** Operator directive, 2026-09-02: *"you can
quote these ugc testimonies with links why not."* A linked quote is more
honest than a paraphrase, not less — it shows the reader exactly what the
claim rests on and lets them judge it. So the house move is:

- **Quote short and link to the actual comment or review**, the same as
  any other citation. An unlinkable quote does not run.
- **Attribute to the platform and the public display name** the person
  chose to post under — *"a commenter on r/london, March 2026"* or the
  review's own handle. Never dig for, infer, or publish a real identity
  behind a handle.
- **Date it.** UGC rots faster than press: a 2019 complaint about a 2019
  owner is not a fact about today.
- **Frame it as one person's account**, not the verdict. *"One reviewer
  in March 2026 says…"* is fine; *"reviewers say…"* over a single quote
  is not.
- **A pattern is the stronger claim** and should be reported as one when
  it is real: *"the queue comes up in review after review through 2026"*,
  with two or three linked examples.
- **Paraphrase by default; quote when the quote earns it.** Operator,
  same day: *"summaries can paraphrase of course, but also quote if a
  quote is relevant or funny."* A summary is usually the honest form —
  it reports the pattern rather than elevating one stranger. Reach for
  the verbatim line when it is **funnier, sharper, or more specific than
  any paraphrase would be**, which is a real and common case: nobody
  paraphrases a good complaint well. Both forms carry the link either
  way; the choice is about which one tells the reader more.
- **`near-legal-counsel` still governs the negative ones.** A quoted
  allegation of something a business could sue over — dirty kitchen,
  theft, discrimination — is republication, and repeating a defamatory
  claim is not a defence. Those need the piece to be visibly reporting
  *that the claim was made*, or they don't run. A quote about a slow
  queue needs none of this.

Record in `statusHistory` that this floor was met, and name the five
preferred sources actually consulted — otherwise the next editor cannot
tell a thorough pass from a skipped one.

#### 4a. Spend the research on as many pieces as it will honestly carry

**Standing rule (operator, 2026-09-02): a research pass should produce as
many articles as it can, not one.** Research is the expensive step and it
is almost always broader than the piece that triggered it — the sources
loaded for one venue routinely establish a neighbour, a second venue on
the same street, a dated event, or the collection that ties them
together. Writing one piece and discarding the rest is the waste this
rule exists to stop.

Before drafting, ask what else the material already substantiates, and
write those in the same run:

- **Same neighbourhood is the strongest case — do those in one go.** It
  is also what the neighborhoods directive rewards, since the unit of
  work there is taking one neighbourhood to 4 pins, and four pins
  researched together cost far less than four researched apart.
- **Invoke additional guest editors as needed** rather than forcing one
  persona to cover beats that aren't theirs. Three venues on one street
  can legitimately be a gastronomic, a nightlife and a historian piece —
  that's three bylines on one research pass, not a reason to write only
  the one that fits the persona already in the room.
- **A collection is often free.** If the run produces three or more
  related pins, the piece tying them together asserts no new facts and
  needs no new sourcing.

The limit is honesty, not volume: only write what the research actually
substantiates. A second piece that needs facts nobody verified is a new
research job, not a bonus — log it as a lead and move on. This is the
opposite of padding, and `near-war-room`'s "refuse to proceed on a topic
research can't substantiate" still governs.

### 5. Choose the persona and write — the right voice, TOV-guided

Pick whichever public persona's beat actually fits (see each
persona's own skill under `.claude/skills/<slug>/` for its character
sheet and any beat-specific advisor lens — `near-editor-gastronomic`,
`near-editor-party`, etc.). If this is a standing column, the column's
editor persona either writes it personally or defers, per that
column's own doc — being editor isn't the same job as being that
issue's writer.

#### 5-A. The local editor, and credited collaborators

**Operator directive, 2026-09-03.**

- **Always consult the local editor skill when one exists for the
  piece's city/locale**, and **consider that editor as the author or as
  a credited collaborator.** A local editor who knows the city is a
  better byline than a beat persona parachuting in, and where both
  contribute, both get credit.
- **Credit collaborators wherever genuinely warranted**, not
  grudgingly. A piece that drew a real judgment from a specialist lens
  should say so, per `style-guide.md`'s persona-quoting rule.
- **The curator (Thiago) is credited only when he is actually a
  collaborator or a quoted source** — most often when a tip originated
  with him. **Never auto-generate whole articles under his byline**; he
  will ask when he wants to post to his own column.

#### 5-B. `parser` participates in every article

`parser` (Near's AI-content-generation specialist) is invited to every
article write — both to **advise** on the draft and to **learn** from
it, folding any new best practice into its own guidelines file. This is
the same feedback loop `near-write-article` already owes the
content-generation skill when a rule gets promoted after a bad draft.

#### 5-C. Social media

A dedicated **social-media skill** is to be invited to every article
write once it exists (operator directive, 2026-09-03 — **not yet
built**; see `BACKLOG.md`). Until then, `near-socials` is the closest
existing stand-in and should be consulted in its place.

**The structural rules below (operator, 2026-09-02) apply while
drafting, to every piece.** They are not a post-hoc reformatting pass —
a body written as three 400-word paragraphs and then chopped up reads
like a body that was chopped up.

- **A paragraph break every 100 words, maximum.** Long paragraphs are
  the single most reliable tell of an unedited machine draft, and on a
  phone they are a wall.
- **A new sub-header at 250 words, and every 250 words thereafter.** For
  SEO and for scanning — a reader who lands mid-page needs to know where
  they are. Sub-headers are `##` in the body, and each one should say
  what its section is actually about, not "Overview".
- **These are density rules, not a word-count cap.** They do not make a
  piece shorter or longer; they dictate how many sub-headers (and, at
  step 6, how many images) a given length has to carry. A 700-word body
  needs at least two sub-headers whether or not it wanted them. If a
  section genuinely has nothing to break on at 250 words, that is a
  signal the section is padded — cut it rather than bending the rule.

Write following `near-editor/references/style-guide.md` and
`llm-seo.md` directly while drafting, not just as a post-hoc check —
`near-tov-police`'s job in step 7 is confirming the discipline was
followed, not discovering it for the first time. Consult any relevant
specialist advisor lens (gastronomic, luxury, historian, etc.) and, if
a genuine specialist judgment call happened, quote that persona by
name per "Quoting collaborating personas."

### 6. Images — `near-illustrator`

Art-direction call on every piece, no exceptions: hero/thumbnail
choice, **whether in-body images are needed**, whether a gallery is
warranted (high bar), whether an original
illustration would out-click available photography.

**Operator directive, 2026-09-02: `near-illustrator` is ALWAYS consulted
on mid-post imagery, not only the hero — every piece, including short
ones.** A published piece must never read as an undifferentiated wall of
text; an image landing partway down is part of the deliverable, not a
nice-to-have reserved for long posts. Run this against the **drafted
body** from step 5 (a wall of text can't be judged before the text
exists), and record the answer — including an explicit "none needed" —
per `near-illustrator`'s logging rule.

**Operator directive, 2026-09-02: 250 words maximum per image, hero
included.** That sets the floor mechanically — `ceil(words / 250)`
images, so ≤250 words is hero-only, 400 words needs a second image, 900
words needs four. `near-illustrator` still decides *which* images,
*what* subject, and *where* they land, and may run more than the floor
where the piece earns it; what it may not do is come back under the
floor. If an image can't be resolved to meet the floor, that's step 6's
existing hold condition, not a reason to publish thin.

Hero tiers in
preference order: real source photo with attribution → licensed stock
→ original illustration (visibly stylized, never photoreal — a
correctness rule, not taste). Generated images disclose themselves as
AI-generated in `attribution`. If image resolution fails entirely, the
piece is held, not published without one.

### 7. Sign-off — `near-tov-police`, `language-tic-police`, `near-legal-counsel`, then the chief editor

Four distinct checks, in order, each fixing what's actually theirs
rather than rubber-stamping:

- **`near-tov-police`** runs its full voice audit (opening-line bans,
  headline-formula policing, AI-tell sweep, voice register, honesty
  rule, age-neutral framing, process-as-copy, rank-pulling,
  persona-drift check) on the drafted English source. Checks *how*
  it's said.
- **`language-tic-police`** runs the sentence-interior pass — recurring
  constructions, the watchlist words, paragraph and sentence-length
  shape — measured against the catalogue rather than judged inside the
  piece. Its whole premise is that a tic is invisible from within a
  single draft, so this cannot be folded into the check above. Runs on
  **every locale**, not only English: a translation grows its own tics.
- **`near-legal-counsel`** checks defamation-adjacent claims (is a
  negative actually sourced, not just stated), real-person likeness/
  consent (the `near-alter-ego` guardrails, if relevant), image
  licensing, AI-disclosure compliance, and trademark/brand-name
  accuracy. Checks *legal exposure*, not tone or substance — most
  pieces should sail through this with no findings.
- **The chief editor** (`near-editor`'s own editorial judgment, or the
  standing column's named editor persona) gives final go-ahead on
  substance and framing. Checks *whether it's the right call at all*.
  **Also owns the second headline-formula pass** (operator, 2026-09-02):
  compare the `shortTitle` against the byline's own recent pins and the
  wider catalogue, because a repeated shape is invisible from inside a
  single piece. `near-tov-police`'s Job 1b is the first pass; this is the
  one that catches what it missed.

Findings from any of the three get fixed by the writing persona/
`near-editor`, not waved through — none of the three skips the others.

### 8. Translate — `near-translator`, all six locales

**Every published piece needs all six locales
(`content/rules.md`'s `quality-gate-before-publish` full-locale-coverage
requirement) before it ships, unless it's `trust: review`/`status:
draft` or `status: closed`/`archived`, which don't need localizing.**
This is not a mechanical translation pass — `near-translator` produces
a genuine local edition per persona
(`references/locales/<locale>.md`), re-checking SEO query patterns,
local naming, and what to add/cut per market, not a literal
word-for-word rendering of the English source. Validate every locale's
`dek`/`seoDescription` against `schema.ts`'s length limits before
flipping status. A piece that ships with English-only content and a
"good enough for now" plan for the rest is a bug per this rule, not an
acceptable partial state.

### 9. Mechanical quality gates — before any status flip to `active`

**`publishedAt` must be a real timestamp, never `T00:00:00Z`.** Added
2026-09-03 after the operator reported new work not appearing at the top
of the board's Latest tab. Eight active pins had been written with the
midnight placeholder, producing an exact tie that a stable sort resolved
alphabetically — so four same-day Sitges pins sat mid-board behind a
slug starting `1234-`. Use the actual publish moment to the second (the
commit time is the honest value). A midnight `publishedAt` fails this
gate exactly like an over-length tagline. Same for `updatedAt` on an
edit.

**And `updatedAt` must actually move when you edit a published piece.**
Operator directive, 2026-09-04. It is no longer a machine-only field —
`Dateline.tsx` renders `Revised <date>` from it and `PlaceCard` shows
`Rev.`, so a correction that leaves it untouched ships a visible
falsehood about how current the page is. Set it to the real moment of
the edit for any change a reader reads or a machine indexes; leave it
for whitespace-only changes. Never backfill it to look fresher. Full
rule: `currency-maintenance` in `content/rules.md`.

All of `content/rules.md`'s `quality-gate-before-publish` conditions,
checked explicitly, not assumed: tagline ≤ 90 chars, ≥ 3 bullets,
long-form body ≥ 150 words in at least English (a floor, not a target —
write tight, don't pad; see `rules.md` for the 2026-09-01 directive and
its Featured Article/blog/column exceptions), geocode confidence ≥
0.6, hero image resolved, the step 5/6 structural rules hold in **every
locale, not just English** (no paragraph over 100 words; a sub-header at
250 words and each 250 after; at least `ceil(words / 250)` images
counting the hero) — a locale edition is a real edition, so a
`near-translator` pass that merges paragraphs or drops a sub-header
fails this gate the same way the English would, link-density rule passes (real in-text
external + internal links, not just a footer citation block — log a
genuine internal-link gap to `content/requests.md` rather than forcing
a weak one). Alongside that mechanical floor, run `link-police`'s pass
on the same body: it pushes past the one-external-one-internal minimum
toward every genuine linking opportunity, and turns a worthwhile
missing target into a published "coming soon" shell page (linked both
ways) instead of a bare, unlinked mention. Also run `near-seo`'s QA pass
(Mode 2) and `.claude/skills/aeo/SKILL.md`'s citability/structured-data
checks together here — `near-seo` confirms the baseline `llm-seo.md`
discipline was followed, `aeo` confirms the JSON-LD actually matches the
page and the most-liftable sentences survive being quoted alone. For a
standing-column entry specifically: also prepend
the new slug to that column's `content/<column>-index.json` `slugs`
array and its own doc's Series Index — the archive page and RSS feed
only ever show what's listed there.

### 9a-0. Red team — `departamento-de-vai-dar-merda`, mandatory

**Operator directive, 2026-09-02, written the day it caught a live
miss.** Run `.claude/skills/departamento-de-vai-dar-merda/SKILL.md`
against the finished draft in every locale, before the two audits below
and before any status flip.

Every other gate in this pipeline asks *is this true and sourced?* This
one asks **what in this piece goes wrong later, and who does it go wrong
for?** — claims with a shelf life (prices above all), legal exposure,
technical breakage, and how the piece lands on readers it wasn't written
for, via the DEI and neurodiversity lenses.

It exists because a piece cleared sourcing, legal *and* the Discover
audit while headlining a price that was fourteen months old. Each gate
was individually correct; none of them was asking about rot.

**Hard rule from that miss: a price is never stated as current unless it
was verified this session, and a price may never carry the headline
unless the headline survives the price changing.**

**Second hard rule — no internal discourse in published copy (operator
directive, 2026-09-03).** The red team must check every locale for
internal dialog leaking to the front end. The live miss that prompted
this shipped on a published page:

> *"Near's first Pinheiros pin — the neighborhood has been a coverage
> gap despite being a Tier 1 São Paulo target"*

Coverage gaps, tier lists, rotation position, queue status, editorial
strategy, source-catalogue holes and skill/agent mechanics are **internal
production concepts**. A reader does not know or care that Near has tiers,
and telling them reads as an unedited machine draft talking to itself. Say
what the place is; never what it is *to Near's backlog*.

The operator suggested a dedicated skill for this check; until one
exists, it lives here and `departamento-de-vai-dar-merda` owns it.

### 9a. Feed surfaces — `google-discover-audit`, mandatory

**Operator directive, 2026-09-02: this is a required step in the
pipeline, not a standalone audit anyone can skip.** `near-seo` optimises
for a query and `aeo` for a machine that quotes you; Discover is a feed
where nobody typed anything, so neither check covers it. Run
`.claude/skills/google-discover-audit/SKILL.md` against the finished
body, the resolved hero and the final `shortTitle`.

The two that most often fail here: the **hero card spec** (≥1200px wide,
>300,000 pixels, ~16:9, reaching `og:image`) — hand a failure back to
`near-illustrator` rather than downgrading the check — and
**headline-over-promise**, read as a card with no body attached, which is
a documented misleading-preview violation and the failure mode Near's
punchy house style produces most easily. Record the verdict, including a
clean pass. The skill also covers Apple News (closed to new publishers —
a watch item, not a task) and the AR card surfaces.

### 9b. Revenue pass — `backlink-pr` + `affiliate-pr` + `ad-sales`

> **🛑 OUTREACH FROZEN (operator, 2026-09-02).** This step still runs on
> every piece, but **nothing may be sent**. No email, DM, form or
> conversation, for any of the three skills, until the operator lifts the
> freeze — the site must be more fleshed out before any PR campaign, and
> a pitch from a thin site burns that contact permanently. Research,
> target identification, draft pitches and log entries are all still
> wanted; only the send is blocked. Entries stay at `prospect`. Full
> statement of the directive and its proposed exit condition is at the top
> of `content/backlink-outreach.md`.

**Operator directive, 2026-09-02: the north star is growing the site
organically AND making money, so the revenue skills are part of the
write process, not an afterthought bolted on once a piece is live.**
All three run on every piece. Each answers one narrow question:

- **`backlink-pr`** — who should link to this? Pitch it to an existing
  relationship or log a new target. (Already mandatory at step 1 for
  scoping; this is the post-draft half.)
- **`affiliate-pr`** — does this piece contain a natural purchase moment
  a reader would act on, and is there an approved program serving it?
  Accommodation and dated ticketed events are the strongest surfaces.
- **`ad-sales`** — does researching this piece surface a plausible
  advertiser lead? A venue piece means the venue, its neighbours and its
  promoters are now known, sourced and contactable. Log them as
  prospects.

**The wall, which none of the three may cross:** coverage decisions are
made at step 1 by `near-seo` / `near-trendsetter` / the rotation, on the
merits, and this step runs *against the piece that already exists*. No
place is ever queued because it monetizes, no negative is ever softened
for a partner or advertiser, and no link is invented where the piece has
no natural purchase moment. Any affiliate link is disclosed visibly at
the point of the link. If a monetization opportunity would require
changing the copy, the answer is no — say so and log it.

Recording the answer is the deliverable, including "no opportunity here",
which is the common and correct outcome for most pieces. Logs:
`content/backlink-outreach.md`, `content/affiliate-outreach.md`,
`content/ad-sales-outreach.md`. **No outreach email is ever sent without
showing the operator the exact draft and getting explicit approval.**

### 10. Trust gate, then commit and push

`meta.trust: "auto"` (an already-watched, already-trusted source, or
something the operator directly commissioned/named) → write and commit
directly. `meta.trust: "review"` → write `meta.json` + locale files
with `status: "draft"`, **do not commit**, report to the operator for
approval first. Never skip this distinction to save a step.

Before pushing anything: run the actual build (`npm run build`), not
just an assumption that a content-only change is safe — this session's
own mobile-nav incident shipped from an uncommitted, unbuilt state.
Once it passes, commit with a real message (per this repo's normal git
discipline) and push. A `draft` entry stays uncommitted until the
operator approves it; nothing skips step 7's sign-off to get pushed
faster.

Once a piece is genuinely live: hand it to `backlink-pr` as a candidate
for outreach — either pitching it fresh to a new target scoped back in
step 1, or as a lighter-touch note to an existing `relationship` contact
in `content/backlink-outreach.md`. Publishing without ever surfacing the
piece to `backlink-pr` leaves real off-page opportunity on the table.

## What this skill is not

Not a replacement for any of the skills it calls — it's the sequencing
and gate-checking layer on top of them. Not `near-refresh` (which
decides *what* gets written across a whole session) or `near-war-room`
(which convenes the full roster for a themed push) — either of those
can be the thing that decides to invoke this pipeline for a given
piece, but this skill is what actually runs once a piece is chosen.
Not `near-caretaker` (that's maintaining already-published content, a
different pipeline entirely). Not `link-police` (a focused internal
audit this pipeline calls into at step 9, not a competing sequence).
