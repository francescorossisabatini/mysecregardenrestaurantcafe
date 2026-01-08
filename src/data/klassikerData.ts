// Static menu items - "Unsere Klassiker" (Our Classics)
// Source: secretgardenrestaurant.at/speisekarte

export interface KlassikerItem {
  id: string;
  name: { de: string; en: string };
  description?: { de: string; en: string };
  sizeNote?: string;
  price: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isBio?: boolean;
  isUnavailable?: boolean;
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
  items?: KlassikerItem[];
  subcategories?: DrinkSubcategory[];
}

export const klassikerMenu = {
  title: { de: "Unsere Klassiker", en: "Our Classics" },
  subtitle: { de: "Gerichte, die bleiben", en: "Dishes that stay" },
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
        },
      ],
    },
    {
      id: "salate",
      name: { de: "Salate", en: "Salads" },
      items: [
        {
          id: "bunter-salat",
          name: { de: "Bunter Salat", en: "Mixed Salad" },
          description: {
            de: "Frischer Blattsalat mit saisonalem Gemüse und hausgemachtem Dressing",
            en: "Fresh leaf salad with seasonal vegetables and homemade dressing"
          },
          price: "6,5 / 10,9",
          isVegan: true,
          isGlutenFree: true,
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
        },
      ],
    },
    {
      id: "suesses",
      name: { de: "Süßes", en: "Sweets" },
      items: [
        {
          id: "vegan-cheesecake",
          name: { de: "Veganer Cheesecake", en: "Vegan Cheesecake" },
          description: {
            de: "Cremiger veganer Käsekuchen",
            en: "Creamy vegan cheesecake"
          },
          price: "4,90",
          isVegan: true,
        },
        {
          id: "karamellschnitte",
          name: { de: "Karamellschnitte", en: "Caramel Slice" },
          description: {
            de: "Hausgemachte Karamellschnitte",
            en: "Homemade caramel slice"
          },
          price: "4,90",
        },
        {
          id: "walnuss-brownie",
          name: { de: "Walnuss-Brownie", en: "Walnut Brownie" },
          description: {
            de: "Saftiger Schokoladen-Brownie mit Walnüssen",
            en: "Moist chocolate brownie with walnuts"
          },
          price: "4,7",
        },
        {
          id: "schoko-mousse-torte",
          name: { de: "Schoko Mousse Torte", en: "Chocolate Mousse Cake" },
          description: {
            de: "Luftige Schokoladenmousse-Torte",
            en: "Light chocolate mousse cake"
          },
          price: "4,7",
        },
        {
          id: "karotten-gewuerztorte",
          name: { de: "Karotten-Gewürztorte", en: "Carrot Spice Cake" },
          description: {
            de: "Würzige Karottentorte mit Frischkäse-Topping",
            en: "Spiced carrot cake with cream cheese topping"
          },
          price: "4,5",
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
            de: "Erfrischende hausgemachte Ingwerlimonade",
            en: "Refreshing homemade ginger lemonade"
          },
          price: "3,00 / 4,70",
          isVegan: true,
        },
        {
          id: "eistee",
          name: { de: "Hausgemachter Eistee", en: "Homemade Iced Tea" },
          description: {
            de: "Frisch gebrühter Eistee mit natürlichen Zutaten",
            en: "Freshly brewed iced tea with natural ingredients"
          },
          price: "4,2",
          isVegan: true,
          isUnavailable: true,
        },
        {
          id: "mango-lassi",
          name: { de: "Mango-Lassi", en: "Mango Lassi" },
          description: {
            de: "Cremiger Joghurt-Drink mit frischer Mango",
            en: "Creamy yogurt drink with fresh mango"
          },
          price: "4,9",
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
            { id: "pumpkin-spiced-latte", name: { de: "Pumpkin Spiced Latte", en: "Pumpkin Spiced Latte" }, price: "5,9" },
            { id: "glueh-kombucha", name: { de: "\"Glüh\" Kombucha", en: "\"Glüh\" Kombucha (hot)" }, price: "4,9" },
            { id: "kurkuma-latte", name: { de: "Kurkuma Latte", en: "Kurkuma Latte" }, price: "4,9" },
            { id: "espresso", name: { de: "Espresso", en: "Espresso" }, price: "2,9 / 3,9" },
            { id: "verlaengerter", name: { de: "Verlängerter / Americano", en: "Verlängerter / Americano" }, price: "3,5 / 4,5" },
            { id: "cappuccino", name: { de: "Cappuccino / Melange", en: "Cappuccino / Melange" }, price: "4,3 / 5,7" },
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
            { id: "ginger-limo", name: { de: "Ingwer-Limo", en: "Ginger Limo" }, sizeNote: "0,2 l / 0,5 l", price: "3,0 / 4,7" },
          ],
        },
        {
          id: "juices",
          name: { de: "Säfte vom österreichischen Bauernhof", en: "Juices from the Austrian Farm" },
          sizeNote: "0,2 l / 0,5 l",
          items: [
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
            { id: "lemon-soda", name: { de: "Zitronenlimonade", en: "Lemon Soda" }, sizeNote: "0,2 l / 0,5 l", price: "2,7 / 3,9" },
            { id: "glass-water", name: { de: "Wasser aus Glasflaschen", en: "Water from our Glass-Bottles" }, price: "0,7" },
          ],
        },
      ],
    },
  ],
};
