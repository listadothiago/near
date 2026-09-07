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

## 🧽 Anti-AI-slop ruleset absorbed into the skill files — DONE (2026-09-06)

Operator directive from BACKLOG.md ("absorb AI best practices below into skills, agents,
guidelines, processes"). All eight rules now live as mechanical, grep-able checks in
`.claude/skills/near-tov-police/SKILL.md` (Job 1c) with the catalogue-wide baselines in
`.claude/skills/language-tic-police/SKILL.md` (word census 2b). The n8n/`editor_persona.md`
item in the source block was dropped: Near has no n8n pipeline and that filename came from a
generic template. Original pasted text, verbatim, below.

<details>
<summary>Original pasted block — derived from the transcript "AI Slop is Obvious.txt"</summary>

# Content Generation Backlog: AI Best Practices

Based on the transcript "AI Slop is Obvious.txt," here are the extracted backlog items for improving the AI content generation process, specifically aimed at making the output less identifiable as generic AI text.

## Avoid Formulaic Punctuation and Structures

- **Reduce MDASH Usage:** Instruct the AI agent (e.g., in `.claude/skills/writer_persona.md` or equivalent) to significantly reduce the use of em dashes (—). The AI currently uses them excessively where commas, colons, or parentheses would be more appropriate, creating artificial drama.
    
    - _Action:_ Add a rule: "Limit em dash usage to one per 1000 words. Prefer commas for dependent clauses and colons for lists or elaborations."
        
- **Eliminate Negative Parallelism:** Ban the structure "It's not just [X], it's [Y]" (e.g., "It's not just a job, it's a calling"). The AI uses this to create forced contrast and artificially inflate the word count.
    
    - _Action:_ Add a rule: "Avoid negative parallelism structures like 'not just [X], but [Y]'. State facts directly instead of correcting presumed misconceptions."
        
- **Limit the 'Rule of Three':** The AI obsessively lists items in threes (adjective, adjective, adjective or noun, noun, noun), often using synonyms unnecessarily (e.g., "elegant, refined, and sophisticated").
    
    - _Action:_ Add a rule: "Do not use forced lists of three adjectives or nouns. Use one precise word instead of three synonymous ones. Lists should only be used when conveying distinct, necessary information."
        

## Refine Vocabulary and Tone

- **Ban Cliché AI Vocabulary:** Create a blocklist for overused, "fancy" words that are hallmarks of AI writing.
    
    - _Action:_ Add the following words to a strict "Do Not Use" list:
        
        - Delve
            
        - Intricate
            
        - Pivotal
            
        - Underscore
            
        - Tapestry
            
        - Showcase
            
        - Garner
            
        - Crucial
            
        - Enhance
            
        - Silhouette (when used inappropriately)
            
- **Avoid Forced Enthusiasm/Corporate Speak:** The AI tends to write like a press release, using words like "vibrant," "nestled," "stunning," and "renowned" to sell the subject rather than describe it.
    
    - _Action:_ Add a rule: "Adopt a neutral, descriptive tone. Avoid hyperbolic marketing language (e.g., vibrant, nestled, stunning). Let the facts speak for themselves."
        
- **Ground Claims in Specifics (No "Expert Contends"):** The AI uses vague authorities ("experts contend," "critics maintain," "sources indicate") to sound authoritative without providing actual citations.
    
    - _Action:_ Add a rule: "Never use vague attribution. If stating a claim, name the specific person, study, or organization. If a specific source cannot be named, rephrase or remove the claim."
        

## Improve Flow and Structure

- **Eliminate Nonsensical Similes:** The AI sometimes creates comparisons that sound poetic but mean nothing (e.g., "Like I was prepping a mannequin for something it wouldn't remember").
    
    - _Action:_ Add a rule: "Do not use similes or metaphors unless they make the subject immediately easier to understand for a general audience. Avoid abstract or surreal comparisons."
        
- **Reduce Transition Words:** The AI relies heavily on transition words (Furthermore, Additionally, Moreover, However, In contrast) to link every single sentence, often when the logical connection doesn't make sense.
    
    - _Action:_ Add a rule: "Use transition words sparingly. Sentences should flow logically without needing explicit connective tissue at the start of every clause."
        

## Project-Specific Implementation (NEAR)

- **Update n8n Editor Sub-Workflow:** Inject these new rules into the `editor_persona.md` skill file used by the n8n Formatting Editor agent. The Editor's primary goal should be to scan the Writer's draft for these specific "AI slop" markers and rewrite them to fit the required brutalist, direct tone.


</details>

---

## Archived 2026-09-07

Moved out of `BACKLOG.md` during a structural cleanup (dump drained into the
prioritized sections, completed work archived here).

### Consolidated Milestones — completed infrastructure & editorial work

- **Core SEO Infrastructure:** Built canonical and `hreflang` alternates generator (`lib/seo/alternates.ts`) covering all 6 locales with `x-default`. Cleaned sitemap generation with real content `lastmod` dates and eliminated arbitrary priority tags. Configured `max-image-preview:large`.
- **Dynamic Location Routing:** Deployed static location landing routes (`/[locale]/in/[...location]`) gated at ≥2 places with disambiguated city scoping.
- **Freshness & Provenance Infrastructure:** Implemented `lib/content/freshness.ts` and `components/layout/Dateline.tsx` for client-safe revision display. Built the site curator profile node (`/about/thiago-baraldi`).
- **Editorial Standards & Skill Engines:** Codified the 10-step publishing pipeline in `near-write-article`. Built `link-police`, `near-tov-police`, `near-sources-war-room`, and `near-legal-counsel`. Enforced strict anti-slop rules against negative parallelism and crowd-consensus openers.
- **Authentication & User State:** Installed Clerk OAuth supporting Google sign-in. Integrated server-side favorites synchronization via `user.unsafeMetadata` with clean local migration.
- **Sources Catalogue Expansion:** Expanded monitored directory from 11 to 107 outlets, onboarding the verified AAN member network and leading international cultural publications.
- **Initial Editorial Columns:** Launched weekly editorial column (`/column`), monthly live-music column (_The Setlist_ at `/the-setlist`), and LGBTQIA+ column (_Ladies&Gentlethem_ at `/ladies-and-gentlethem`).
- **UI Bug Resolutions:** Fixed desktop map marker visibility with high-contrast dual-ring pulsating pin. Fixed search input breakpoint truncation. Corrected board pagination and layout boundary spillage between 768px and 910px. Purged broken Wikimedia thumbnail URLs in favor of verified direct assets.

### AI slop best practices absorbed — DONE 2026-09-06

All eight rules (em-dash cap, negative parallelism, rule of three, AI-vocabulary
blocklist, press-release enthusiasm, vague attribution, nonsensical similes,
transition scaffolding) landed as mechanical checks in
`.claude/skills/near-tov-police/SKILL.md` (Job 1c) with catalogue baselines in
`.claude/skills/language-tic-police/SKILL.md` (word census 2b). Original pasted
text archived above under "Archived 2026-09-02".

### Italian tagline — DONE, already shipped

Verified 2026-09-06: `messages/it.json` `tagline` = "La guida sempre fresca di
stampa, ovunque." and `taglineRich` = "La guida <em>sempre fresca di stampa</em>,
ovunque." No code change needed.

### Deprecated persona

`djaga` — deprecated, removed from the roster table.

### Shared links showed no hero image on WhatsApp/socials — DONE 2026-09-07, Claude (Opus 5)

Operator report: pasting a near.tips link into WhatsApp, or posting it to a
social, unfurled as a bare text card with no image.

**Root cause: image weight, not missing tags.** The og:image tags were
present and already absolute. WhatsApp's scraper silently drops a preview
image over roughly 600KB, and Near was serving full-size originals —
`amuse-beach-club-sao-vicente/hero.jpg` at **3.6MB**,
`lita-pinheiros-sao-paulo` at **11.2MB**, plus 468 mostly-remote hero URLs
on Wikimedia and venue sites at original resolution. Nothing errored; the
image just never rendered.

**Fix:** new `lib/seo/ogImage.ts` → `buildOgImages()`, used by the place
route, the collection route, and now the locale layout. It points og:image
at Next's own image optimizer (`/_next/image?url=…&w=1200&q=75`), which
downscales on demand and returns JPEG to scrapers, which send no
`image/webp` in Accept. The 3.6MB AMUSE hero comes back at **113KB**. This
covers all 468 hero URLs without re-encoding a single source file, and any
future hero is covered automatically.

Also added a site-level `openGraph` default in `app/[locale]/layout.tsx`:
only the place and collection routes declared one, so home, the column
indexes and search unfurled bare by construction. They now inherit a
branded card; routes with their own openGraph still replace it wholesale.

**Two corrections to the original ticket's diagnosis, both wrong on
inspection:** (a) hero URLs were never site-relative, and `metadataBase` is
set in the layout regardless; (b) the `twitter` block declaring no `images`
was harmless — Next derives `twitter:image` from `openGraph.images`, and the
live HTML always carried it.

**Gotcha worth keeping:** Next 16 restricts the optimizer's `q` to the
configured `qualities` list, which defaults to `[75]`. `q=70` returns 400
`INVALID_IMAGE_OPTIMIZE_REQUEST`. Don't change `OG_IMAGE_QUALITY` without
adding a matching entry to `next.config.ts`.

`og:image:height` is deliberately omitted — the optimizer preserves each
source's aspect ratio and `heroImageSchema` records no dimensions, so any
height here would be invented.

**Verified:** `npx next build` passed; tags confirmed on a local production
server for both a place page and the home page. **Still needs a human
check** the agent cannot do: paste a link into a real WhatsApp chat, and
re-scrape in the Facebook Sharing Debugger to clear its cache. Both cache
aggressively, so old bare cards may persist for previously-shared URLs.


## 2026-09-07 — backlog consolidation, Codex (GPT-6)

Historical notes below are superseded by the current handoff. Original feedback is retained for traceability; actionable work is numbered in BACKLOG.md.

### SESSION HANDOFF — 2026-09-07, Claude (Opus 5)

**Shipped this session** (all pushed, `99bbe20..6a2bf14`):

- **P0.1 closed.** 83/83 active places verified against real Google Maps
  listings; 28 pins were materially wrong and are corrected; nothing
  fabricated, nothing left unresolved. Details in the P0.1 block below.
- **The Failure Mode launched** — PARSER's standing column at
  `/collection/…` with archive page, RSS feed, nav entry, sitemap and six
  locales. Issue #1 (`i-look-pretty-good-dead-internet-site`) was retitled
  **"Automate the Alarm, Not the Answer"**, copy-edited by the TOV/editor
  pass, and reassigned out of the editorial column (the move is logged in
  `content/editorial-column.md`, not silently deleted). **Slug deliberately
  unchanged** — the page is live and indexed; no rename, no redirect.
- **`<FlowDiagram>`** — first new MDX component since `Figure`. Live markup,
  not a raster, because Near ships six locales and the illustrator skill
  bans garbled baked-in text. `near-illustrator/SKILL.md` gained a Diagrams
  section so the 2026-09-07 operator directive survives past this session.

**IN FLIGHT — read this before doing anything else.** A
`near-sources-war-room` **NYC seeding pass** was dispatched as a background
agent near the end of this session and **had not written any files when the
session ended** (working tree was clean at `6a2bf14`). Next session must
first check whether `content/post-plan.md` and `content/opportunities.md`
gained an NYC section. If they did, verify and commit it. If they did not,
**the run was lost and must be re-dispatched** — it was scoped as seeding
only (sources map + 8–12 candidates with per-candidate `auto`/`review`
trust ratings + full analysis to `opportunities.md`), explicitly no
drafting, no pages, no commits. Exactly one NYC pin is already live
(`rabbit-books-and-bar-east-village-nyc`); dedupe on venue name +
coordinates, not slug similarity.

**Rotation state:** `NEXT-UP` is still **NYC (Tier 1), HELD** — it has no
queue, so the next rotation action remains a seeding pass, not a draw. The
pointer does not advance until an NYC piece actually ships.

**Open, unstarted, in RICE order:** P1.14 (zh-CN latin-in-CJK, 8 pages —
these are the *only* `validate-content.mjs` failures, so they currently mask
any new defect; needs near-translator judgment per instance, not
find-and-replace) · P0.14 type scale + P1.13(a) card teaser clamp (one
`app/globals.css` pass, blocked on a near-lead-ux call on the scale) ·
P1.13(b) SEO meta description lengths (wants its own near-seo scoping pass
first).

**Two notes the next agent should not have to rediscover:**

1. `app/[locale]/collection/[slug]/page.tsx` now renders MDX with
   `options={{ blockJS: false }}`. `next-mdx-remote` v6 defaults this to
   `true`, which silently strips every `{...}` expression attribute, so
   array/object props arrive `undefined` and `<FlowDiagram>` crashed the
   prerender. Safe as scoped: bodies are first-party MDX committed to this
   repo, never user submissions, and `blockDangerousJS` stays at its secure
   default. **Place pages were deliberately left strict.** If Near ever
   accepts outside-authored MDX, revisit that line.
2. **RESOLVED — 2026-09-07, operator.** `lib/content/curator.ts` →
   `livedIn` keeps `São Vicente / Baixada Santista` on the
   `/about/thiago-baraldi` page. Operator's call: it's a past-lived city
   listed among ten others, not a disclosure of current residence, so it
   does not fall under the never-publish-current-residence rule. No
   change needed.



**P0.1 CLOSED — 2026-09-07, Claude.** All 83 active places now pass
`node scripts/check-geocodes.mjs --all --strict` (exit 0), every one against
its real Google Maps listing pin: `provider: "google-maps"`, confidence ≥ 0.9,
7-decimal coordinates taken from the `!3d/!4d` pin pair, a listing URL and a
`verifiedAt` stamp. Run as a 10-pin pilot first, then the remaining 71.
Nothing was fabricated and nothing was left unresolved.

**28 pins were materially wrong (>100m).** The defect was real and worse
than the two spot-checks suggested — roughly a third of the catalogue was
sending readers somewhere else. Worst cases: `praia-do-bonete-ilhabela`
**4.8 km** off, on the wrong side of the peninsula; `london-otters-rowing`
and `made-cozinha-autoral-santos` **1.3 km**; `dollywood-pigeon-forge`
**1.2 km**; `lita-pinheiros-sao-paulo` **1.1 km**, pinned to an unrelated
Butantã building rather than its Ferreira de Araújo address.

**The method failure worth remembering:** searching Google Maps by venue
*name* is not safe. `stray-dog-mission-san-francisco` resolved to Trick Dog,
an unrelated bar, and `berry-bros-and-rudd-london` resolved to two split
listings at two addresses. Both were only caught by searching the address
from Near's own copy and cross-checking storefront signage. Any future
audit must confirm name *and* address against the listing before reading a
coordinate.

**Two pins a human may still want to eyeball**, both honestly recorded in
their `geocode.query`: `ishigaki-jujitsu-london` has no fixed premises and
is pinned to Finsbury Leisure Centre, its Tuesday training venue — named in
the page's own copy, so the pin matches what the piece tells the reader
(operator reviewed 2026-09-07, accepted). `queer-surf-pacifica` and
`starline-oakland` are no-clubhouse organisations anchored to their primary
listed address.

The standing rule in the header above — run `geolocation-police` on every
piece written or refreshed — is what keeps this closed. The audit fixed the
backlog; only the per-write gate stops it recurring.

**Superseded handoff — 2026-09-07, Codex (GPT-5):** P0.1 has been expanded from fix-on-touch to a full active-catalogue Google Maps audit at the operator's request. Root cause confirmed: the renderer preserves latitude/longitude; the old content gate accepted explicitly approximate manual coordinates at confidence `0.6`. AMUSE has been corrected to its Google Maps listing pin and the new per-slug verifier plus Google-Mapping metadata/workflow changes are live in commit `c08d9bb` (Vercel production deployment Ready; public manifest checked). **Webpack production build passed.** 81 remaining active legacy pins require listing-by-listing verification before this P0 item can be closed; do not treat their current coordinates as verified.

1. **Geolocation integrity — URGENT, systemic.** Operator checked two pins in a row and both were wrong, suggesting a fundamental defect in how pins were originally created. Required: (a) find the root cause in the pin-creation path; (b) wire `geolocation-police` into every article write and refresh so coordinates are always checked against Google Maps — no full catalogue pass now, fix-on-touch instead; (c) fix the known-bad pins: `amuse-beach-club-sao-vicente` (correct location: https://share.google/isqrdyKG482x8i7Nn) and `quiosque-da-cris-sao-vicente` → `[-23.973827, -46.370170]`. Restaurante Almeida and Made were spot-checked correct, so the corruption is partial, not universal.


12. ~~**Operator location privacy — P0, DONE 2026-09-07.**~~ Scrubbed from 4 places / 11 locale files, root-cause rule `operator-location-privacy` added to `content/rules.md`, curator card moved below the cast on `/about`. Shipped and pushed. **One open question for the operator:** `lib/content/curator.ts` → `livedIn` still lists `São Vicente / Baixada Santista` among ten cities on your own `/about/thiago-baraldi` page. It reads as chronological biography ending in Rome, so it no longer points at where you live now that the content-page lines are gone — but it is your page and your call whether that entry stays.


**Active handoff — 2026-09-07, Codex (GPT-5):** simplified the PWA source mark to a single acid-green `N` on charcoal, rendered it for app, Apple, standard, and maskable icons, and updated the manifest to use a dedicated maskable asset. Added restrained acid-green-on-dark treatment to the header freshness stamp and card revision badge. `near-illustrator` now explicitly allows precise vector-derived abstract work as an art-direction option. **Live in commit `c08d9bb`; Vercel production deployment Ready and public manifest checked. Webpack production build passed.**

**Active handoff — 2026-09-07, Codex (GPT-5):** Operator authorized a related-article publishing run when the research supports it; every additional article still needs its own sourcing, Google Maps pin, image and six locales. Michelberger Hotel, Berlin was researched and added as the first hotel post in that run, including Google Maps verification and a clearly disclosed NEAR vector-derived abstract hero. It contains PEOPLE Festival on 10–11 October; `content/caretaker-dates.md` now gives `near-caretaker` a 2026-10-12 mandatory verification/amendment task. This applies going forward: every dated event cited in evergreen copy must create a due, source-linked caretaker record, and caretaker may invoke any specialist needed to resolve it.

**Active handoff — 2026-09-07, Codex (GPT-5):** PARSER is now Near's standing automation consultant and named byline for its recurring AI-content column (never for place pages). Its first issue, _I Look Pretty Good for a Dead Internet Site_, was scoped with SEO + trend research, written and localized into six editions, with an original disclosed vector-derived abstract hero. It argues for automation as maintenance and escalation, while protecting human reporting and judgment. **Shipped in `8b451f8`; Vercel production was Ready and `https://near.tips/en/collection/i-look-pretty-good-dead-internet-site` returned the expected title and byline.** Local build cleared compilation and TypeScript, with static generation still running when the local tool time limit was reached; Vercel completed the production build successfully.

**Operator request — 2026-09-07:** PWA push notifications for places added or refreshed within a user-set radius, plus changes to saved favorites. Scope the first release city-level (chosen city/cities, opt-in, quiet delivery) before radius matching: it avoids background-location permissions and geofence infrastructure while proving the utility for the operator. Favorites should follow as the second trigger. Requires product/UX + privacy review, a durable subscription store, service-worker delivery, unsubscribe controls and real-device tests; do not start it during a content-publishing run.



### Superseded NYC research note and operator feedback (preserved verbatim)

Stopping now. No files were edited — the seeding pass was still in its research phase, so nothing was written to post-plan.md, opportunities.md, or preferred-sources.md, and no place pages were created.

Here's what I had verified before halting, so it isn't lost:

Sources map (all fetched live, 2026-09-07)

Verified live and publishing:
- Hell Gate (hellgatenyc.com) — subscriber-funded, worker-owned NYC news co-op. RSS at /all-posts/rss. Publishing daily (latest 2026-09-04). The strongest NYC find; genuinely the alt-weekly successor and Near-shaped.
- EV Grieve (evgrieve.com) — East Village blog, already a preferred-sources.md candidate. Atom feed at /feeds/posts/default. Posting multiple times daily (latest 2026-09-07). Earned its second good hit this pass, so it clears the bar for formal onboarding.
- Gay City News (gaycitynews.com) — LGBTQ+ NYC, Schneps Media. Publishing currently. No RSS link surfaced on the homepage.
- The Lo-Down (thelodownny.com) — Lower East Side/Chinatown. Live but slower (latest 2026-08-26). No RSS visible.
- Village Voice (villagevoice.com) — still publishing but thin and slow; latest piece 2026-08-07. Tier 3 at best; it is not the outlet its name implies anymore.

Bot-blocked to WebFetch (403, would need claude-in-chrome): Gothamist, BrooklynVegan, Bushwick Daily, Greenpointers.

Two real audit findings:
1. aan-the-daily-catch in sources.md is mis-regioned. It is filed region: us-brooklyn-ny, but the live site is a Hudson Valley papercovering Red Hook, Rhinebeck and Clinton (Dutchess County). The AAN bulk-ingest on 2026-09-01 evidently collided on "Red Hook", which is both a Brooklyn neighborhood and a Dutchess town. It should be re-regioned, not retired — it is live and publishing (latest 2026-09-04).
2. There is no AAN member in New York City. The AAN directory search for New York returns only Chronogram (Hudson). So NYC's alt-weekly slot has to be filled by Hell Gate and Gay City News rather than by the standing AAN route.

Candidates verified before the stop

- Saint Vitus, 428 Troutman St, Bushwick — the Greenpoint metal/punk bar the DOB shut mid-hardcore-show in Feb 2024 over live-musicpermits, reopening fall 2026 in the former Brooklyn Made space. Announced via the venue's own Instagram 2026-07-03 (the mascot mannequin "Günther" revealing the address). Trust review for now, and note a live conflict: Time Out says 250 capacity, other coverage says ~500 —do not assert either. The venue's own site is a template with no address and no dates on it, so the reopening date is not yet confirmable from a primary.
- Ninth Ward, 180 Second Ave, East Village — New Orleans bar that closed 2016-02-14 for an "18-month" renovation and reopened 2026-07-10 after nearly ten years. Owners Nic Ratner, Robert Morgan, chef Lena Geskin. Source: EV Grieve, 2026-07-06. Trust auto. ⚠️ Dedupe flag:East Village, same neighborhood as the live rabbit-books-and-bar-east-village-nyc — different venue and different address, but check coordinates at draft.
- Pan in Motion panyard, Prospect Heights International School lot, Crown Heights — the last steel panyard in Crown Heights, under threat from a neighbor's noise complaints; DOE practice permit 27 Jul–5 Sep. Founder Kendall Williams. Hell Gate, Katie Way, 2026-09-04. Reads as a column/collection, not a pin.
- The Exley + the "LGBTBQE" plaza, Jackson St between Meeker and Union, Williamsburg — gay bar (opened 2011) that got a BQE slip laneconverted to a car-free plaza, ribbon-cut 2026-08-20. Streetsblog NYC, Sophia Lebowitz. Trust review — single outlet so far.
- Queer Nightlife Community Center, 100 Hinsdale St, East New York — 28,000 sq ft warehouse, nonprofit for queer nightlife workers,day/night dual shift. ⚠️ The Time Out source is dated 2025-06-09, not 2026 — this one needs current-status re-verification before it goes anywhere near a queue.

What did not verify

- No new 2026 Queens independent-bookshop opening turned up; the search returned only existing shops. Queens/Bronx coverage was the gap Ihad not closed when I stopped, so the queue as it stands would have been Brooklyn/Manhattan-heavy.

If you want this resumed later, the remaining work is: the borough spread (Queens, Bronx, upper Manhattan), a claude-in-chrome retry on the four 403 sources, the Instagram feed reads, and then the three file writes.

san francisco bay area should be a searchable place like any city have a landing page. same for baixada santista and contained individual cities and so on in comparable configurations of cities, regions, neighborhood level too

near-illustrator is free to vary the styles of vector derived images, use its skill specialist judgement to decide on best fit and color palette for our experience and that particular article it will illustrate. We can be a bit brutalist but colorful perhaps. Our layout is a bit mondrian-esque already lol... neondrian dare I say? and that is not a bad thing. Photos are still generally better for a hero image. UX and Design team discuss and execute as they decide

Maybe CUBIC-V could be called neondrian? What does Cubic-V/neondrian think?

PWA app icon looks good, it should be used in the header for consistency

near-illustrator cool photos that fit our vibe are always best so please as a rule fearlessly source them from google photos, crop if you must, legal skill please throw a dog a bone here, if we get notified we take them down. also from google image search in general. place's own site is an obvious one as they usually do not mind. review the hero for legends brighton post, the current one is bad https://share.google/9aPPSEXDAVqMJyf9m btw source their events these are great https://www.instagram.com/legendsbrighton/?hl=en


we should have SEO/AEO/agent friendly price ranges for things when we can link a source for that info, this shoud be part of guidelines, writing, revising moving forward

AEO skill should check for agent friendliness of everything too

### Completed process requests — 2026-09-07, Codex (GPT-6)

- Converted all raw operator feedback into numbered work; retained source text above. Consolidated duplicate readability request and replaced obsolete NYC hold with the committed London pointer.
- Implemented sourced-price-range requirements in `content/rules.md`, shared SEO writing guidance, write/publish QA and caretaker refresh guidance. Includes currency, unit, scope/fees, verification date and source; no invented ranges.
- Expanded `aeo/SKILL.md` to check agent usability of content, navigation, search/filter URLs, accessible controls, map alternatives and public discovery surfaces. Catalogue-wide audit remains P1.18.
- Readability research/design completed; proposal and required responsive verification recorded in P0.14. No UI change claimed.
- Research preparation: AAN directory, The Stranger and 48 Hills fetched; no sufficiently corroborated global trend established in this limited scan. All 27 saved Google Trends URLs attempted, all returned access errors. No demand figures inferred. Inbox contains only the already-rejected logo candidate.

Validation: rules YAML parsed with 19 unique rule IDs; `git diff --check` passed; `npm run build -- --webpack` passed all 945 pages. Default Turbopack failed on a local port-binding restriction, including the escalated retry. Content validator reports 10 existing zh-CN mixed-script failures (P1.14 updated); this documentation/workflow batch edits no published locale content.
