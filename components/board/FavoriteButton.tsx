"use client";

import { useTranslations } from "next-intl";
import { useFavorites } from "@/lib/favorites";

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
