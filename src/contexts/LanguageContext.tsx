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
    "hero.dailyMenu": "Menü von Heute",
    "hero.fullMenu": "Gesamte Speisekarte",
    "hero.about": "Über Uns",
    "hero.products": "Unsere Produkte",
    
    // Navigation
    "nav.menu": "Speisekarte",
    "nav.products": "Unsere Produkte",
    "nav.about": "Über Uns",
    "nav.contact": "Kontakt",
    "nav.privacy": "Datenschutz",
    
    // About
    "about.title": "WIR über uns",
    "about.intro": "Wir servieren Geschmack, der entzückt. Erleben Sie eine spannende vegetarische & vegane Küche mit schmackhaften Gerichten aus aller Welt.",
    "about.bio": "bio",
    "about.fair": "fair",
    "about.regional": "regional",
    "about.seasonal": "saisonal",
    "about.p1": "Wir lieben bio, fair, regional und saisonal. In der Früh liefern Dogi vom Naschmarkt und Biogast feldfrisches Gemüse, knackige Salate und biologisches Getreide, aus dem unsere Köche mit Talent, Erfindungsreichtum und aromatischen Kräutern und authentischen Gewürzen für Sie gesunde Mahlzeiten zaubern, die satt machen und Kraft für den Tag geben.",
    "about.p2": "In unseren umweltfreundlichen 'TO GO'-Boxen lassen sich unsere Speisen auch schnell und unkompliziert überallhin mitnehmen und genießen.",
    "about.p3": "Von Montag bis Samstag gibt's von 11:00 bis 19:00 Uhr warmes Essen, reichhaltige Salate, Spezialitätenkaffee, auch mit veganen Milchsorten, und raffinierte Heißgetränke, sowie hausgemachte Torten und roh-köstliche süße Verführungen. Bei allem kommt auch die glutenfreie Ernährung nicht zu kurz!",
    "about.p4": "Neben unseren zwei gemütlichen Gasträumen lockt unser ruhiger, begrünter Innenhof im Biedermeierstil, nur 80 m von der belebten Mariahilferstraße entfernt. Schaut doch herein! 🙂",
    
    // Philosophy
    "philosophy.title": "Unsere Inspiration",
    "philosophy.sri.title": "Sri Chinmoy",
    "philosophy.sri.subtitle": "Spiritueller Meister, Dichter, Künstler und Friedensbotschafter (1931–2007)",
    "philosophy.sri.intro": "Hinter My Secret Garden steht eine tiefe Quelle der Inspiration – ein Mann, dessen Leben selbst ein Kunstwerk war.",
    "philosophy.sri.story1": "Sri Chinmoy wurde 1931 in Bengalen geboren und verbrachte zwanzig Jahre in einem spirituellen Ashram, wo er tief in Meditation und innere Disziplin eintauchte. 1964 folgte er einem inneren Ruf und zog nach New York, um seine Botschaft von innerem Frieden und Harmonie mit der westlichen Welt zu teilen.",
    "philosophy.sri.story2": "Was ihn einzigartig machte: Er lebte, was er lehrte. Er komponierte über 23.000 Lieder, malte mehr als 200.000 Gemälde, schrieb 1.600 Bücher und gab weltweit über 800 Friedenskonzerte – alles aus dem Zustand der Meditation heraus. Für ihn war jede Handlung eine Form des Gebets, jede Mahlzeit ein Akt der Dankbarkeit.",
    "philosophy.sri.story3": "Sri Chinmoy inspirierte Menschen aus allen Lebensbereichen – von UN-Generalsekretären bis zu olympischen Athleten – stets mit derselben Botschaft: Der Weg zum äußeren Frieden führt durch den inneren Frieden.",
    "philosophy.sri.quote": "Versuche niemals die Welt zu verbessern. Versuche nur dein eigenes Leben zu verbessern und du wirst merken, dass du die Welt um dich herum verbessert hast.",
    "philosophy.sri.author": "Sri Chinmoy",
    "philosophy.sri.influence": "Diese Philosophie durchdringt jeden Winkel unseres Restaurants. Die vegetarische Küche, die meditative Atmosphäre, die Hingabe in der Zubereitung – all das entspringt Sri Chinmoys Vision, dass Nahrung nicht nur den Körper, sondern auch die Seele nähren sollte. My Secret Garden ist unser bescheidener Versuch, seine Lehren in die Welt zu tragen.",
    "philosophy.sri.link": "Mehr über Sri Chinmoy erfahren",
    "philosophy.vision.title": "Unsere Vision",
    "philosophy.vision.intro": "Es liegt uns am Herzen, dass die Welt zu einem besseren und schöneren Ort wird. Inspiriert von Sri Chinmoys Lehren wollen wir mit unserer Arbeit, unserem Lebensstil und unserem Bewusstsein dazu beitragen.",
    "philosophy.vision.harmony": "Wir nutzen Meditation um Harmonie und Bewusst-Sein in unsere Aktivitäten zu bringen. Familiäre Atmosphäre und Herzlichkeit wird großgeschrieben und unser spiritueller Background sorgt für das Plus an Lebensfreude.",
    "philosophy.quote.intro": "Im Secret Garden streben wir danach",
    "philosophy.quote.main": "eine Oase des Friedens und bewussten Genusses zu schaffen.",
    "philosophy.quote.line1": "Einen Rückzugsort",
    "philosophy.quote.line2": "von der Hektik und Schnelllebigkeit des Alltags,",
    "philosophy.quote.line3": "an dem man die Seele baumeln lassen kann",
    "philosophy.quote.line4": "und Nahrung für Körper und Geist findet.",
    "philosophy.quote.heart": "Ein Herzens-Garten voller Geheimnisse …",
    "philosophy.quote.revelation": "und Offenbarungen!",
    "philosophy.feature1.title": "Mit Herz gekocht",
    "philosophy.feature1.desc": "Jedes Gericht wird mit Liebe und Achtsamkeit zubereitet",
    "philosophy.feature2.title": "Spirituelle Atmosphäre",
    "philosophy.feature2.desc": "Ein Ort der Ruhe und des bewussten Genusses",
    "philosophy.feature3.title": "Bewusste Gemeinschaft",
    "philosophy.feature3.desc": "Familiäre Atmosphäre und herzliche Begegnungen",
    
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
    
    // Products
    "products.title": "Unsere Produkte",
    "products.subtitle": "Entdecken Sie unsere sorgfältig ausgewählten Produkte – von frischen Bio-Zutaten bis zu hausgemachten Spezialitäten",
    "products.featured": "Empfohlene Produkte",
    "products.all": "Alle Produkte",
    "products.clickToLearnMore": "Klicken Sie für weitere Informationen",
    
    // Reviews
    "reviews.title": "IHR über uns",
    
    // Instagram
    "instagram.title": "Folge uns auf Instagram",
    "instagram.subtitle": "Entdecke unsere neuesten Kreationen und den Alltag im Secret Garden",
    "instagram.configure": "Instagram Feed wird hier angezeigt",
    "instagram.visitPage": "Besuche unsere Instagram Seite",
    "instagram.follow": "Folge uns auf Instagram:",
    
    // Contact
    "contact.title": "Kontakt",
    "contact.address": "Adresse",
    "contact.phone": "Telefon",
    "contact.hours": "Öffnungszeiten",
    "contact.hours.days": "Montag - Samstag",
    "contact.hours.time": "11:00 - 19:00 Uhr",
    "contact.hours.closed": "Feiertags geschlossen",
    "contact.social": "Social Media",
    "contact.social.desc": "Folgen Sie uns für Updates und Tagesmenüs",
    "contact.garden": "Eingang zum Secret Garden im Raimundhof",
    "contact.call": "Jetzt Anrufen",
  },
  en: {
    // Hero
    "hero.title": "My Secret Garden",
    "hero.subtitle": "Vegetarian & Vegan Restaurant",
    "hero.address": "Mariahilferstraße 45 – Im Raimundhof – 1060 Vienna",
    "hero.hours": "Open Mon-Sat from 11am-7pm",
    "hero.dailyMenu": "Today's Menu",
    "hero.fullMenu": "Full Menu",
    "hero.about": "About Us",
    "hero.products": "Our Products",
    
    // Navigation
    "nav.menu": "Menu",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.privacy": "Privacy",
    
    // About
    "about.title": "About US",
    "about.intro": "We serve delightful taste. Experience an exciting vegetarian & vegan cuisine with flavorful dishes from around the world.",
    "about.bio": "organic",
    "about.fair": "fair",
    "about.regional": "regional",
    "about.seasonal": "seasonal",
    "about.p1": "We love organic, fair, regional and seasonal. In the morning, Dogi from Naschmarkt and Biogast deliver farm-fresh vegetables, crisp salads and organic grains, which our chefs transform with talent, creativity and aromatic herbs and authentic spices into healthy meals that satisfy and give you energy for the day.",
    "about.p2": "Our environmentally friendly 'TO GO' boxes make it quick and easy to take our dishes anywhere and enjoy them.",
    "about.p3": "From Monday to Saturday, from 11:00 to 19:00, we serve warm meals, hearty salads, specialty coffee including vegan milk options, and refined hot beverages, as well as homemade cakes and raw vegan sweet treats. Gluten-free options are always available!",
    "about.p4": "In addition to our two cozy dining rooms, our quiet, green courtyard in Biedermeier style beckons, only 80 meters from busy Mariahilferstraße. Come visit us! 🙂",
    
    // Philosophy
    "philosophy.title": "Our Inspiration",
    "philosophy.sri.title": "Sri Chinmoy",
    "philosophy.sri.subtitle": "Spiritual Master, Poet, Artist and Peace Ambassador (1931–2007)",
    "philosophy.sri.intro": "Behind My Secret Garden lies a profound source of inspiration – a man whose life itself was a work of art.",
    "philosophy.sri.story1": "Sri Chinmoy was born in Bengal in 1931 and spent twenty years in a spiritual ashram, immersing himself deeply in meditation and inner discipline. In 1964, following an inner calling, he moved to New York to share his message of inner peace and harmony with the Western world.",
    "philosophy.sri.story2": "What made him unique: he lived what he taught. He composed over 23,000 songs, created more than 200,000 paintings, wrote 1,600 books, and gave over 800 peace concerts worldwide – all from a state of meditation. For him, every action was a form of prayer, every meal an act of gratitude.",
    "philosophy.sri.story3": "Sri Chinmoy inspired people from all walks of life – from UN Secretary-Generals to Olympic athletes – always with the same message: the path to outer peace leads through inner peace.",
    "philosophy.sri.quote": "Never try to improve the world. Try only to improve your own life, and you will find that you have improved the world around you.",
    "philosophy.sri.author": "Sri Chinmoy",
    "philosophy.sri.influence": "This philosophy permeates every corner of our restaurant. The vegetarian cuisine, the meditative atmosphere, the dedication in preparation – all of this springs from Sri Chinmoy's vision that food should nourish not only the body but also the soul. My Secret Garden is our humble attempt to carry his teachings into the world.",
    "philosophy.sri.link": "Learn more about Sri Chinmoy",
    "philosophy.vision.title": "Our Vision",
    "philosophy.vision.intro": "It is close to our hearts that the world becomes a better and more beautiful place. Inspired by Sri Chinmoy's teachings, we want to contribute to this with our work, our lifestyle and our consciousness.",
    "philosophy.vision.harmony": "We use meditation to bring harmony and consciousness into our activities. Family atmosphere and warmth are highly valued, and our spiritual background provides that extra joy of life.",
    "philosophy.quote.intro": "At Secret Garden we strive",
    "philosophy.quote.main": "to create an oasis of peace and conscious enjoyment.",
    "philosophy.quote.line1": "A retreat",
    "philosophy.quote.line2": "from the hustle and bustle of everyday life,",
    "philosophy.quote.line3": "where you can let your soul unwind",
    "philosophy.quote.line4": "and find nourishment for body and mind.",
    "philosophy.quote.heart": "A heart-garden full of secrets …",
    "philosophy.quote.revelation": "and revelations!",
    "philosophy.feature1.title": "Cooked with Heart",
    "philosophy.feature1.desc": "Every dish is prepared with love and mindfulness",
    "philosophy.feature2.title": "Spiritual Atmosphere",
    "philosophy.feature2.desc": "A place of peace and conscious enjoyment",
    "philosophy.feature3.title": "Conscious Community",
    "philosophy.feature3.desc": "Family atmosphere and warm encounters",
    
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
    
    // Products
    "products.title": "Our Products",
    "products.subtitle": "Discover our carefully selected products – from fresh organic ingredients to homemade specialties",
    "products.featured": "Featured Products",
    "products.all": "All Products",
    "products.clickToLearnMore": "Click for more information",
    
    // Reviews
    "reviews.title": "What YOU say",
    
    // Instagram
    "instagram.title": "Follow us on Instagram",
    "instagram.subtitle": "Discover our latest creations and daily life at Secret Garden",
    "instagram.configure": "Instagram feed will be displayed here",
    "instagram.visitPage": "Visit our Instagram page",
    "instagram.follow": "Follow us on Instagram:",
    
    // Contact
    "contact.title": "Contact",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.hours": "Opening Hours",
    "contact.hours.days": "Monday - Saturday",
    "contact.hours.time": "11:00 AM - 7:00 PM",
    "contact.hours.closed": "Closed on holidays",
    "contact.social": "Social Media",
    "contact.social.desc": "Follow us for updates and daily menus",
    "contact.garden": "Entrance to Secret Garden in Raimundhof",
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
