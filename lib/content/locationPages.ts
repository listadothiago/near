import { normalizeText } from "@/lib/search/parseQuery";
import type { PlaceSummary } from "@/lib/content/schema";
import type { LocationLevel } from "@/lib/search/locations";

/**
 * The addressable location pages — the routable, indexable half of the
 * "location views must be shareable" directive.
 *
 * Deliberately NOT the same index as `lib/search/locations.ts`. That one
 * exists to resolve a typed query and is right to be permissive: matching
 * "paraty" to its one pin is a good search result. This one decides what
 * gets a *URL*, which is a much higher bar — every entry here becomes six
 * crawlable pages that Google will judge as standalone documents.
 *
 * Two rules do the work, both from the coverage measurement recorded in
 * docs/chatgpt-three-year-strategy-2026-09.md §6.
 */

/**
 * A location needs this many places before it earns a page.
 *
 * Measured 2026-09-02: 44 of 49 neighborhoods hold exactly one pin.
 * Publishing those would mean ~510 URLs, nearly all single-pin
 * near-duplicates of the place page they point at — a page that restates
 * one pin is not an aggregation page, and shipping fifty of them is the
 * listicle-farm failure the strategy doc rules against.
 *
 * At 2 the page starts answering "what is this place like" instead. This
 * is a floor, not a target: as coverage deepens, locations cross it and
 * gain pages automatically, which is the right direction for the
 * dependency to run.
 */
export const MIN_PLACES_FOR_LOCATION_PAGE = 2;

/** Levels that get pages, coarsest last. */
const LEVELS: LocationLevel[] = ["neighborhood", "city", "region", "country"];

export type LocationPage = {
  label: string;
  level: LocationLevel;
  /** URL segments after `/in`, already slugified. */
  segments: string[];
  /**
   * The city a neighborhood belongs to. Set for neighborhoods only, and
   * the reason those URLs carry two segments — see `slugifyLabel`.
   */
  parentCity?: string;
  places: PlaceSummary[];
};

