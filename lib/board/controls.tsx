"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Category } from "@/lib/content/categories";
import type { Tag } from "@/lib/content/tags";

/**
 * The board's controls — query, category and tag filters, and whether
 * the filter panel is open.
 *
 * All of it lives above both the header and the board because the
 * controls are in the sticky header and the filtering happens in the
 * board, and those two are siblings in the tree. Keeping the state here
 * rather than in either component is what lets the header stay sticky
 * without the board losing track of what it's filtering by.
 *
 * Deliberately not URL params: typing into the search field would push a
 * history entry per keystroke and wreck the back button, which this
 * session has already had to repair once.
 */
type Controls = {
  query: string;
  setQuery: (q: string) => void;
  activeCats: Set<Category>;
  toggleCat: (cat: Category | "all") => void;
  activeTags: Set<Tag>;
  toggleTag: (tag: Tag) => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  activeFilterCount: number;
};

const BoardControlsContext = createContext<Controls | null>(null);

export function BoardControlsProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState<Set<Category>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<Tag>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);

  const value = useMemo<Controls>(
    () => ({
      query,
      setQuery,
      activeCats,
      toggleCat(cat) {
        if (cat === "all") {
          setActiveCats(new Set());
          return;
        }
        setActiveCats((prev) => {
          const next = new Set(prev);
          if (next.has(cat)) next.delete(cat);
          else next.add(cat);
          return next;
        });
      },
      activeTags,
      toggleTag(tag) {
        setActiveTags((prev) => {
          const next = new Set(prev);
          if (next.has(tag)) next.delete(tag);
          else next.add(tag);
          return next;
        });
      },
      filtersOpen,
      setFiltersOpen,
      activeFilterCount: activeCats.size + activeTags.size,
    }),
    [query, activeCats, activeTags, filtersOpen],
  );

  return (
    <BoardControlsContext.Provider value={value}>
      {children}
    </BoardControlsContext.Provider>
  );
}

export function useBoardControls() {
  const ctx = useContext(BoardControlsContext);
  if (!ctx) {
    throw new Error("useBoardControls must be used inside BoardControlsProvider");
  }
  return ctx;
}
