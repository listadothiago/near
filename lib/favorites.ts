"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useUser } from "@clerk/nextjs";

const KEY = "near-favorites";

// Local-first per BACKLOG EPIC 6, extended 2026-09-01 for Google
// Sign-In: signed-out visitors keep the original localStorage-only
// behaviour untouched. Signed-in users get their list stored on their
// Clerk account (`unsafeMetadata.favorites`) instead, so it follows them
// across devices. No separate database — Clerk's per-user metadata is
// enough storage for a plain list of slugs, and it means one less piece
// of infrastructure to run for a single-operator project.
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

function write(next: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Same degraded-but-alive path as read().
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

function readMetadataFavorites(metadata: unknown): string[] {
  const raw = (metadata as { favorites?: unknown } | null | undefined)?.favorites;
  return Array.isArray(raw) ? raw.filter((s): s is string => typeof s === "string") : [];
}

export function useFavorites() {
  const { user, isLoaded } = useUser();
  const localSlugs = useSyncExternalStore(subscribe, () => snapshot, getServerSnapshot);
  const migrated = useRef(false);

  // One-time merge on sign-in: whatever was starred locally before this
  // person had an account gets folded into their account instead of
  // silently dropped. Runs once per session per signed-in user, not on
  // every render.
  useEffect(() => {
    if (!isLoaded || !user || migrated.current) return;
    migrated.current = true;
    const local = read();
    if (local.length === 0) return;
    const remote = readMetadataFavorites(user.unsafeMetadata);
    const merged = Array.from(new Set([...remote, ...local]));
    if (merged.length === remote.length) return;
    user
      .update({ unsafeMetadata: { ...user.unsafeMetadata, favorites: merged } })
      .then(() => write([])) // local list is now redundant with the account
      .catch(() => {
        // If the merge write fails, keep the local copy rather than lose it.
      });
  }, [isLoaded, user]);

  const remoteSlugs = user ? readMetadataFavorites(user.unsafeMetadata) : null;
  const slugs = remoteSlugs ?? localSlugs;

  const toggle = useCallback(
    (slug: string) => {
      if (user) {
        const current = readMetadataFavorites(user.unsafeMetadata);
        const i = current.indexOf(slug);
        const next =
          i === -1 ? [...current, slug] : current.filter((s) => s !== slug);
        user.update({ unsafeMetadata: { ...user.unsafeMetadata, favorites: next } });
        return;
      }
      const next = read();
      const i = next.indexOf(slug);
      if (i === -1) next.push(slug);
      else next.splice(i, 1);
      write(next);
      emit();
    },
    [user],
  );

  return { slugs, toggle, has: (slug: string) => slugs.includes(slug) };
}
