import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getStats } from "@/lib/content/loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What near.tips collects, why, and how to control it.",
};

// English-only for now (2026-09-01) — shipped to unblock Google OAuth's
// consent-screen requirement, which needs a reachable privacy policy URL
// before sign-in can leave testing mode. Real per-locale legal translation
// is tracked in BACKLOG.md rather than rushed here.
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const stats = getStats();

  return (
    <>
      <Header />
      <article className="mt-8 max-w-[62ch]">
        <h1 className="text-[clamp(2rem,5.5vw,3.2rem)]">Privacy Policy</h1>
        <p className="mt-2 font-mono text-[0.8rem] text-muted">
          Last updated September 1, 2026.
        </p>

        <div className="mt-6 font-mono text-[0.95rem] leading-relaxed flex flex-col gap-5">
          <p>
            near.tips ("Near," "we," "us") is a small, independently run city
            guide. This page describes what we collect about visitors, why,
            and what choices you have. If anything here is unclear, use the
submission form on the Sources page and ask.
          </p>

          <section>
            <h2 className="text-[1.1rem] mb-2">What we collect</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong>Cookieless usage analytics (always on).</strong>{" "}
                Vercel Analytics and Speed Insights, which measure page
                views and performance without cookies or cross-site
                tracking and without collecting personal data.
              </li>
              <li>
                <strong>Google Analytics (only if you accept the cookie
                banner).</strong> If you accept, Google Analytics (GA4)
                measures how visitors use the site — pages viewed, rough
                location by IP, device type. No GA4 request fires until you
                accept, and you can decline or change your choice at any
                time via the cookie banner.
              </li>
              <li>
                <strong>Account data, only if you sign in.</strong> Signing
                in with Google (via Clerk, our authentication provider)
                shares your name, email address, and profile photo with us,
                so your account exists and your favorites can follow you
                across devices. We don't see or store your Google password.
              </li>
              <li>
                <strong>Favorites.</strong> The list of places/collections
                you star. Stored in your browser only if you're not signed
                in; stored on your account (via Clerk) if you are, so it
                syncs across devices.
              </li>
              <li>
                <strong>Anything you send us directly</strong> — a message
                through our contact form, or a place suggestion — including
                whatever contact details you choose to include.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">What we don't do</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>We don't sell personal data.</li>
              <li>
                We don't run advertising trackers or cross-site ad
                targeting.
              </li>
              <li>
                We don't require an account to read anything on the site —
                signing in only unlocks persistent favorites.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">Who else sees data</h2>
            <p>
              We use a small number of infrastructure providers to run the
              site: Vercel (hosting, analytics), Clerk (accounts, Google
              sign-in), and Google (analytics, if you accept the cookie
              banner; sign-in, if you choose to use it). Each handles data
              under their own privacy policy as our processor — we don't
              hand your data to anyone beyond what's needed to run near.tips
              itself.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">Your choices</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Decline or withdraw analytics consent any time via the cookie banner.</li>
              <li>Use the site without an account — favorites just won't follow you across devices.</li>
              <li>
                Delete your account (and the data tied to it) by asking us
                directly; we'll process this within a reasonable time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">Changes</h2>
            <p>
              If this policy changes in a meaningful way, we'll update the
              date above. Continuing to use near.tips after a change means
              you accept the update.
            </p>
          </section>
        </div>
      </article>
      <Footer stats={stats} />
    </>
  );
}
