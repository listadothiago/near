"use client";

import { useSyncExternalStore } from "react";

/**
 * One shared geolocation request for the whole page, however many
 * PlaceCards happen to be rendering (BACKLOG P1.3: distance should be
 * its own badge in every view — board, collection, related places,
 * author pages, location hubs — not just the board's Nearest tab).
 *
 * Without this, every card independently calling
 * `navigator.geolocation.getCurrentPosition` would fire dozens of
 * redundant requests on one page. Module-level cache + subscriber
 * pattern (same shape as lib/favorites.ts's external store) means the
 * first mounted consumer triggers the one real request and every other
 * consumer just reads the shared result.
 *
 * Silent by design, same as the board's own locateMe and the article
 * page's DistanceBadge: no permission-prompt UI, no error state. A
 * declined or unavailable geolocation just means no card ever gets a
 * distance badge — degrade to nothing, never show a broken stat.
 */

type Coords = { lat: number; lng: number } | null;

let coords: Coords = null;
let requested = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function ensureRequested() {
  if (requested) return;
  requested = true;
  if (typeof navigator === "undefined" || !navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      emit();
    },
    () => {
      // Declined or unavailable — coords stays null, nothing to emit.
    },
    { timeout: 8000 },
  );
}

function subscribe(cb: () => void) {
  ensureRequested();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const getSnapshot = () => coords;
// Server and first client render both see null — the geolocation API
// doesn't exist on the server, so this can never be anything else.
const getServerSnapshot = () => null;

export function useUserCoords(): Coords {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
