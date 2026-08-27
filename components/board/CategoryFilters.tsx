"use client";

import { useTranslations } from "next-intl";
import { CATEGORIES, CATEGORY_COLOR_VAR, type Category } from "@/lib/content/categories";

export default function CategoryFilters({
  activeCats,
  onToggle,
  available,
}: {
  activeCats: Set<Category>;
  onToggle: (cat: Category | "all") => void;
  available: Set<Category>;
}) {
  const t = useTranslations("categories");
  const visibleCategories = CATEGORIES.filter((cat) => available.has(cat));

  if (visibleCategories.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={() => onToggle("all")}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.76rem] font-medium transition-colors ${
          activeCats.size === 0
            ? "border-accent bg-surface-2 text-ink"
            : "border-border bg-surface text-muted hover:border-grid-strong"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-accent" />
        {t("all")}
      </button>
      {visibleCategories.map((cat) => {
        const active = activeCats.has(cat);
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onToggle(cat)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.76rem] font-medium transition-colors ${
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
