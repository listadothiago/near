import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Space_Grotesk, Courier_Prime } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getBaseUrl } from "@/lib/seo/site";
import ThemeScript from "@/components/layout/ThemeScript";
import ThemeKeeper from "@/components/layout/ThemeKeeper";
import { BoardControlsProvider } from "@/lib/board/controls";
import InstallPrompt from "@/components/layout/InstallPrompt";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import ConsentBanner from "@/components/layout/ConsentBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
  variable: "--font-courier-prime",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "app" });
  return {
    metadataBase: new URL(getBaseUrl()),
    // The localized name leads and the domain trails, so a tab or a search
    // result is identifiable before it's truncated: "Dicas perto de mim |
    // near.tips", not "near.tips | Dicas perto de mim".
    title: {
      default: `${t("wordmark")} | near.tips`,
      template: `%s | near.tips`,
    },
    description: t("tagline"),
    alternates: {
      types: {
        "application/rss+xml": [
          { url: "/feed.xml", title: "Near — Latest" },
          { url: "/column/feed.xml", title: "Near's Weekly Column" },
          { url: "/the-setlist/feed.xml", title: "Near's The Setlist" },
        ],
      },
    },
    // Search Console site verification. Env-driven so the token never
    // lands in the repo, and omitted entirely when unset rather than
    // rendering an empty meta tag. Set GOOGLE_SITE_VERIFICATION in the
    // Vercel project (and .env.local for dev) to the value Console gives
    // you under Settings -> Ownership verification -> HTML tag.
    // iOS ignores the manifest's display mode; these are what make an
    // Add-to-Home-Screen launch open chrome-free instead of in Safari.
    appleWebApp: {
      capable: true,
      title: "Near",
      statusBarStyle: "default",
    },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${courierPrime.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col">
        <ClerkProvider>
          <NextIntlClientProvider>
            <ThemeKeeper />
            <BoardControlsProvider>
              <div className="max-w-[1180px] mx-auto px-[22px] pt-3 pb-16 flex-1 w-full">
                {children}
              </div>
            </BoardControlsProvider>
            <InstallPrompt />
            {/* Cookieless, ungated. */}
            <Analytics />
            <GoogleAnalytics />
            <ConsentBanner />
            <SpeedInsights />
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
