---
name: near-socials
description: Given an already-published Near place page, drafts platform-appropriate social post variants (X/Twitter, Threads, Instagram caption, TikTok script/caption, YouTube Shorts title+description) referencing the page. Writes draft files for human review only — never posts automatically to any platform. Use when a place is newly published and needs social drafts.
---

# near-socials

Turns a published Near place page into social post drafts across the
platforms Near cares about: X/Twitter, Threads, Instagram, TikTok, YouTube
Shorts. **This skill only ever writes draft files. It does not call any
platform's posting API, and it must never be extended to do so without an
explicit, separate decision from the operator** — direct publishing to
Instagram/TikTok/YouTube requires per-platform developer-app approval
(Meta Graph API, TikTok Content Posting API, YouTube Data API) and account
linking that hasn't been set up. Treat that as future, out-of-scope work,
not something to quietly wire in.

## Input

A place `slug` (or a list of slugs). The place must have
`status: active` in `meta.json` — don't draft social for a `draft` or
`closed` place.

## Process

1. Read `content/places/<slug>/meta.json` and the relevant locale's
   `<locale>.mdx` (default to the place's primary/original locale unless
   asked for others — check `source.language` in `meta.json` for a hint,
   otherwise use `en`).
2. Pull: `name`, `tagline`, `bullets`, `category`, `place.neighborhood`/`city`,
   `heroImage`, and the canonical URL
   (`{site}/{locale}/place/{slug}` — site base from `NEXT_PUBLIC_SITE_URL`
   if set, otherwise note the URL is relative and needs the real domain
   filled in before posting).
3. Draft one variant per platform:
   - **X/Twitter** — ≤ 280 chars. Hook + one concrete detail (pull from
     bullets, don't just repeat the tagline verbatim) + link + at most 1–2
     hashtags. No thread unless the place genuinely has more than one
     tweet's worth of hook.
   - **Threads** — more conversational, first-person-adjacent, can run
     longer than the X version; still one clear reason to care up top.
   - **Instagram** — longer caption, short line breaks (not one dense
     block), a hashtag block at the end (mix of broad + neighborhood/city-
     specific tags), and a note on which image to pair it with
     (`heroImage.url`, or suggest a carousel if the long-form body
     supports multiple angles).
   - **TikTok** — a short script in beats (hook shot → 2–3 supporting
     beats → CTA), plus on-screen text suggestions and a caption. Written
     for someone filming on-site, not read aloud to camera.
   - **YouTube Shorts** — a title (punchy, ≤ 60ish chars) and a short
     description (2–3 sentences + link).
4. Match the voice in `.claude/skills/near-editor/references/style-guide.md` —
   specific over generic, current over generic-landmark, point-of-view over
   flat description. Social copy can be looser and more casual than the
   long-form article, but shouldn't contradict its facts.
5. Write to `content/places/<slug>/social/<platform>.md` (one file per
   platform: `x.md`, `threads.md`, `instagram.md`, `tiktok.md`,
   `youtube-shorts.md`), each with frontmatter:
   ```yaml
   ---
   platform: x
   locale: en
   generatedAt: 2026-08-27T10:00:00Z
   status: draft
   ---
   ```
   followed by the draft copy.
6. `git add` + commit (`near-socials: draft posts for "<name>"`). Git is
   the review queue for these — a human reads the diff before anything is
   actually posted anywhere, by hand, on each platform.

## Explicitly out of scope

- Calling any platform API to publish, schedule, or preview a post.
- Reading or storing any platform credentials/tokens.
- Marking a draft as "posted" — that's a manual note the operator can add
  if they want one; this skill doesn't track publishing state.
