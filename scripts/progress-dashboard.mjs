#!/usr/bin/env node
// Text progress dashboard for the North Star goal (BACKLOG.md section 1.0):
// 1,000 places per Tier 1 city, everything else scaled proportionally to
// the existing share-of-output cadence (BACKLOG.md section 2.2).
//
// Reads real content/places/*/meta.json — no invented numbers. Rates are
// computed from actual publishedAt timestamps in the catalogue, so they're
// only as good as the sample: a short window after a batch push will look
// faster than steady-state. Treat ETAs as illustrative, not a forecast.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const PLACES_DIR = "content/places";

const TIER1 = ["London", "New York", "New York City", "San Francisco Bay Area"];
const TIER2 = [
  "Brighton", "San Francisco", "Berkeley", "Oakland", "East Bay",
  "Brooklyn", "Manhattan", "Bangkok", "São Paulo", "Baixada Santista",
  "Rio de Janeiro", "Berlin", "Amsterdam", "Barcelona", "Rome", "Portland",
  "Mexico City", "Las Vegas", "Orlando", "Fort Lauderdale", "Chengdu",
  "Tokyo", "Melbourne", "Seattle", "Los Angeles", "Paris", "Lisbon", "Madrid",
];
const TIER3 = [
  "Florianópolis", "Porto Alegre", "Curitiba", "Belo Horizonte", "Recife",
  "Salvador", "Denver", "Chicago", "Miami", "Bologna", "Medellin",
  "Montevideo", "São Carlos", "Rio Claro", "São Vicente", "New Jersey",
  "San Diego", "Buenos Aires", "Palermo", "Lugano", "Puerto Vallarta",
  "Milan", "Valencia", "Porto", "Campinas", "Jaú", "Bauru", "Araraquara",
  "Edinburgh", "Glasgow", "Dublin", "Carcavelos", "Athens", "Guarujá",
  "Santos", "Sitges",
];

function tierOf(city) {
  if (TIER1.includes(city)) return 1;
  if (TIER2.includes(city)) return 2;
  if (TIER3.includes(city)) return 3;
  return null;
}

const byCity = new Map();
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
}

function bar(pct, width = 40) {
  const filled = Math.round((pct / 100) * width);
  return "█".repeat(filled) + "░".repeat(width - filled);
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

const BANNER = String.raw`
 _   _ _____   _    ____    _  _____ ___ ___  _   _
| \ | | ____| / \  |  _ \  | ||_   _/ _ \_ _|| \ | |
|  \| |  _|  / _ \ | |_) | | |  | || | | | | |  \| |
| |\  | |___/ ___ \|  _ <  |_|  | || |_| | | | |\  |
|_| \_|_____/_/   \_\_| \_\ (_) |_| \___/___||_| \_|
        N O R T H   S T A R   T R A C K E R
`;
console.log(BANNER);
console.log("=".repeat(64));
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
  const yearsOut = eta && eta !== "REACHED"
    ? ((new Date(eta) - new Date()) / (365.25 * 86400000)).toFixed(1)
    : null;

  console.log(`\n  >> ${city.toUpperCase()}`);
  console.log(`     [${bar(pct, 50)}]`);
  console.log(
    `     ${String(count).padStart(4)} / 1000 pins  (${pct.toFixed(1)}%)` +
      (rate ? `   rate: ~${rate.toFixed(2)}/day` : "   rate: n/a (too little data)"),
  );
  if (eta === "REACHED") {
    console.log("     >>> TARGET REACHED <<<");
  } else if (eta) {
    console.log(`     projected 1,000th pin: ${eta}  (~${yearsOut} years out, naive extrapolation)`);
  }
}

console.log("\n--- Catalogue totals (all cities) ---\n");
let grandTotal = 0;
const rows = [...byCity.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [city, dates] of rows) {
  grandTotal += dates.length;
}
console.log(`Total places published: ${grandTotal}`);
console.log(`Tier 1 cities combined: ${tier1Total}`);

console.log("\n--- Illustrative full-catalogue target, IF today's Tier 1/2/3 ---");
console.log("--- output cadence (6:3:1 per BACKLOG 2.2) held as final targets ---\n");
const tier1Cities = 3;
const tier2Cities = TIER2.length;
const tier3Cities = TIER3.length;
const shareUnit = 1000 / (6 / 10 / tier1Cities); // places implied per full 1/10 share
const tier2Target = Math.round(shareUnit * (3 / 10 / tier2Cities));
const tier3Target = Math.round(shareUnit * (1 / 10 / tier3Cities));
const impliedTotal = tier1Cities * 1000 + tier2Cities * tier2Target + tier3Cities * tier3Target;
console.log(`Tier 1: ${tier1Cities} cities x 1,000 = ${tier1Cities * 1000}`);
console.log(`Tier 2: ${tier2Cities} cities x ~${tier2Target} = ~${tier2Cities * tier2Target}`);
console.log(`Tier 3: ${tier3Cities} cities x ~${tier3Target} = ~${tier3Cities * tier3Target}`);
console.log(`Implied full-catalogue total: ~${impliedTotal.toLocaleString()} places`);
console.log(
  "\nNOTE: this proportional target is illustrative math from the existing\n" +
    "output-cadence ratio, not an operator-approved target. See BACKLOG.md\n" +
    "P0.1 — the actual post-1,000 target is an open decision.",
);
console.log("\n" + "=".repeat(64));
console.log("  Rates are noisy (few days of data) — a rough 'if nothing");
console.log("  changes' extrapolation, not a real forecast. The whole point");
console.log("  of the token-efficiency mandate (BACKLOG 1.0) is to bend");
console.log("  these curves way, way to the left.");
console.log("=".repeat(64) + "\n");
