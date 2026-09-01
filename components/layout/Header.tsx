"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { Link, usePathname } from "@/lib/i18n/navigation";
import NearMark from "./NearMark";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import SearchBox from "@/components/board/SearchBox";
import CategoryFilters from "@/components/board/CategoryFilters";
import TagFilters from "@/components/board/TagFilters";
import { useBoardControls } from "@/lib/board/controls";
import type { Category } from "@/lib/content/categories";
import type { Tag } from "@/lib/content/tags";

/**
 * Sticky at every breakpoint, and collapses to a single line once the
 * reader scrolls.
 *
 * The full header is a masthead: wordmark, tagline, section nav, locale
 * and theme. That's the right thing to see on arrival and the wrong
 * thing to keep occupying a phone screen forever, so past a short scroll
 * it drops to one row — mark, search, and the controls — and the
 * tagline and section nav go away. Nothing becomes unreachable: scroll
 * back up and the masthead returns.
 *
 * The search field is here rather than in the board so it stays
 * reachable however deep into the listings you are. Its state lives in
 * SearchProvider because the board is a sibling, not a child.
 */
export default function Header({
  availableCats,
  availableTags,
}: {
  /** Only the board passes these; every other page has nothing to filter. */
  availableCats?: Category[];
  availableTags?: Tag[];
} = {}) {
  const t = useTranslations();
  const pathname = usePathname();
  const {
    query,
    setQuery,
    activeCats,
    toggleCat,
    activeTags,
    toggleTag,
    filtersOpen,
    setFiltersOpen,
    activeFilterCount,
  } = useBoardControls();
  const [compact, setCompact] = useState(false);

  // Only the board filters on a query, so only the board offers the
  // field. A search box on the about page that does nothing is worse
  // than no search box.
  const showSearch = pathname === "/";
  const showFilters = showSearch && Boolean(availableCats?.length);

  useEffect(() => {
    // Hysteresis, and the gap must exceed the header's own height change:
    // collapsing removes ~70px of masthead, which shifts the page and can
    // push scrollY back under a narrow expand threshold — the header then
    // reopens, shifts the page down, re-collapses, and oscillates. Seen
    // live on mobile. Collapse at 120, expand only near the actual top.
    function onScroll() {
      const y = window.scrollY;
      setCompact((was) => (was ? y > 12 : y > 120));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-[1200] -mx-[22px] px-[22px] bg-surface border-b-[4px] border-ink pt-2 pb-2 mb-1">
      {/* One wrapping row, four items. Phone: brand + controls share the
          first line, the nav wraps to its own full-width line, search takes
          another. Desktop: all inline. The old version nested the nav
          inside an unshrinkable controls block, which was wider than a
          phone screen — the whole header overflowed sideways. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <Link href="/" className="inline-flex items-center gap-1.5 group flex-none mr-auto sm:mr-0">
          <NearMark className="w-4 h-4 text-ink flex-none" />
          <span className="font-display font-bold uppercase tracking-[-1px] text-[1.25rem] leading-none whitespace-nowrap group-hover:bg-accent transition-colors">
            NEAR.TIPS
          </span>
        </Link>

        {showSearch && (
          <div className="order-4 basis-full sm:order-none sm:basis-auto sm:flex-1 min-w-0 flex sm:max-w-96">
            <SearchBox value={query} onChange={setQuery} />
          </div>
        )}

        <nav
          className={`order-3 basis-full md:order-none md:basis-auto items-center gap-0 font-mono text-[0.72rem] uppercase tracking-wide ${
            compact ? "hidden" : "flex"
          }`}
        >
            <Link
              href="/"
              className="border-[2px] border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
            >
              {t("nav.tips")}
            </Link>
            <Link
              href="/guides"
              className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
            >
              {t("collection.navLabel")}
            </Link>
            <Link
              href="/column"
              className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
            >
              {t("nav.column")}
            </Link>
            <Link
              href="/ladies-and-gentlethem"
              className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
            >
              {t("nav.ladiesAndGentlethem")}
            </Link>
            <Link
              href="/the-setlist"
              className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
            >
              {t("nav.theSetlist")}
            </Link>
            <Link
              href="/sources"
              className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
            >
              {t("sources.navLabel")}
            </Link>
            <Link
              href="/about"
              className="border-[2px] border-l-0 border-ink px-2 py-1 hover:bg-accent hover:text-black transition-colors"
            >
              {t("nav.about")}
            </Link>
        </nav>

        <div className="flex items-center gap-1.5 flex-none">
          {showFilters && (
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
              className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide text-ink hover:bg-accent hover:text-black transition-colors"
            >
              {t("board.filters")}
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] border border-ink bg-accent text-black text-[0.62rem] font-bold px-1">
                  {activeFilterCount}
                </span>
              )}
              <span
                aria-hidden="true"
                className={`text-[0.6rem] transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
          )}

          {/* These used to live only in the footer, which a reader scrolling
              a long board on a phone never reached — so the language switch
              was effectively undiscoverable. */}
          <LocaleSwitcher />
          <ThemeToggle />
          {/* Only reason to sign in at all: favorites that follow you across
              devices instead of living in one browser's localStorage (see
              lib/favorites.ts). An icon-only version of this button tested
              as invisible to the operator — visible text beats matching
              Locale/Theme's icon styling. */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide text-ink hover:bg-accent hover:text-black transition-colors whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-none" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                {t("account.signIn")}
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: { avatarBox: "w-8 h-8 border-[3px] border-ink" },
              }}
            />
          </Show>
        </div>
      </div>

      {/* The panel drops out of the sticky bar itself, so the filters
          are reachable from anywhere in the listings rather than only
          from the top of the page. Scrollable, because a tall panel on
          a phone would otherwise push the results off screen entirely. */}
      {showFilters && filtersOpen && (
        <div className="mt-2 max-h-[45vh] overflow-y-auto border-t-[3px] border-ink pt-2">
          <CategoryFilters
            activeCats={activeCats}
            onToggle={toggleCat}
            available={new Set(availableCats)}
          />
          <TagFilters
            activeTags={activeTags}
            onToggle={toggleTag}
            available={new Set(availableTags)}
          />
        </div>
      )}

      {!compact && !filtersOpen && (
        <p className="mt-1.5 font-mono text-[0.74rem] text-muted">
          {t("app.tagline")}
        </p>
      )}
    </header>
  );
}
