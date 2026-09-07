#!/usr/bin/env node
// Mechanical gate for the Google Maps verification required for newly
// published or refreshed place pins. Legacy records are checked only when
// explicitly named, so the catalogue can be corrected on touch.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const placesDir = "content/places";
const args = process.argv.slice(2);
const all = args.includes("--all");
const strict = args.includes("--strict");
const slugs = args.filter((arg) => !arg.startsWith("--"));

if (!all && !slugs.length) {
  console.error("Usage: node scripts/check-geocodes.mjs <slug> [...slug] | --all [--strict]");
  process.exit(1);
}

const targets = all
  ? readdirSync(placesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : slugs;

function mapsUrlIsValid(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "share.google" || url.hostname.endsWith(".google.com"));
  } catch {
    return false;
  }
}

const failures = [];
let checked = 0;
for (const slug of targets) {
  const metaPath = join(placesDir, slug, "meta.json");
  if (!existsSync(metaPath)) {
    failures.push(`${slug}: meta.json not found`);
    continue;
  }

  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  if (meta.status !== "active") continue;
  checked++;
  const geocode = meta.geocode ?? {};
  const coords = meta.coordinates ?? {};
  const problems = [];
  if (!Number.isFinite(coords.lat) || !Number.isFinite(coords.lng)) problems.push("valid latitude and longitude");
  if (geocode.provider !== "google-maps") problems.push('provider "google-maps"');
  if (!(typeof geocode.confidence === "number" && geocode.confidence >= 0.9)) problems.push("confidence >= 0.9");
  if (!(typeof geocode.query === "string" && geocode.query.trim())) problems.push("non-empty query");
  if (!(typeof geocode.verifiedAt === "string" && !Number.isNaN(Date.parse(geocode.verifiedAt)))) problems.push("verifiedAt timestamp");
  if (!mapsUrlIsValid(geocode.googleMapsUrl)) problems.push("Google Maps or Google share URL");
  if (problems.length) failures.push(`${slug}: missing ${problems.join(", ")}`);
}

if (!failures.length) {
  console.log(`Google Maps verification passed for ${checked} active place${checked === 1 ? "" : "s"}.`);
  process.exit(0);
}

console.error(`Google Maps verification failed for ${failures.length} place${failures.length === 1 ? "" : "s"}:`);
for (const failure of failures) console.error(`- ${failure}`);
if (all && !strict) {
  console.error("Legacy catalogue report only. Re-run a specific touched slug to enforce the gate, or add --strict to fail all.");
  process.exit(0);
}
process.exit(1);
