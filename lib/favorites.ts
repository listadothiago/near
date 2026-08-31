"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "near-favorites";

// Local-first per BACKLOG EPIC 6: no accounts, no backend, no cost. The
// tradeoff is that clearing site data loses the list, which is what the
// planned export/import UI is for.
function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    // Private-mode Safari and embedded webviews (Instagram, TikTok) can
    // throw on localStorage access. Favourites degrade to "none" rather
    // than taking the board down with them.
    return [];
  }
}

const listeners = new Set<() => void>();
// useSyncExternalStore compares snapshots by reference, so a fresh array
// on every read would loop forever. Cache until something actually changes.
let snapshot: string[] = [];
let hydrated = false;

function emit() {
  snapshot = read();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  if (!hydrated) {
    hydrated = true;
    snapshot = read();
  }
  listeners.add(cb);
  // Keeps two open tabs in agreement.
  window.addEventListener("storage", emit);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) window.removeEventListener("storage", emit);
  };
}

const EMPTY: string[] = [];
// Server and first client render both see []. Anything else is a
// hydration mismatch, since the server can't know what's in localStorage.
const getServerSnapshot = () => EMPTY;

export function useFavorites() {
  const slugs = useSyncExternalStore(subscribe, () => snapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const next = read();
    const i = next.indexOf(slug);
    if (i === -1) next.push(slug);
    else next.splice(i, 1);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // Same degraded-but-alive path as read().
    }
    emit();
  }, []);

  return { slugs, toggle, has: (slug: string) => slugs.includes(slug) };
}
