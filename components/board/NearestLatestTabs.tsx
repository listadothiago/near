"use client";

import { useTranslations } from "next-intl";
import { haversineKm } from "@/lib/geo/haversine";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";
import PlaceCards from "./PlaceCards";

export default function NearestLatestTabs({
  places,
  tab,
  onTabChange,
  userCoords,
  eventsByParent,
}: {
  places: PlaceSummary[];
  tab: "nearest" | "latest";
  onTabChange: (tab: "nearest" | "latest") => void;
  userCoords: { lat: number; lng: number } | null;
  eventsByParent?: Record<string, UpcomingEvent[]>;
}) {
  const t = useTranslations("board");

  const list =
    tab === "latest"
      ? [...places].sort(
          (a, b) =>
            new Date(b.meta.publishedAt).getTime() -
            new Date(a.meta.publishedAt).getTime(),
        )
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

  return (
    <section>
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
      </div>
      <div className="pt-4 min-h-[220px]">
        {tab === "nearest" && !userCoords ? (
          <div className="py-6 font-mono text-muted text-[0.82rem] max-w-[42ch]">
            {places.length
              ? t("emptyNearestNoLocation", { count: places.length })
              : t("emptyNearest")}
          </div>
        ) : list.length === 0 ? (
          <div className="py-6 font-mono text-muted text-[0.82rem] max-w-[42ch]">
            {t(tab === "nearest" ? "emptyNearest" : "emptyLatest")}
          </div>
        ) : (
          <PlaceCards
            places={list}
            distances={tab === "nearest" ? distances : undefined}
            eventsByParent={eventsByParent}
          />
        )}
      </div>
    </section>
  );
}
