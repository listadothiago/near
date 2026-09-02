"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

// Infinite scroll for the board, with a footer-reachability escape hatch:
// the original Pagination.tsx warned that an unbounded list means a phone
// reader never reaches the footer. This keeps the retention win (no click
// to see more) but caps automatic loads — after MAX_AUTO_LOADS scroll-
// triggered batches, the sentinel stops auto-loading and becomes a manual
// "Load more" button instead, so the footer is always reachable within a
// bounded number of taps, never an endless scroll.
const MAX_AUTO_LOADS = 3;

export default function InfiniteLoad({
  hasMore,
  autoLoadsUsed,
  onLoadMore,
}: {
  hasMore: boolean;
  autoLoadsUsed: number;
  onLoadMore: () => void;
}) {
  const t = useTranslations("board");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const autoLoadAllowed = autoLoadsUsed < MAX_AUTO_LOADS;

  useEffect(() => {
    if (!hasMore || !autoLoadAllowed) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore();
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, autoLoadAllowed, onLoadMore]);

  if (!hasMore) return null;

  return (
    <div className="mt-5 flex justify-center">
      {autoLoadAllowed ? (
        <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
      ) : (
        <button
          type="button"
          onClick={onLoadMore}
          className="border-[3px] border-ink bg-surface px-4 py-2 font-mono text-[0.72rem] uppercase tracking-wide transition-colors hover:bg-accent hover:text-black"
        >
          {t("loadMore")}
        </button>
      )}
    </div>
  );
}
