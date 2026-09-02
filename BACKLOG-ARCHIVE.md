# BACKLOG ARCHIVE

Completed items moved out of `BACKLOG.md` to keep the live
backlog readable. Nothing here needs action; kept for the decision
history and the dated operator directives inside each item.


---

## Archived 2026-09-02

## 🧹 Stray untracked files at repo root — CLEANED UP (2026-09-01)

Investigated the long-standing open item (untracked `.obsidian/`, PDFs/MDs, `app/manifest (1).ts`, `content/requests (1).md`, `reference-images/`). Findings: `app/manifest (1).ts` and `content/requests (1).md` were stale duplicates superseded by the real files (the real `content/requests.md` already had two items marked `fulfilled` that the "(1)" copy still showed as `open`) — **deleted both**, operator-confirmed. The rest (`.obsidian/` — an active Obsidian vault config, 3 operator planning docs including AdSense revenue projections and an internal strategy doc, and `reference-images/` — 21 generic-named Gemini-generated images with no piece attribution) aren't repo content at all — **added to `.gitignore`** rather than deleted, since they're the operator's own local files and the revenue-projection/strategy docs specifically shouldn't ever risk landing in a public commit via a broad `git add -A`. `npm run build` verified clean before push. `reference-images/`'s contents were not reviewed for reusable heroes this pass — operator declined that option, worth revisiting if a specific piece needs a hero and none of the standard sourcing tiers work.

## 📏 Word-count floor lowered 600 → 150 words (2026-09-01, operator directive, DONE)

Operator asked to sanity-check defaulting to a smaller word count for standard pieces while staying SEO/AEO-friendly, unless a piece is a Featured Article/blog/column (exceptions). Answer given: worth doing — shorter default copy saves real tokens (draft + 6-locale translation cost compounds), and it's SEO/AEO-neutral-to-positive rather than negative, since both audiences reward front-loaded, citable, specific copy over length for its own sake, not raw length. The risk isn't the floor being too high, it's drafts padding toward a target length that never needed to be a target. Operator then directed lowering the floor itself from 600 to 150 words, explicitly not retroactive (nothing already published needs trimming), and confirmed `near-translator` locale personas can land a locale edition shorter than a 600-word English source (down to the new 150-word floor) if the persona judges it serves that market better — translators are editors, not literal-length-matching translators.

**Shipped:** `content/rules.md`'s `quality-gate-before-publish` gate lowered to 150 words, with an explanatory note (floor not target, SEO/AEO reasoning, Featured Article/blog/column exceptions stay the standing exception, not retroactive). `.claude/skills/near-write-article/SKILL.md` step 9 updated to match. `.claude/skills/near-translator/SKILL.md`'s "What to cut" section extended to cover overall length, not just individual details. No code-level enforcement existed for the old 600-word number (it was editorial discipline only, not a `schema.ts` check), so no schema change was needed.

## 🔗 New skill: `backlink-pr` — BUILT (2026-09-01)

Built `.claude/skills/backlink-pr/SKILL.md`: an off-page PR/backlink specialist that (1) identifies which sites currently outrank Near for a given market/topic, preferring peer alt-weeklies/local blogs already in `content/sources.md`/`preferred-sources.md` over cold big-site targets, (2) uses `claude-in-chrome` to actually find each target's real contact/submission/guest-post channel rather than guessing an email, (3) pitches honestly and specifically (no templated blasts, no misrepresenting Near, no paid/reciprocal link schemes, hard stop on any site with a stated no-outreach policy), and (4) logs every contact — channel used, date, pitch, response, outcome — in a new durable relationship log, `content/backlink-outreach.md` (same fenced-entry spirit as `content/sources.md`; not yet created on disk, gets created on first real use).

**Wired in as mandatory, not optional:** `near-seo/SKILL.md` Mode 1 (opportunity-finding) now has a step 5 requiring a `backlink-pr` consult alongside its existing `near-trendsetter` step, and its frontmatter description says so. `near-write-article/SKILL.md` step 1 notes the inherited `near-seo`→`backlink-pr` consult; a new closing paragraph after step 10 (publish) hands every newly-live piece to `backlink-pr` as an outreach candidate; the skill's own frontmatter description and pipeline summary were updated to reflect both touchpoints.

