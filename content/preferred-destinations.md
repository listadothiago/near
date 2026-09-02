# Near — Preferred Destinations

Maintained by the `near-refresh` skill. This is the backlog of cities and
neighborhoods Near actively researches for new places, beyond whatever
`content/sources.md` happens to surface on its own. Not every destination
here has coverage yet — `near-refresh` works through this list over time,
prioritizing ones with the least existing coverage first, and this file
should be updated (add, reprioritize, mark done) as that happens.

A destination with real coverage should note it inline; a bare entry means
"not started yet."

## Market tiers (operator-set, 2026-09-02 — read before the focus list)

Set from search-trend readings. `near-seo` should sanity-check and keep
these current.

- **Tier 1 — London, New York, Berlin, Barcelona.**
- **Tier 2 — everything in the focus list below**, including Rio de
  Janeiro (operator wants a deep dive on the "Copanema"
  Copacabana/Ipanema corridor).
- São Paulo and the Baixada Santista keep standing priority regardless of
  tier — home turf.

Near is now **neighborhood-first**: the unit of coverage is the
neighborhood, not the city. The war-room target list lives in
`docs/neighborhood-first-index-2026-09.md`.

## Focus cities (operator-set, 2026-08-28 — work these before anything else)

The operator wants these fleshed out with real depth before the project
moves on to Google Analytics/Search Console and starts pushing for
traffic — this supersedes the general "breadth across markets" default
near-refresh otherwise uses. Within this list, prioritize whichever city
currently has the least coverage; the list itself has no internal
ranking beyond "these before anything else."

- London (Shoreditch already in progress — see below)
- Rome (Pignetto already listed — see below)
- San Francisco Bay Area (SF + Oakland already in progress — see below)
- São Paulo (several neighborhoods already in progress — see below)
- Baixada Santista (Santos in progress; ABC Paulista/Baixada Santista
  region also has its own war-room backlog entry — see BACKLOG.md)
- Rio de Janeiro (Copacabana/Ipanema ambiguity noted below)
- Barcelona
- New York (Brooklyn sub-neighborhoods already flagged below)
- Miami
- Chengdu
- Seattle
- Portland
- Medellín
- Lisbon
- Porto
- Amsterdam

## Neighborhoods (specific, high-priority)

- Vila Madalena, São Paulo — started 2026-08-27
- Baixo Augusta / Santa Cecília, São Paulo — started 2026-08-27
- Moema, São Paulo — started 2026-08-27
- Selva Club, São Paulo — **not Inferno Club**: the operator flagged
  (2026-08-28) that Inferno Club no longer exists; Selva Club is a
  rebrand of the same former venue. Verify current status per
  `rules.md`'s `verify-still-open-before-create` rule before creating
  the pin regardless — don't take this note alone as sufficient
  verification, it's a pointer to the right current name, not a
  substitute for checking. Selva Club has a Sympla page with its full
  event calendar and ticket sales
  (https://www.sympla.com.br/produtor/selva011) — a strong candidate
  both as a source (add to `content/sources.md` once verified active)
  and as the basis for expirable event pins at this venue, same pattern
  as the Teatro Clube da Eskyna Instagram source.
- Shoreditch, London — started 2026-08-27
- A North London neighborhood (Dalston or Stoke Newington are reasonable
  candidates — operator asked for "some cool North London area," pick one
  with real current coverage available and note which)
- Pignetto, Rome
- Brooklyn, New York (large — likely needs its own sub-neighborhood pass:
  Williamsburg, Bushwick, etc., don't try to cover "Brooklyn" as one unit)
- Copacabana and/or Ipanema, Rio de Janeiro (operator wrote "Copanema" —
  ambiguous between the two adjacent, both-famous beach neighborhoods;
  research both, don't guess which one was meant)

## Cities — Brazil

São Paulo (in progress), Santos (in progress), Curitiba, Fortaleza, Rio de
Janeiro, Cuiabá, Joinville, Florianópolis, Porto Alegre, Ribeirão Preto,
São Carlos, Campinas, São José dos Campos, Saquarema, Belo Horizonte,
Salvador, Manaus, Petrópolis, Recife, Belém

## Cities — USA & Canada

New York, Los Angeles, San Diego, Portland, Seattle, Denver, Boulder
(Colorado), New Orleans, Chicago, Philadelphia, Boston, Miami, Atlanta,
San Francisco Bay Area (in progress), Toronto, Vancouver

## Cities — Latin America (outside Brazil)

Mexico City, Puerto Vallarta, Bogotá, Medellín, Montevideo, Buenos Aires,
Santiago, Valparaíso

## Cities — Europe

Rome (in progress via Pignetto), Barcelona, Madrid, Valencia, Lisbon (in
progress), Porto, London (in progress via Shoreditch), Brighton,
Manchester, Glasgow, Dublin, Belfast, Edinburgh, Paris, Amsterdam, Milan,
Lugano, Zurich, Catania, Berlin, Athens

## Cities — Asia

Tokyo, Shenzhen, Chengdu

Notes: Shenzhen is China's clearest "futuristic city" pick — built from a
fishing village into a tech megacity in one generation (Tencent, Huawei,
DJI, BYD all headquartered there); Shanghai's Pudong skyline is the more
visually iconic runner-up, worth a mention if Shenzhen coverage grows.
Chengdu is genuinely China's most LGBTQ+-friendly city ("Gaydu" is a real
nickname) — be honest that this is relative, not absolute: national
visibility has narrowed since 2018 (Pride events shut down in Shanghai/
Beijing, LGBTQ+ orgs closed), so content about Chengdu's scene should
reflect that context rather than overstate how open it is by
international standards.

## Notes for `near-refresh`

- This list is intentionally broad — don't try to do full neighborhood-
  level depth on every city in one pass. A city with no coverage yet gets
  1-3 genuinely good places first, not an exhaustive survey.
- When a place is found outside these destinations but is genuinely
  recommended by a watched source, add it anyway — this list biases
  research, it doesn't gate what's allowed (see rules.md and the
  near-refresh skill for the actual gating logic).
- Update the "started"/city notes above as coverage lands, so the next
  run doesn't re-research from scratch.
