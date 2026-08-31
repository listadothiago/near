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

/**
 * Type scale per format, because a 300x250 and a 728x90 are not the same
 * poster at different zoom levels — one is a page, the other is a strip.
 *
 * The jump between steps is deliberately large. A house unit whose
 * kicker, headline and teaser are all roughly the same size reads as a
 * form field and gets skipped; a hard contrast between a tiny mono
 * kicker and a headline that nearly fills the box is what makes the eye
 * stop. `line-clamp` keeps a long title from breaking the reserved box —
 * the format's dimensions are fixed and the copy is not.
 */
const TYPE: Record<
  PlacementSize,
  { kicker: string; title: string; teaser: string; cta: string }
> = {
  mrec: {
    kicker: "text-[0.6rem]",
    title: "text-[1.7rem] leading-[0.95] line-clamp-3 text-balance",
    teaser: "text-[0.78rem] leading-snug line-clamp-2",
    cta: "text-[0.66rem]",
  },
  "half-page": {
    kicker: "text-[0.68rem]",
    title: "text-[2.6rem] leading-[0.92] line-clamp-5 text-balance",
    teaser: "text-[0.95rem] leading-snug line-clamp-6",
    cta: "text-[0.78rem]",
  },
  leaderboard: {
    kicker: "text-[0.6rem]",
    title: "text-[1.5rem] leading-[1] line-clamp-2 max-w-[24ch]",
    teaser: "text-[0.8rem] leading-snug line-clamp-2 hidden lg:block min-w-0",
    cta: "text-[0.7rem]",
  },
  "mobile-banner": {
    kicker: "text-[0.55rem]",
    title: "text-[1.05rem] leading-[1] line-clamp-2",
    teaser: "hidden",
    cta: "text-[0.62rem]",
  },
};

/** Wide, short formats lay the same parts out on one line. */
const HORIZONTAL: PlacementSize[] = ["leaderboard", "mobile-banner"];

export default function Placement({
  slot,
  size,
  promoHref,
  promoKicker,
  promoTitle,
  promoTeaser,
  stretch = false,
}: {
  /** Stable analytics name — keep it when real inventory replaces the promo. */
  slot: string;
  size: PlacementSize;
  promoHref: string;
  promoKicker: string;
  promoTitle: string;
  /** The article's own dek or tagline. Never ad copy written to sell it. */
  promoTeaser?: string;
  /**
   * Fill the parent instead of sitting at its exact pixel size — for the
   * board grid, where a fixed 300x250 in a flexible column leaves a hole
   * under it. `size` still sets the reserved minimum, so real inventory
   * has the space it needs and CLS behaves.
   */
  stretch?: boolean;
}) {
  const t = useTranslations("ads");
  const type = TYPE[size];
  const horizontal = HORIZONTAL.includes(size);
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
          className={`group/ad relative flex h-full w-full hover:bg-accent hover:text-black transition-colors ${
            horizontal
              ? "flex-row items-center gap-3 px-3 py-2"
              : "flex-col gap-2 p-3"
          }`}
        >
          {/* An oversized quote mark bleeding off the corner. A house unit
              that looks like a form field gets ignored; this is the one
              cheap piece of ornament that says "someone made this". */}
          {!horizontal && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-3 -right-1 font-display font-bold leading-none text-ink/[0.07] group-hover/ad:text-black/10 text-[7rem] select-none"
            >
              &rdquo;
            </span>
          )}

          <span
            className={`font-mono uppercase tracking-wide ${type.kicker} ${
              horizontal ? "flex-none" : ""
            }`}
          >
            {promoKicker}
          </span>

          <span
            className={`font-display font-bold uppercase tracking-[-1px] ${type.title} ${
              horizontal ? "flex-none" : ""
            }`}
          >
            {promoTitle}
          </span>

          {/* The teaser is the article's own dek or tagline — never a
              line written to sell it. A house ad that overpromises is
              still a broken promise when the reader arrives. */}
          {promoTeaser && (
            <span className={`italic text-muted group-hover/ad:text-black/70 ${type.teaser}`}>
              {promoTeaser}
            </span>
          )}

          <span
            className={`font-mono uppercase tracking-wide underline underline-offset-4 decoration-2 ${type.cta} ${
              horizontal ? "ml-auto flex-none" : "mt-auto"
            }`}
          >
            {t("readOn")}
          </span>
        </Link>
      </div>
    </aside>
  );
}
