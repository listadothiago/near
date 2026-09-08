"use client";

import { useTranslations } from "next-intl";
import { useFavorites } from "@/lib/favorites";
import { nearTrack } from "@/lib/analytics";

// The board's FavoriteButton (components/board/FavoriteButton.tsx) is
// absolutely positioned inside a card corner — wrong shape for a standalone
// control next to ShareButton at the top of an article. Same hook, same
// event contract (FavoriteToast, mounted once in app/[locale]/layout.tsx,
// listens for "near:favorite-added" regardless of which button fired it),
// just styled inline to match ShareButton. BACKLOG P1.8.
export default function PlaceFavoriteButton({ slug }: { slug: string }) {
  const t = useTranslations("board");
  const { has, toggle } = useFavorites();
  const saved = has(slug);

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => {
        toggle(slug);
        nearTrack(saved ? "favorite_removed" : "favorite_added", { slug });
        if (!saved) {
          window.dispatchEvent(new Event("near:favorite-added"));
        }
      }}
      className={`inline-flex items-center gap-1.5 border-[3px] border-ink px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide transition-colors ${
        saved
          ? "bg-accent text-black"
          : "bg-surface hover:bg-accent hover:text-black"
      }`}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      {saved ? t("favoriteRemove") : t("favoriteAdd")}
    </button>
  );
}
