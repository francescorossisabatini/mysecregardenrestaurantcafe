// Static menu items - "Unsere Klassiker" (Our Classics)
// Source: secretgardenrestaurant.at/speisekarte

export interface KlassikerItem {
  id: string;
  name: { de: string; en: string };
  description?: { de: string; en: string };
  descriptionShort?: string;
  descriptionShortLocalized?: { de: string; en: string };
  ingredientsMain?: string[];
  ingredientsMainLocalized?: { de: string[]; en: string[] };
  allergens?: string[];
  gfDisclaimer?: boolean;
  ingredientProducers?: Record<string, { brand?: string; origin?: string; certification?: string; url?: string }>;
  sizeNote?: string;
  price: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isBio?: boolean;
  isUnavailable?: boolean;
  isNew?: boolean;
}

export interface DrinkSubcategory {
  id: string;
  name: { de: string; en: string };
  sizeNote?: string;
  items: KlassikerItem[];
}

export interface KlassikerCategory {
  id: string;
  name: { de: string; en: string };
  note?: { de: string; en: string };
  items?: KlassikerItem[];
  subcategories?: DrinkSubcategory[];
}

export const klassikerMenu = {
  title: { de: "Unsere Klassiker", en: "Our Classics" },
  subtitle: { de: "Dal, Salate, Kuchen und Getränke, die fast jeden Tag da sind.", en: "Dal, salads, cakes and drinks that are here almost every day." },
  categories: [
    {
      id: "warm",
      name: { de: "Warme Speisen", en: "Warm Dishes" },
      items: [
        {
          id: "indisches-dal",
          name: { de: "Indisches Dal", en: "Indian Dal" },
          description: {
            de: "Cremige rote Linsen, Zwiebeln und Tomaten mit indischen Gewürzen; dazu Basmatireis",
            en: "Creamy red lentils, onions and tomatoes with Indian spices; served with basmati rice"
          },
          price: "9,90",
          isVegan: true,
          isGlutenFree: true,
          descriptionShort: "cremig, Linsen, würzig",
          ingredientsMain: ["Rote Linsen", "Tomaten", "Zwiebeln", "indische Gewürze", "Basmatireis"],
          gfDisclaimer: true,
        },
      ],
    },
    {
      id: "salate",
      name: { de: "Salate", en: "Salads" },
      items: [
        {
          id: "bunter-salat",
          name: { de: "Secret Garden Salat", en: "Secret Garden Salad" },
          description: {
            de: "Frischer Blattsalat mit saisonalem Gemüse und hausgemachtem Dressing",
            en: "Fresh leaf salad with seasonal vegetables and homemade dressing"
          },
          price: "6,5 / 10,9",
          isVegan: true,
          isGlutenFree: true,
          descriptionShort: "frisch, saisonales Gemüse",
          ingredientsMain: ["Blattsalat", "saisonales Gemüse", "hausgemachtes Dressing"],
          gfDisclaimer: true,
        },
        {
          id: "secret-garden-avocado",
          name: { de: "Secret Garden Salat mit Avocado", en: "Secret Garden Salad with Avocado" },
          description: {
            de: "Bunter Salat mit frischer Avocado und hausgemachtem Dressing",
            en: "Colorful salad with fresh avocado and homemade dressing"
          },
          price: "17,5",
          isVegan: true,
          isGlutenFree: true,
          descriptionShort: "frisch, Avocado, saisonal",
          ingredientsMain: ["Blattsalat", "Avocado", "saisonales Gemüse", "hausgemachtes Dressing"],
          gfDisclaimer: true,
        },
        {
          id: "secret-garden-ziegenkase",
          name: { de: "Secret Garden Salat mit Ziegenkäse", en: "Secret Garden Salad with Goat Cheese" },
          description: {
            de: "Bunter Salat mit warmem Ziegenkäse und hausgemachtem Dressing",
            en: "Colorful salad with warm goat cheese and homemade dressing"
          },
          price: "17,5",
          isGlutenFree: true,
          descriptionShort: "frisch, warm, cremig",
          ingredientsMain: ["Blattsalat", "Ziegenkäse", "saisonales Gemüse", "hausgemachtes Dressing"],
          allergens: ["G"],
          gfDisclaimer: true,
        },
        {
          id: "secret-garden-tofu",
          name: { de: "Secret Garden Salat mit Tofu", en: "Secret Garden Salad with Tofu" },
          description: {
            de: "Bunter Salat mit mariniertem Bio-Tofu und hausgemachtem Dressing",
            en: "Colorful salad with marinated organic tofu and homemade dressing"
          },
          price: "17,5",
          isVegan: true,
          isGlutenFree: true,
          isBio: true,
          descriptionShort: "frisch, Bio-Tofu, saisonal",
          ingredientsMain: ["Blattsalat", "Bio-Tofu", "saisonales Gemüse", "hausgemachtes Dressing"],
          allergens: ["F"],
          gfDisclaimer: true,
          ingredientProducers: { Tofu: { certification: "bio" } },
        },
      ],
    },
    {
      id: "suesses",
      name: { de: "Süßes", en: "Sweets" },
      note: {
        de: "Zum Süßen verwenden wir Bio-Rohrohrzucker, Ahornsirup oder Agavendicksaft.",
        en: "For sweeteners, we use organic raw cane sugar, maple syrup or agave syrup."
      },
      items: [
        {
          id: "vegan-cheesecake",
          name: { de: "Raw „Cheesecake“", en: "Raw “Cheesecake”" },
          description: {
            de: "Eine dicke Creme aus Cashewkernen und Kokosbutter auf einem Boden aus Mandeln und Datteln, gesüßt mit Agavendicksaft.",
            en: "A thick cream of cashew nuts and coconut butter on a base of almonds and dates, sweetened with agave syrup."
          },
          price: "4,9",
          isVegan: true,
          isGlutenFree: true,
          descriptionShortLocalized: { de: "cremig, roh, vegan", en: "creamy, raw, vegan" },
          ingredientsMainLocalized: {
            de: ["Cashewkerne", "Kokosbutter", "Mandeln", "Datteln", "Agavendicksaft"],
            en: ["cashew nuts", "coconut butter", "almonds", "dates", "agave syrup"]
          },
          allergens: ["H"],
          gfDisclaimer: true,
        },
        {
          id: "karamellschnitte",
          name: { de: "Raw Schoko-Karamell-Schnitte", en: "Raw Chocolate-Caramel Slice" },
          description: {
            de: "Süß und salzig mit Ahornsirup, Kokosöl, Kakao, Tahina, Datteln und Mandeln.",
            en: "A sweet and salty variation with maple syrup, coconut oil, cocoa, tahini, dates and almonds."
          },
          price: "4,9",
          isVegan: true,
          isGlutenFree: true,
          descriptionShortLocalized: { de: "süß, salzig, roh", en: "sweet, salty, raw" },
          ingredientsMainLocalized: {
            de: ["Ahornsirup", "Kokosöl", "Kakao", "Tahina", "Datteln", "Mandeln"],
            en: ["maple syrup", "coconut oil", "cocoa", "tahini", "dates", "almonds"]
          },
          allergens: ["H", "N"],
          gfDisclaimer: true,
        },
        {
          id: "walnuss-brownie",
          name: { de: "Brownie", en: "Brownie" },
          description: {
            de: "Die vegane und glutenfreie Variante des Klassikers mit Walnüssen und Schokostückchen.",
            en: "A vegan and gluten-free version of the classic, with walnuts and chocolate chunks."
          },
          price: "4,7",
          isVegan: true,
          isGlutenFree: true,
          descriptionShortLocalized: { de: "schokoladig, saftig, nussig", en: "chocolatey, moist, nutty" },
          ingredientsMainLocalized: {
            de: ["Walnüsse", "Schokostückchen"],
            en: ["walnuts", "chocolate chunks"]
          },
          allergens: ["F", "H"],
          gfDisclaimer: true,
        },
        {
          id: "schoko-mousse-torte",
          name: { de: "Schoko Mousse Torte", en: "Chocolate Mousse Cake" },
          description: {
            de: "Französische Schokoladentorte ohne glutenhaltige Zutaten.",
            en: "French chocolate cake made without gluten-containing ingredients."
          },
          price: "4,7",
          isGlutenFree: true,
          descriptionShortLocalized: { de: "französisch, schokoladig", en: "French-style, chocolatey" },
          ingredientsMainLocalized: { de: ["Schokolade"], en: ["chocolate"] },
          allergens: ["C", "F", "G"],
          gfDisclaimer: true,
        },
        {
          id: "mohn-nuss-kuchen",
          name: { de: "Mohn-Nuss-Kuchen", en: "Poppyseed-Nut Cake" },
          description: {
            de: "Saftiger gluten- und laktosefreier Mohnkuchen mit Haselnüssen und Preiselbeermarmelade.",
            en: "Moist gluten- and lactose-free poppyseed cake with hazelnuts and cranberry jam."
          },
          price: "4,5",
          isGlutenFree: true,
          descriptionShortLocalized: { de: "saftig, nussig, fruchtig", en: "moist, nutty, fruity" },
          ingredientsMainLocalized: {
            de: ["Mohn", "Haselnüsse", "Preiselbeermarmelade"],
            en: ["poppyseeds", "hazelnuts", "cranberry jam"]
          },
          allergens: ["C", "H"],
          gfDisclaimer: true,
        },
        {
          id: "karotten-gewuerztorte",
          name: { de: "Gewürzkuchen", en: "Spice Cake" },
          description: {
            de: "Dinkelmehl mit Rosinen, Walnüssen, Feigen, Bananen, Karotten und Lebkuchengewürz.",
            en: "Spelt flour with raisins, walnuts, figs, bananas, carrots and gingerbread spice."
          },
          price: "4,5",
          isVegan: true,
          descriptionShortLocalized: { de: "würzig, fruchtig, nussig", en: "spiced, fruity, nutty" },
          ingredientsMainLocalized: {
            de: ["Dinkelmehl", "Rosinen", "Walnüsse", "Feigen", "Bananen", "Karotten", "Lebkuchengewürz"],
            en: ["spelt flour", "raisins", "walnuts", "figs", "bananas", "carrots", "gingerbread spice"]
          },
          allergens: ["A", "H"],
        },
        {
          id: "schlagobers",
          name: { de: "Schlagobers dazu", en: "Whipped Cream Added" },
          description: {
            de: "Auch vegan erhältlich.",
            en: "Also available vegan."
          },
          price: "1,3",
          allergens: ["G"],
        },
      ],
    },
    {
      id: "getraenke",
      name: { de: "Hausgemachte Getränke", en: "Homemade Drinks" },
      items: [
        {
          id: "ingwer-limo",
          name: { de: "Ingwer-Limo", en: "Ginger Lemonade" },
          description: {
            de: "Hausgemacht mit Bio-Zitronen.",
            en: "Homemade with organic lemons."
          },
          sizeNote: "0,2 l / 0,5 l",
          price: "3,0 / 4,7",
          isVegan: true,
          descriptionShortLocalized: { de: "hausgemacht, Bio-Zitrone", en: "homemade, organic lemon" },
        },
        {
          id: "peach-iced-spice-tea",
          name: { de: "Homemade Peach-Iced Spice Tee", en: "Homemade Peach-Iced Spice Tea" },
          description: {
            de: "Unsere exklusive Hausmischung.",
            en: "Our exclusive house blend."
          },
          sizeNote: "0,3 l",
          price: "4,9",
          isVegan: true,
          descriptionShortLocalized: { de: "Unsere exklusive Hausmischung", en: "Our exclusive house blend" },
        },
        {
          id: "mango-lassi",
          name: { de: "Mango-Lassi", en: "Mango Lassi" },
          description: {
            de: "Indisches Joghurtgetränk mit Mangopüree.",
            en: "Indian yoghurt drink with mango pulp."
          },
          sizeNote: "0,3 l",
          price: "4,9",
          descriptionShort: "cremig, Mango",
          ingredientsMain: ["Joghurt", "Mango"],
          allergens: ["G"],
        },
      ],
    },
    {
      id: "drinks",
      name: { de: "Getränke", en: "Drinks" },
      subcategories: [
        {
          id: "hot-drinks",
          name: { de: "Heißgetränke", en: "Hot Drinks" },
          items: [
            { id: "indian-chai-latte", name: { de: "Indian Chai Latte", en: "Indian Chai Latte" }, price: "4,9" },
            { id: "matcha-latte", name: { de: "Matcha Latte", en: "Matcha Latte" }, price: "5,4" },
            
            { id: "glueh-kombucha", name: { de: "\"Glüh\" Kombucha", en: "\"Glüh\" Kombucha (hot)" }, price: "4,9" },
            { id: "kurkuma-latte", name: { de: "Kurkuma Latte", en: "Kurkuma Latte" }, price: "4,9" },
            { id: "espresso", name: { de: "Espresso", en: "Espresso" }, sizeNote: "1 Shot / 2 Shots", price: "2,9 / 3,9" },
            { id: "verlaengerter", name: { de: "Verlängerter / Americano", en: "Verlängerter / Americano" }, sizeNote: "kurz / lang · short / long", price: "3,5 / 4,5" },
            { id: "cappuccino", name: { de: "Cappuccino / Melange", en: "Cappuccino / Melange" }, sizeNote: "1 Shot / 2 Shots", price: "4,3 / 5,7" },
            { id: "flat-white", name: { de: "Flat White", en: "Flat White" }, price: "5,2" },
            { id: "latte-macchiato", name: { de: "Latte Macchiato", en: "Latte Macchiato" }, price: "5,2" },
            { id: "chaga-kaffee", name: { de: "Chaga Kaffee", en: "Chaga Kaffee" }, price: "5,5" },
            { id: "blue-magic-tea", name: { de: "Blue Magic Tea", en: "Blue Magic Tea" }, price: "3,9" },
          ],
        },
        {
          id: "cold-drinks",
          name: { de: "Kaltgetränke", en: "Cold Drinks" },
          items: [
            {
              id: "kombucha",
              name: { de: "Kombucha", en: "Kombucha" },
              sizeNote: "0,15 l / 0,3 l",
              price: "3,0 / 4,7",
              descriptionShortLocalized: {
                de: "Hausgemachtes Fermentgetränk aus Schwarztee mit lebenden Mikroorganismen",
                en: "Homemade fermentation drink made from black tea with living microorganisms"
              }
            },
            {
              id: "strawberry-spritz",
              name: { de: "Strawberry Spritz", en: "Strawberry Spritz" },
              sizeNote: "0,3 l",
              price: "5,5",
              descriptionShortLocalized: {
                de: "Alkoholfrei, mit Erdbeere und Chinin",
                en: "Alcohol-free, with strawberry and quinine"
              }
            },
          ],
        },
        {
          id: "juices",
          name: { de: "Säfte vom österreichischen Bauernhof", en: "Juices from the Austrian Farm" },
          sizeNote: "0,2 l / 0,5 l",
          items: [
            { id: "apple-juice-unfiltered", name: { de: "Naturtrüber Apfelsaft", en: "Apple Juice Unfiltered" }, price: "3,4 / 5,3" },
            { id: "apple-juice", name: { de: "Apfelsaft gespritzt", en: "Apple Juice with Water or Soda" }, price: "2,9 / 4,5" },
            { id: "peach-juice", name: { de: "Pfirsichsaft gespritzt", en: "Peach Juice with Water or Soda" }, price: "3,0 / 4,7" },
            { id: "elderflower", name: { de: "Holundersirup gespritzt", en: "Elderflower Syrup with Water or Soda" }, price: "2,7 / 4,2" },
          ],
        },
        {
          id: "organic-sodas",
          name: { de: "Bio-Limonaden", en: "Organic Sodas" },
          sizeNote: "0,33 l",
          items: [
            { id: "cola", name: { de: "Cola", en: "Cola" }, price: "3,9" },
            { id: "pomegranate", name: { de: "Granatapfel", en: "Pomegranate" }, price: "3,9" },
            { id: "orange-acerola", name: { de: "Orange-Acerola", en: "Orange-Acerola" }, price: "3,9" },
            { id: "green-tea-soda", name: { de: "Grüner Tee", en: "Green Tea" }, price: "3,9" },
          ],
        },
        {
          id: "more-cold-drinks",
          name: { de: "Weitere Kaltgetränke", en: "More Cold Drinks" },
          items: [
            { id: "goesser-beer", name: { de: "Gösser Alkoholfrei", en: "Gösser Non-Alcoholic Beer" }, sizeNote: "0,5 l", price: "4,5" },
            { id: "coconut-water", name: { de: "Bio Kokoswasser", en: "Organic Coconut Water" }, sizeNote: "0,2 l / 0,5 l", price: "3,7 / 5,7" },
            { id: "mineral-water", name: { de: "Mineralwasser still oder prickelnd", en: "Mineral Water Still or Sparkling" }, sizeNote: "0,33 l", price: "2,5" },
            { id: "soda-water", name: { de: "Sodawasser", en: "Soda Water" }, sizeNote: "0,2 l / 0,5 l", price: "2,1 / 3,3" },
            { id: "lemon-soda", name: { de: "Zitronenlimonade", en: "Lemon Soda" }, sizeNote: "0,2 l / 0,5 l", price: "2,7 / 3,9" },
            { id: "glass-water", name: { de: "Wasser aus Glasflaschen", en: "Water from our Glass-Bottles" }, price: "0,7" },
          ],
        },
      ],
    },
  ],
};