export function slugifyLabel(label: string): string {
  return normalizeText(label)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Neighborhood names are not globally unique and never will be.
 *
 * "Centro Histórico" is the single largest neighborhood in the corpus and
 * it spans Santos *and* Paraty — two cities in two different states. A flat
 * /in/centro-historico would silently merge them into one page presenting
 * places 300km apart as one neighborhood. "Centro" and "Liberdade" are the
 * same class of name and collide the moment a second Brazilian city lands.
 *
 * So a neighborhood is addressed through its city, which is also the shape
 * the strategy doc's own Layer-2 proposal used (/en/sao-paulo/pinheiros).
 * City, region and country are unambiguous within the corpus and stay flat.
 */
function segmentsFor(
  level: LocationLevel,
  label: string,
  parentCity?: string,
): string[] {
  if (level === "neighborhood" && parentCity) {
    return [slugifyLabel(parentCity), slugifyLabel(label)];
  }
  return [slugifyLabel(label)];
}

/**
 * Every location that clears the coverage floor, as a routable page.
 *
 * Neighborhoods are keyed by city + name so two cities' "Centro" stay two
 * pages; the coarser levels are keyed by name alone.
 */
export function getLocationPages(places: PlaceSummary[]): LocationPage[] {
  const byKey = new Map<string, LocationPage>();

  for (const place of places) {
    for (const level of LEVELS) {
      const label = place.meta.place[level];
      if (!label) continue;

      const parentCity =
        level === "neighborhood" ? place.meta.place.city : undefined;
      // A neighborhood with no city can't be addressed unambiguously, so
      // it gets no page rather than a guessed one.
      if (level === "neighborhood" && !parentCity) continue;

      const segments = segmentsFor(level, label, parentCity);
      const key = `${level}:${segments.join("/")}`;

      let entry = byKey.get(key);
      if (!entry) {
        entry = { label, level, segments, parentCity, places: [] };
        byKey.set(key, entry);
      }
      entry.places.push(place);
    }
  }

  const qualified = [...byKey.values()].filter(
    (e) => e.places.length >= MIN_PLACES_FOR_LOCATION_PAGE,
  );

  // A city and the region containing it routinely share a name: São Paulo
  // the city sits in São Paulo the state, and both slugify to "sao-paulo".
  // Left alone that is two pages fighting for one URL — and a duplicate
  // entry in generateStaticParams.
  //
  // Specificity wins, matching the tie-break `matchLocation` already
  // documents for the search index, so a URL and a typed query resolve to
  // the same place. A reader who says "São Paulo" means the city; the
  // state's extra pins stay reachable through the country page and through
  // the cities inside it.
  const byUrl = new Map<string, LocationPage>();
  for (const page of qualified) {
    const url = page.segments.join("/");
    const held = byUrl.get(url);
    if (!held || LEVELS.indexOf(page.level) < LEVELS.indexOf(held.level)) {
      byUrl.set(url, page);
    }
  }

  return [...byUrl.values()].sort((a, b) => b.places.length - a.places.length);
}

export function findLocationPage(
  places: PlaceSummary[],
  segments: string[],
): LocationPage | null {
  const joined = segments.map((s) => s.toLowerCase()).join("/");
  return (
    getLocationPages(places).find((p) => p.segments.join("/") === joined) ??
    null
  );
}

/**
 * Where this location sits on the ladder, coarsest first, for breadcrumb
 * traversal. Only rungs that are themselves published pages are returned —
 * linking to a location that didn't clear the floor would 404.
 */
export function getAncestors(
  page: LocationPage,
  all: LocationPage[],
): LocationPage[] {
  const sample = page.places[0];
  if (!sample) return [];
  const order: LocationLevel[] = ["country", "region", "city"];
  const out: LocationPage[] = [];

  for (const level of order) {
    // LEVELS runs finest-first, so an ancestor has a *higher* index than
    // the page it sits above. Getting this comparison backwards silently
    // lists descendants as ancestors — Brazil claiming São Vicente as its
    // parent — which is why it's spelled out rather than inlined.
    if (LEVELS.indexOf(level) <= LEVELS.indexOf(page.level)) continue;
    const label = sample.meta.place[level];
    if (!label) continue;
    const match = all.find(
      (p) => p.level === level && p.segments.join("/") === slugifyLabel(label),
    );
    if (match) out.push(match);
  }
  return out;
}

/**
 * Published locations one rung finer than this one, sharing its places.
 *
 * This is what carries a country or region page: those levels are
 * navigational, not explorable, and their job is to route you down to the
 * levels that actually hold the pins.
 */
export function getChildren(
  page: LocationPage,
  all: LocationPage[],
): LocationPage[] {
  const slugs = new Set(page.places.map((p) => p.meta.slug));
  const here = page.segments.join("/");

  // Descend to the nearest finer level that actually has published pages,
  // rather than stopping at the first empty one.
  //
  // Brazil is the case that forced this: the São Paulo *region* loses its
  // URL to the São Paulo *city* in the name-collision dedupe above, so
  // Brazil has no region-level children at all. Stopping there would leave
  // a country page — whose whole job is routing downward — as a dead end,
  // while São Paulo, Santos and São Vicente sit one rung further down.
  for (let i = LEVELS.indexOf(page.level) - 1; i >= 0; i--) {
    const level = LEVELS[i];
    const found = all
      .filter(
        (p) =>
          p.level === level &&
          p.segments.join("/") !== here &&
          p.places.some((pl) => slugs.has(pl.meta.slug)),
      )
      .sort((a, b) => b.places.length - a.places.length);
    if (found.length > 0) return found;
  }
  return [];
}

/**
 * Freshness stats for a location, computed against a clock read here
 * rather than inside a component — a render must stay pure, and this is
 * data derivation, not presentation.
 *
 * Every number comes from `updatedAt` on the places actually shown.
 * Nothing is rounded up or padded: if one of three places was checked
 * recently, this reports one.
 */
export const FRESHNESS_RECENT_DAYS = 90;

export type LocationFreshnessStats = {
  total: number;
  recent: number;
  newestDays: number;
};

export function summarizeFreshness(
  places: PlaceSummary[],
  now: number = Date.now(),
): LocationFreshnessStats | null {
  const ages = places
    .map((p) => Math.floor((now - new Date(p.meta.updatedAt).getTime()) / 86_400_000))
    .filter((d) => Number.isFinite(d) && d >= 0);
  if (ages.length === 0) return null;

  return {
    total: places.length,
    recent: ages.filter((d) => d <= FRESHNESS_RECENT_DAYS).length,
    newestDays: Math.min(...ages),
  };
}
