"use client";

import { useTranslations } from "next-intl";
import { useFavorites } from "@/lib/favorites";
import { nearTrack } from "@/lib/analytics";

// Lives inside the card's <Link>, so it has to stop the click before it
// becomes a navigation. preventDefault alone isn't enough — the anchor
// would still be the event target on some browsers — hence stopPropagation
// as well.
export default function FavoriteButton({ slug }: { slug: string }) {
  const t = useTranslations("board");
  const { has, toggle } = useFavorites();
  const saved = has(slug);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? t("favoriteRemove") : t("favoriteAdd")}
      title={saved ? t("favoriteRemove") : t("favoriteAdd")}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        // RETURN on the funnel: the first thing a reader does that
        // implies they mean to come back. Slug only — no personal data
        // ever goes into an event.
        nearTrack(saved ? "favorite_removed" : "favorite_added", { slug });
      }}
      className={`absolute top-0 right-0 w-7 h-7 flex items-center justify-center border-l-[3px] border-b-[3px] border-ink text-[0.9rem] leading-none transition-colors ${
        saved
          ? "bg-accent text-black"
          : "bg-surface text-muted hover:bg-accent hover:text-black"
      }`}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
    </button>
  );
}
