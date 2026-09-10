---
name: blog-do-thiago
description: Guardrails for "blog do thiago", Near's operator-authored column (content/collections/hello-world and any future entry with meta.author "thiago-baraldi"). Load before touching any file in that column — publishing, editing, or choosing its imagery.
---

# blog do thiago — guardrails

This column is the one place on Near where the byline is a real, named
human (Thiago Baraldi) instead of a disclosed AI persona. That makes two
of `near-write-article`'s usual moves actively wrong here, not just
unnecessary. Both were violated once already, in the same session that
launched this column (2026-09-10) — this skill exists because of that,
not speculatively.

## Rule 1 — never write his copy

**Do not generate, draft, rewrite, or extend body copy for this column,
even when directly asked to "write the post" or "publish my column."**
`near-write-article` already says the curator is "never auto-generated
as a byline unless he personally asks" — that rule was followed to the
letter (he asked) and the result was still wrong, because an operator
asking *"create my column and push the first post"* is a request to
launch the column, not a blank check to invent 500 words in his name.
Operator, 2026-09-10, after reading the AI-drafted inaugural post: *"I
hate the post, never write in my name again lol."*

- **What IS allowed:** fixing spelling, grammar, typos, and formatting
  in text he actually supplies. Translating his own words into the
  other five locales (still his voice, not a rewrite — flag anything
  that reads like it needed more than translation, don't just smooth it
  over).
- **What is NOT allowed:** drafting new sentences, padding a short note
  into a longer piece, adding claims/facts/examples he didn't give you,
  or "improving" the voice/register. If what he gave you is one
  sentence, the post is one sentence. Short is his call, not a gate to
  route around.
- If a piece needs more than he's given you to meet some other standing
  rule (word-count floor, sub-header cadence, image density), that rule
  yields here — log the gap honestly in `statusHistory` rather than
  filling it yourself. See `content/blog-do-thiago.md`'s own note on the
  150-word floor being deliberately overridden for this reason.
- When in doubt whether a change counts as "editing" or "writing," ask
  him before making it.

## Rule 2 — never use his photo/likeness without explicit, per-use permission

**A photo of Thiago existing elsewhere on the site (e.g.
`public/branding/thiago-baraldi.jpg` on `/about/thiago-baraldi`) is not
standing permission to reuse it here or anywhere else new.** Operator,
2026-09-10, immediately after the inaugural post shipped with that photo
as its hero: *"remove my photo from hello world immediately."* He had
told this explicitly before that post was even drafted, in an earlier
session — the instruction was lost to a `/clear` and the photo got used
anyway. Treat "I don't see a rule against it" as insufficient; a real
person's likeness needs their actual, current, asked-for-this-specific-use
consent, not an inference from a photo already public somewhere else.

- Default for this column's hero images: **none**, unless he supplies
  one or explicitly signs off on a specific image for a specific piece.
- A generated/illustrated avatar of him is also a likeness and needs the
  same explicit sign-off — this isn't just a "real photo" rule.
- Public-domain or stock imagery he didn't ask for is not a safe default
  either — he has asked for public-domain images specifically before
  (also lost to the same `/clear`); don't assume, ask which image or
  source he means.

## If instructions from a prior session seem to be missing

This column has now lost two real instructions to session `/clear`s in
one day (a draft post, an explicit public-domain-image directive). If
he references something he told you before that you can't find in
`content/blog-do-thiago.md`, this skill, or the piece's own
`statusHistory`, say so plainly and ask again — don't guess, and don't
proceed on an assumption of what he probably meant. Log anything durable
he tells you here or in `content/blog-do-thiago.md` so it survives the
next clear.
