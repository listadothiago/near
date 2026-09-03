# Near — Content Requests

The queue of places Near's own writing has asked for but doesn't cover
yet. When a piece wants to link somewhere internally and there's no
published place to point at, the writer appends a request here instead of
forcing a weak link at an unrelated pin — see `content/rules.md`'s
`link-density` rule.

This is deliberately a local file rather than a Jira project. Near is a
one-person operation, so the value of an issue tracker (assignment,
handoffs, an audit trail for people who aren't the operator) doesn't
apply, and a second source of truth would have to be kept in sync with
the repo that already is one. These requests are made of repo nouns —
slugs that don't exist yet, source URLs, the article that's waiting — and
they're drained by the same skills that read `rules.md` off disk. Decision
recorded in `BACKLOG.md` on 2026-08-31.

## How this gets used

- **Appending:** `near-editor`, `near-blogger`, `near-adiciona`, and
  `near-war-room` append an entry when `link-density`'s internal half
  can't be satisfied honestly.
- **Draining:** `near-refresh` treats open requests as first-class work,
  the same way it treats the locale gaps in `full-locale-coverage` —
  not as an afterthought once everything else is done.
- **Closing:** when the requested place is published, set `status:
  fulfilled` and record the slug that closed it. Then go back and add
  the link to every article listed in `wantedBy` — an unfulfilled
  promise to link is the whole reason the entry existed.
- **Rejecting:** `status: rejected` with a reason is a fine outcome. Not
  every gap is worth filling, and a request that sat through several
  refreshes without anyone wanting to write it is telling you something.

Requests are keyed by what's wanted, not by who asked. If a second
article wants the same missing place, add it to that entry's `wantedBy`
list rather than opening a duplicate — same `dedupe-everywhere`
discipline that governs places and sources.

```yaml
requests:
  - id: sp-liberdade-market-or-grocery
    status: fulfilled
    fulfilledBy: "content/places/towa-liberdade-sao-paulo"
    requestedAt: "2026-08-31"
    what: >
      A Liberdade day-market, Japanese-Brazilian grocery, or street-food
      stall in São Paulo — the kind of address a reader would actually
      stop at between two restaurant visits.
    city: "São Paulo"
    neighborhood: "Liberdade"
    why: >
      Both Liberdade restaurants and the Asian food collection lean on
      "treat the markets and grocery stores between them as part of the
      plan" as the reason to walk the neighborhood rather than just eat
      and leave. Near currently publishes no such place, so that advice
      has nothing to link to and the reader is left to find it alone.
    wantedBy:
      - "content/collections/asian-food-sao-paulo"
      - "content/places/rong-he-sao-paulo"
    sourceLeads: []
    note: >
      English links added to both wantedBy items and to
      thai-e-san-sao-paulo. The other five locale files on rong-he and
      thai-e-san still need the equivalent link added -- residual gap
      for the next near-refresh/near-translator pass.

  - id: sp-pinheiros-anchor
    status: fulfilled
    fulfilledBy: "content/places/lita-pinheiros-sao-paulo"
    requestedAt: "2026-08-31"
    what: >
      Any published Pinheiros place — Near covers none at all right now.
    city: "São Paulo"
    neighborhood: "Pinheiros"
    why: >
      Thai E-San's second branch is in Pinheiros and the piece notes the
      expansion as evidence the original kept working. There's no
      Pinheiros pin to anchor that to, and Pinheiros is a Tier 1 São
      Paulo target in BACKLOG.md's Phase 1 priority list regardless.
    wantedBy:
      - "content/places/thai-e-san-sao-paulo"
    sourceLeads: []

  - id: smokies-pigeon-forge-gatlinburg-anchor
    status: open
    requestedAt: "2026-08-31"
    what: >
      Any second place in the Pigeon Forge / Gatlinburg / Great Smoky
      Mountains corridor — a music venue, distillery, trailhead, diner,
      or motel with actual character.
    city: "Pigeon Forge"
    region: "Tennessee"
    why: >
      Dollywood is Near's only place in the entire US Southeast and its
      only travel pin, so it has nothing honest to link to. Its
      closing line already tells the reader to "pair a Dollywood day with
      the wider Pigeon Forge and Gatlinburg corridor" and then leaves
      them to work out what that means alone. This is the case the
      link-density rule's escape hatch exists for: forcing a NearLink
      from a Tennessee theme park to a São Paulo noodle house would
      satisfy a counter and help nobody.
    wantedBy:
      - "content/places/dollywood-pigeon-forge"
    sourceLeads: []
    note: >
      Low priority against BACKLOG.md's Phase 1 geography — Tennessee is
      not a Tier 1 hub and isn't on the Phase 2 list either. Fine for this
      to sit open for a long time, or to be closed as rejected if Near
      never expands there. Logged so the gap is visible rather than
      silently tolerated.

  - id: santos-centro-historico-second
    status: fulfilled
    fulfilledBy: "casa-frontaria-azulejada-santos"
    fulfilledAt: "2026-08-31"
    requestedAt: "2026-08-31"
    what: >
      A second Centro Histórico, Santos place — bar, café, record shop,
      or venue — so the district has more than one pin.
    city: "Santos"
    neighborhood: "Centro Histórico"
    why: >
      Teatro Clube da Eskyna is currently Near's only Centro Histórico
      address, which means the page has no genuine neighbor to bridge to
      and Baixada Santista coverage rests on a single venue plus its own
      event. Baixada Santista is a stated Tier 1 hub in BACKLOG.md — the
      operator lives in São Vicente — so this is a priority gap, not a
      nice-to-have.
    wantedBy:
      - "content/places/teatro-clube-da-eskyna-santos"
    sourceLeads:
      - name: "A Tribuna"
        url: "https://www.atribuna.com.br/"
        note: "Already a cited source on the Eskyna page; regional daily with Santos culture coverage."
      - name: "Juicy Santos"
        url: "https://www.juicysantos.com.br/"
        note: "Named in the Eskyna article as the practical way to find out what's on regionally. Now a recorded source on casa-frontaria-azulejada-santos."
    closingNote: >
      Closed by Casa da Frontaria Azulejada, 296m from the Eskyna and
      clear of dedupe-by-place. Per this file's own rule, the link was
      added back to the article that asked for it — the Eskyna page now
      bridges to it in en and pt-BR — rather than just flipping the
      status and leaving the original piece as link-less as before.
```

```yaml
request: adiciona-made-cozinha-autoral-santos
type: new-place
city: Santos
country: Brazil
why: >
  Operator direct request (2026-08-31, via near-adiciona flow): "adiciona o
  madê cozinha autoral e o almeida em santos também". Santos is in the
  Baixada Santista priority zone (operator's home region) and São Paulo is
  refresh #2. Verify current trading, exact address, sources and hero image
  before drafting — operator-named places still pass the full quality gate.
status: fulfilled
fulfilledBy: "made-cozinha-autoral-santos"
fulfilledAt: "2026-08-31"
closingNote: >
  Published as content/places/made-cozinha-autoral-santos; hero later
  swapped to a real venue photo, see made-cozinha-autoral-hero-refresh.
```

```yaml
request: adiciona-almeida-santos
type: new-place
city: Santos
country: Brazil
why: >
  Same operator request as made-cozinha-autoral-santos. "O Almeida" —
  identify the exact establishment (name is common), confirm which venue the
  operator means if ambiguous at research time, verify trading + sources +
  hero before drafting.
status: fulfilled
fulfilledBy: "restaurante-almeida-santos"
fulfilledAt: "2026-09-01"
closingNote: >
  Operator confirmed already live (2026-09-01). Published as
  content/places/restaurante-almeida-santos.
```

```yaml
request: made-cozinha-autoral-hero-refresh
type: image-refresh
place: made-cozinha-autoral-santos
why: >
  Operator flag (2026-08-31): current hero is the Santos bay from Ponta da
  Praia (setting, not the venue). Replace with an actual photo of the
  restaurant when possible — best paths: ask the venue directly for a
  photo (operator has local reach in the Baixada), or a licensed shot of
  the new Epitacio Pessoa 716 house. Update heroImage + licenseNote when
  swapped; keep the CC attribution rules.
status: fulfilled
fulfilledAt: "2026-09-01"
closingNote: >
  Operator supplied a Revista Nove photo (Dário Costa at the restaurant
  entrance/dining room) into content/photo-inbox/; heroImage and
  licenseNote updated in meta.json, source article added to meta.sources.
```

```yaml
request: hazlitts-london-no-natural-internal-link
type: internal-link
place: hazlitts-london
why: >
  Checked existing London places (gays-the-word-london in Bloomsbury,
  wiltons-music-hall-london in Whitechapel, and the rest of the London
  slate) for a natural <NearLink> from the Hazlitt's piece. None are
  walkable from Frith Street/Soho Square, so no internal link was forced
  per the link-density escape hatch. Revisit once Near has a genuine Soho
  place published (a bar, bookshop, or venue on/near Frith or Dean
  Street) that the Hazlitt's body could plausibly send a reader to next.
update: >
  2026-09-02 — the target now exists in draft. bar-italia-soho-london is
  at 22 Frith Street, roughly 100m down the same pavement from Hazlitt's
  at number 6, and its body already links back to Hazlitt's on exactly
  the contrast this request was waiting for (a hotel selling silence, and
  the counter still serving at four in the morning when the silence stops
  working). Held open only because Bar Italia is status draft and
  loader.ts filters drafts off, so a NearLink from Hazlitt's would be a
  dead link today. Close this the moment Bar Italia goes active, adding
  the reciprocal link in the same pass.
status: fulfilled
fulfilledAt: "2026-09-02"
closingNote: >
  bar-italia-soho-london went active the same day with all six locales.
  Reciprocal NearLink added to the end of hazlitts-london/en.mdx, on the
  contrast this request was always waiting for: a hotel selling silence,
  and the counter a hundred metres away still serving at four in the
  morning when the silence stops working. 2026-09-03 — locale gap now
  closed too: es-419, es-ES, it, pt-BR and zh-CN each carry an equivalent
  closing paragraph with the same reciprocal NearLink, written as local
  editions rather than translations (vosotros/ustedes split honored, a
  Madrid-hours aside in es-ES, a red-eye-from-Brazil jetlag framing in
  pt-BR, a jetlag framing in zh-CN). All six locales now link to
  bar-italia-soho-london; no caveat outstanding.
```

```yaml
request: brighton-no-local-internal-link
type: internal-link
place: legends-hotel-brighton
why: >
  Legends is Brighton's FIRST pin, so no walkable or same-city internal
  link target exists. Rather than force a weak one, the body links to
  hazlitts-london on a genuine accommodation-beat connection (same
  category, same NITE-PORTER byline, and a real editorial contrast --
  Hazlitt's sells silence, Legends sells the club underneath you).
  Revisit once a second Brighton pin ships: content/post-plan.md's
  Brighton queue was seeded 2026-09-02 with The Actors (Kemptown),
  Polyglamorous @ Quarters, Green Door Store and Club Revenge, any of
  which would be a strong local link from here -- The Actors especially,
  since it is a few minutes away in the same Kemptown village.
status: open
```

```yaml
request: sitges-auditori-melia-venue-missing
type: missing-venue
place: sitges-film-festival-2026
why: >
  content/rules.md's event-belongs-to-venue says an event at a venue Near
  does NOT cover is published standalone with the missing venue logged
  here. That is what happened: the Sitges Film Festival's main screen is
  the 1,380-seat Auditori inside the Melia Sitges hotel at Aiguadolc
  (41.2368, 1.8239), which Near has no pin for, so the festival ships
  with no parentPlace. It is also town-wide across the Auditori, Casino
  Prado, El Retiro and the seafront King Kong Area, so hanging it off any
  single venue would have been wrong even if the Auditori existed as a
  pin -- and would have pulled the run's main dated hook off the board.
  If the Auditori ever gets its own pin, do NOT retro-fit parentPlace on
  the festival for that reason.
status: open
```

```yaml
request: sitges-el-retiro-held-on-renovation
type: held-lead
place: sitges-film-festival-2026
why: >
  Societat Recreativa El Retiro (1870, Carrer d'Angel Vidal 17-21,
  41.2366/1.8108) was scoped as the fifth pin of the 2026-09-03 Sitges
  war room and deliberately NOT written. Its own site
  (elretirositges.cat/remodelacio/) records renovation starting 4 May
  2024 with no published reopening date, which trips
  verify-still-open-before-create. Three shipped pieces now tell readers
  to check rather than assume it. The piece is genuinely good when it
  reopens: fire in 1916, rebuilt by Miquel Utrillo, Creu de Sant Jordi
  2017, and a 1970 false ceiling just removed to expose Utrillo's vaults.
  Rights-clear Commons images already identified (151 Cinema El Retiro,
  CC BY-SA 4.0; and the open-air stage, same licence).
status: open
```

