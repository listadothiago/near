---
name: discover-view
description: Runs a REAL Google Discover eligibility QA pass over Near's live catalogue (fetches each active place's actual hero image and reads its true dimensions — no simulation), reports pass/fail per Discover's documented image spec (>=1200px wide, ~16:9, >300,000 effective pixels), writes/refreshes a self-contained HTML report with real embedded images and a show/hide issue-tooltip toggle, and surfaces new findings worth a BACKLOG.md entry. Available to every skill in the roster, not just content-writing ones — invoke whenever a QA pass, a metrics check, or "how are we doing on Discover/images" comes up. near-ceo, parser and chief editor use it as one of their standing metrics sources.
---

# discover-view

A real QA tool, not a mockup. Runs `scripts/discover-audit.mjs`, which:

1. Reads active place metadata by default; `--include-drafts` also checks drafts
   and `--type collections` checks collection/column cover images.
2. Resolves the served image URL using the current `buildOgImages` proxy rules
   for external assets, then fetches it and reads its true width/height
   from the image bytes (a small dependency-free JPEG/PNG header parser —
   `sharp`'s native binary is unreliable in this environment, so don't
   reintroduce it without checking `npx next build`-equivalent portability
   first).
3. Checks Google's recommended image dimensions using Near's own acceptance tolerance: width
   >= 1200px, aspect ratio ~16:9 (tolerance ±0.12), effective pixel count
   > 300,000 at the width Next would actually serve.
4. Writes a self-contained HTML report to `content/_reports/discover-audit.html`
   with the real fetched images embedded as base64 and a checkbox toggle
   that shows/hides a red tooltip naming each failing card's specific
   reason — on by nothing, off by default, same pattern as the batch-30
   dashboard artifact's own tabs.
5. Writes `content/_reports/discover-audit.json` (machine-readable, same
   data minus image bytes) for any skill that wants to consume the result
   without re-running the fetch pass.

## How to run

```
export PATH="$HOME/.nvm/versions/node/v24.20.0/bin:$PATH"
node scripts/discover-audit.mjs [--limit N] [--slugs slug-a,slug-b,...]
# Before publication (status stays draft):
node scripts/discover-audit.mjs --slugs SLUG --include-drafts --report-dir content/_reports/SLUG
# Collections and columns use coverImage:
node scripts/discover-audit.mjs --type collections --slugs SLUG --include-drafts --report-dir content/_reports/SLUG
```

Use `--slugs` to check a specific set (e.g. a batch run's own pieces)
without paying for a full-catalogue crawl. Explicit unknown/excluded slugs and
empty runs cannot pass. Nonzero exit status means a failed/incomplete check; read
the report to distinguish an image defect from inaccessible evidence. A relative
asset URL needs a separate check of the actual rendered absolute og:image URL;
never treat a local fetch failure as proof of bad artwork. Use `--limit N` for a quick
sample. Omit both for the full active catalogue — this is slow (network
fetch per place, ~200ms politeness delay between requests) and can hit
429s on some hosts; a 429 is a rate-limit artifact, not a real image
failure, and should be re-checked before logging it as a finding.

## Publishing the visual version

After running the script, also publish (or republish, keeping the same
URL) a chat-facing Artifact version of the same report — real embedded
images, the same show/hide tooltip toggle — and link back to it in
conversation. Don't just print the terminal summary; the visual version
is the point for a feed-eligibility check, since layout and cropping are
exactly what's being judged.

## Who invokes this and when

**Available to every skill in the roster** — this is a general QA/metrics
tool, not scoped to content-writing skills only. Any skill may run it
when a check is relevant.

Three roles use it as a **standing metrics source**, not just an ad hoc
check:

- **`near-ceo`**, as part of its North Star drift check (see
  `near-ceo/SKILL.md`) — Discover eligibility is a real health signal
  alongside place counts, and a sudden drop in pass rate is exactly the
  kind of drift near-ceo should escalate.
- **`parser`** — Discover pass/fail is a concrete, measurable proxy for
  "is the research-automation pipeline actually producing feed-eligible
  work," directly relevant to its research-automation/freshness mandate
  (see `parser/SKILL.md`).
- **The chief editor** — part of substance sign-off: a piece whose hero
  fails Discover isn't fully done, even if every other gate passed.

## Surfacing findings

The script does not edit `BACKLOG.md` itself — free-form dedup against
prose is unreliable to automate safely. When a run finds something new
or materially different from the last logged state (a new failure
class, a fix that worked, a rate-limit false-positive worth re-checking),
write it up as a real `BACKLOG.md` entry yourself, in the same voice and
specificity as existing entries — cite the actual numbers the script
printed, not a rounded guess.

## What this skill is not

Not `google-discover-audit` (the broader skill covering content policy,
headline-content alignment, transparency/byline rules, and the
Apple News/AR surfaces) — this is the narrow, mechanical, actually-run
image-dimension check that skill's own image-spec section describes.
Run both: `google-discover-audit` for the full judgment call on a single
piece before publish, `discover-view` for a real, repeatable, visual
cross-catalogue metrics pass.

## Per-piece editorial/preview mode

On every write and review, also inspect the actual rendered card's headline,
snippet and crop using `google-discover-audit`. The dimension report has no
headline/snippet model and cannot certify them. Check available AR previews and
name the tool/device used; otherwise record `not tested`. A browser mockup is not
a headset test. Log reproducible findings directly to BACKLOG.md; manual feedback
export is only for a human-operated report, never an extra agent handoff. Open or
link the local HTML report when no chat Artifact publishing tool is available.
