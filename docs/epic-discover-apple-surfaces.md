# Epic: Google Discover + Apple/iPhone Recommendation Surfaces (external input)

> **INPUT, not policy.** Extracted verbatim from `BACKLOG.md` on 2026-09-05 to cut backlog bulk; no content changed. Actionable items are summarised back in `BACKLOG.md`.

# Epic: Google Discover + Apple/iPhone Recommendation Surfaces

## Objective

Make Near systematically eligible for, and increasingly competitive within, **Google Discover, Apple News, Siri/Safari recommendation surfaces, and other editorial/personalised content-discovery surfaces on iPhone and the web**.

The strategic premise is Near's core positioning:

> **The always fresh guide to everywhere.**

Near should not try to become a conventional news publisher. Instead, exploit the combination of:

- constantly refreshed local knowledge
    
- real places and events
    
- geographic specificity
    
- strong editorial point of view
    
- independent/alternative sources
    
- timely cultural signals
    
- excellent imagery
    
- structured place/event data
    
- human curation + transparent AI-assisted production
    

The goal is to make Near's content useful not only when someone explicitly searches for it, but when Google/Apple believe it is something that a particular person may want to discover.

---

## 1. Google Discover readiness

Audit and implement everything required for strong Google Discover eligibility.

### Requirements

- Ensure all indexable editorial pages are technically eligible for Discover.
    
- Ensure canonical URLs are correctly configured.
    
- Ensure pages are crawlable and indexable.
    
- Ensure every editorial article has a strong representative hero image.
    
- **All Near-generated hero images must be at least 1200px wide**, preferably 1600–2000px where practical.
    
- Ensure images meet Google's Discover requirements for sufficiently high resolution.
    
- Add/verify `max-image-preview:large`.
    
- Ensure hero images are actually available to Googlebot and not blocked by robots/CDN configuration.
    
- Ensure the image associated with an article is semantically appropriate to the article rather than merely decorative.
    
- Avoid generic/repetitive AI-generated imagery where a real place/event image is available and legally usable.
    
- Prefer distinctive photography, venue imagery, artwork, event imagery, maps/visualizations or editorially meaningful generated imagery.
    

Google explicitly recommends large, high-resolution images for Discover, with images at least 1200px wide.

---

## 2. Build a Discover-native editorial format

Do not simply publish normal SEO articles and hope Discover picks them up.

Create content that has a reason to be recommended **today**.

Prioritize:

### Fresh local developments

- newly opened places
    
- newly announced exhibitions
    
- new venues
    
- reopening of interesting venues
    
- significant closures
    
- new neighborhoods/creative scenes
    
- newly announced festivals
    
- newly announced concerts
    
- cultural events
    
- local developments with a strong Near angle
    

### Upcoming events

- exhibitions
    
- festivals
    
- concerts
    
- queer events
    
- independent cultural events
    
- unusual local events
    
- major events with strong local utility
    

### Timely editorial

Examples:

- “What's actually worth seeing at [event]”
    
- “Three things happening in East London this weekend”
    
- “A new reason to go to [neighborhood]”
    
- “The places around [major event] we'd actually visit”
    
- “What's changed around [neighborhood]”
    
- “The weirdest/greatest thing happening in [city] this week”
    

The editorial hook should be **freshness + Near's judgment**, not clickbait.

---

## 3. Create a Near “freshness signal” system

Make Near's defining promise — **always fresh** — machine-readable and visible to users.

For relevant pages expose:

- Published date
    
- Last substantially updated date
    
- Last checked date
    
- Event date/time
    
- Opening/status information
    
- Source(s)
    
- Where appropriate, “Upcoming”, “Happening now”, “Ended”, “Closed”, etc.
    

Do not fabricate freshness through trivial edits.

A page should only receive a meaningful updated timestamp when its underlying information or editorial content has actually changed.

Create a standard internal freshness model:

```text
published_at
updated_at
last_checked_at
event_start
event_end
source_published_at
source_checked_at
content_freshness_status
```

Use this consistently across places, events, guides and editorial pages.

---

## 4. Build an “always fresh” content engine

Create a pipeline that identifies pages with a reason to be updated.

Potential triggers:

- new event associated with an existing place
    
- event approaching
    
- event ending
    
- venue opening
    
- venue closing
    
- source reports a material change
    
- new exhibition
    
- new restaurant/bar/shop
    
