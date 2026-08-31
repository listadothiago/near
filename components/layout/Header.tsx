"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import NearMark from "./NearMark";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import SearchBox from "@/components/board/SearchBox";
import { useSearchQuery } from "@/lib/search/SearchProvider";

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
export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const { query, setQuery } = useSearchQuery();
  const [compact, setCompact] = useState(false);

  // Only the board filters on a query, so only the board offers the
  // field. A search box on the about page that does nothing is worse
  // than no search box.
  const showSearch = pathname === "/";

  useEffect(() => {
    // Hysteresis: collapse at 90px, expand again at 40px. A single
    // threshold makes the header flicker open and shut when a reader
    // rests near it, which is far more annoying than it sounds.
    function onScroll() {
      const y = window.scrollY;
      setCompact((was) => (was ? y > 40 : y > 90));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 -mx-[22px] px-[22px] bg-surface border-b-[4px] border-ink pt-2 pb-2 mb-1">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Link href="/" className="inline-flex items-center gap-1.5 group flex-none">
          <NearMark className="w-4 h-4 text-ink flex-none" />
          <span className="font-display font-bold uppercase tracking-[-1px] text-[1.25rem] leading-none whitespace-nowrap group-hover:bg-accent transition-colors">
            NEAR.TIPS
          </span>
        </Link>

        {showSearch && (
          <div className="order-3 sm:order-none flex-1 min-w-0 flex sm:max-w-96">
            <SearchBox value={query} onChange={setQuery} />
          </div>
        )}

        <div className="flex items-center gap-2 flex-none">
          <nav
            className={`items-center gap-0 font-mono text-[0.72rem] uppercase tracking-wide ${
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

          {/* These used to live only in the footer, which a reader scrolling
              a long board on a phone never reached — so the language switch
              was effectively undiscoverable. */}
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {!compact && (
        <p className="mt-1.5 font-mono text-[0.74rem] text-muted">
          {t("app.tagline")}
        </p>
      )}
    </header>
  );
}
