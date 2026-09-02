"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import NearestLatestTabs from "./NearestLatestTabs";
import { parseQuery, normalizeText } from "@/lib/search/parseQuery";
import {
  buildLocationIndex,
  matchLocation,
  stripLocationWords,
} from "@/lib/search/locations";
import { useBoardControls } from "@/lib/board/controls";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";

const WorldMap = dynamic(() => import("@/components/map/WorldMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[340px] bg-chart-bg" aria-hidden="true" />,
});

export default function Board({
  places,
  eventsByParent,
  promo,
  mapPromo,
}: {
  places: PlaceSummary[];
  eventsByParent?: Record<string, UpcomingEvent[]>;
  /** House placement rendered inside the card grid — a server component,
      so the page builds it and passes it down as a node. */
  promo?: ReactNode;
  /** Second placement, rendered below the map sidebar. Desktop-only —
      the mobile map sits inline in the scroll and doesn't have the
      spare real estate a sticky desktop sidebar does. */
  mapPromo?: ReactNode;
}) {
  const t = useTranslations("board");
  // Search and filters live in the sticky header now, so their state
  // sits above both components. The board only reads them.
  const { query, activeCats, activeTags } = useBoardControls();
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
  const [mapOpen, setMapOpen] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  // The map is a disclosure on small screens only — collapsed by default
  // so the listings start above the fold — and always open from md up,
  // where it occupies its own grid column. Resolved after mount rather
  // than guessed, so the map is never mounted (and Leaflet never loaded)
  // on a phone until it's actually asked for.
  const [isWideViewport, setIsWideViewport] = useState(false);
  const mapVisible = isWideViewport || mapOpen;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsWideViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);


  const parsed = useMemo(() => parseQuery(query), [query]);

  // Location SRP: if the query names a place Near actually covers — a
  // neighbourhood, city, region or country, in any of the site's
  // languages — the board scopes to it and says so in a heading, instead
  // of leaving the reader to guess whether the substring match worked.
  const locationIndex = useMemo(() => buildLocationIndex(places), [places]);
  const location = useMemo(
    () => (query.trim() ? matchLocation(locationIndex, query) : null),
    [locationIndex, query],
  );

  const filtered = useMemo(() => {
    // Words spent on the location shouldn't also have to appear in every
    // result's text — "bares em londres" scopes to London and then
    // applies "bares" as a category term, not as a substring.
    const textWords = location
      ? stripLocationWords(parsed.freeTextWords, location)
      : parsed.freeTextWords;

    return places
      .filter((p) => !location || location.slugs.has(p.meta.slug))
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
        if (textWords.length === 0) return true;
        const haystack = normalizeText(
          [
            p.frontmatter.name,
            p.frontmatter.tagline,
            p.meta.place.neighborhood,
            p.meta.place.city,
            p.meta.place.region,
            p.meta.place.country,
          ]
            .filter(Boolean)
            .join(" "),
        );
        return textWords.every((word) => haystack.includes(word));
      });
  }, [places, activeCats, activeTags, parsed, location]);

  // The browser tab should say where you are too — restored on clear.
  useEffect(() => {
    if (!location) return;
    const original = document.title;
    document.title = `${location.label} · near.tips`;
    return () => {
      document.title = original;
    };
  }, [location]);

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
      {/* Listings lead, map is secondary — it sits in the narrower
          column on desktop and collapses behind a disclosure on mobile. */}
      {location && (
        <div className="mt-5 border-[3px] border-ink bg-accent text-black px-3 py-2 shadow-[var(--shadow-sm)]">
          <h2 className="m-0 font-display font-bold uppercase tracking-[-1px] text-[1.4rem] leading-none">
            {location.label}
          </h2>
          <p className="m-0 mt-1 font-mono text-[0.68rem] uppercase tracking-wide">
            {t("locationScope", { count: filtered.length })}
          </p>
        </div>
      )}

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

        {/* relative z-0 forces a stacking context at every breakpoint, so
            Leaflet's internal z-index ~1000 panes stay inside this box
            instead of painting over the sticky header on phones (where the
            section isn't sticky and previously created no context). */}
        {/* max-h + overflow-y-auto on desktop only: the sticky box's own
            height (map + caption + promo) can exceed the viewport, and a
            sticky element can't be scrolled past — anything below the fold
            (the ad under the map) was permanently unreachable. Mobile keeps
            plain overflow-hidden since it isn't sticky there; the page
            itself scrolls past it instead. */}
        <section className="relative z-0 border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] overflow-hidden md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] md:overflow-y-auto md:overflow-x-hidden">
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
                locationKey={location ? `${location.level}:${location.label}` : null}
              />
              <p className="m-0 px-2.5 py-2 border-t-[3px] border-ink text-[0.66rem] text-muted font-mono">
                {t("mapCaption", { count: filtered.length })}
              </p>
            </>
          )}
          {mapPromo && (
            <div className="hidden md:block border-t-[3px] border-ink p-2.5">
              {mapPromo}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
