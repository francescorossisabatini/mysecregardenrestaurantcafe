import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  de: {
    // Hero
    "hero.title": "My Secret Garden",
    "hero.subtitle": "Vegetarisches & Veganes Restaurant",
    "hero.address": "Mariahilferstraße 45 – Im Raimundhof – 1060 Wien",
    "hero.hours": "Geöffnet Mo-Sa von 11-19 Uhr",
    "hero.menu": "Zur Speisekarte",
    "hero.about": "Über Uns",
    
    // About
    "about.title": "WIR über uns",
    "about.intro": "Wir servieren Geschmack, der entzückt. Erleben Sie eine spannende vegetarische & vegane Küche mit schmackhaften Gerichten aus aller Welt.",
    "about.bio": "bio",
    "about.fair": "fair",
    "about.regional": "regional",
    "about.seasonal": "saisonal",
    
    // Philosophy
    "philosophy.title": "Philosophie",
    "philosophy.quote": "Im Secret Garden streben wir danach eine Oase des Friedens und bewussten Genusses zu schaffen.",
    
    // Menu
    "menu.title": "Unsere Speisekarte",
    "menu.weeklyUpdate": "Jede Woche ein neues, saisonales Menü",
    "menu.description": "Jeden Tag haben Sie die Wahl zwischen zwei frischen Tagesgerichten für 15.20€. Das 'grüne' bereiten wir immer vegan & glutenfrei zu – das 'blaue' kann auch mal Milchprodukte, glutenhaltiges Getreide oder Ei enthalten.",
    "menu.weeklyMenu": "Wochenkarte",
    "menu.soup": "Suppe",
    "menu.greenDish": "Tagesgericht GRÜN",
    "menu.blueDish": "Tagesgericht BLAU",
    "menu.dailyDishPrice": "Tagesgericht: 15.20€",
    "menu.soupPrice": "klein 4.50€ / groß 6.50€",
    "menu.soupInfo": "Unsere schmackhaften Tagessuppen sind immer vegan & glutenfrei. Ein frisches Bio-Weckerl dazu: 1.90€",
    "menu.warm": "Warme Gerichte",
    "menu.salads": "Frische Salate",
    "menu.desserts": "Süßes",
    "menu.view": "Speisekarte Ansehen",
    "menu.togo": "TO GO Bestellen",
    
    // Reviews
    "reviews.title": "IHR über uns",
    
    // Contact
    "contact.title": "Kontakt",
    "contact.address": "Adresse",
    "contact.phone": "Telefon",
    "contact.hours": "Öffnungszeiten",
    "contact.hours.days": "Montag - Samstag",
    "contact.hours.time": "11:00 - 19:00 Uhr",
    "contact.hours.closed": "Feiertags geschlossen",
    "contact.social": "Social Media",
    "contact.call": "Jetzt Anrufen",
  },
  en: {
    // Hero
    "hero.title": "My Secret Garden",
    "hero.subtitle": "Vegetarian & Vegan Restaurant",
    "hero.address": "Mariahilferstraße 45 – Im Raimundhof – 1060 Vienna",
    "hero.hours": "Open Mon-Sat from 11am-7pm",
    "hero.menu": "View Menu",
    "hero.about": "About Us",
    
    // About
    "about.title": "About US",
    "about.intro": "We serve delightful taste. Experience an exciting vegetarian & vegan cuisine with flavorful dishes from around the world.",
    "about.bio": "organic",
    "about.fair": "fair",
    "about.regional": "regional",
    "about.seasonal": "seasonal",
    
    // Philosophy
    "philosophy.title": "Philosophy",
    "philosophy.quote": "At Secret Garden, we strive to create an oasis of peace and conscious enjoyment.",
    
    // Menu
    "menu.title": "Our Menu",
    "menu.weeklyUpdate": "A new, seasonal menu every week",
    "menu.description": "Every day you can choose between two fresh daily dishes for €15.20. The 'green' one is always prepared vegan & gluten-free – the 'blue' one may contain dairy, gluten-containing grains or eggs.",
    "menu.weeklyMenu": "Weekly Menu",
    "menu.soup": "Soup",
    "menu.greenDish": "Daily Dish GREEN",
    "menu.blueDish": "Daily Dish BLUE",
    "menu.dailyDishPrice": "Daily Dish: €15.20",
    "menu.soupPrice": "small €4.50 / large €6.50",
    "menu.soupInfo": "Our delicious daily soups are always vegan & gluten-free. Add a fresh organic roll: €1.90",
    "menu.warm": "Warm Dishes",
    "menu.salads": "Fresh Salads",
    "menu.desserts": "Sweets",
    "menu.view": "View Menu",
    "menu.togo": "Order TO GO",
    
    // Reviews
    "reviews.title": "What YOU say",
    
    // Contact
    "contact.title": "Contact",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.hours": "Opening Hours",
    "contact.hours.days": "Monday - Saturday",
    "contact.hours.time": "11:00 AM - 7:00 PM",
    "contact.hours.closed": "Closed on holidays",
    "contact.social": "Social Media",
    "contact.call": "Call Now",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("de");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.de] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
