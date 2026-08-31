import type { Category, Tag } from "@/lib/content/schema";

export function normalizeText(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Local, model-free keyword map — no LLM calls. Deliberately small and
// hand-curated across the site's main languages (EN + PT-BR, with a few IT/ES
// overlaps) rather than exhaustive; good enough to catch "bars", "gay
// friendly", "late night", "hidden gems" etc. and turn them into real
// category/tag filters instead of a dumb substring match.
const CATEGORY_SYNONYMS: Record<string, Category> = {
  travel: "travel",
  viagem: "travel",
  // "luxury" is no longer its own beat — DARCY still covers the register,
  // but a reader searching for it should land on travel rather than nothing.
  luxury: "travel",
  luxo: "travel",
  news: "world-culture-news",
  culture: "city-culture",
  cultura: "city-culture",
  museum: "city-culture",
  museu: "city-culture",
  art: "city-culture",
  arte: "city-culture",
  theater: "city-culture",
  theatre: "city-culture",
  teatro: "city-culture",
  food: "food-drink",
  drink: "food-drink",
  comida: "food-drink",
  bebida: "food-drink",
  restaurant: "food-drink",
  restaurante: "food-drink",
  bar: "food-drink",
  bars: "food-drink",
  cafe: "food-drink",
  coffee: "food-drink",
  cafeteria: "food-drink",
  club: "nightlife-sound",
  clubs: "nightlife-sound",
  nightlife: "nightlife-sound",
  music: "nightlife-sound",
  musica: "nightlife-sound",
  dj: "nightlife-sound",
  party: "nightlife-sound",
  festa: "nightlife-sound",
  balada: "nightlife-sound",
  wellness: "wellness-fitness",
  fitness: "wellness-fitness",
  gym: "wellness-fitness",
  academia: "wellness-fitness",
  spa: "wellness-fitness",
  yoga: "wellness-fitness",
  hotel: "accommodation",
  hotels: "accommodation",
  stay: "accommodation",
  accommodation: "accommodation",
  hospedagem: "accommodation",
  pousada: "accommodation",
};

const TAG_SYNONYMS: Record<string, Tag> = {
  gay: "lgbtq-friendly",
  queer: "lgbtq-friendly",
  lgbt: "lgbtq-friendly",
  lgbtq: "lgbtq-friendly",
  lgbtqia: "lgbtq-friendly",
  hipster: "hipster",
  indie: "hipster",
  alternative: "hipster",
  alternativo: "hipster",
  celebrity: "celebrity-spotted",
  celebrities: "celebrity-spotted",
  famous: "celebrity-spotted",
  famoso: "celebrity-spotted",
  vip: "celebrity-spotted",
  influencer: "influencer-favorite",
  instagrammable: "influencer-favorite",
  legend: "local-legend",
  legendary: "local-legend",
  classic: "local-legend",
  institution: "local-legend",
  lendario: "local-legend",
  night: "late-night",
  "late-night": "late-night",
  latenight: "late-night",
  noite: "late-night",
  madrugada: "late-night",
  hidden: "hidden-gem",
  secret: "hidden-gem",
  gem: "hidden-gem",
  escondido: "hidden-gem",
  trendy: "see-and-be-seen",
  scene: "see-and-be-seen",
  trending: "trending",
  new: "trending",
  opening: "trending",
  reopened: "trending",
  novo: "trending",
};

const STOPWORDS = new Set([
  "a", "an", "the", "in", "at", "near", "me", "of", "for", "with", "and", "or", "is", "are",
  "de", "da", "do", "das", "dos", "em", "no", "na", "com", "e", "perto", "um", "uma", "para",
  // Generic filler nouns/adjectives that carry no filtering signal on their
  // own ("a cool spot", "algum lugar bom") — dropping them keeps a query
  // like "hipster spot in london" from failing to match anything just
  // because "spot" isn't literally in any place's copy.
  "spot", "spots", "place", "places", "somewhere", "something", "good", "nice",
  "cool", "great", "best", "lugar", "lugares", "algo", "bom", "legal", "melhor",
]);

export type ParsedQuery = {
  categories: Category[];
  tags: Tag[];
  freeTextWords: string[];
};

// Best-effort, dependency-free query parsing — no LLM involved. Splits the
// query into words, matches known category/tag synonyms, drops stopwords,
// and returns whatever's left as a normalized free-text fragment for a
// plain substring match against name/tagline/place fields.
export function parseQuery(raw: string): ParsedQuery {
  const trimmed = raw.trim();
  if (!trimmed) return { categories: [], tags: [], freeTextWords: [] };

  const words = normalizeText(trimmed)
    .split(/[^a-z0-9-]+/)
    .filter(Boolean);

  const categories = new Set<Category>();
  const tags = new Set<Tag>();
  const leftover: string[] = [];

  for (const word of words) {
    if (STOPWORDS.has(word)) continue;
    const singular = word.endsWith("s") && word.length > 3 ? word.slice(0, -1) : word;
    const cat = CATEGORY_SYNONYMS[word] ?? CATEGORY_SYNONYMS[singular];
    const tag = TAG_SYNONYMS[word] ?? TAG_SYNONYMS[singular];
    if (cat) {
      categories.add(cat);
      continue;
    }
    if (tag) {
      tags.add(tag);
      continue;
    }
    leftover.push(word);
  }

  return {
    categories: [...categories],
    tags: [...tags],
    freeTextWords: leftover,
  };
}
