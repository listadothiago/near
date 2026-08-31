"use client";

import { useTranslations } from "next-intl";

// The board is paginated rather than infinite-scrolled on purpose: the
// footer carries real navigation, and an unbounded list means a reader on
// a phone never reaches it.
export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const t = useTranslations("board");
  if (totalPages <= 1) return null;

  const btn =
    "border-[3px] border-ink px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav className="mt-5 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`${btn} bg-surface enabled:hover:bg-accent enabled:hover:text-black`}
      >
        ← {t("prev")}
      </button>

      <div className="flex flex-wrap gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={`${btn} ${
              n === page
                ? "bg-accent text-black font-bold"
                : "bg-surface hover:bg-surface-2"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={`${btn} bg-surface enabled:hover:bg-accent enabled:hover:text-black`}
      >
        {t("next")} →
      </button>

      <span className="font-mono text-[0.68rem] text-muted ml-auto">
        {t("pageOf", { page, total: totalPages })}
      </span>
    </nav>
  );
}