- significant trend signal
    
- seasonal change
    
- important local event
    
- source correction
    
- venue status change
    

The objective is to make existing Near URLs **living knowledge assets**, rather than publishing a new URL every time something changes.

Prioritize updating a strong existing entity/page over creating disposable news URLs when the underlying subject is the same.

---

## 5. Google Discover content scoring

Add a `discover_score` to the editorial/backlog prioritization system.

Candidate content should be scored on:

- freshness
    
- local relevance
    
- novelty
    
- visual potential
    
- cultural relevance
    
- strength of Near's editorial angle
    
- source quality
    
- geographic specificity
    
- likely audience interest
    
- event proximity
    
- existing Near authority
    
- uniqueness compared with existing web results
    

Example:

```text
Discover Score =
freshness
+ novelty
+ visual_strength
+ local_relevance
+ editorial_distinctiveness
+ source_strength
+ event_relevance
+ audience_fit
```

Do not interpret this as a prediction of Google's ranking algorithm. It is an internal editorial prioritisation mechanism.

---

## 6. Google Discover analytics

Add dedicated monitoring to `near-seo`.

Track:

- Discover impressions
    
- Discover clicks
    
- Discover CTR
    
- pages receiving Discover traffic
    
- cities
    
- countries
    
- languages
    
- content types
    
- article topics
    
- publication/update timing
    
- image used
    
- freshness at time of impression
    
- traffic longevity
    
- repeat Discover appearances
    

Identify:

### Discover winners

What types of Near content repeatedly receive distribution?

### Discover losers

What content is useful in Search but never receives recommendation traffic?

### Discover patterns

Look for correlations between:

- image type
    
- headline style
    
- article length
    
- topic
    
- freshness
    
- event proximity
    
- city
    
- source type
    
- editorial persona
    
- content format
    

Do not optimize solely for CTR. Avoid clickbait headlines or misleading imagery.

---

# 7. Google Search Console integration

Prioritize the existing Search Console integration as a dependency for this initiative.

Use Search Console to distinguish:

- Search demand
    
- Discover demand
    
- emerging queries
    
- pages gaining visibility
    
- pages losing visibility
    
- queries associated with fresh content
    

Create a weekly report:

```text
SEARCH
What are people explicitly looking for?

DISCOVER
What is Google deciding people may want to see?

TRENDS
What is suddenly becoming interesting?

NEAR SOURCES
What has actually changed in the world?

EDITORIAL
What does Near have something worthwhile to say about?
```

The intersection is the highest-value content opportunity.

---

# 8. Google Discover image system

Create a formal Near image specification.

### Preferred

- 1600–2000px wide
    
- strong landscape composition
    
- meaningful focal subject
    
- visually distinctive
    
- subject immediately understandable
    
- minimal/no text embedded in image
    
- legally usable
    
- relevant to the article
    
- high-quality source photography where available
    

### Avoid

- tiny images
    
- generic stock photography
    
- unrelated hero images
    
- repetitive AI imagery
    
- screenshots as default heroes
    
- logos as default heroes
    
- overly text-heavy graphics
    
- images whose subject is impossible to identify
    

Create automated QA that checks:

- dimensions
    
- aspect ratio
    
- file size
    
- MIME type
    
- crawlability
    
- alt text
    
- Open Graph image
    
- Twitter/X image
    
- canonical image
    
- structured-data image
    

---

# 9. Open Graph / social preview system

Ensure every editorial URL has excellent:

- `og:title`
    
- `og:description`
    
- `og:image`
    
- `og:url`
    
- `og:type`
    
- `article:published_time`
    
- `article:modified_time`
    

Where appropriate include:

- author
    
- section
    
- locale
    

Preview every article before publication.

The same hero asset should be usable across:

- Google Discover
    
- Google Images
    
- social sharing
    
- messaging apps
    
- Apple News
    
- Near itself
    

unless a platform-specific crop is demonstrably better.

---

# 10. Apple News / Apple ecosystem investigation

Investigate Near becoming a legitimate **Apple News publisher**, rather than relying only on Safari/search discovery.

Apple News is a separate distribution channel: Apple says publishers can create channels and publish articles through News Publisher/Apple News Format, with articles appearing in personalised feeds including Today.

### Research and document:

- Apple News Publisher eligibility
    
- publisher/account requirements
    
- geographic availability
    
- language limitations
    
- editorial requirements
    
