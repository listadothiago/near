"use client";

import { useTranslations } from "next-intl";
import { TAGS, TAG_GLYPH, type Tag } from "@/lib/content/tags";

export default function TagFilters({
  activeTags,
  onToggle,
}: {
  activeTags: Set<Tag>;
  onToggle: (tag: Tag) => void;
}) {
  const t = useTranslations("tags");

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-2">
      <span className="text-[0.72rem] font-mono text-muted uppercase tracking-wide mr-0.5">
        {t("sectionLabel")}
      </span>
      {TAGS.map((tag) => {
        const active = activeTags.has(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.76rem] font-medium transition-colors ${
              active
                ? "border-ink bg-surface-2 text-ink"
                : "border-border bg-surface text-muted hover:border-grid-strong"
            }`}
          >
            <span aria-hidden="true">{TAG_GLYPH[tag]}</span>
            {t(tag)}
          </button>
        );
      })}
    </div>
  );
}
