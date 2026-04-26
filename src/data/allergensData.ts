export type LanguageCode = "de" | "en";

export interface AllergenInfo {
  code: number;
  label: Record<LanguageCode, string>;
  note?: Record<LanguageCode, string>;
}

export interface DishDetails {
  descriptionShort?: string;
  ingredientsMain?: string[];
  allergens?: number[];
  gfDisclaimer?: boolean;
  ingredientProducers?: Record<string, { brand?: string; origin?: string; certification?: string; url?: string }>;
}

export const ALLERGENS: AllergenInfo[] = [
  { code: 1, label: { de: "Gluten", en: "Gluten" } },
  { code: 2, label: { de: "Krebstiere", en: "Crustaceans" }, note: { de: "nicht verwendet", en: "not used" } },
  { code: 3, label: { de: "Eier", en: "Eggs" } },
  { code: 4, label: { de: "Fisch", en: "Fish" }, note: { de: "nicht verwendet", en: "not used" } },
  { code: 5, label: { de: "Erdnüsse", en: "Peanuts" } },
  { code: 6, label: { de: "Soja", en: "Soya" } },
  { code: 7, label: { de: "Milch / Laktose", en: "Milk / Lactose" } },
  { code: 8, label: { de: "Schalenfrüchte", en: "Tree nuts" } },
  { code: 9, label: { de: "Sellerie", en: "Celery" } },
  { code: 10, label: { de: "Senf", en: "Mustard" } },
  { code: 11, label: { de: "Sesam", en: "Sesame" } },
  { code: 12, label: { de: "Schwefeldioxid / Sulfite", en: "Sulphur dioxide / Sulphites" } },
  { code: 13, label: { de: "Lupinen", en: "Lupin" } },
  { code: 14, label: { de: "Weichtiere", en: "Molluscs" }, note: { de: "nicht verwendet", en: "not used" } },
];

export const getAllergenByCode = (code: number) => ALLERGENS.find((allergen) => allergen.code === code);
