export type LanguageCode = "de" | "en";

export interface AllergenInfo {
  code: string;
  label: Record<LanguageCode, string>;
  note?: Record<LanguageCode, string>;
}

export interface DishDetails {
  descriptionShort?: string;
  ingredientsMain?: string[];
  allergens?: string[];
  gfDisclaimer?: boolean;
  ingredientProducers?: Record<string, { brand?: string; origin?: string; certification?: string; url?: string }>;
}

export const ALLERGENS: AllergenInfo[] = [
  { code: "A", label: { de: "Glutenhaltiges Getreide", en: "Cereals containing gluten" } },
  { code: "B", label: { de: "Krebstiere", en: "Crustaceans" }, note: { de: "nicht verwendet", en: "not used" } },
  { code: "C", label: { de: "Eier", en: "Eggs" } },
  { code: "D", label: { de: "Fisch", en: "Fish" }, note: { de: "nicht verwendet", en: "not used" } },
  { code: "E", label: { de: "Erdnüsse", en: "Peanuts" } },
  { code: "F", label: { de: "Soja", en: "Soya" } },
  { code: "G", label: { de: "Milch / Laktose", en: "Milk / Lactose" } },
  { code: "H", label: { de: "Schalenfrüchte", en: "Nuts" } },
  { code: "L", label: { de: "Sellerie", en: "Celery" } },
  { code: "M", label: { de: "Senf", en: "Mustard" } },
  { code: "N", label: { de: "Sesam", en: "Sesame" } },
  { code: "O", label: { de: "Schwefeldioxid / Sulfite", en: "Sulphur dioxide / Sulphites" } },
  { code: "P", label: { de: "Lupinen", en: "Lupin" } },
  { code: "R", label: { de: "Weichtiere", en: "Molluscs" }, note: { de: "nicht verwendet", en: "not used" } },
];

export const getAllergenByCode = (code: string) => ALLERGENS.find((allergen) => allergen.code === code);
