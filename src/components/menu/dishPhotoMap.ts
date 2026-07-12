// Photo mapping: only ids that have an honest visual match get a thumbnail.
// No AI images, no stock reuse. Static imports keep Vite bundling correct.

import dalRice from "@/assets/dal-rice-bowl.jpg";
import curryDay from "@/assets/curry-of-the-day.webp";
import alpenpolenta from "@/assets/alpenpolenta.jpg";
import koreanBowl from "@/assets/korean-bowl.jpg";
import minnesotaBowl from "@/assets/minnesota-bowl.webp";
import salateHeader from "@/assets/photos/salate-header.jpg";

// dish id (from klassikerData / weekly kind) → asset url
const map: Record<string, string> = {
  // Warme Speisen — honest matches
  "indisches-dal": dalRice,
  "curry-des-tages": curryDay,
  "alpenpolenta": alpenpolenta,
  "korean-bowl": koreanBowl,
  "minnesota-bowl": minnesotaBowl,
};

export const getDishPhoto = (id?: string): string | undefined => {
  if (!id) return undefined;
  return map[id];
};

// Category-level decorative header photos (broad enough to be honest)
export const categoryHeaderPhoto: Record<string, string> = {
  salate: salateHeader,
};
