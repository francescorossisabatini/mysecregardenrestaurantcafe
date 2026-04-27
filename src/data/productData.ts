export interface Product {
  id: string;
  name: {
    de: string;
    en: string;
  };
  category: {
    de: string;
    en: string;
  };
  shortDescription: {
    de: string;
    en: string;
  };
  fullDescription: {
    de: string;
    en: string;
  };
  image?: string;
  featured?: boolean;
}

export const productsData: Product[] = [
  {
    id: "1",
    name: {
      de: "Bio-Kräutertee",
      en: "Organic Herbal Tea"
    },
    category: {
      de: "Getränke",
      en: "Beverages"
    },
    shortDescription: {
      de: "Handverlesene Bio-Kräuter aus unserem Garten",
      en: "Hand-picked organic herbs from our garden"
    },
    fullDescription: {
      de: "Unser Kräutertee ist schlicht: gute Bio-Kräuter, heißes Wasser, ein paar Minuten Zeit. Am besten passt er, wenn draußen der Hof langsam ruhiger wird.",
      en: "Our herbal tea is simple: good organic herbs, hot water, a few minutes. It works best when the courtyard starts to quiet down."
    },
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: "2",
    name: {
      de: "Hausgemachtes Brot",
      en: "Homemade Bread"
    },
    category: {
      de: "Backwaren",
      en: "Baked Goods"
    },
    shortDescription: {
      de: "Täglich frisch gebacken mit Bio-Mehl",
      en: "Freshly baked daily with organic flour"
    },
    fullDescription: {
      de: "Das Brot kommt morgens aus dem Ofen, wenn die Küche noch sortiert wird. Außen knusprig, innen weich genug für Suppe und Aufstrich.",
      en: "The bread comes out of the oven in the morning while the kitchen is still getting ready. Crisp outside, soft enough for soup and spreads."
    },
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: "3",
    name: {
      de: "Saisonales Gemüse",
      en: "Seasonal Vegetables"
    },
    category: {
      de: "Produkte",
      en: "Produce"
    },
    shortDescription: {
      de: "Frisch vom Feld, regional und nachhaltig",
      en: "Fresh from the field, local and sustainable"
    },
    fullDescription: {
      de: "Unser saisonales Gemüse stammt direkt aus der Region. Wir arbeiten mit lokalen Bauern zusammen, die nach nachhaltigen Prinzipien arbeiten. Jede Woche bieten wir eine Auswahl an frischem, knackigem Gemüse, das auf natürliche Weise angebaut wurde.",
      en: "Our seasonal vegetables come directly from the region. We work with local farmers who follow sustainable principles. Every week we offer a selection of fresh, crisp vegetables grown naturally."
    },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    featured: false
  },
  {
    id: "4",
    name: {
      de: "Artisanaler Käse",
      en: "Artisanal Cheese"
    },
    category: {
      de: "Milchprodukte",
      en: "Dairy Products"
    },
    shortDescription: {
      de: "Handgefertigter Käse aus der Region",
      en: "Handcrafted cheese from the region"
    },
    fullDescription: {
      de: "Unser artisanaler Käse wird von lokalen Käsereien nach traditionellen Methoden hergestellt. Jede Sorte hat ihren eigenen Charakter und Geschmack. Von mild bis würzig, für jeden Geschmack ist etwas dabei.",
      en: "Our artisanal cheese is made by local dairies using traditional methods. Each variety has its own character and flavor. From mild to spicy, there is something for every taste."
    },
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: "5",
    name: {
      de: "Bio-Honig",
      en: "Organic Honey"
    },
    category: {
      de: "Süßwaren",
      en: "Sweets"
    },
    shortDescription: {
      de: "Reiner Honig von lokalen Imkern",
      en: "Pure honey from local beekeepers"
    },
    fullDescription: {
      de: "Unser Bio-Honig stammt von Bienen, die in unberührten Wiesen und Wäldern unserer Region sammeln. Der Honig wird schonend geerntet und nicht erhitzt, um alle natürlichen Enzyme und Nährstoffe zu bewahren. Ein wahres Geschenk der Natur.",
      en: "Our organic honey comes from bees that collect in pristine meadows and forests of our region. The honey is carefully harvested and not heated to preserve all natural enzymes and nutrients. A true gift of nature."
    },
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784422?w=400&h=300&fit=crop",
    featured: false
  },
  {
    id: "6",
    name: {
      de: "Hausgemachte Marmelade",
      en: "Homemade Jam"
    },
    category: {
      de: "Süßwaren",
      en: "Sweets"
    },
    shortDescription: {
      de: "Fruchtige Marmeladen aus saisonalen Früchten",
      en: "Fruity jams from seasonal fruits"
    },
    fullDescription: {
      de: "Unsere Marmeladen kochen wir in kleinen Mengen. Wenn die Früchte gut sind, braucht es nicht viel mehr. Ein Glas davon verschwindet manchmal schneller als geplant.",
      en: "We cook our jams in small batches. When the fruit is good, it does not need much else. A jar sometimes disappears faster than planned."
    },
    image: "https://images.unsplash.com/photo-1599870054908-44542bf02d6e?w=400&h=300&fit=crop",
    featured: false
  }
];
