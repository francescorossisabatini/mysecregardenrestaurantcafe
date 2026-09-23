/**
 * Dati realistici, non lorem: nomi di piatti coerenti con la cucina del locale
 * e i prezzi veri di HomeMenuPreview (zuppa 6,90 · piatti 15,90).
 * Un layout provato su testo finto mente sulla lunghezza delle righe.
 */
export interface SampleDish {
  key: "soup" | "green" | "blue";
  label: string;
  name: string;
  description: string;
  price: string;
  vegan: boolean;
  allergens: string[];
}

export const dishes: SampleDish[] = [
  {
    key: "soup",
    label: "Suppe",
    name: "Kürbiscremesuppe",
    description: "Mit gerösteten Kernen und einem Löffel Sauerrahm.",
    price: "6,90",
    vegan: false,
    allergens: ["G", "A"],
  },
  {
    key: "green",
    label: "Grünes Gericht",
    name: "Alpenpolenta mit Bergkäse und Schwammerln",
    description:
      "Langsam gerührte Polenta, Bergkäse aus Vorarlberg, Schwammerl aus dem Waldviertel, dazu ein kleiner Salat vom Markt.",
    price: "15,90",
    vegan: false,
    allergens: ["G"],
  },
  {
    key: "blue",
    label: "Blaues Gericht",
    name: "Korean Bowl",
    description: "Reis, eingelegtes Gemüse, Sesam, Gochujang.",
    price: "15,90",
    vegan: true,
    allergens: ["F", "N"],
  },
];

/** Il caso del martedì in cui la cucina manda solo la zuppa. */
export const oneDish = dishes.slice(0, 1);
/** Il caso di due piatti su tre. */
export const twoDishes = dishes.slice(0, 2);