- AI-generated content requirements
    
- RSS/CMS integration options
    
- Apple News Format
    
- Apple News API
    
- analytics
    
- advertising/revenue implications
    

Important: Apple currently documents News Publisher as supporting English and Canadian French content, so do not assume Near's multilingual site can simply be syndicated wholesale.

---

# 11. Apple News publishing experiment

If eligible, launch an initial Near Apple News channel in English.

Do NOT automatically syndicate everything.

Create a deliberately selected Apple News feed containing:

- high-quality local guides
    
- fresh cultural stories
    
- event previews
    
- city discoveries
    
- original Near editorial
    
- strong visual stories
    
- genuinely useful “what's on” content
    

Investigate using the Near CMS directly with Apple News Publisher/API.

Apple documents both CMS integration and the Apple News API as supported publishing routes.

---

# 12. Apple News editorial structure

Create a small number of coherent Apple News sections rather than mirroring every Near category.

Potential initial sections:

- Cities
    
- What's On
    
- Culture
    
- Food & Drink
    
- Nightlife
    
- Queer
    
- Weird & Wonderful
    

Apple recommends a relatively small number of sections; its publisher documentation says 6–8 is optimal even though more are technically possible.

Validate these against Apple's current publisher guidance before implementation.

---

# 13. AI-generated content transparency for Apple News

Because Near uses AI-assisted production, investigate and implement Apple's current AI-generated-content disclosure requirements before publishing to Apple News.

Do not attempt to disguise AI-assisted articles as entirely human-produced work.

Maintain provenance metadata internally:

```text
human_curator
source_articles
source_urls
ai_assistance
editorial_review
publication_date
last_reviewed
```

Apple's current publisher documentation explicitly includes mechanisms for marking AI-generated content and requires publishers to remain responsible for accuracy.

---

# 14. Apple News + Near freshness model

Near's Apple News strategy should emphasize the same differentiator as the website:

> **Always fresh local knowledge.**

Prioritize:

- new openings
    
- current exhibitions
    
- upcoming events
    
- weekend guides
    
- city-specific cultural developments
    
- changing neighborhoods
    
- current local recommendations
    

Do not turn Apple News into an archive of evergreen SEO pages.

---

# 15. iPhone/Siri/Safari discovery research

Investigate Near's eligibility and technical opportunities across the broader Apple ecosystem, including:

- Siri web results
    
- Safari search/discovery
    
- Apple News
    
- Apple Spotlight/web search integrations where applicable
    
- Apple Maps/place discovery where technically/legally possible
    
- Apple Intelligence/web-based information surfaces where applicable
    

For each surface document:

```text
Surface
Eligibility
Required markup/feed/API
Content type
Geographic availability
Language availability
Submission mechanism
Ranking/recommendation mechanism
Analytics available
Near implementation cost
Expected value
```

Do not assume that appearing in Apple News automatically means appearing in every Apple recommendation surface.

---

# 16. Entity consistency across platforms

Ensure Near presents consistent entity information everywhere.

For every place/event:

- canonical name
    
- alternate name
    
- address
    
- latitude/longitude
    
- neighborhood
    
- city
    
- country
    
- website
    
- opening status
    
- event dates
    
- category
    
- image
    
- source
    
- last checked
    

Avoid conflicting versions of the same entity across Near pages.

This is particularly important because recommendation/search systems need to understand that:

```text
Place A
=
the same real-world entity
```

across different pages and platforms.

---

# 17. Build an “event proximity” publishing strategy

Events are especially promising for recommendation surfaces because they naturally combine:

- freshness
    
- geographic relevance
    
- visual assets
    
- time sensitivity
    
- user intent
    

Create automated editorial windows:

### 30–90 days before

Discovery / announcement

### 14–30 days before

Planning

### 7 days before

Weekend / near-term intent

### 1–3 days before

Immediate local discovery

### During

Live/current relevance where editorially justified

### After

Only if there is a worthwhile editorial reason

Do not create five thin URLs for every event.

Prefer updating the strongest relevant page where possible.

---

# 18. “What's on” should become a first-class Near content format

Develop a reusable format such as:

> **What's on in London this weekend**

with genuinely current content.

The page should dynamically connect:

- events
    
- places
    
- neighborhoods
    
- editorial picks
    
- opening information
    
- maps
    
- sources
    

This should eventually exist at appropriate geographic levels:

