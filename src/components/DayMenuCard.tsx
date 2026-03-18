import { BotanicalDecoration } from "./BotanicalDecoration";
import { MENU_PRICES } from "@/constants/menuPrices";
import { useLanguage } from "@/contexts/LanguageContext";

interface MenuDay {
  day: { de: string; en: string };
  soup: { de: string; en: string };
  green: { de: string; en: string };
  greenNote?: { de: string; en: string };
  blue: { de: string; en: string };
  blueNote?: { de: string; en: string };
}

interface DayMenuCardProps {
  day: MenuDay;
  isToday: boolean;
}

export const DayMenuCard = ({ day, isToday }: DayMenuCardProps) => {
  const { language } = useLanguage();

  return (
    <div
      className={`
        bg-card border rounded-2xl p-6 md:p-8 h-full transition-all duration-300
        ${isToday
          ? 'border-primary/50 shadow-lg ring-2 ring-primary/20'
          : 'border-border shadow-md'
        }
      `}
    >
      {/* Day Header */}
      <div className="text-center mb-6 pb-4 border-b border-border">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-2xl md:text-3xl font-caveat font-bold text-primary">
            {day.day[language]}
          </h3>
          {isToday && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full uppercase tracking-wide">
              {language === "de" ? "Heute" : "Today"}
            </span>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-5">
        {/* Soup */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BotanicalDecoration variant="leaf" className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              {language === "de" ? "Suppe" : "Soup"}
            </span>
          </div>
          <p className="font-lora text-sm text-foreground leading-relaxed">
            {day.soup[language]}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {language === "de"
              ? `Klein ${MENU_PRICES.SOUP_SMALL} / Groß ${MENU_PRICES.SOUP_LARGE}`
              : `Small ${MENU_PRICES.SOUP_SMALL} / Large ${MENU_PRICES.SOUP_LARGE}`}
          </p>
        </div>

        {/* Green Dish */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BotanicalDecoration variant="flower" className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                {language === "de" ? "Grün" : "Green"}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">{MENU_PRICES.DISH}</span>
          </div>
          <p className="font-lora text-sm text-foreground leading-relaxed">
            {day.green[language]}
          </p>
          {day.greenNote && day.greenNote[language] && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              {day.greenNote[language]}
            </p>
          )}
        </div>

        {/* Blue Dish */}
        {day.blue && (day.blue.de || day.blue.en) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BotanicalDecoration variant="flower" className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">
                  {language === "de" ? "Blau" : "Blue"}
                </span>
              </div>
              <span className="text-sm font-bold text-primary">{MENU_PRICES.DISH}</span>
            </div>
            <p className="font-lora text-sm text-foreground leading-relaxed">
              {day.blue[language]}
            </p>
            {day.blueNote && day.blueNote[language] && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                {day.blueNote[language]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
