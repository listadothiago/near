"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * The board's search query, lifted out of the board.
 *
 * The search field lives in the sticky header so it stays reachable
 * however far down the listings you are, but the filtering happens in
 * the board. Those are siblings in the tree, so the query has to live
 * above both. It's one string of UI state — deliberately not a URL
 * param, because typing into it would then push a history entry per
 * keystroke and wreck the back button, which this session has already
 * had to fix once.
 */
const SearchContext = createContext<{
  query: string;
  setQuery: (q: string) => void;
} | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchQuery() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearchQuery must be used inside SearchProvider");
  }
  return ctx;
}
