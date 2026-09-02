/**
 * Near's human curator.
 *
 * Every byline on this site is a disclosed AI persona, and per the
 * provenance constraint none of them may ever be marked as a real
 * `Person` in structured data. That left Near with **no human node at
 * all** in its trust chain — nothing for "who is actually accountable
 * for this" to attach to, by either a reader or a search engine.
 *
 * This is that node, and it is deliberately the only one. The split the
 * provenance assignment asks for:
 *
 * - **human taste** → this file (authority)
 * - **sources** → `content/sources.md` (evidence)
 * - **AI agents** → `lib/content/authors.ts` (production)
 * - **Near** → the `Organization` in `lib/seo/jsonld.ts` (publisher)
 *
 * Only locale-independent facts live here — proper nouns, years, URLs.
 * Every sentence of prose is localized copy under `curator.*` in
 * `messages/<locale>.json`, the same rule `authors.ts` follows.
 */

export const CURATOR = {
  slug: "thiago-baraldi",
  name: "Thiago Baraldi",
  /**
   * Self-hosted rather than hotlinked from Gravatar. The face attached to
   * the site's only `Person` node should not depend on a third party
   * staying up, and the AI cast's avatars are local for the same reason.
   */
  photo: "/branding/thiago-baraldi.jpg",
  /** Public profile. Deliberately not the email or phone from the CV. */
  sameAs: ["https://www.linkedin.com/in/baraldi"],
  degree: {
    name: "B.Sc. Computer Science",
    institution: "Universidade Federal de São Carlos (UFSCar)",
  },
  /**
   * Only the roles that justify *this* site. The consulting, healthcare
   * and automotive work is real and irrelevant here — a curator page that
   * lists everything is a résumé, and a résumé is not an authority claim.
   */
  career: [
    { org: "Booking.com", city: "Amsterdam", years: "2008–2010", key: "booking" },
    { org: "Le Cool Network", city: "Barcelona", years: "2012–2013", key: "lecool" },
    { org: "Expedia", city: "London", years: "2013–2014", key: "expedia" },
    { org: "Hotels.com (Expedia Group)", city: "London", years: "2014–2017", key: "hotels" },
    { org: "TaskRabbit (IKEA Group)", city: "London", years: "2019–2020", key: "taskrabbit" },
    { org: "FARFETCH", city: "Lisbon", years: "2020–2022", key: "farfetch" },
  ],
  /**
   * Cities lived in, not visited. Ordered roughly chronologically. The
   * `city` value matches `meta.place.city` in the content where Near
   * covers it, so the page can count real pins instead of asserting a
   * connection — see `getCuratorCoverage`.
   */
  livedIn: [
    { city: "São Carlos", country: "Brazil", region: "interior de São Paulo" },
    { city: "São Paulo", country: "Brazil", region: "Brigadeiro Luís Antônio, Moema" },
    { city: "São Vicente", country: "Brazil", region: "Baixada Santista" },
    { city: "Hayward", country: "United States", region: "East Bay" },
    { city: "San Francisco", country: "United States", region: "Tendernob" },
    { city: "Amsterdam", country: "Netherlands", region: "Nieuwmarkt, Oosterpark" },
    { city: "Barcelona", country: "Spain", region: "El Raval" },
    { city: "London", country: "United Kingdom", region: "Lower Goswell Road, Old Street, Whitecross Street" },
    { city: "Lisbon", country: "Portugal", region: "Carcavelos" },
    { city: "Rome", country: "Italy", region: "Piramide, Garbatella / San Paolo" },
  ],
  /**
   * Publishing locales this curator can actually read and check, and the
   * one he cannot.
   *
   * Stating the gap is the point. A curator page that implies oversight
   * of all six locales when the curator reads five of them would be
   * exactly the unearned authority claim this page exists to avoid.
   */
  locales: {
    native: ["pt-BR"],
    fluent: ["en", "it"],
    professional: ["es-ES", "es-419"],
    none: ["zh-CN"],
  },
} as const;

export type CuratorCoverage = {
  city: string;
  country: string;
  region?: string;
  pins: number;
};

/**
 * The lived-in list joined against real coverage counts.
 *
 * The interesting rows are the zeros: cities the curator lived in that
 * Near does not cover yet are a content lead with a genuine authority
 * claim behind them, which is a different and better argument than
 * search volume.
 */
export function getCuratorCoverage(
  pinsByCity: Map<string, number>,
): CuratorCoverage[] {
  return CURATOR.livedIn.map((l) => ({
    ...l,
    pins: pinsByCity.get(l.city) ?? 0,
  }));
}
