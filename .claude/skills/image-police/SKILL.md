---
name: image-police
description: Review finished Near images and their rendered crops for factual accuracy, visual quality, provenance and disclosure after near-illustrator; required on new articles and editorial refreshes.
---

# Image police

A distinct review role after `near-illustrator`, which chooses or makes the art.
Read `content/rules.md` image requirements and the illustrator's decision packet.
Actually view the resolved hero, every in-body image and their rendered card/page
crops. A URL, metadata, generation prompt or dimensions alone cannot pass this gate.

- Check the subject, current location and visible signage against the evidence.
  Reject a wrong venue, old address presented as current, invented amenity or a
  generated scene presented as documentary evidence.
- Judge the image at thumbnail and article size: identifiable focal point,
  intentional composition, adequate contrast, readable crop, no accidental
  clipping, corrupted output, unreadable text or generic filler. A technically
  compliant but unattractive image fails. Name the concrete defect and repair.
- Abstract, vector-derived and humorous editorial art may pass without depicting
  the venue. Its connection to the story must be legible and its nature disclosed;
  generation does not require a literal building picture or a single house style.
- Verify source/creator, usage basis, attribution link and required AI/illustration
  disclosure. Public accessibility, Google indexing, a venue hosting an asset,
  attribution alone, or a takedown plan does not establish permission. Unresolved
  usage basis goes to `near-legal-counsel`; use a cleared alternative or hold.
- Check relevant privacy/likeness issues and all locale captions/alt text. Retain
  the 250-words-per-image floor and recorded mid-body-image decision.
- Hand off the actual served `og:image` crop to `discover-view`; keep technical
  dimensions and editorial quality as separate verdicts.

Log `pass`, `repair` or `blocked`, role, time, image URL/asset hash, crop/screenshot
or viewed-asset evidence, provenance and specific findings in the piece's evidence
packet; mirror the outcome in its normal status history. Repair with illustrator
and re-view changed assets. No publication with unresolved required image checks.
For a review pass, check current rendering again and reuse unchanged rights evidence.
