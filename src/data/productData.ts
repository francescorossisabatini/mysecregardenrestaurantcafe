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
      de: "Unser exklusiver Bio-Kräutertee wird aus sorgfältig ausgewählten Kräutern hergestellt, die in unserem eigenen Garten angebaut werden. Jede Tasse bietet ein einzigartiges Geschmackserlebnis und fördert das Wohlbefinden. Perfekt für einen ruhigen Moment der Entspannung.",
      en: "Our exclusive organic herbal tea is crafted from carefully selected herbs grown in our own garden. Each cup offers a unique flavor experience and promotes well-being. Perfect for a quiet moment of relaxation."
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
      de: "Unser hausgemachtes Brot wird jeden Morgen frisch gebacken. Wir verwenden nur Bio-Mehl und natürliche Zutaten. Der Teig wird traditionell von Hand geknetet und mit viel Liebe zubereitet. Das Ergebnis ist ein knuspriges, aromatisches Brot mit einer weichen Krume.",
      en: "Our homemade bread is freshly baked every morning. We use only organic flour and natural ingredients. The dough is traditionally kneaded by hand and prepared with lots of love. The result is a crispy, aromatic bread with a soft crumb."
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
      de: "Unsere hausgemachten Marmeladen werden in kleinen Chargen aus frischen, saisonalen Früchten hergestellt. Wir verwenden nur natürlichen Zucker und keine künstlichen Zusätze. Jede Sorte ist ein Fest der Aromen und schmeckt wie ein Sommertag im Glas.",
      en: "Our homemade jams are made in small batches from fresh, seasonal fruits. We use only natural sugar and no artificial additives. Each variety is a celebration of flavors and tastes like a summer day in a jar."
    },
    image: "https://images.unsplash.com/photo-1599870054908-44542bf02d6e?w=400&h=300&fit=crop",
    featured: false
  }
];
