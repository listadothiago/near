# SEO — for search engines and for LLMs

Shared reference for `near-editor` and every `near-translator` locale
persona. Everyone writing a Near page is, among other things, an SEO
specialist for their market — this is what that means in practice, for
both classic search ranking and the newer reality that a growing share of
discovery happens through an LLM reading the page once and summarizing or
citing it, not a human clicking through ten blue links.

The two audiences want almost the same thing. Write for the human first —
a page that's genuinely useful to read wins both. But a few things matter
disproportionately for the LLM case specifically, because a model extracts
facts from a page in one pass and has no patience for throat-clearing.

## Front-load the extractable facts

An LLM summarizing or citing a page tends to lean hardest on the first
few sentences and the bullets — not because it can't read the rest, but
because that's where a well-written page puts its most citable claims.
Don't bury the actual answer ("what is this place, why does it matter")
under scene-setting. The tagline and `seoDescription` frontmatter fields
do double duty: they're the meta description a search engine shows *and*
the single most likely span an LLM lifts verbatim into a summary. Every
word in them should be a fact, not a mood.

## `seoDescription` is a self-contained citation, not a teaser

A classic SEO meta description is allowed to tease ("find out why locals
love it") because its only job is to earn a click. `seoDescription` can't
get away with that — if an LLM cites the page, this field is a strong
candidate for what gets quoted, so it needs to stand alone as a complete,
accurate claim: what the place is, where, and the one fact that matters
most. No cliffhangers.

## Bullets are structured data now, not just skimmable copy

The `bullets` field (`reasons-to-check-out`) is the closest thing a Near
page has to a fact table. Each bullet should be a discrete, independently
true statement — something that could be lifted out of context and still
make sense and still be accurate. Avoid bullets that only work as part of
a sequence ("and finally...") or that depend on the tagline for their
subject.

## Name entities the way people (and models) actually refer to them

Use the place's real, full, commonly-used name consistently — in the
`name` field, in the first mention in the body, in bullets. Don't
alternate between a nickname and the formal name in ways that could read
as two different places. If a place is known by a different common name
locally than the one the English source used, the locale persona should
use the locally-correct name (see each `references/locales/*.md` file) —
consistency *within* a page and *within* a locale matters more than
matching the English page word-for-word.

## Write for the query, not just the topic

Classic SEO keyword-stuffing is not this — don't repeat a phrase
unnaturally. But do make sure the page's actual language overlaps with
how someone would really ask about it, in that locale's own phrasing, not
a stiff translation of the English query pattern. "Melhores bares
escondidos em [bairro]" is how a Brazilian searcher actually phrases it;
a literal translation of an English SEO phrase often isn't. This is a
locale persona's judgment call, not something the English source can
dictate — see "SEO and query patterns" in each locale reference.

## Consistent facts across locales (entity coherence)

Coordinates, category, and the underlying facts (what it is, where it is,
what happened when) must agree across every locale version of a place —
this is what lets a search engine or an LLM treat all six locale pages as
the same real-world entity rather than six unrelated pages. Voice,
emphasis, and even which specific bullet gets included can diverge freely
between locales (see each `near-translator` persona) — the facts
underneath can't contradict each other.

## Avoid the tells of low-effort AI content

Ironically, the writing patterns that read as "obviously AI-generated
filler" to both human readers and to ranking/quality systems are exactly
the patterns that also make for bad LLM-citation material: vague
superlatives with nothing under them ("a must-visit hidden gem"), listy
padding that restates the same claim three ways, or a body that never
actually commits to a specific, checkable fact. The main style guide's
honesty and specificity rules (`references/style-guide.md`) are already
the fix for this — there's no separate "SEO voice" to layer on top that
would make a page rank or get cited better than just being genuinely
specific and honest already does.
