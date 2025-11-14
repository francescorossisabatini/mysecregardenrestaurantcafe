import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Leaf, Wheat } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const weeklyMenu = {
  period: "10-15. November",
  days: [
    {
      day: { de: "Montag", en: "Monday" },
      soup: "Erdäpfel-Champignoncremesuppe",
      green: "Grünes Pattaya-Curry mit Zucchini, Kohlrabi, Brokkoli, Erbsen, Kartoffeln und Spinat in milden Limetten-Kokosmilchsauce mit frischem Koriander und Ingwer; dazu Bio-Basmati-Vollkornreis und bunter Salat.",
      blue: "Afrikanischer Raglan-Eintopf mit Schwarzaugenbohnen und Süßkartoffeln; dazu Bio-Quinoa, Cashew-Aioli und bunter Salat mit Zitronen-Tahinidressing.",
    },
    {
      day: { de: "Dienstag", en: "Tuesday" },
      soup: "Brokkolicremesuppe",
      green: "Spinat & Kichererbsen-Curry mit Karotten und Süßkartoffeln in cremiger Tomaten-Kokosmilchsauce mit authentischen indischen Gewürzen; dazu duftiger Jasminreis und bunter Salat.",
      blue: "Mexican Bowl mit Salat, Bio-Basmati Vollkornreis, Kidneybohnepaste, Bio-Röstmais, Nachos, Pico de Gallo und Avocadodip.",
    },
    {
      day: { de: "Mittwoch", en: "Wednesday" },
      soup: "Gelbe Linsensuppe mit Dill",
      green: "Baigan Takari Curry: Melanzani und buntem Paprika in cremiger Tomaten-Kokosmilchsauce mit Garam Masala Gewürzmischung, frischem Koriander und Ingwer; dazu Bio-Basmati Vollkornreis und bunter Salat.",
      blue: "Penne al forno aus glutenfreien Italienischen Bio-Nudeln mit aromatischen Bio-Soja, Spinat, Karotten und frischem Basilikum in zitroniger Tomaten-Kapern-Sauce; dazu bunter Salat mit Tahini-Dressing.",
    },
    {
      day: { de: "Donnerstag", en: "Thursday" },
      soup: "Chinesische Pak Choy Suppe mit Austernpilzen",
      green: "Bengalisches Curry aus Hokkaidokürbis, Erdäpfeln, grünen Erbsen und Kichererbsen in aromatischer Garam-Masala-Sauce mit authentischen indischen Gewürzen und frischem Ingwer; dazu duftiger Jasminreis und bunter Salat.",
      blue: "Türkische Brathähnchenbowl mit gerösteten Karotten, Brokkoli, Pilaw, Korinthen und Pinienkernen, Dill-Joghurt-Sauce und unserem Haussalat mit Zitronen-Tahini-Dressing.",
      blueNote: { de: "vegetarisch & glutenfrei", en: "vegetarian & gluten-free" },
    },
    {
      day: { de: "Freitag", en: "Friday" },
      soup: "Blumenkohl-Mandelcremesuppe",
      green: "Balinesisches Erdnusscurry mit Karotten, Brokkoli, Erdäpfeln, gelbe Bohnen und Champignons in duftender Erdnuss-Kokossauce; dazu Bio-Basmati Vollkornreis und bunter Salat.",
      blue: "Griechisches Moussaka: überbackene Erdäpfel, Bio-Soja-Faschiertes, Melanzani, Tomaten und vegane Bechamel-Sauce; dazu bunter Salat.",
    },
    {
      day: { de: "Samstag", en: "Saturday" },
      soup: "Fenchel-Erdäpfelcremesuppe",
      green: "Karibisches Curry: Rote und gelbe Paprika, Süßkartoffel, Karotten und Zucchini in fruchtiger Orangen-Kokosmilchsauce mit Limettenblättern und Zitronengras; dazu Bio-Basmati-Vollkornreis und bunter Salat.",
      blue: "Ofen-Champignons auf grünen Erbsenpüree und Ofenkartoffeln mit geröstetem Brokkoli und Tahini-Dressing, bestreut mit Haselnusskrokant; dazu bunter Salat.",
    },
  ],
};

export const MenuHighlight = () => {
  const { t, language } = useLanguage();
  
  return (
    <section id="menu" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <UtensilsCrossed className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              {t("menu.title")}
            </h2>
            
            <p className="text-lg md:text-xl mb-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("menu.weeklyUpdate")}
            </p>
            
            <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-8">
              {t("menu.description")}
            </p>
          </div>

          {/* Weekly Menu */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              {t("menu.weeklyMenu")} {weeklyMenu.period}
            </h3>

            <div className="grid gap-6 md:gap-8">
              {weeklyMenu.days.map((day, index) => (
                <Card key={index} className="p-6 md:p-8 bg-card border-border">
                  <h4 className="text-xl md:text-2xl font-bold mb-6 text-primary">
                    {day.day[language]}
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Soup */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
                          {t("menu.soup")}
                        </Badge>
                        <div className="flex gap-1">
                          <Leaf className="w-4 h-4 text-green-600" />
                          <Wheat className="w-4 h-4 text-amber-600 line-through" />
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-foreground">{day.soup}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t("menu.soupPrice")}</p>
                    </div>

                    {/* Green Dish */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700">
                          {t("menu.greenDish")}
                        </Badge>
                        <div className="flex gap-1">
                          <Leaf className="w-4 h-4 text-green-600" />
                          <Wheat className="w-4 h-4 text-amber-600 line-through" />
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-foreground">{day.green}</p>
                    </div>

                    {/* Blue Dish */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700">
                          {t("menu.blueDish")}
                        </Badge>
                        {day.blueNote && (
                          <span className="text-xs text-muted-foreground italic">
                            ({day.blueNote[language]})
                          </span>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-foreground">{day.blue}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Info */}
          <Card className="p-6 bg-primary/5 border-primary/20 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              {t("menu.dailyDishPrice")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("menu.soupInfo")}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
