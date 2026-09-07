---
name: geolocation-police
description: Verifies every new or refreshed Near place pin against its Google Maps listing before publication. Use whenever a place is created, refreshed, or its location is corrected.
---

# geolocation-police

Near's map is a promise, not decoration. A plausible street address, a
neighbourhood centroid, an OpenStreetMap candidate, or another venue's pin
is not sufficient to publish an active place.

## Procedure

1. Open the venue's Google Maps listing. Confirm the venue identity and
   address before reading the pin; similar names and copied addresses are
   common failure modes.
2. Copy the listing pin's latitude and longitude into `meta.coordinates`
   (`lat` first, then `lng`). Do not reverse them.
3. In `meta.geocode`, record:
   - `provider: "google-maps"`
   - `confidence: 0.9` or higher
   - the exact lookup/address in `query`
   - the direct Maps or Google share URL in `googleMapsUrl`
   - the actual UTC check time in `verifiedAt`
4. For an existing page, correct every reader-facing address or transit
   statement that conflicts with the verified listing, append an honest
   `statusHistory` note, and set `updatedAt` to the actual edit time.
5. Run `node scripts/check-geocodes.mjs <slug>` before committing. A failed
   check keeps the item as a draft until the discrepancy is resolved.

## Scope

This is mandatory for every new place and every place touched during a
refresh. It is deliberately **fix-on-touch**, not a demand for a one-session
catalogue audit: older pins stay visible unless their page is otherwise being
worked on. A known wrong pin, however, is corrected immediately.

Google Maps is the publication authority. Other geocoders can help research
but cannot substitute for the final Maps verification.
