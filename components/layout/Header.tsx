"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import SearchBox from "@/components/board/SearchBox";
import CategoryFilters from "@/components/board/CategoryFilters";
import TagFilters from "@/components/board/TagFilters";
import ShareViewButton from "@/components/layout/ShareViewButton";
import { useBoardControls } from "@/lib/board/controls";
import { useSiteFreshness } from "./SiteFreshnessProvider";
import { formatContentDate } from "@/lib/content/freshness";
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
  const locale = useLocale();
  const freshness = useSiteFreshness();
  const pathname = usePathname();
  const router = useRouter();
  const {
    query,
    setQuery,
    activeCats,
    toggleCat,
    activeTags,
    toggleTag,
    filtersOpen,
    setFiltersOpen,
  } = useBoardControls();
  const [compact, setCompact] = useState(false);
  const filterSheetTouchStartY = useRef<number | null>(null);

  // The field is available everywhere now — off the board, submitting
  // (Enter) takes the reader to the board, where the query (shared via
  // BoardControlsProvider, which wraps every page already) is already
  // applied. Category/tag filters stay board-only since only the board
  // has anything to filter.
  const isBoard = pathname === "/";
  const showSearch = true;
  const showFilters = isBoard && Boolean(availableCats?.length);
  const appliedFilterLabels = [
    query.trim(),
    ...Array.from(activeCats, (cat) => t(`categories.${cat}`)),
    ...Array.from(activeTags, (tag) => t(`tags.${tag}`)),
  ].filter(Boolean);
  const filterButtonLabel = appliedFilterLabels[0] ?? t("board.filters");
  const additionalFilterCount = Math.max(0, appliedFilterLabels.length - 1);

  useEffect(() => {
    // Collapse almost immediately on phones: 120px left the full masthead
    // occupying too much of a small viewport during the first scroll. Keep
    // the wider-screen threshold calmer, and only expand again at the top
    // so the header-height change cannot make it oscillate.
    function onScroll() {
      const y = window.scrollY;
      const collapseAt = window.matchMedia("(max-width: 767px)").matches
        ? 8
        : 120;
      setCompact((was) => (was ? y > 4 : y > collapseAt));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-[1200] -mx-[22px] px-[22px] bg-surface border-b-[4px] border-ink rounded-b-[var(--radius-panel)] pt-[max(0.25rem,env(safe-area-inset-top))] pb-1 mb-1 md:pt-[max(0.5rem,env(safe-area-inset-top))] md:pb-2"
    >
      {/* One wrapping row, four items. Phone: brand + controls share the
          first line, the nav wraps to its own full-width line, search takes
          another. Desktop: all inline. The old version nested the nav
          inside an unshrinkable controls block, which was wider than a
          phone screen — the whole header overflowed sideways. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <Link href="/" className="inline-flex items-center gap-1.5 group flex-none">
          <img
            src="/icons/icon-maskable.png"
            alt=""
            width={28}
            height={28}
            className="w-6 h-6 flex-none rounded-[3px]"
          />
          <span className="font-display font-bold uppercase tracking-[-1px] text-[1.25rem] leading-none whitespace-nowrap group-hover:bg-accent transition-colors">
            NEAR
          </span>
        </Link>

        {/* Fills the dead space the old mr-auto logo/mr-0 desktop split
            left blank between the wordmark and the controls on phones (row 1
            has room to spare there until the controls div claims the right
            edge). Only needed below sm — sm+ has its own tagline line
            further down. A bold badge, not plain text, per the operator:
            "that white area next to title could show tagline... should be a
            badge too so it's strong." Operator, 2026-09-10. */}
        <p className="sm:hidden flex-1 min-w-0 flex justify-end">
          <span className="inline-block max-w-full truncate bg-ink px-1.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-wide text-accent">
            {t("app.tagline")}
          </span>
        </p>

        {showSearch && (
          <div className="order-4 basis-full sm:order-none sm:basis-auto sm:flex-1 min-w-0 flex sm:max-w-96">
            <SearchBox
              value={query}
              onChange={setQuery}
              onSubmit={isBoard ? undefined : () => router.push("/")}
            />
          </div>
        )}

        {/* Below md: wraps onto as many lines as it needs instead of
            side-scrolling. An earlier version used overflow-x-auto here,
            which hid ABOUT/SOURCES off the right edge with no affordance
            that more nav existed — reads as a cut-off/broken header, and
            the operator flagged the side-scroll itself as awkward
            regardless (2026-09-10). Each pill now carries its own full
            border and a small gap instead of a shared border-l-0 chain,
            so a wrapped pill never loses its left edge. md+: all inline,
            no wrap needed. */}
        <nav
          className={`order-3 basis-full min-w-0 md:order-none md:basis-auto flex-wrap items-center gap-1 font-sans text-[0.68rem] sm:text-[0.76rem] font-semibold uppercase tracking-wide ${
            compact ? "hidden" : "flex"
          }`}
        >
            <Link
              href="/"
              className="border-[2px] border-ink px-1.5 py-1 sm:px-2 hover:bg-accent hover:text-black transition-colors"
            >
              {t("nav.tips")}
            </Link>
            <Link
              href="/guides"
              className="border-[2px] border-ink px-1.5 py-1 sm:px-2 hover:bg-accent hover:text-black transition-colors"
            >
              {t("collection.navLabel")}
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-1 border-[2px] border-ink px-1.5 py-1 sm:px-2 hover:bg-accent hover:text-black transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 flex-none" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {t("board.map")}
            </Link>
            <ColumnsMenu />
            <Link
              href="/sources"
              className="border-[2px] border-ink px-1.5 py-1 sm:px-2 hover:bg-accent hover:text-black transition-colors"
            >
              {t("sources.navLabel")}
            </Link>
            <Link
              href="/about"
              className="border-[2px] border-ink px-1.5 py-1 sm:px-2 hover:bg-accent hover:text-black transition-colors"
            >
              {t("nav.about")}
            </Link>
        </nav>

        <div className="flex items-center gap-1.5 flex-none">
          {/* Removed (operator, 2026-09-10: "the one with the icon does not
              work... just broken apparently, remove that entirely"). Was an
              in-page #board-map anchor meant to stay reachable once the nav
              hides in the compact/sticky header state — the pin icon now
              lives on the nav's own MAP link below instead. */}
          {/* Universal — every page is shareable, not just the board
              (operator, 2026-09-08), so this is unconditional rather than
              gated behind showFilters like the Filters button below it. */}
          <ShareViewButton />
          {showFilters && (
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
              className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-2 py-1 font-sans text-[0.76rem] font-semibold uppercase tracking-wide text-ink hover:bg-accent hover:text-black transition-colors"
            >
              <span className="max-w-[7rem] truncate sm:max-w-[11rem]">
                {filterButtonLabel}
              </span>
              {additionalFilterCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] border border-ink bg-accent text-black text-[0.62rem] font-bold px-1">
                  +{additionalFilterCount}
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
                className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-2 py-1 font-sans text-[0.76rem] font-semibold uppercase tracking-wide text-ink hover:bg-accent hover:text-black transition-colors whitespace-nowrap"
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
                elements: {
                  // Clerk's default placeholder is a circular purple-gradient
                  // person icon, which clashes with the site's square
                  // black/white/acid-green brutalist controls (see
                  // ThemeToggle, LocaleSwitcher). Square it off, grayscale
                  // it so any real avatar photo still fits the monochrome
                  // chrome, and match the other header buttons' border.
                  avatarBox:
                    "w-9 h-9 rounded-none border-[3px] border-ink grayscale contrast-125",
                },
              }}
            />
          </Show>
        </div>
      </div>

      {/* Mobile uses a bounded sheet outside the sticky header's layout so
          the full category/tag inventory can never consume the results
          viewport. Desktop keeps the compact inline panel. Shared filtered
          URLs start collapsed; the count badge carries their state. */}
      {showFilters && filtersOpen && (
        <div className="fixed inset-x-3 bottom-3 z-[1300] max-h-[min(70dvh,36rem)] overflow-y-auto rounded-[var(--radius-panel)] border-[3px] border-ink bg-surface p-3 shadow-[var(--shadow)] md:static md:inset-auto md:z-auto md:mt-2 md:max-h-[45vh] md:rounded-none md:border-x-0 md:border-b-0 md:bg-transparent md:px-0 md:pb-0 md:pt-2 md:shadow-none">
          <div
            className="mb-2 flex touch-pan-y flex-col gap-1 md:hidden"
            onTouchStart={(event) => {
              filterSheetTouchStartY.current = event.touches[0]?.clientY ?? null;
            }}
            onTouchEnd={(event) => {
              const startY = filterSheetTouchStartY.current;
              const endY = event.changedTouches[0]?.clientY;
              filterSheetTouchStartY.current = null;
              if (startY !== null && endY !== undefined && startY - endY >= 48) {
                setFiltersOpen(false);
              }
            }}
          >
            <div
              aria-hidden="true"
              className="mx-auto h-1.5 w-12 rounded-full bg-ink/35"
            />
            <div className="flex items-center justify-between gap-3">
              <strong className="font-display text-[0.9rem] uppercase">
                {t("board.filters")}
              </strong>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label={t("board.filters")}
                className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-ink bg-surface font-sans text-xl leading-none hover:bg-accent hover:text-black"
              >
                ×
              </button>
            </div>
          </div>
          <CategoryFilters
            activeCats={activeCats}
            allSelected={activeCats.size === 0 && activeTags.size === 0}
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

      {/* Two keys carry the same sentence on purpose. `app.tagline` is the
          plain one, because it is also the site-wide meta description
          (app/[locale]/layout.tsx) and the PWA manifest, and neither can take
          markup. `app.taglineRich` is the same sentence with an em tag around
          the emphasized run, resolved here through next-intl's rich-text
          handler — no HTML ever ships inside a translation string. The tag's
          position lives in the message, not in this renderer, so each locale
          puts the emphasis wherever its own sentence needs it: mid-phrase in
          English and Italian, near the end in Chinese. Keep the two keys in
          sync when either changes. */}
      {/* The freshness stamp sits on the tagline's own line on purpose:
          the tagline makes the claim, and the stamp is the receipt. Put
          anywhere else in the header it reads as an unrelated status
          widget. It links to whichever piece carries that timestamp, so
          the claim is one click from being checked. */}
      {!compact && !filtersOpen && (
        <div className="mt-1.5 hidden flex-wrap items-baseline gap-x-3 gap-y-1 font-sans text-[0.8rem] text-muted md:flex">
          <p>
            {t.rich("app.taglineRich", {
              em: (chunks) => <strong className="font-bold text-ink">{chunks}</strong>,
            })}
          </p>
          {freshness && (
            <Link
              href={freshness.href}
              className="whitespace-nowrap bg-ink px-1.5 py-0.5 font-bold text-accent underline decoration-2 underline-offset-[3px] decoration-accent/50 hover:bg-accent hover:text-black transition-colors"
            >
              {t("freshness.siteUpdated")}{" "}
              <time dateTime={freshness.at}>
                {formatContentDate(freshness.at, locale)}
              </time>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

/**
 * Groups the three standing columns (editorial column, Ladies&Gentlethem,
 * The Setlist) behind one nav entry instead of three separate top-level
 * links — same border-box visual language as the rest of the nav, just
 * with a dropdown panel instead of a direct link.
 */
function ColumnsMenu() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 border-[2px] border-ink px-1.5 py-1 sm:px-2 hover:bg-accent hover:text-black transition-colors"
      >
        {t("nav.columns")}
        <span
          aria-hidden="true"
          className={`text-[0.6rem] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[9rem] max-w-[calc(100vw-2rem)] border-[2px] border-ink bg-surface z-[1300] flex flex-col">
          <Link
            href="/columns"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 border-b-[2px] border-ink font-bold hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.columnsAll")}
          </Link>
          <Link
            href="/column"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 border-b-[2px] border-ink hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.column")}
          </Link>
          <Link
            href="/ladies-and-gentlethem"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 border-b-[2px] border-ink hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.ladiesAndGentlethem")}
          </Link>
          <Link
            href="/the-setlist"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 border-b-[2px] border-ink hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.theSetlist")}
          </Link>
          <Link
            href="/the-pass"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 border-b-[2px] border-ink hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.thePass")}
          </Link>
          <Link
            href="/the-failure-mode"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 border-b-[2px] border-ink hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.theFailureMode")}
          </Link>
          {/* Operator-authored column, not an AI-persona byline — see
              content/blog-do-thiago.md and .claude/skills/blog-do-thiago.
              No dedicated archive page yet (only one entry exists so far),
              so this links straight to its one published piece. Operator,
              2026-09-10: "where is blog do thiago in the nav under
              columns." */}
          <Link
            href="/collection/hello-world"
            onClick={() => setOpen(false)}
            className="px-2 py-1.5 hover:bg-accent hover:text-black transition-colors"
          >
            {t("nav.blogDoThiago")}
          </Link>
        </div>
      )}
    </div>
  );
}
