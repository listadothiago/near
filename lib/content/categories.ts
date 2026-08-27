import { CATEGORIES, type Category } from "./schema";

export const CATEGORY_COLOR_VAR: Record<Category, string> = {
  "travel-luxury": "--color-cat-travel-luxury",
  "world-culture-news": "--color-cat-world-culture-news",
  "city-culture": "--color-cat-city-culture",
  "food-drink": "--color-cat-food-drink",
  "nightlife-sound": "--color-cat-nightlife-sound",
  "wellness-fitness": "--color-cat-wellness-fitness",
  accommodation: "--color-cat-accommodation",
};

export { CATEGORIES };
export type { Category };
