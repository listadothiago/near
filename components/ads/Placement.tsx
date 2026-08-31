"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { nearTrack } from "@/lib/analytics";

/**
 * An ad placement, currently filled with internal promo.
 *
 * The point of building these while there's nothing to sell is the
 * reserved space. Retrofitting AdSense into a finished layout is where
 * sites discover they have nowhere sensible to put a 300x250, or that
 * inserting one shifts everything below it and wrecks CLS. Every size
 * here is a real IAB format with a fixed reserved height, so dropping in
 * real inventory later is a swap rather than a redesign.
 *
 * ARCH-DEFENSE (BACKLOG EPIC 1): neo-brutalist styling stays on the
 * WRAPPER. Never put a CSS filter on an ad iframe — it reads as click
 * manipulation and gets AdSense accounts banned. That constraint is also
 * why the site-wide grayscale treatment was removed outright rather than
 * scoped around ads.
 */
export type PlacementSize =
  | "mrec" // 300x250 Medium Rectangle — best-performing in-content unit
  | "leaderboard" // 728x90 desktop
  | "mobile-banner" // 320x100 large mobile banner
  | "half-page"; // 300x600 sidebar

const SIZES: Record<PlacementSize, string> = {
  mrec: "w-[300px] h-[250px]",
  leaderboard: "w-[728px] h-[90px]",
  "mobile-banner": "w-[320px] h-[100px]",
  "half-page": "w-[300px] h-[600px]",
};

/** Same formats as SIZES, as a floor rather than a fixed box. */
const MIN_SIZES: Record<PlacementSize, string> = {
  mrec: "w-full h-full min-h-[250px]",
  leaderboard: "w-full h-full min-h-[90px]",
  "mobile-banner": "w-full h-full min-h-[100px]",
  "half-page": "w-full h-full min-h-[600px]",
};

export default function Placement({
  slot,
  size,
  promoHref,
  promoKicker,
  promoTitle,
  stretch = false,
}: {
  /** Stable analytics name — keep it when real inventory replaces the promo. */
  slot: string;
  size: PlacementSize;
  promoHref: string;
  promoKicker: string;
  promoTitle: string;
  /**
   * Fill the parent instead of sitting at its exact pixel size — for the
   * board grid, where a fixed 300x250 in a flexible column leaves a hole
   * under it. `size` still sets the reserved minimum, so real inventory
   * has the space it needs and CLS behaves.
   */
  stretch?: boolean;
}) {
  const t = useTranslations("ads");
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);

  // Viewability roughly as an ad server counts it: actually on screen,
  // not merely present in the DOM.
  useEffect(() => {
    const el = ref.current;
    if (!el || seen.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !seen.current) {
            seen.current = true;
            nearTrack("placement_view", { slot, size });
            io.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slot, size]);

  return (
    <aside
      ref={ref}
      className={`flex flex-col items-start ${stretch ? "h-full" : ""}`}
    >
      {/* Honest labelling. This is Near's own content today and says so;
          when real inventory lands the label becomes the required ad
          disclosure. Never dress house promo as third-party advertising,
          or the reverse. */}
      <p className="w-full font-mono text-[0.6rem] uppercase tracking-wide text-muted mb-1">
        {t("houseLabel")}
      </p>
      <div
        className={`${stretch ? MIN_SIZES[size] : SIZES[size]} max-w-full border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] overflow-hidden`}
      >
        <Link
          href={promoHref}
          onClick={() => nearTrack("placement_click", { slot, size })}
          className="flex h-full w-full flex-col justify-center gap-1.5 p-3 hover:bg-accent hover:text-black transition-colors"
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-wide">
            {promoKicker}
          </span>
          <span className="font-display font-bold uppercase tracking-[-0.5px] text-[1rem] leading-[1.1]">
            {promoTitle}
          </span>
          <span className="font-mono text-[0.62rem] underline underline-offset-2">
            {t("readOn")}
          </span>
        </Link>
      </div>
    </aside>
  );
}
