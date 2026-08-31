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
        className={`inline-flex items-center gap-1.5 border-[2px] border-ink px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-wide transition-colors ${
          activeCats.size === 0
            ? "bg-accent text-black"
            : "bg-surface text-muted hover:bg-surface-2"
        }`}
      >
        <span className="w-2 h-2 bg-accent border border-ink" />
        {t("all")}
      </button>
      {visibleCategories.map((cat) => {
        const active = activeCats.has(cat);
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onToggle(cat)}
            className={`inline-flex items-center gap-1.5 border-[2px] border-ink px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-wide transition-colors ${
              active
                ? "bg-accent text-black"
                : "bg-surface text-muted hover:bg-surface-2"
            }`}
          >
            <span
              className="w-2 h-2 border border-ink"
              style={{ background: `var(${CATEGORY_COLOR_VAR[cat]})` }}
            />
            {t(cat)}
          </button>
        );
      })}
    </div>
  );
}
