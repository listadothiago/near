"use client";

import { useTranslations } from "next-intl";
import { TAGS, TAG_GLYPH, type Tag } from "@/lib/content/tags";

export default function TagFilters({
  activeTags,
  onToggle,
  available,
}: {
  activeTags: Set<Tag>;
  onToggle: (tag: Tag) => void;
  available: Set<Tag>;
}) {
  const t = useTranslations("tags");
  const visibleTags = TAGS.filter((tag) => available.has(tag));

  if (visibleTags.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <span className="text-[0.68rem] font-mono text-muted uppercase tracking-wide mr-0.5">
        {t("sectionLabel")}
      </span>
      {visibleTags.map((tag) => {
        const active = activeTags.has(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={`inline-flex items-center gap-1 border-[2px] border-ink px-1.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-wide transition-colors ${
              active
                ? "bg-accent text-black"
                : "bg-surface text-muted hover:bg-surface-2"
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
