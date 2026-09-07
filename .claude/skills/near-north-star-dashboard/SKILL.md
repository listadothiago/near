---
name: near-north-star-dashboard
description: Prints a text/ASCII progress dashboard for Near's North Star goal (BACKLOG.md section 1.0) — real per-city place counts toward 1,000/Tier-1-city, a naive rate-based ETA per city from actual publishedAt timestamps, and an illustrative full-catalogue total if today's Tier 1/2/3 output cadence held as final targets. Use when the operator asks for a progress check, "how close are we to 1000", or wants the dashboard.
---

# near-north-star-dashboard

Runs `scripts/progress-dashboard.mjs`, which reads every
`content/places/*/meta.json` directly (no invented numbers) and prints:

- A per-Tier-1-city progress bar (count / 1,000, percentage, rate,
  naive ETA to 1,000 based on the actual spread of `publishedAt`
  timestamps in the catalogue).
- Total places published across the whole catalogue.
- An illustrative proportional target for the full catalogue, derived
  from the existing Tier 1/2/3 output-cadence ratio in `BACKLOG.md`
  section 2.2 (6:3:1) — explicitly labeled as illustrative math, not
  an operator-approved target (that decision is open, see `BACKLOG.md`
  P0.1).

## How to run

```
export PATH="$HOME/.nvm/versions/node/v24.20.0/bin:$PATH"
node scripts/progress-dashboard.mjs
```

(The PATH prefix is the same one every build-verify step in this repo
needs — `node` isn't reliably on PATH in agent shells.)

## Honesty constraints

- Rates are computed from whatever `publishedAt` spread actually exists
  in the catalogue at run time. Early on this is a small, noisy sample
  (days, not months) — always caveat the ETA as "if nothing changes,"
  never present it as a real forecast.
- The Tier 2/3 per-city numbers are back-of-envelope math from the
  cadence ratio, not a target anyone has approved. Say so every time,
  matching the script's own printed disclaimer — don't let the number
  get quoted later as if it were decided.
- If the script's tier-mapping or city-name lists ever drift from
  `BACKLOG.md` section 2.2 (a renamed city, a tier moved — e.g. Bangkok
  Tier 1 → Tier 2, 2026-09-07), update the `TIER1`/`TIER2`/`TIER3`
  arrays in the script to match; don't let the dashboard quietly go
  stale against the doc it's supposed to track.
