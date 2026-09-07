#!/usr/bin/env node
// Text progress dashboard for the North Star goal (BACKLOG.md section 1.0):
// 1,000 places per Tier 1 city. Shows clear projected dates for the 100
// and 1,000 milestones only — deliberately does not project further out
// (operator, 2026-09-07: "let's not do 10000 that's too far").
//
// Reads real content/places/*/meta.json — no invented numbers. Rates are
// computed from actual publishedAt timestamps in the catalogue, so they're
// only as good as the sample: a short window after a batch push will look
// faster than steady-state. Treat ETAs as illustrative, not a forecast.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const PLACES_DIR = "content/places";

const byCity = new Map();
let eventCount = 0; // dated happenings (meta.eventStartsAt set), not evergreen venues
for (const slug of readdirSync(PLACES_DIR)) {
  let meta;
  try {
    meta = JSON.parse(readFileSync(join(PLACES_DIR, slug, "meta.json"), "utf8"));
  } catch {
    continue;
  }
  const city = meta.place?.city ?? "?";
  if (!byCity.has(city)) byCity.set(city, []);
  if (meta.publishedAt) byCity.get(city).push(meta.publishedAt);
  if (meta.eventStartsAt) eventCount++;
}

function bar(pct, width = 50, markAt = null) {
  const filled = Math.round((pct / 100) * width);
  const chars = Array.from({ length: width }, (_, i) => (i < filled ? "█" : "░"));
  if (markAt != null) {
    const markPos = Math.min(width - 1, Math.round((markAt / 100) * width));
    if (chars[markPos] === "░") chars[markPos] = "▏"; // milestone tick on unfilled track
  }
  return chars.join("");
}

function rateAndEta(dates, target) {
  if (dates.length < 2) return { rate: null, eta: null };
  const sorted = [...dates].sort();
  const start = new Date(sorted[0]);
  const end = new Date(sorted[sorted.length - 1]);
  const days = Math.max((end - start) / 86400000, 0.5);
  const rate = dates.length / days;
  const remaining = target - dates.length;
  if (remaining <= 0) return { rate, eta: "REACHED" };
  const daysNeeded = remaining / rate;
  const eta = new Date(end.getTime() + daysNeeded * 86400000);
  return { rate, eta: eta.toISOString().slice(0, 10) };
}

function milestoneLine(dates, count, target) {
  if (count >= target) return `  >>> ${target}-PLACE MILESTONE ALREADY PASSED <<<`;
  const { eta } = rateAndEta(dates, target);
  return `  ${target.toString().padStart(4)}-place milestone: naive ETA ${eta ?? "n/a (too little data)"}`;
}

const BANNER = String.raw`
 _   _ _____   _    ____    _  _____ ___ ___  _   _
| \ | | ____| / \  |  _ \  | ||_   _/ _ \_ _|| \ | |
|  \| |  _|  / _ \ | |_) | | |  | || | | | | |  \| |
| |\  | |___/ ___ \|  _ <  |_|  | || |_| | | | |\  |
|_| \_|_____/_/   \_\_| \_\ (_) |_| \___/___||_| \_|
        N O R T H   S T A R   T R A C K E R
`;
console.log(BANNER);

// --- Worldwide total (always shown, top of the dashboard) ---
let grandTotal = 0;
let allDates = [];
for (const [, dates] of byCity) {
  grandTotal += dates.length;
  allDates = allDates.concat(dates);
}

console.log("=".repeat(64));
console.log("  WORLDWIDE — 100 & 1,000 place milestones");
console.log("=".repeat(64));
console.log(`  Total places published: ${grandTotal}`);
console.log(milestoneLine(allDates, grandTotal, 100));
console.log(milestoneLine(allDates, grandTotal, 1000));
console.log(
  `  Dated events published (meta.eventStartsAt): ${eventCount}` +
    "  — event/accommodation/collection\n" +
    "  coverage scales in proportion too, per BACKLOG 1.0, not just place pins.",
);
console.log("=".repeat(64));

console.log("\n" + "=".repeat(64));
console.log("  GOAL: 1,000 places in each Tier 1 city (London / NYC / SF Bay)");
console.log("=".repeat(64));

let tier1Total = 0;
for (const city of ["London", "New York", "San Francisco Bay Area"]) {
  const dates =
    city === "New York"
      ? [...(byCity.get("New York") ?? []), ...(byCity.get("New York City") ?? [])]
      : city === "San Francisco Bay Area"
        ? [...(byCity.get("San Francisco") ?? []), ...(byCity.get("Oakland") ?? []), ...(byCity.get("Berkeley") ?? [])]
        : byCity.get(city) ?? [];
  const count = dates.length;
  tier1Total += count;
  const pct = (count / 1000) * 100;
  const { rate, eta } = rateAndEta(dates, 1000);

  console.log(`\n  >> ${city.toUpperCase()}`);
  console.log(`     [${bar(pct, 50, 10)}]`); // 10% mark = the 100-place tick
  console.log(
    `     ${String(count).padStart(4)} / 1000 pins  (${pct.toFixed(1)}%)` +
      (rate ? `   rate: ~${rate.toFixed(2)}/day` : "   rate: n/a (too little data)"),
  );
  console.log("    " + milestoneLine(dates, count, 100));
  if (eta === "REACHED") {
    console.log("       >>> 1,000-PLACE TARGET REACHED <<<");
  } else if (eta) {
    console.log(`     1,000-place milestone: naive ETA ${eta}`);
  } else {
    console.log("     1,000-place milestone: naive ETA n/a (too little data)");
  }
}

console.log(`\n--- Tier 1 combined: ${tier1Total} places ---`);

console.log("\n" + "=".repeat(64));
console.log("  Rates are noisy (few days of data) — a rough 'if nothing");
console.log("  changes' extrapolation, not a real forecast. The whole point");
console.log("  of the token-efficiency mandate (BACKLOG 1.0) is to bend");
console.log("  these curves way, way to the left.");
console.log("=".repeat(64) + "\n");
