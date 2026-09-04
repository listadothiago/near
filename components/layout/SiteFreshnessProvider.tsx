"use client";

import { createContext, useContext } from "react";
import type { SiteFreshness } from "@/lib/content/freshness";

/**
 * Header is a client component rendered by each page individually (there
 * are fifteen call sites), while the freshness stamp can only be computed
 * on the server off the content tree. Threading a prop through all
 * fifteen would mean every future page has to remember to pass it, and
 * would silently render a header with no stamp when one forgets.
 * Computing it once in the locale layout and handing it down through
 * context makes the stamp a property of the site rather than of whichever
 * page happens to be rendering.
 */
const SiteFreshnessContext = createContext<SiteFreshness | null>(null);

export function SiteFreshnessProvider({
  value,
  children,
}: {
  value: SiteFreshness | null;
  children: React.ReactNode;
}) {
  return (
    <SiteFreshnessContext.Provider value={value}>
      {children}
    </SiteFreshnessContext.Provider>
  );
}

export function useSiteFreshness(): SiteFreshness | null {
  return useContext(SiteFreshnessContext);
}
