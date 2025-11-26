import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BotanicalDecoration } from "./BotanicalDecoration";

interface MenuDay {
  day: { de: string; en: string };
  soup: { de: string; en: string };
  green: { de: string; en: string };
  greenNote?: { de: string; en: string };
  blue: { de: string; en: string };
  blueNote?: { de: string; en: string };
}

interface WeeklyMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: {
    period: string;
    days: MenuDay[];
  };
}

export const WeeklyMenuModal = ({ isOpen, onClose, menu }: WeeklyMenuModalProps) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  // Fixed menu items data
  const fixedDishes = {
    salads: {
      de: [
        { name: "Bunter Salat", price: "5,90 / 9,90 €", size: "klein / groß" },
        { name: "Secret Garden Salat mit Avocado", price: "16,90 €" },
        { name: "Secret Garden Salat mit Ziegenkäse", price: "16,90 €" },
        { name: "Secret Garden Salat mit Tofu", price: "16,90 €" }
      ],
      en: [
        { name: "Colorful Salad", price: "5,90 / 9,90 €", size: "small / large" },
        { name: "Secret Garden Salad with Avocado", price: "16,90 €" },
        { name: "Secret Garden Salad with Goat Cheese", price: "16,90 €" },
        { name: "Secret Garden Salad with Tofu", price: "16,90 €" }
      ]
    },
    dal: {
      de: { name: "Indisches Dal", price: "9,90 €", description: "mit Bio-Naturreis" },
      en: { name: "Indian Dal", price: "9,90 €", description: "with organic brown rice" }
    },
    drinks: {
      de: [
        { name: "Ingwer-Limonade (hausgemacht)", price: "3,00 / 4,70 €" },
        { name: "Hausgemachter Eistee", price: "3,50 €" },
        { name: "Apfelsaft naturtrüb", price: "3,40 / 5,30 €" },
        { name: "Kokoswasser", price: "3,50 / 5,50 €" }
      ],
      en: [
        { name: "Ginger Lemonade (homemade)", price: "3,00 / 4,70 €" },
        { name: "Homemade Iced Tea", price: "3,50 €" },
        { name: "Cloudy Apple Juice", price: "3,40 / 5,30 €" },
        { name: "Coconut Water", price: "3,50 / 5,50 €" }
      ]
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl bg-[#F5F1E3] border-4 border-primary/30 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Decorative botanical corners */}
        <BotanicalDecoration
          variant="flower"
          className="absolute top-4 left-4 w-20 h-20 text-primary/10 pointer-events-none"
        />
        <BotanicalDecoration
          variant="leaf"
          className="absolute top-4 right-4 w-20 h-20 text-accent/10 pointer-events-none"
        />
        <BotanicalDecoration
          variant="flower"
          className="absolute bottom-4 left-4 w-20 h-20 text-accent/10 pointer-events-none"
        />
        <BotanicalDecoration
          variant="leaf"
          className="absolute bottom-4 right-4 w-20 h-20 text-primary/10 pointer-events-none"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-12" style={{ maxHeight: '90vh' }}>
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wider">
              {language === "de" ? "Diese Woche" : "This Week"}
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-caveat font-bold text-primary mb-2">
              {language === "de" ? "Wochenkarte" : "Weekly Menu"}
            </h2>
            <p className="text-base sm:text-lg font-lora text-foreground/80">
              {menu.period}
            </p>
          </div>

          {/* TAGESGERICHTE - Daily dishes */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-2xl sm:text-3xl font-caveat font-bold text-primary text-center mb-6">
              {language === "de" ? "Tagesgerichte" : "Daily Specials"}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {menu.days.map((day, idx) => (
                <div key={idx} className="space-y-2 bg-background/20 p-4 rounded-lg">
                  <h4 className="font-lora text-base sm:text-lg text-primary font-bold border-b border-primary/20 pb-1">
                    {day.day[language]}
                  </h4>
                  
                  {/* Soup */}
                  {day.soup[language] && (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                        {language === "de" ? "Suppe" : "Soup"}
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {day.soup[language]}
                      </p>
                      <p className="text-xs text-muted-foreground">4,50 / 6,50 €</p>
                    </div>
                  )}
                  
                  {/* Green dish */}
                  {day.green[language] && (
                    <div className="space-y-1">
                      <Badge className="bg-accent text-accent-foreground text-xs mb-1">
                        {language === "de" ? "Grün" : "Green"}
                      </Badge>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {day.green[language]}
                      </p>
                      {day.greenNote && day.greenNote[language] && (
                        <p className="text-xs text-muted-foreground italic">
                          {day.greenNote[language]}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">15,20 €</p>
                    </div>
                  )}

                  {/* Blue dish */}
                  {day.blue && day.blue[language] && (
                    <div className="space-y-1">
                      <Badge className="bg-primary text-primary-foreground text-xs mb-1">
                        {language === "de" ? "Blau" : "Blue"}
                      </Badge>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {day.blue[language]}
                      </p>
                      {day.blueNote && day.blueNote[language] && (
                        <p className="text-xs text-muted-foreground italic">
                          {day.blueNote[language]}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">15,20 €</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8 bg-border/30" />

          {/* SALATE - Salads */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-2xl sm:text-3xl font-caveat font-bold text-primary text-center mb-4">
              {language === "de" ? "Frische Salate" : "Fresh Salads"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
              {fixedDishes.salads[language].map((salad, idx) => (
                <div key={idx} className="flex justify-between items-start gap-3 bg-background/20 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-medium">{salad.name}</p>
                    {salad.size && (
                      <p className="text-xs text-muted-foreground">({salad.size})</p>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-light whitespace-nowrap">{salad.price}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8 bg-border/30" />

          {/* DAL / EINTÖPFE */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-2xl sm:text-3xl font-caveat font-bold text-primary text-center mb-4">
              {language === "de" ? "Dal / Eintöpfe" : "Dal / Stews"}
            </h3>
            <div className="flex justify-between items-start gap-3 bg-background/20 p-4 rounded-lg max-w-2xl mx-auto">
              <div className="flex-1">
                <p className="text-sm sm:text-base font-medium">{fixedDishes.dal[language].name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{fixedDishes.dal[language].description}</p>
              </div>
              <span className="text-xs sm:text-sm font-light whitespace-nowrap">{fixedDishes.dal[language].price}</span>
            </div>
          </div>

          <Separator className="my-8 bg-border/30" />

          {/* GETRÄNKE - Drinks */}
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-caveat font-bold text-primary text-center mb-4">
              {language === "de" ? "Kalte Getränke" : "Cold Drinks"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 md:gap-3 max-w-3xl mx-auto">
              {fixedDishes.drinks[language].map((drink, idx) => (
                <div key={idx} className="flex justify-between items-center gap-3 bg-background/20 p-2 rounded">
                  <span className="text-xs sm:text-sm font-light">{drink.name}</span>
                  <span className="text-xs sm:text-sm font-light whitespace-nowrap">{drink.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-8 pt-6 border-t border-border/30 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {language === "de" 
                ? "Alle Preise in Euro · Änderungen vorbehalten" 
                : "All prices in Euro · Subject to change"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
