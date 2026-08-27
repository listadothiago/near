"use client";

import { useTranslations } from "next-intl";
import { haversineKm } from "@/lib/geo/haversine";
import type { PlaceSummary } from "@/lib/content/schema";
import PlaceRow from "./PlaceRow";

export default function NearestLatestTabs({
  places,
  tab,
  onTabChange,
  userCoords,
}: {
  places: PlaceSummary[];
  tab: "nearest" | "latest";
  onTabChange: (tab: "nearest" | "latest") => void;
  userCoords: { lat: number; lng: number } | null;
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

  return (
    <section className="bg-surface border border-border rounded-[14px] shadow-[0_1px_2px_rgba(32,38,42,.05),0_10px_28px_rgba(32,38,42,.05)] overflow-hidden">
      <div className="flex gap-3.5 px-4 pt-3.5" role="tablist">
        {(["nearest", "latest"] as const).map((id) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => onTabChange(id)}
            className={`text-[0.86rem] font-semibold pb-2.5 border-b-2 transition-colors ${
              tab === id
                ? "text-ink border-accent"
                : "text-muted border-transparent"
            }`}
          >
            {t(id)}
          </button>
        ))}
      </div>
      <div className="px-4 pb-4 pt-1.5 min-h-[220px]">
        {tab === "nearest" && !userCoords ? (
          <div className="py-6 text-muted text-[0.88rem] max-w-[38ch]">
            {places.length
              ? t("emptyNearestNoLocation", { count: places.length })
              : t("emptyNearest")}
          </div>
        ) : list.length === 0 ? (
          <div className="py-6 text-muted text-[0.88rem] max-w-[38ch]">
            {t(tab === "nearest" ? "emptyNearest" : "emptyLatest")}
          </div>
        ) : (
          list.map((place) => (
            <PlaceRow
              key={place.meta.slug}
              place={place}
              distanceKm={
                tab === "nearest" && userCoords
                  ? haversineKm(
                      userCoords.lat,
                      userCoords.lng,
                      place.meta.coordinates.lat,
                      place.meta.coordinates.lng,
                    )
                  : undefined
              }
            />
          ))
        )}
      </div>
    </section>
  );
}
