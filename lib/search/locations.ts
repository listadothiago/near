import { normalizeText } from "./parseQuery";
import type { PlaceSummary } from "@/lib/content/schema";

/**
 * Location-aware search: turns "são paulo", "londres", "bloomsbury" or
 * "brazil" into a scoped results page with a visible heading, instead of
 * a bare substring match the reader can't tell worked.
 *
 * The index is built from the places themselves — every neighbourhood,
 * city, region and country that actually has coverage — so it can never
 * offer a location with zero results. Specificity wins: a query that
 * matches both a neighbourhood and its city scopes to the neighbourhood.
 *
 * Aliases cover the site's own languages for the big geography words
 * (a pt-BR reader typing "londres" means London). Deliberately small
 * and hand-kept, like the category synonyms above it in parseQuery.
 */
const LOCATION_ALIASES: Record<string, string> = {
  // London
  londres: "london",
  londra: "london",
  伦敦: "london",
  // key cities
  "sao paulo": "sao paulo",
  lisbona: "lisbon",
  lisboa: "lisbon",
  berlim: "berlin",
  berlino: "berlin",
  柏林: "berlin",
  amsterda: "amsterdam",
  // countries
  brasil: "brazil",
  brasile: "brazil",
  巴西: "brazil",
  inglaterra: "england",
  inghilterra: "england",
  英国: "united kingdom",
  "reino unido": "united kingdom",
  "regno unito": "united kingdom",
  "estados unidos": "united states",
  "stati uniti": "united states",
  美国: "united states",
  italia: "italy",
  意大利: "italy",
  espanha: "spain",
  españa: "spain",
  西班牙: "spain",
  "estado de sao paulo": "sao paulo",
};

export type LocationLevel = "neighborhood" | "city" | "region" | "country";

export type LocationMatch = {
  /** Display name as it appears in the content, e.g. "São Paulo". */
  label: string;
  level: LocationLevel;
  /** Slugs of the places inside this location. */
  slugs: Set<string>;
};

type IndexEntry = {
  label: string;
  level: LocationLevel;
  normalized: string;
  slugs: Set<string>;
};

const LEVELS: LocationLevel[] = ["neighborhood", "city", "region", "country"];

export function buildLocationIndex(places: PlaceSummary[]): IndexEntry[] {
  const map = new Map<string, IndexEntry>();
  for (const p of places) {
    for (const level of LEVELS) {
      const label = p.meta.place[level];
      if (!label) continue;
      const key = `${level}:${normalizeText(label)}`;
      let entry = map.get(key);
      if (!entry) {
        entry = { label, level, normalized: normalizeText(label), slugs: new Set() };
        map.set(key, entry);
      }
      entry.slugs.add(p.meta.slug);
    }
  }
  return [...map.values()];
}

function resolveAliases(query: string): string {
  let q = query;
  for (const [alias, canonical] of Object.entries(LOCATION_ALIASES)) {
    if (q.includes(alias)) q = q.replace(alias, canonical);
  }
  return q;
}

/**
 * Finds the most specific location whose full name appears in the query.
 * Whole-name containment, not word overlap — "camden market cocktails"
 * scopes to Camden only if "camden" is a known location name, and a
 * query that names nothing yields null, leaving plain text search alone.
 */
export function matchLocation(
  index: IndexEntry[],
  rawQuery: string,
): LocationMatch | null {
  const q = ` ${resolveAliases(normalizeText(rawQuery))} `;
  if (q.trim().length < 2) return null;

  let best: IndexEntry | null = null;
  for (const entry of index) {
    if (!q.includes(` ${entry.normalized} `)) continue;
    if (
      !best ||
      LEVELS.indexOf(entry.level) < LEVELS.indexOf(best.level) ||
      (entry.level === best.level && entry.normalized.length > best.normalized.length)
    ) {
      best = entry;
    }
  }
  return best ? { label: best.label, level: best.level, slugs: best.slugs } : null;
}

/**
 * Strips the matched location's words from the free-text remainder so
 * "bares em londres" scopes to London AND still applies "bares" as a
 * category term, rather than requiring the word "london" to also appear
 * in every place's text.
 */
export function stripLocationWords(
  words: string[],
  match: LocationMatch,
): string[] {
  const locWords = new Set(normalizeText(match.label).split(/\s+/));
  // alias words too: if the reader typed "londres", that word is spent.
  for (const [alias, canonical] of Object.entries(LOCATION_ALIASES)) {
    if (normalizeText(match.label) === canonical || canonical.includes(normalizeText(match.label))) {
      for (const w of alias.split(/\s+/)) locWords.add(w);
    }
  }
  return words.filter((w) => !locWords.has(w));
}
