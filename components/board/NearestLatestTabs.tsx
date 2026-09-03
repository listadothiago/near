"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { haversineKm } from "@/lib/geo/haversine";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";
import PlaceCards from "./PlaceCards";
import InfiniteLoad from "./InfiniteLoad";
import { useFavorites } from "@/lib/favorites";

// Loaded in batches via scroll (InfiniteLoad caps automatic loads and
// falls back to a manual "Load more" button so the footer stays
// reachable — see InfiniteLoad.tsx for the reasoning).
const PAGE_SIZE = 12;

export default function NearestLatestTabs({
  places,
  tab,
  onTabChange,
  userCoords,
  eventsByParent,
  onlyFavorites,
  onOnlyFavoritesChange,
  promo,
}: {
  places: PlaceSummary[];
  tab: "nearest" | "latest";
  onTabChange: (tab: "nearest" | "latest") => void;
  userCoords: { lat: number; lng: number } | null;
  eventsByParent?: Record<string, UpcomingEvent[]>;
  onlyFavorites: boolean;
  onOnlyFavoritesChange: (v: boolean) => void;
  promo?: ReactNode;
}) {
  const { slugs: favorites } = useFavorites();
  const t = useTranslations("board");

  const list =
    tab === "latest"
      ? // Ties are the normal case, not the edge case: a batch published in
        // one session can share a publishedAt to the second, and pieces
        // written before the midnight-timestamp gate existed share
        // T00:00:00Z exactly. Array.prototype.sort is stable, so an
        // untied-broken tie silently falls back to the order places arrived
        // in — alphabetical by slug — which buried four same-day Sitges pins
        // mid-board behind a "1234-" and a "casino-". Fall through to
        // updatedAt so a genuinely-newer edit surfaces, then to slug so the
        // order is at least deterministic and testable.
        [...places].sort((a, b) => {
          const byPublished =
            new Date(b.meta.publishedAt).getTime() -
            new Date(a.meta.publishedAt).getTime();
          if (byPublished !== 0) return byPublished;

          const byUpdated =
            new Date(b.meta.updatedAt ?? b.meta.publishedAt).getTime() -
            new Date(a.meta.updatedAt ?? a.meta.publishedAt).getTime();
          if (byUpdated !== 0) return byUpdated;

          return a.meta.slug.localeCompare(b.meta.slug);
        })
      : userCoords
        ? [...places].sort(
            (a, b) =>
              haversineKm(
                userCoords.lat,
                userCoords.lng,
                a.meta.coordinates.lat,
                a.meta.coordinates.lng,
              ) -
              haversineKm(
                userCoords.lat,
                userCoords.lng,
                b.meta.coordinates.lat,
                b.meta.coordinates.lng,
              ),
          )
        : [];

  const distances = userCoords
    ? new Map(
        list.map((p) => [
          p.meta.slug,
          haversineKm(
            userCoords.lat,
            userCoords.lng,
            p.meta.coordinates.lat,
            p.meta.coordinates.lng,
          ),
        ]),
      )
    : undefined;

  // Favourites is a *scope*, not a sort — applied after the Nearest /
  // Latest ordering so your saved list stays sortable, which is exactly
  // where sorting matters most once the list gets long.
  const scoped = onlyFavorites
    ? list.filter((p) => favorites.includes(p.meta.slug))
    : list;

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [autoLoadsUsed, setAutoLoadsUsed] = useState(0);

  // Filtering, searching or switching tabs can leave the reader stranded
  // mid-list with a stale visible count. Reset during render rather than
  // in an effect — React's documented way to adjust state when inputs
  // change, and it avoids the extra render pass an effect would cost.
  const listKey = useMemo(
    () => `${tab}:${onlyFavorites}:${scoped.map((p) => p.meta.slug).join(",")}`,
    [tab, onlyFavorites, scoped],
  );
  const [seenKey, setSeenKey] = useState(listKey);
  if (seenKey !== listKey) {
    setSeenKey(listKey);
    setVisibleCount(PAGE_SIZE);
    setAutoLoadsUsed(0);
  }

  const safeVisibleCount = Math.min(visibleCount, scoped.length);
  const pageItems = scoped.slice(0, safeVisibleCount);
  const hasMore = safeVisibleCount < scoped.length;

  const handleLoadMore = () => {
    setVisibleCount((v) => v + PAGE_SIZE);
    setAutoLoadsUsed((n) => n + 1);
  };

  return (
    // min-w-0 is load-bearing, not cosmetic. This section is the `1fr`
    // column of the board's `md:grid-cols-[1fr_300px]` grid, and a grid
    // item's default `min-width: auto` means `1fr` cannot shrink below the
    // card grid's min-content width (~572px). Between the md breakpoint
    // (768px) and ~910px that pushed `1fr + 300px` past the container and
    // spilled the map/promo rail off the right edge — up to 158px of
    // horizontal overflow at exactly 768px. Removing this reintroduces it.
    <section className="min-w-0">
      <div className="flex gap-0 border-b-[3px] border-ink" role="tablist">
        {(["nearest", "latest"] as const).map((id) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => onTabChange(id)}
            className={`font-display font-bold uppercase tracking-[-0.5px] text-[0.9rem] px-3 py-1.5 border-[3px] border-b-0 border-ink -mb-[3px] transition-colors ${
              tab === id
                ? "bg-accent text-black"
                : "bg-surface text-muted hover:text-ink"
            }`}
          >
            {t(id)}
          </button>
        ))}

        {favorites.length > 0 && (
          <button
            type="button"
            aria-pressed={onlyFavorites}
            onClick={() => onOnlyFavoritesChange(!onlyFavorites)}
            className={`ml-auto self-end mb-[3px] inline-flex items-center gap-1.5 border-[3px] border-ink px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide transition-colors ${
              onlyFavorites
                ? "bg-accent text-black"
                : "bg-surface text-muted hover:text-ink"
            }`}
          >
            <span aria-hidden="true">{onlyFavorites ? "\u2605" : "\u2606"}</span>
            {t("favorites")}
            <span className="opacity-70">{favorites.length}</span>
          </button>
        )}
      </div>
      <div className="pt-4 min-h-[220px]">
        {tab === "nearest" && !userCoords ? (
          <div className="py-6 font-mono text-muted text-[0.82rem] max-w-[42ch]">
            {places.length
              ? t("emptyNearestNoLocation", { count: places.length })
              : t("emptyNearest")}
          </div>
        ) : onlyFavorites && scoped.length === 0 ? (
          <div className="py-6 font-mono text-muted text-[0.82rem] max-w-[42ch]">
            {t("emptyFavorites")}
          </div>
        ) : scoped.length === 0 ? (
          <div className="py-6 font-mono text-muted text-[0.82rem] max-w-[42ch]">
            {t(tab === "nearest" ? "emptyNearest" : "emptyLatest")}
          </div>
        ) : (
          <>
          <PlaceCards
            places={pageItems}
            distances={tab === "nearest" ? distances : undefined}
            eventsByParent={eventsByParent}
            tab={tab}
            promo={promo}
          />
          <InfiniteLoad
            hasMore={hasMore}
            autoLoadsUsed={autoLoadsUsed}
            onLoadMore={handleLoadMore}
          />
          </>
        )}
      </div>
    </section>
  );
}
