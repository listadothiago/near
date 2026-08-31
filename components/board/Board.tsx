"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import CategoryFilters from "./CategoryFilters";
import TagFilters from "./TagFilters";
import SearchBox from "./SearchBox";
import NearestLatestTabs from "./NearestLatestTabs";
import { parseQuery, normalizeText } from "@/lib/search/parseQuery";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";
import type { Category } from "@/lib/content/categories";
import type { Tag } from "@/lib/content/tags";

const WorldMap = dynamic(() => import("@/components/map/WorldMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[340px] bg-chart-bg" aria-hidden="true" />,
});

export default function Board({
  places,
  eventsByParent,
  promo,
}: {
  places: PlaceSummary[];
  eventsByParent?: Record<string, UpcomingEvent[]>;
  /** House placement rendered inside the card grid — a server component,
      so the page builds it and passes it down as a node. */
  promo?: ReactNode;
}) {
  const t = useTranslations("board");
  const [activeCats, setActiveCats] = useState<Set<Category>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<Tag>>(new Set());
  const [query, setQuery] = useState("");
  // Latest is the initial tab on purpose. Nearest needs geolocation,
  // which takes a permission prompt and a GPS fix — so defaulting to it
  // meant the board rendered empty while the reader waited, or stayed
  // empty forever if they declined. EPIC 1's ARCH-DEFENSE calls for
  // exactly this: fall back immediately, never show a blank list.
  const [tab, setTab] = useState<"nearest" | "latest">("latest");
  // Once the reader picks a tab themselves, stop moving it under them.
  const [tabPinned, setTabPinned] = useState(false);
  // The server always renders Latest (it has no coordinates). If the
  // reader has already granted location permission the position callback
  // can resolve during hydration and flip this to Nearest, which
  // mismatches the server HTML and makes React throw away and re-render
  // the whole board. Pinning the first client render to the server's
  // value removes the race outright; deferring the geolocation call was
  // not sufficient, because concurrent rendering can interleave with it.
  const [hydrated, setHydrated] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locating, setLocating] = useState(false);
  const [focusUserSignal, setFocusUserSignal] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  // The map is a disclosure on small screens only — collapsed by default
  // so the listings start above the fold — and always open from md up,
  // where it occupies its own grid column. Resolved after mount rather
  // than guessed, so the map is never mounted (and Leaflet never loaded)
  // on a phone until it's actually asked for.
  const [isWideViewport, setIsWideViewport] = useState(false);
  const activeFilterCount = activeCats.size + activeTags.size;
  const mapVisible = isWideViewport || mapOpen;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsWideViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function toggleCat(cat: Category | "all") {
    if (cat === "all") {
      setActiveCats(new Set());
      return;
    }
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const availableCats = useMemo(
    () => new Set(places.flatMap((p) => p.meta.categories)),
    [places],
  );
  const availableTags = useMemo(
    () => new Set(places.flatMap((p) => p.meta.tags)),
    [places],
  );

  function toggleTag(tag: Tag) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  const parsed = useMemo(() => parseQuery(query), [query]);

  const filtered = useMemo(() => {
    return places
      .filter(
        (p) =>
          activeCats.size === 0 ||
          p.meta.categories.some((c) => activeCats.has(c)),
      )
      .filter(
        (p) => activeTags.size === 0 || p.meta.tags.some((t) => activeTags.has(t)),
      )
      .filter(
        (p) =>
          parsed.categories.length === 0 ||
          p.meta.categories.some((c) => parsed.categories.includes(c)),
      )
      .filter(
        (p) =>
          parsed.tags.length === 0 ||
          p.meta.tags.some((t) => parsed.tags.includes(t)),
      )
      .filter((p) => {
        if (parsed.freeTextWords.length === 0) return true;
        const haystack = normalizeText(
          [
            p.frontmatter.name,
            p.frontmatter.tagline,
            p.meta.place.neighborhood,
            p.meta.place.city,
            p.meta.place.country,
          ]
            .filter(Boolean)
            .join(" "),
        );
        return parsed.freeTextWords.every((word) => haystack.includes(word));
      });
  }, [places, activeCats, activeTags, parsed]);

  // Named locateMe, not useMyLocation: the `use` prefix made
  // react-hooks/rules-of-hooks treat a plain callback as a hook and error
  // on every call site. It was never a hook.
  function locateMe() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setFocusUserSignal((n) => n + 1);
        setLocating(false);
        // Promote to Nearest now there's something to sort by — but only
        // if the reader hasn't already chosen a tab, since yanking the
        // view out from under someone mid-scroll is worse than showing
        // Latest for a few seconds longer.
        setTab((current) => (tabPinned ? current : "nearest"));
      },
      () => setLocating(false),
      { timeout: 8000 },
    );
  }

  // Proactively prompt for location on load rather than requiring a
  // click first — silently falls back to the all-places view if the
  // browser has no geolocation, or the user declines the permission
  // prompt.
  useEffect(() => {
    // Deferred a tick on purpose. When permission is already granted the
    // position callback can resolve fast enough to flip the tab to
    // Nearest while React is still hydrating, which mismatches the
    // server HTML (rendered as Latest) and forces a client re-render of
    // the whole board. Letting hydration commit first costs nothing
    // perceptible and keeps the tree stable.
    setHydrated(true);
    const id = setTimeout(locateMe, 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <SearchBox value={query} onChange={setQuery} />
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          className="sm:hidden inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide text-ink hover:bg-accent hover:text-black transition-colors"
        >
          {t("filters")}
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] border border-ink bg-accent text-black text-[0.62rem] font-bold px-1">
              {activeFilterCount}
            </span>
          )}
        </button>
        <div className={`${filtersOpen ? "contents" : "hidden"} sm:contents`}>
          <CategoryFilters
            activeCats={activeCats}
            onToggle={toggleCat}
            available={availableCats}
          />
        </div>
      </div>
      <div className={`${filtersOpen ? "block" : "hidden"} sm:block`}>
        <TagFilters
          activeTags={activeTags}
          onToggle={toggleTag}
          available={availableTags}
        />
      </div>

      {/* Listings lead, map is secondary — it sits in the narrower
          column on desktop and collapses behind a disclosure on mobile. */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5 items-start">
        <NearestLatestTabs
          places={filtered}
          tab={hydrated ? tab : "latest"}
          onTabChange={(next) => {
            setTabPinned(true);
            setTab(next);
          }}
          userCoords={userCoords}
          eventsByParent={eventsByParent}
          onlyFavorites={onlyFavorites}
          onOnlyFavoritesChange={setOnlyFavorites}
          promo={promo}
        />

        <section className="border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] overflow-hidden md:sticky md:top-4">
          <div className="flex justify-between items-center gap-2 px-2.5 py-2 border-b-[3px] border-ink">
            {isWideViewport ? (
              <h2 className="text-[0.9rem] m-0">{t("map")}</h2>
            ) : (
              <button
                type="button"
                onClick={() => setMapOpen((o) => !o)}
                aria-expanded={mapOpen}
                className="inline-flex items-center gap-1.5 bg-transparent border-0 p-0 font-display font-bold uppercase tracking-[-0.5px] text-[0.9rem] text-ink"
              >
                {t("map")}
                <span
                  aria-hidden="true"
                  className={`text-[0.7rem] transition-transform ${
                    mapOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
                <span className="sr-only">
                  {mapOpen ? t("hideMap") : t("showMap")}
                </span>
              </button>
            )}
            {/* Always reachable, including while the map is collapsed —
                sorting by distance is a listings feature, not a map
                feature, and hiding this behind the disclosure stranded
                anyone whose geolocation prompt failed or was declined. */}
            <button
              type="button"
              onClick={locateMe}
              disabled={locating}
              className="font-mono text-[0.68rem] uppercase tracking-wide bg-accent text-black border-[2px] border-ink px-1.5 py-0.5 hover:bg-surface hover:text-ink transition-colors disabled:opacity-50"
            >
              {t("useMyLocation")}
            </button>
          </div>
          {mapVisible && (
            <>
              <WorldMap
                points={filtered.map((p) => ({
                  slug: p.meta.slug,
                  lat: p.meta.coordinates.lat,
                  lng: p.meta.coordinates.lng,
                  category: p.meta.categories[0],
                  name: p.frontmatter.shortTitle ?? p.frontmatter.name,
                  tagline: p.frontmatter.tagline,
                  heroImageUrl: p.meta.heroImage?.url ?? null,
                }))}
                userCoords={userCoords}
                focusUserSignal={focusUserSignal}
              />
              <p className="m-0 px-2.5 py-2 border-t-[3px] border-ink text-[0.66rem] text-muted font-mono">
                {t("mapCaption", { count: filtered.length })}
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