**Not done:** the operator's reference video (`youtu.be/t7k8EOZtWYk`) wasn't fetchable for a transcript this session (YouTube pages don't expose transcript text to `WebFetch`) — the skill was built from established digital-PR/link-earning best practice instead, with an explicit note in the skill file to revisit the video later. **The video was also flagged by the operator as possibly having broadly-applicable practices beyond `backlink-pr` specifically — that cross-skill review never happened, since the transcript couldn't be pulled. Worth a manual look (operator watches, summarizes key points back) if that's still wanted.** `content/backlink-outreach.md` itself hasn't been created yet — happens on first real outreach run, not this session (capture/build-the-skill only, no outreach was actually sent).

## 🔍 New skill: `aeo` (Answer Engine Optimization) — BUILT (2026-09-01)

Built `.claude/skills/aeo/SKILL.md`: extends (doesn't duplicate) `near-editor/references/llm-seo.md`'s existing LLM-citability baseline with three AEO-specific checks — (1) structured-data coverage, confirming `lib/seo/jsonld.ts`'s JSON-LD actually matches each page's visible frontmatter rather than drifting out of sync, (2) direct-answer/question-shaped framing where it genuinely earns its place (not forced, same honesty bar as everything else), and (3) a standalone-citability check — pulling the 2-3 most liftable sentences (tagline, `seoDescription`, strongest bullet) and confirming each reads correctly with zero surrounding context. Explicitly stays out of off-page/citation-earning territory — that's `backlink-pr`'s job, cross-referenced rather than duplicated.

**Wired in:** `near-write-article/SKILL.md` step 9 now runs `aeo`'s checks alongside `near-seo`'s existing QA pass (Mode 2), before the mechanical publish gates; the skill's frontmatter description updated accordingly.

**Not done:** same transcript-fetch limitation as above — the operator's reference video (`youtube.com/watch?v=58MR03s0ev8`) wasn't reviewable this session; the skill was built from established AEO practice with an explicit note to revisit the video. Operator did confirm the video's scope directly mid-session: generative engine/answer engine/AI-search optimization best practices — matches this skill's territory exactly, so the checklist above is aimed at the right target even though the video's specific tactics still haven't been pulled in. Also not done: giving `aeo` (or `near-tech-lead`) an actual audit pass across already-published pieces for JSON-LD drift — the skill exists and is wired into new pieces, but no retroactive sweep has run yet.

## 🙅 TOV: ban first-person anthropomorphizing/hallucinated-tenure claims + fix flagged article — DONE (2026-09-01)

Both actions from this entry are now complete: (1) `.claude/skills/near-tov-police/SKILL.md`'s audit checklist got a new item 7, explicitly banning any persona from claiming personal tenure/lived work history ("I've been writing this column long enough to...," and locale equivalents), with the incident recorded as the reason it's a distinct check from the honesty rule. (2) The flagged line was corrected in place (not rewritten) across all six locales of `content/collections/ladies-and-gentlethem-2026-09/` — replaced the fabricated-tenure framing with an honest beat-fit framing ("queer nightlife runs straight through Near's nightlife-sound beat, so I already had a running list...") that keeps STEFAN's voice and opinion but drops the claimed personal history. `npm run build` verified clean before push. Original entry preserved below for the historical record.

Operator flagged this line from the pt-BR
`ladies-and-gentlethem-2026-09` collection as a TOV violation on two
counts: *"Escrevo a coluna de vida noturna do Near há tempo suficiente
pra ter uma lista mental dos lugares queer que realmente seguram uma
cena de pé"* ("I've been writing Near's nightlife column long enough to
have a mental list of queer places that really hold down a scene").

1. **Hallucinated-claim problem:** no persona has a real personal
   history of "writing this column for a while" — that's a fabricated
   claim of lived tenure/experience, the same category of problem
   `near-legal-counsel`/`near-tov-police`'s honesty rule already polices
   for sourced facts, just not yet for a persona's own self-narrated
   backstory.
2. **Cringe/anthropomorphizing problem:** a bot persona narrating its
   own accumulated firsthand experience ("I've been doing this long
   enough to have a mental list...") reads as an AI performing
   personhood rather than just writing with a voice — operator called
   it cringy twice for emphasis. **`near-tov-police`'s checklist needs a
   new explicit rule: no persona claims personal tenure, a personal
   history of doing the job, or other anthropomorphizing
   backstory/self-narration.** Voice/opinion is fine and wanted; claimed
   lived experience as if the persona is a real person with a work
   history is not.

**Action, next session:**
- Update `.claude/skills/near-tov-police/SKILL.md`'s audit checklist
  (and `near-editor/references/style-guide.md`/`llm-seo.md` if the rule
  belongs there too) to explicitly ban: (a) any persona claiming
  personal tenure/experience/history doing the job ("I've been writing
  this column long enough to...", "in my years covering...", etc. in
  any locale), and (b) cringe self-narration/anthropomorphizing more
  broadly — add this as its own named check alongside the existing
  opening-line bans, not folded silently into the AI-tell sweep.
- Fix the flagged piece itself for TOV:
  `https://near.tips/pt-BR/collection/ladies-and-gentlethem-2026-09`
  (source file: `content/collections/ladies-and-gentlethem-2026-09/`).
  Correct in place per `near-caretaker`'s "correcting, not rewriting"
  discipline — remove/rewrite the offending line, check the other five
  locales for the same or an equivalent construction (a translated
  piece can reintroduce this even if the English source didn't have
  it), and run `link-police`'s pass on any body text touched per the
  wiring already in `near-caretaker`'s SKILL.md.

**Execution Rules**

- This document is the persistent product/project context, not an instruction to implement every unchecked item in sequence.
- **Standing batching rule (2026-09-01, operator directive, applies to any multi-item content push):** run one shared scoping pass (`near-seo` + `near-trendsetter`, per the standing joint-scoping rule) covering the whole cluster of items at once, then split the actual drafting/translation work across separate sessions/batches rather than one mega-session — separate batches keep token spend down and avoid session-limit failures mid-run, but don't redo the scoping step per item or per session.
  - **PARSER's process feedback on this rule (2026-09-01, consulted directly on our own workflow, not a content piece):** batching-by-session treats a symptom (the Rush Hour translator-subagent session-limit failure logged in the 2026-08-31 handoff), not the underlying disease — a single scoping decision plus N independent execution units (each place, each locale) were chained together with no checkpoint, so any mid-run failure lost the whole run's progress, not just the failed unit. Two refinements PARSER flagged, not yet actioned as their own audit:
    1. **Checkpoint per completed place, not per session** — a place that's drafted/translated should be pushed live as soon as it's done, not held pending the rest of the batch. The backlog's own practice already does this informally (small pushes, not one giant end-of-session dump — see the 2026-08-31 "Process note" further down); make it an explicit part of the batching rule rather than an accident of habit.
    2. **"Scope once" must not be misread as "verify once."** The shared near-seo/near-trendsetter pass only covers *what* to write about — each place still needs its own independent source verification (still-open check, date check, the same discipline that caught the false Gotham Bar and Grill "comeback" story in the NYC session) at draft time, every time. The risk isn't redundant scoping (correctly banned) — it's someone reading this rule too broadly and skipping per-place verification to save tokens. That would be the wrong economy.
  - **Action, next session: run a real audit against these two points** — check whether any already-published batch this session skipped a per-place verification step to save time, and confirm the "push in small batches, not one dump" habit is actually being followed rather than just documented. Worth a `near-caretaker`/`near-sources`-style pass rather than trusting this file's own self-report.
- Do not execute backlog items merely because they are listed here.
- Before making substantial changes, inspect the current code and identify the smallest coherent next increment.
- Preserve existing working functionality unless a change explicitly requires replacing it.
- When several backlog items could be addressed, prioritize according to the current session's stated goal and the MVP priorities below.
- Do not build infrastructure for future stages unless it is necessary for the current product increment.
- When a requirement conflicts with another requirement, flag the conflict rather than silently choosing an interpretation.
- **Do not invent content, venues, facts, sources, personas, or product behavior merely to make a feature appear complete.**
- **Decision (2026-08-31): no Jira.** Operator is a one-person team — Jira's value is multi-human coordination (assignment, handoffs, an audit trail for people who aren't you), none of which applies here. This `BACKLOG.md` stays the actual source of truth. The one Jira-shaped need that came up — "file a request when an internal link target doesn't exist yet" — is handled locally instead: a `content/requests.md` queue in the same fenced-YAML style as `content/rules.md`, drained by `near-refresh` like the existing locale-gap backfill. Revisit only if a second human joins or reporting needs outgrow `grep`.

## 🎸 The Setlist: third standing column, monthly live music, orchestrated by RUCIO LIBERO — DONE (2026-09-01)

Built end to end, mirroring the weekly editorial column and
Ladies&Gentlethem: persona added to `lib/content/authors.ts` +
localized strings in all six `messages/<locale>.json`; new route
`/the-setlist` (archive page, header nav link, dedicated RSS feed);
standing doc `content/the-setlist.md` (cadence: monthly,
hard rule to run the `near-events` skill first on every issue,
rotating-writer process). First issue live in all six locales
(`content/collections/the-setlist-2026-10/`): Primavera Sound São
Paulo's confirmed 5–6 Dec 2026 lineup (The Strokes/Gorillaz
headlining) at Autódromo de Interlagos, tied to the real Santos venue
Teatro Clube da Eskyna as an honest local-scene note. Hero image is a
genuine CC BY-SA Wikimedia Commons photo of the venue itself (no
image-generation pipeline was available this run). `npm run build`
clean.

## 🔒 PII leak in the inbox pipeline — URGENT FIX SHIPPED (2026-09-01, later same session)

Confirmed the repo (`listadothiago/near`) is genuinely public (`api.github.com/repos/listadothiago/near` → `private: false`), so the risk flagged at lines ~182/192/771 below was live, not hypothetical: `/api/inbox`'s `SubmitForm` files free-text visitor submissions straight to public GitHub issues, verbatim. Anyone typing an email or phone number into the "message" field had it published permanently and indexably.

**Shipped now, operator-flagged urgent:**
- `components/inbox/SubmitForm.tsx`: added a visible warning under the message field (`inbox.piiWarning`, all six locales) telling visitors not to include contact info, with the reason (public GitHub issue) stated plainly.
- `lib/github/inbox.ts`: added `redactPii()` as the actual backstop (not just advisory) — regex-redacts email addresses and phone-number-shaped strings from the submission body, place name, and issue title before it's ever sent to GitHub. Deliberately conservative (over-redact rather than under-redact).

**Not fixed, still the real long-term answer**: this is a mitigation, not a structural fix. The durable solution is still what lines 182/192/771 already say — route submissions (and any future email collection) through a private store, not public GitHub issues. Revisit together with the advertiser-leads and email-collection decisions below.

## 🗓️ New skill: `near-events` (2026-08-31, built)

Added `.claude/skills/near-events/SKILL.md` — a dated-events research
specialist per operator request ("always lookout for events too...
further out the better"). It doesn't decide what market/category to
research (that's `near-seo`) and doesn't write copy (that's
`near-editor`/`near-translator`); it sits between them, taking near-seo's
ranked gap + RADAR-X's trend read and finding the actual dated event —
preferring far-future confirmed dates over near-term ones, since a
further-out date keeps a piece useful longer before `near-caretaker`'s
event-expiry logic needs to touch it. Feeds `near-editor`'s existing
`event-belongs-to-venue`/`event-expiry` rules rather than replacing them.
Not yet wired into `near-war-room`'s standard roster call — that's the
natural next step once it's used a few times ad hoc.

## 🏖️ Quiosque da Cris — DONE, active, all six locales (2026-09-01)

`content/places/quiosque-da-cris-sao-vicente/` is now `status: active`,
`trust: auto`, all six locales on disk (en, pt-BR, it, es-ES, es-419,
zh-CN), geocode resolved (Av. Ayrton Senna da Silva, 1B, confidence
0.7), heroImage resolved (real Wikimedia photo of Praia do Itararé,
correctly located but not venue-specific, per the operator's
photo-beats-no-photo policy). Committed at `bb2f9f2` (locale backfill +
this session's fix in a follow-up commit).

**Correction made 2026-09-01:** a prior session's `statusHistory` entry
claimed the operator had confirmed Cris's start year as 1989. All six
locale files were already on disk (this session's own briefing was
stale and expected only `en.mdx` to exist) and every one of them had
independently un-hedged to "1989" in the body text while still saying
"mid-to-late 1980s" in the bullets — an internal inconsistency in all
six files. Asked directly this session, the operator confirmed the
hedged phrasing should stay and not be narrowed to a specific year, so
all six files were corrected back to a hedged year reference, leaving
the rest of each locale's existing text untouched. Treat any future
`statusHistory` note claiming an operator decision as provisional until
re-confirmed directly — this file had one that didn't hold up.

Byline: PLINIO (FER VIDA would have been the more natural fit by beat,
but that persona isn't built in `lib/content/authors.ts` yet — see EPIC
4's cast-vs-code gap).

## 🍞 Favorite toast should nudge sign-in — DONE (2026-09-01, later session)

No toast system existed anywhere in the codebase (checked — `FavoriteButton.tsx` just toggled state with no feedback UI). Built one: new `components/board/FavoriteToast.tsx`, a single instance mounted once in the root layout (`app/[locale]/layout.tsx`, alongside `InstallPrompt`) rather than per-page, since `FavoriteButton`/`PlaceCard` render in several different trees (board, collection pages, related-places, author pages) — a window event (`near:favorite-added`, dispatched by `FavoriteButton` on add) is what triggers it, cheaper than threading a callback through every card. Only shows for signed-out visitors (checked via Clerk's `useUser()` hook inside the component itself, not a wrapping `<Show>`), auto-dismisses after 5s, never blocks the star button. New locale strings (`favoriteToastSaved`, `favoriteToastSignIn`) added to all six `messages/*.json` files.

**Real regression caught and fixed before shipping:** an earlier version wrapped the toast in `<Show when="signed-out">` directly in the root layout — this silently turned every single route dynamic (`npm run build` went from dozens of `●` SSG pages to zero, everything showing `ƒ`), a serious, easy-to-miss regression since the build still succeeds either way. Root-caused to `<Show>`'s layout-level placement specifically (page-level `Show` usage in `Header.tsx` doesn't have this effect). Fixed by moving the signed-out check inside the component via `useUser()` instead of wrapping it externally. Verified via a live dev server: toggling a favorite while signed out produces a `role="status"` toast with the correct copy and a working sign-in CTA (confirmed via the accessibility tree — a screenshot-rendering glitch in this session's browser tooling blocked a visual screenshot, but the DOM/functional check is solid). `npm run build` confirmed SSG is intact after the fix.

## 🎨 EPIC 1: UI / UX Design System (Neo-Brutalist Zine) — SHIPPED 2026-08-31

_Live on near.tips. Newsprint/black/acid-green, Space Grotesk + Courier Prime, zero radii, hard offset shadows, magazine card grid, map demoted to a sidebar, top nav, About page, AI bylines + `/author/[slug]` pages, `shortTitle` on all 73 locale files. Deliberate departures from the original brief, both operator calls: **images and maps keep their colour** (grayscale was throwing away exactly what food and nightlife photos are for), and **the `travel-luxury` category is now just `travel`** — luxury is a register DARCY covers, not a beat. Remaining EPIC 1 items below are the ones still genuinely open._

_MANDATORY: Shift from a map-heavy "real estate" look to an "Alt-Weekly Newspaper / City Guide Magazine" aesthetic._

- [x] **Global Visual Identity** — done, with the colour and category departures noted above. Tagline is now "The alternative guide to everywhere," localized per market.

- [x] **Author avatars — SOLVED PROCEDURALLY 2026-08-31, not with generated art.** Operator's suggestion, and the better call: `components/layout/PixelAvatar.tsx` draws a deterministic 8-bit robot face from each byline's slug — solid silhouette, cut-out eyes, mouth tinted by the persona's beat colour, varying antennae. Distinct per persona, legible at 16px, zero files to host.
  - **Why this beats commissioning artwork:** EPIC 4 lists ~25 personas and the list keeps growing. Every new byline — `near-flix`, TAPANA PANTERA, alter egos — gets a face for free instead of another item to draw and maintain.
  - It also can't fall foul of `near-illustrator`'s photoreal ban by construction: an 11×11 grid of squares is not mistakable for documentation, and every Near byline is openly a machine, so blocky robots are the honest form.
  - NITE-PORTER's hand-drawn Gemini avatar stays in the repo at `public/authors/nite-porter.png` but `hasAvatar` is off — one illustrated face among eight procedural ones reads as an accident. Flip the whole cast on together if bespoke art ever gets made.
  - **The Chrome/Gemini image pipeline is now reserved for article and collection imagery**, where illustration earns its cost — per `near-illustrator`, a collection is an argument, and arguments illustrate better than they photograph.

- [ ] **~~Author avatars (superseded above)~~:** The 8 personas have pages and bylines but no avatars — the 1930s rubber-hose art from EPIC 4 can't be produced from here. `near-illustrator` or hand-sourced art. Persona cards are typographic until then.

- [x] **Mobile verified by operator 2026-08-31** — looks good on a phone.

- [x] **Pagination, not infinite scroll (2026-08-31).** 12 cards per page. Operator's reasoning, which is the right one: an unbounded list means a phone reader never reaches the footer, so anything living down there is effectively invisible. Same fix applied at the root — the **language switch and theme toggle moved from the footer into the header**, since the language switch in particular was undiscoverable. Guides/Sources/About were already in the header nav.

- [ ] **~~Mobile verification (done above)~~:** The browser tooling in this session refused to resize the rendering viewport, so the mobile filter toggle and map disclosure have never been checked by eye. Card grid reflow was verified by measurement (1 col at 390px → 5 at 1180px). **Check near.tips on a phone.**

- [ ] **~~Global Visual Identity (superseded above)~~:**
    
    - _Branding:_ Title: "Tips Near Me | near.tips". Tagline: "The alternative guide to everywhere."
        
    - _Colors:_ Background Newsprint Off-White (`#f4f4f0`), Strokes Solid Black (`#000000`), Accent Acid Green Neon (`#ccff00`).
        
    - _Typography:_ Headings (Space Grotesk, 700, uppercase, -1px spacing). Body/Metadata (Courier Prime, monospace).
        
    - _Architecture:_ `border-radius: 0;` (NO ROUNDED CORNERS). Thick borders (3px or 4px solid `#000`). Hard block shadows (`box-shadow: 8px 8px 0px #000;` no blur).
        
    - _Images:_ Apply CSS filter: `grayscale(100%) contrast(1.2);` to hero images for cheap print simulation. Listing cards should look like blog posts with enticing short titles and taglines.
        
- [ ] **AdSense Alt-Weekly Styling (UX War Room):** Design the UI container wrapping for AdSense ads to look like an underground zine.
    
    - _[ARCH-DEFENSE]:_ Restrict all Neo-Brutalist CSS (border, box-shadow) to the parent wrapper ONLY. DO NOT apply CSS filters (like grayscale) to the AdSense iframe itself to strictly prevent Google account bans for click-manipulation.
        
- [ ] **Map & Geolocation Mechanics:**
    
    - _Demote the Map:_ Map is secondary. Listings and posts are primary. Lazy-load the map to save API costs. Hovering over a listing centers the map. Supports drag/pan clustering to "search this area".
        
    - _[ARCH-DEFENSE] Geolocation Fallback:_ If the user denies GPS permissions, the UI MUST immediately and gracefully fallback to the "Latest" feed tab. No blank maps, no endless loading spinners. Resolve friction instantly.
        
- [ ] **Navigation & Filters:**
    
    - Sticky header (top on desktop; ultra-compact only on mobile).
        
    - Tabs vs Filters: Retain "Nearest" (default) and "Latest" as primary view tabs. Move "Following" and "Featured" into Filters.
    - **[RESOLVED 2026-08-31] Favorites — neither, exactly.** This line said "into Filters"; later operator feedback said it should be a tab like Nearest/Latest. Both were half-right, so it shipped as a synthesis: a ★ SAVED toggle sitting *in the tab row* (prominent as a tab, per the feedback) but functioning as a **scope** applied after sorting (composable as a filter, per this line). Nearest/Latest are sorts over one set; Favorites is a different set — making it a true third tab would have cost you the ability to sort your own saved list, which is where sorting matters most once it's long. Hidden entirely until you have ≥1 saved.
        
    - Vibe Filters & Emoji Taxonomy: Core (🏳️‍🌈 LGBTQ+ friendly, ☕ Hipster, 🌙 Late night) and Expanded Subcultures (🫖 Sober-curious, 🌿 420-friendly, 🐕 Dog-first, 🐾 Furry). Hide if empty.
        
    - _[ARCH-DEFENSE] Category Landing Pages:_ Implement Tag Matrix Schema (Category x Location) in the data structure so combo pages (e.g., "Sober-Curious" + "SF Bay Area") can be generated via simple queries without manual DB curation.
        
- [ ] **F-Shape UX Refactor & Readability:**
    
    - Replace footer blocks with flexible Metadata Pill Grids (e.g., `[Acoustic: Low-Sensory]`).
        
    - H1 for Place, H2 for Angle. Strict line-width limit on Body.
        
    - Target 8th-Grade Flesch-Kincaid reading level. Structural simplicity (short, single-clause sentences, active voice) optimized for F-shape mobile scanning.
        
    - Use distinct callout boxes for operational friction (safety, ride-share), square bullets, and embedded featured quotes. Avoid text walls.
        

**Notable content decisions (2026-08-31):**

- **Events belong to venues.** An event at a place Near already covers sets `meta.parentPlace` and drops off the board/map, keeping its own page and URL. The venue's card shows a "next" ribbon, its page a "coming up here" list; both expire on their own via `eventEndsAt`. Codified as `event-belongs-to-venue` in `rules.md`. This fixed two stacked pins on identical coordinates for the Eskyna venue.
- **Every post gets an art-direction call (operator, 2026-08-31).** `near-illustrator` is now Near's art director rather than an occasional garnish: invoked by `near-editor` and `near-blogger` on *every* piece to decide the hero/thumbnail, whether a gallery is warranted (high bar — only when the piece rewards multiple images AND plenty of usable public-domain/open-licensed ones already exist), and whether an original illustration would out-click the available photography. Consults `near-ux-designer` / `near-ux-researcher` on what earns the tap.
  - **Reverses the old "no AI-generated hero" ban**, which the operator called silly. Hero tiers are now source photo → licensed stock → illustration, as a *preference* order rather than fallback-only: a drawn hero beats a generic stock shot, and beats holding a good place as a draft forever for want of a photo.
  - **Generated images must be visibly stylized and never photoreal** — riso/screenprint, woodcut, ligne claire, travel-poster, halftone, cut-paper, zine-xerox. This is a correctness rule, not taste: an image a reader could mistake for documentation of a real address is a lie about that address. Plus the uncanny-valley problem. Enforced in `quality-gate-before-publish`.
  - All generated images set `strategy: "illustration"` and disclose themselves as AI-generated in `attribution` — same radical-transparency logic as the bylines.
  - _Gap closed 2026-09-01:_ EPIC 4's Product Trio now exists as skills —
    `.claude/skills/near-lead-product/`, `near-lead-ux/`, `near-tech-lead/`.
    The two UX skills (`near-ux-researcher`, `near-ux-designer`) remain
    the ones that do the actual research/design legwork; `near-lead-ux`
    is the decision layer above them. Same pass also built
    `near-tov-police` and `near-trendsetter` (both referenced constantly
    throughout this file and `content/*.md` but never built as their own
    skills until now) and gave every already-built public persona
    (RADAR-X, FOODIE-9000, STEFAN, CUBIC-V, PLINIO, WILD0, DARCY,
    FIT-BOT, LUGARDO KARAI, RUCIO LIBERO, PARSER, ALLORA DAI) its own
    character-sheet skill under `.claude/skills/<slug>/` — operator
    directive, "roles should be skills" / "public personas should be
    skills too." NITE-PORTER already had one under a beat-named skill
    (`near-editor-accommodation`), so it wasn't duplicated. The
    not-yet-built cast members below (KINETIC, STROBE, SHOPPER-X, Eli
    The DEI Guy, SENSE-0, ROVER-5, FER VIDA, DANUZA-2, NORMAN HUMAN,
    Manuel Geographic, Joe Tromundo, Fickle Knight, Dip Tracy, FOX,
    Tapana Pantera, and the local translators PAULY SEYA/BRICKY/DOG IN
    THE FOG/ZACK ARIOKA) still only exist as roster descriptions here —
    give each one a skill file when it's actually built, same template.

- **Staleness is a maintenance job, not a writing constraint (operator, 2026-08-31).** Near keeps writing with real specifics — names, prices, opening years, "just opened" — because that's what makes the content good, and accepts that it ages. New `near-caretaker` skill owns the upkeep: seven staleness classes (people, open/closed, ownership, numbers, recency claims, events, link rot), verify-before-changing, correct-in-place across all six locales including frontmatter, never flatten voice to make a piece age better. Codified as `currency-maintenance` in `rules.md` and wired into `near-refresh` step 1.
- **Dolly Parton died 2026-08-25.** The Dollywood page asserted present-tense ownership across all six locales and has been corrected (verified against NPR/CNN/Variety; park stays open per its president). Worth remembering as a category of risk: evergreen copy about a living person goes stale silently. A `near-refresh` check for this would be reasonable.
