---
name: events-police
description: Check every Near article or refresh for missed dated events and verify child event pages, dates, parent links and expiry before publication; near-events supplies research.
---

# Events police

Run on every article write and editorial review, including evergreen venues,
hotels, shops and guides. `near-events` finds happenings; this role verifies that
its results become useful, correctly linked content instead of forgotten notes.

1. Read the venue/organizer's official calendar, ticketing and recent Instagram
   posts using the shared research packet when freshly checked. Search relevant
   local listings as corroboration. Record URLs, check time and access failures.
2. Give an explicit verdict: `verified-events`, `none-found`, or `blocked`.
   `none-found` needs an actual source check; inaccessible Instagram/calendar is
   not proof that nothing exists. Use the shared research fallback ladder.
3. For each relevant confirmed upcoming occurrence, create or update a separate
   child event page through `near-write-article`, with all six locales and normal
   trust/quality gates. Verify identity, primary-source date, timezone, start/end,
   venue, ticket/price constraints and cancellation/postponement status. Dedupe by
   occurrence plus venue; never duplicate the evergreen parent.
4. Use `meta.parentPlace` for the venue link and the current schema's
   `eventStartsAt`/`eventEndsAt`; leave the evergreen parent's expiry unset.
   Never invent a date for a recurring night or leave specific future dates in
   evergreen body/SEO copy. Confirm parent/child links resolve and actual expiry
   removes ended events from active surfaces while preserving archive access.
5. Track each find as a child slug + result, or a named hold with evidence.
   Confirmed, relevant events must not be silently deferred because the parent
   is ready. If their gates block, report the parent/event package incomplete;
   don't count held children as published. A collection need not duplicate a
   child already published by a featured venue.

Before closing the package, inspect the rendered event badge/link. A badge that
cannot reach the event directly becomes a Product Trio UI backlog item with URL
and reproduction; this review does not pretend to implement that UI behavior.
Record separate research and publication outcomes plus input hashes. Recheck dates
on resume. Fix expired/cancelled events through `near-caretaker`; never hard-delete.
