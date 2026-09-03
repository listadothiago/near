#!/usr/bin/env node
// Mechanical half of content/rules.md's `dedupe-by-place`.
//
// The rule used to be checked by eye, and by eye it missed three times in
// two days — every miss was a `status: draft` folder sitting next to a live
// pin for the same venue, under a slug that differed by a whole locality
// segment (`the-stud-soma-san-francisco` vs `the-stud-san-francisco`). So
// this deliberately does NOT compare slugs: it compares the human venue
// name from the en.mdx frontmatter and the coordinates from meta.json, and
// it scans drafts alongside actives.
//
// Output is a list of PAIRS TO CHECK, not a list of duplicates. Proximity
// triggers an identity check, it is not automatic sameness — 150m in SoMa
// or Soho covers plenty of genuinely different bars. A pair printed here
// needs a human call; only "same venue" pairs get merged.
//
//   node scripts/check-duplicates.mjs            # report pairs
//   node scripts/check-duplicates.mjs --strict   # exit 1 if any pair found

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const PLACES = "content/places";
const PROXIMITY_M = 150;

function haversineM(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Strip the parts that differ between two write-ups of one venue: articles,
// legal suffixes, punctuation, accents, and the city/district qualifiers
// that get appended inconsistently ("Dolphin Club" vs "Dolphin Club
// Aquatic Park").
const STOP = new Set([
  "the", "a", "an", "el", "la", "le", "les", "los", "las", "il", "o", "os",
  "de", "di", "du", "da", "das", "dos", "of", "and", "e", "y", "et",
  "bar", "club", "cafe", "restaurant", "pub", "gallery", "museum", "shop",
  "store", "ltd", "inc", "llc",
]);

function nameTokens(name, place) {
  const geo = new Set(
    [place?.city, place?.neighborhood, place?.region, place?.country]
      .filter(Boolean)
      .flatMap((s) => s.toLowerCase().split(/\s+/)),
  );
  return new Set(
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t && !STOP.has(t) && !geo.has(t)),
  );
}

// Containment, not Jaccard: "dolphin swimming rowing" vs "dolphin" should
// score high — one write-up naming the venue more fully than the other is
// the exact shape of the duplicates that got through.
function nameScore(a, b) {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  return shared / Math.min(a.size, b.size);
}

function frontmatterName(dir) {
  for (const f of ["en.mdx", "pt-BR.mdx", "es-ES.mdx"]) {
    const p = join(dir, f);
    if (!existsSync(p)) continue;
    const m = readFileSync(p, "utf8").match(/^name:\s*"(.+?)"\s*$/m);
    if (m) return m[1];
  }
  return null;
}

const places = [];
for (const slug of readdirSync(PLACES, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)) {
  const dir = join(PLACES, slug);
  const metaPath = join(dir, "meta.json");
  if (!existsSync(metaPath)) continue;
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  places.push({
    slug,
    status: meta.status,
    coords: meta.coordinates,
    place: meta.place ?? {},
    // Events legitimately share a venue's coordinates — that is what
    // event-as-child-of-venue asks for — so they are not duplicate candidates.
    parentPlace: meta.parentPlace ?? null,
    name: frontmatterName(dir) ?? slug,
  });
}

const pairs = [];
for (let i = 0; i < places.length; i++) {
  for (let j = i + 1; j < places.length; j++) {
    const a = places[i];
    const b = places[j];
    if (a.parentPlace || b.parentPlace) continue;
    if ((a.place.city ?? "") !== (b.place.city ?? "")) continue;

    const reasons = [];
    if (a.coords && b.coords) {
      const d = haversineM(a.coords, b.coords);
      if (d < PROXIMITY_M) reasons.push(`${Math.round(d)}m apart`);
    }
    // No distance bound on the name trigger: two entries for one venue
    // often carry geocodes hundreds of metres apart (the Dolphin Club pair
    // was ~380m), which is precisely why distance alone kept missing them.
    const score = nameScore(
      nameTokens(a.name, a.place),
      nameTokens(b.name, b.place),
    );
    if (score >= 0.6) reasons.push(`name overlap ${score.toFixed(2)}`);

    if (reasons.length) pairs.push({ a, b, reasons });
  }
}

if (!pairs.length) {
  console.log(`No pairs to check across ${places.length} places.`);
  process.exit(0);
}

console.log(`${pairs.length} pair(s) need an identity check:\n`);
for (const { a, b, reasons } of pairs) {
  console.log(`  ${a.name} [${a.status}]  ${a.slug}`);
  console.log(`  ${b.name} [${b.status}]  ${b.slug}`);
  console.log(`  → ${reasons.join(", ")} — ${a.place.city ?? "?"}\n`);
}
console.log(
  "Proximity is a trigger, not a verdict. Same venue → merge sources into the\n" +
    "survivor (compare research both ways first). Different venue → leave both\n" +
    "and note the near-miss in the commit message.",
);

if (process.argv.includes("--strict")) process.exit(1);
