"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import CategoryFilters from "./CategoryFilters";
import TagFilters from "./TagFilters";
import SearchBox from "./SearchBox";
import NearestLatestTabs from "./NearestLatestTabs";
import { parseQuery, normalizeText } from "@/lib/search/parseQuery";
import type { PlaceSummary } from "@/lib/content/schema";
import type { Category } from "@/lib/content/categories";
import type { Tag } from "@/lib/content/tags";

const WorldMap = dynamic(() => import("@/components/map/WorldMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[340px] bg-chart-bg" aria-hidden="true" />,
});

export default function Board({ places }: { places: PlaceSummary[] }) {
  const t = useTranslations("board");
  const [activeCats, setActiveCats] = useState<Set<Category>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<Tag>>(new Set());
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"nearest" | "latest">("nearest");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locating, setLocating] = useState(false);
  const [focusUserSignal, setFocusUserSignal] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount = activeCats.size + activeTags.size;

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

  function useMyLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setFocusUserSignal((n) => n + 1);
        setLocating(false);
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
    useMyLocation();
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
          className="sm:hidden inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[0.78rem] font-semibold text-ink hover:border-accent transition-colors"
        >
          {t("filters")}
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] rounded-full bg-accent text-surface text-[0.66rem] font-bold px-1">
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

      <div className="mt-4 grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-4 items-start">
        <section className="bg-surface border border-border rounded-[14px] shadow-[0_1px_2px_rgba(32,38,42,.05),0_10px_28px_rgba(32,38,42,.05)] overflow-hidden">
          <div className="flex justify-between items-center px-4 pt-3.5 pb-2.5">
            <h2 className="font-serif font-medium text-[1.05rem] m-0">
              {t("map")}
            </h2>
            <button
              type="button"
              onClick={useMyLocation}
              disabled={locating}
              className="text-[0.78rem] font-semibold bg-transparent border border-border text-ink px-2.5 py-1.5 rounded-lg hover:border-accent hover:text-accent-ink transition-colors disabled:opacity-50"
            >
              {t("useMyLocation")}
            </button>
          </div>
          <WorldMap
            points={filtered.map((p) => ({
              slug: p.meta.slug,
              lat: p.meta.coordinates.lat,
              lng: p.meta.coordinates.lng,
              category: p.meta.categories[0],
              name: p.frontmatter.name,
              tagline: p.frontmatter.tagline,
              heroImageUrl: p.meta.heroImage?.url ?? null,
            }))}
            userCoords={userCoords}
            focusUserSignal={focusUserSignal}
          />
          <p className="m-0 px-4 pt-2.5 pb-3.5 text-[0.76rem] text-muted font-mono">
            {t("mapCaption", { count: filtered.length })}
          </p>
        </section>

        <NearestLatestTabs
          places={filtered}
          tab={tab}
          onTabChange={setTab}
          userCoords={userCoords}
        />
      </div>
    </div>
  );
}
