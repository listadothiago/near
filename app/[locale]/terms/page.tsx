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

// The body is English-only, so the six locale-prefixed URLs are six
// copies of the same document. They all canonicalize to /en and carry no
// hreflang: declaring translations that don't exist is worse than
// declaring none. Revisit when these are actually translated.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Service",
    description: "The plain-language terms for using near.tips.",
    alternates: { canonical: "/en/terms" },
  };
}

// English-only for now (2026-09-01) — see the matching note on the
// Privacy Policy page for why.
export default async function TermsPage({
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
        <h1 className="text-[clamp(2rem,5.5vw,3.2rem)]">Terms of Service</h1>
        <p className="mt-2 font-mono text-[0.8rem] text-muted">
          Last updated September 1, 2026.
        </p>

        <div className="mt-6 font-mono text-[0.95rem] leading-relaxed flex flex-col gap-5">
          <p>
            near.tips is a free, editorially independent city guide,
            written by a small team of humans working with AI. By using
            the site, you agree to these terms.
          </p>

          <section>
            <h2 className="text-[1.1rem] mb-2">The content</h2>
            <p>
              We write every page ourselves, informed by real sources we
              credit in-text. We try hard to be accurate and current, but
              places close, prices change, and we're not liable for
              decisions you make based on anything here — always confirm
              details (hours, whether somewhere is still open) before you
              rely on them, especially for anything time-sensitive.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">Accounts</h2>
            <p>
              Signing in with Google is optional and exists only to make
              your favorites follow you across devices. You're responsible
              for your Google account's own security. We can suspend or
              remove an account used to abuse the site (spam, harassment,
              scraping at scale) or found in violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">Submissions</h2>
            <p>
              If you suggest a place or send us a message, you're telling
              us it's accurate to the best of your knowledge and giving us
              permission to use it to consider adding or correcting
              content. We fact-check independently before publishing
              anything based on a submission.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">What you can't do</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Scrape or bulk-republish the site's content without permission.</li>
              <li>Use the contact form or submissions to spam, harass, or impersonate someone.</li>
              <li>Attempt to bypass or abuse the sign-in system.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">Changes</h2>
            <p>
              We may update these terms as the site grows. Meaningful
              changes will update the date above. Continuing to use
              near.tips after a change means you accept it.
            </p>
          </section>

          <section>
            <h2 className="text-[1.1rem] mb-2">Contact</h2>
            <p>Questions about these terms — use the submission form on the Sources page.</p>
          </section>
        </div>
      </article>
      <Footer stats={stats} />
    </>
  );
}
