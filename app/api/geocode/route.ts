import { NextResponse } from "next/server";

/**
 * Geocodes a free-text place name to coordinates via OpenStreetMap's
 * Nominatim — the free option (see docs/ for the effort/cost tradeoff
 * discussion, operator-approved 2026-11-05). Exists so a location search
 * for somewhere Near has no coverage of yet (a city with zero pins) still
 * recenters the board instead of coming up empty, the same way a place
 * Near does cover already does via lib/search/locations.ts.
 *
 * This route exists specifically so the API key/contact identification
 * and the rate-limit-respecting cache live server-side — Nominatim's
 * usage policy (https://operations.osmfoundation.org/policies/nominatim/)
 * requires a descriptive User-Agent and caps at ~1 request/second, neither
 * of which a client-side fetch could honor safely.
 */

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "near.tips location search (https://near.tips)";

// In-memory, per-server-instance cache. Good enough for a single-region
// deploy and a low-volume feature — a repeated or near-duplicate search
// (every keystroke after the debounce settles, or two readers searching
// the same city the same day) shouldn't re-hit Nominatim at all. Not
// persisted across deploys/restarts on purpose: geocoding results don't
// go stale fast enough to need that, and the alternative (a KV store)
// is more infrastructure than a cache this disposable earns.
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const cache = new Map<string, { at: number; result: GeocodeResult | null }>();

type GeocodeResult = {
  label: string;
  lat: number;
  lng: number;
};

type NominatimHit = {
  display_name: string;
  lat: string;
  lon: string;
  // "city" | "town" | "village" | "state" | "country" | ... — used to
  // prefer a real place over a stray POI/building match.
  addresstype?: string;
  importance?: number;
};

function pruneExpired() {
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (now - entry.at > CACHE_TTL_MS) cache.delete(key);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (q.length < 2) {
    return NextResponse.json({ found: false });
  }

  const key = q.toLowerCase();
  pruneExpired();
  const cached = cache.get(key);
  if (cached) {
    return NextResponse.json(
      cached.result ? { found: true, ...cached.result } : { found: false },
    );
  }

  let hits: NominatimHit[];
  try {
    const url = new URL(NOMINATIM_URL);
    url.searchParams.set("q", q);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");

    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, "Accept-Language": "en" },
      // Nominatim has no CDN-friendly cache headers of its own worth
      // trusting; our own in-memory cache above is what actually
      // protects the rate limit.
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Nominatim ${res.status}`);
    hits = await res.json();
  } catch {
    // Geocoding failing (network blip, Nominatim down, rate-limited) is
    // not the same as "no such place" — don't cache a failure as a
    // negative result, so the next request gets a fresh attempt.
    return NextResponse.json({ found: false });
  }

  const best = hits[0];
  const result: GeocodeResult | null = best
    ? {
        label: best.display_name.split(",")[0]?.trim() || best.display_name,
        lat: Number.parseFloat(best.lat),
        lng: Number.parseFloat(best.lon),
      }
    : null;

  cache.set(key, { at: Date.now(), result });

  return NextResponse.json(
    result ? { found: true, ...result } : { found: false },
  );
}
