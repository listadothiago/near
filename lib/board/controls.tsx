"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CATEGORIES, type Category } from "@/lib/content/categories";
import { TAGS, type Tag } from "@/lib/content/tags";

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
 * The controls ARE in the URL, but written with `replaceState`, never
 * `pushState`. The original note here said "deliberately not URL params:
 * typing into the search field would push a history entry per keystroke
 * and wreck the back button, which this session has already had to repair
 * once." That hazard is real and the safeguard is kept — it is specific to
 * `pushState`, which is what creates history entries. `replaceState`
 * creates none, so the back button behaves exactly as it did before this
 * change (see Next's single-page-applications guide in
 * `node_modules/next/dist/docs/`). Query writes are additionally debounced,
 * so a burst of typing settles into one URL write rather than one per
 * keystroke.
 *
 * URL state is what makes a filtered view shareable — operator directive,
 * 2026-09-03: "any location, filtered, sorted etc view should have a share
 * link and share button", his own case being sending a sober-curious
 * filtered board to a friend.
 */

/** Read-only in SSR; the provider hydrates from this after mount. */
function readParams(): { query: string; cats: Set<Category>; tags: Set<Tag> } {
  const empty = { query: "", cats: new Set<Category>(), tags: new Set<Tag>() };
  if (typeof window === "undefined") return empty;
  const sp = new URLSearchParams(window.location.search);
  // Unknown values are dropped rather than trusted — the URL is reader-
  // editable input, and an unrecognised category would filter the board to
  // nothing with no way for them to tell why.
  const cats = new Set(
    (sp.get("cat")?.split(",") ?? []).filter((c): c is Category =>
      (CATEGORIES as readonly string[]).includes(c),
    ),
  );
  const tags = new Set(
    (sp.get("tag")?.split(",") ?? []).filter((t): t is Tag =>
      (TAGS as readonly string[]).includes(t),
    ),
  );
  return { query: sp.get("q") ?? "", cats, tags };
}
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
  // Initial state is empty on both server and client so the first client
  // render matches the server HTML byte for byte; the URL is read in an
  // effect immediately after mount. Seeding from the URL during render
  // would be a hydration mismatch on any shared link.
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState<Set<Category>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<Tag>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const hydratedFromUrl = useRef(false);

  useEffect(() => {
    const { query: q, cats, tags } = readParams();
    if (q) setQuery(q);
    if (cats.size) setActiveCats(cats);
    if (tags.size) setActiveTags(tags);
    // Open the filter panel when a shared link arrives carrying filters,
    // so the reader can see what has been applied rather than wondering
    // why the board looks short.
    if (cats.size || tags.size) setFiltersOpen(true);
    hydratedFromUrl.current = true;
  }, []);

  // Mirror state into the URL. replaceState, never pushState — see the
  // note above. Skipped until the initial URL read has happened, so the
  // first pass can't blank out the very params it is about to load.
  useEffect(() => {
    if (!hydratedFromUrl.current) return;
    const write = () => {
      const sp = new URLSearchParams(window.location.search);
      const set = (key: string, value: string) =>
        value ? sp.set(key, value) : sp.delete(key);
      set("q", query.trim());
      set("cat", [...activeCats].join(","));
      set("tag", [...activeTags].join(","));
      const qs = sp.toString();
      window.history.replaceState(
        null,
        "",
        qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
      );
    };
    // Typing settles into a single write; filter toggles are discrete, but
    // share the debounce harmlessly at this delay.
    const id = setTimeout(write, 300);
    return () => clearTimeout(id);
  }, [query, activeCats, activeTags]);

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
