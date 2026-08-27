"use client";

import { useTranslations } from "next-intl";
import { CATEGORIES, CATEGORY_COLOR_VAR, type Category } from "@/lib/content/categories";

export default function CategoryFilters({
  activeCats,
  onToggle,
}: {
  activeCats: Set<Category>;
  onToggle: (cat: Category | "all") => void;
}) {
  const t = useTranslations("categories");

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onToggle("all")}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
          activeCats.size === 0
            ? "border-accent bg-surface-2 text-ink"
            : "border-border bg-surface text-muted hover:border-grid-strong"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-accent" />
        {t("all")}
      </button>
      {CATEGORIES.map((cat) => {
        const active = activeCats.has(cat);
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onToggle(cat)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
              active
                ? "border-ink bg-surface-2 text-ink"
                : "border-border bg-surface text-muted hover:border-grid-strong"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: `var(${CATEGORY_COLOR_VAR[cat]})` }}
            />
            {t(cat)}
          </button>
        );
      })}
    </div>
  );
}