```text
What's on
→ London
→ East London
→ Dalston
```

but only create crawlable geographic versions when sufficient inventory exists.

---

# 19. Discover-specific editorial headlines

Test headline patterns that communicate:

**place + novelty + current relevance**

Examples:

- “Five things worth doing in East London this weekend”
    
- “A new reason to spend Saturday in Hackney”
    
- “What’s actually happening around V&A East this month”
    
- “The London exhibition everyone should know about right now”
    
- “Three queer things happening in Berlin this week”
    

Avoid:

- clickbait
    
- fake urgency
    
- exaggerated superlatives
    
- generic “10 Best…” constructions
    
- headlines that don't match the article
    

The objective is **recommendation-worthy curiosity**, not cheap clicks.

---

# 20. Build a “Discover candidate” agent

Create/extend `near-seo` or a dedicated agent to run daily.

Input:

- Google Trends
    
- source feeds
    
- Near events
    
- upcoming events
    
- new places
    
- Search Console
    
- current editorial backlog
    

Output:

```text
DISCOVER CANDIDATES

1. Topic
2. Why now
3. Near angle
4. Target city
5. Target audience
6. Supporting sources
7. Existing Near entities
8. Suggested format
9. Image opportunity
10. Freshness window
11. Search opportunity
12. Discover opportunity
13. Apple News opportunity
14. Recommended action
```

The agent must be conservative.

A trend alone is NOT sufficient justification.

---

# 21. Create a cross-platform distribution score

For every major editorial candidate calculate:

```text
SEO score
Discover score
Apple News score
Social score
Trend score
Evergreen value
Freshness value
Near brand fit
```

This allows the editorial team to choose content with multiple acquisition/distribution opportunities.

Example:

|Content|SEO|Discover|Apple|Trend|Evergreen|
|---|--:|--:|--:|--:|--:|
|Generic London guide|High|Low|Low|Low|High|
|New London exhibition|Medium|High|High|High|Medium|
|Weird East London opening|Medium|High|High|Medium|Medium|
|Restaurant entity page|High|Low|Low|Low|High|
|London weekend guide|High|High|High|High|Low|

---

# 22. Success metrics

Do NOT define success as “get into Discover.”

Track:

### Google Discover

- impressions/month
    
- clicks/month
    
- CTR
    
- number of URLs receiving Discover impressions
    
- repeat appearances
    
- median traffic lifespan
    
- traffic per article
    

### Apple News

- impressions
    
- article opens
    
- follows
    
- engagement
    
- returning readers
    
- referral traffic to Near
    
- revenue where applicable
    

### Search

- organic impressions
    
- non-brand impressions
    
- indexed URLs
    
- queries
    
- Search CTR
    
- AI Search visibility
    

### Editorial

- percentage of content with verified freshness
    
- percentage with strong hero image
    
- percentage tied to an entity/event
    
- percentage with primary/authoritative source
    
- update frequency of high-value entities
    

---

# Definition of Done

This epic is considered operational when:

-  Google Discover eligibility has been technically audited.
    
-  `max-image-preview:large` is implemented and verified.
    
-  All Near-generated Discover candidates have ≥1200px hero images.
    
-  Image/crawlability QA is automated.
    
-  Search Console is integrated.
    
-  Discover performance is monitored separately from Search.
    
-  Near has a documented Discover editorial format.
    
-  Near has an automated freshness/update model.
    
-  Event proximity is incorporated into editorial prioritisation.
    
-  A Discover candidate agent exists.
    
-  Apple News eligibility has been researched.
    
-  Apple News AI-content requirements have been documented.
    
-  Apple News publishing has been evaluated with a concrete go/no-go decision.
    
-  If approved, an initial English-language Apple News channel is launched.
    
-  Apple News analytics are integrated into the reporting loop.
    
-  Broader Apple/iPhone discovery surfaces have been mapped and evaluated.
    
-  Cross-platform content scoring exists.
    
-  The system learns from actual Discover/Apple/Search performance rather than generic “best practices.”
    

## Guiding principle

**Do not create content for algorithms.**

Create genuinely useful, current, visually compelling local knowledge.

Then make sure Google, Apple and other recommendation systems can understand:

**what it is, where it is, why it matters, who it is for, what changed, when it changed, and why someone might want to discover it now.**

That is exactly where Near's **“always fresh”** proposition should become a distribution advantage.
