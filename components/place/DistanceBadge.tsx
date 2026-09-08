"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { haversineKm } from "@/lib/geo/haversine";

/**
 * Distance the way a person would say it — same formatting as the board
 * card's badge (components/board/PlaceCard.tsx), kept in sync manually
 * since there's no shared util file for it yet.
 */
function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

/**
 * The article-page half of BACKLOG P1.3/P1.8's "distance and recency
 * should be their own badges everywhere" — the board already computes
 * one shared `userCoords` for the whole grid, but a single place page
 * has no board state to read from, so this requests geolocation itself.
 *
 * Silent by design: no permission-prompt UI, no error state shown to the
 * reader. A declined or unavailable geolocation just means the badge
 * never renders — same "degrade to nothing, never show a broken stat"
 * rule the board's own locateMe follows. Never server-rendered (there's
 * no `now` and no `userCoords` on the server), which is also the
 * correct default for a crawler: a distance is inherently reader-
 * relative and would be actively misleading baked into static HTML.
 */
export default function DistanceBadge({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const tp = useTranslations("place");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDistanceKm(
          haversineKm(pos.coords.latitude, pos.coords.longitude, lat, lng),
        );
      },
      () => {
        // Declined or unavailable — badge just never appears.
      },
      { timeout: 8000 },
    );
  }, [lat, lng]);

  if (distanceKm === null) return null;

  return (
    <span className="inline-flex items-center border-[2px] border-ink bg-accent px-2 py-0.5 font-black text-black">
      {formatDistance(distanceKm)} {tp("away")}
    </span>
  );
}
