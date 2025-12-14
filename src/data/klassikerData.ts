// Static menu items - "Unsere Klassiker" (Our Classics)
// Source: secretgardenrestaurant.at/speisekarte

export interface KlassikerItem {
  id: string;
  name: { de: string; en: string };
  description: { de: string; en: string };
  price: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isBio?: boolean;
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
          price: "5,90 / 9,90",
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
          price: "16,90",
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
          price: "16,90",
          isGlutenFree: true,
        },
        {
          id: "secret-garden-tofu",
          name: { de: "Secret Garden Salat mit Tofu", en: "Secret Garden Salad with Tofu" },
          description: {
            de: "Bunter Salat mit mariniertem Bio-Tofu und hausgemachtem Dressing",
            en: "Colorful salad with marinated organic tofu and homemade dressing"
          },
          price: "16,90",
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
          price: "4,30",
        },
        {
          id: "schoko-mousse-torte",
          name: { de: "Schoko Mousse Torte", en: "Chocolate Mousse Cake" },
          description: {
            de: "Luftige Schokoladenmousse-Torte",
            en: "Light chocolate mousse cake"
          },
          price: "4,70",
        },
        {
          id: "karotten-gewuerztorte",
          name: { de: "Karotten-Gewürztorte", en: "Carrot Spice Cake" },
          description: {
            de: "Würzige Karottentorte mit Frischkäse-Topping",
            en: "Spiced carrot cake with cream cheese topping"
          },
          price: "4,30",
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
          price: "4,00",
          isVegan: true,
        },
        {
          id: "mango-lassi",
          name: { de: "Mango-Lassi", en: "Mango Lassi" },
          description: {
            de: "Cremiger Joghurt-Drink mit frischer Mango",
            en: "Creamy yogurt drink with fresh mango"
          },
          price: "4,70",
        },
      ],
    },
  ],
};
