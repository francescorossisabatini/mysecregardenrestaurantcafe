import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { translatePeriod } from "@/lib/translatePeriod";
import { MENU_PRICES } from "@/constants/menuPrices";

interface WeeklyMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const introText = {
  de: `Jeden Tag haben Sie die Wahl zwischen zwei frischen, saisonalen Tagesgerichten für ${MENU_PRICES.DISH}. Das 'grüne' bereiten wir immer vegan & glutenfrei zu – das 'blaue' kann auch mal Milchprodukte, glutenhaltiges Getreide oder Ei enthalten.`,
  en: `Every day you have the choice between two fresh, seasonal daily dishes for ${MENU_PRICES.DISH}. We always prepare the 'green' vegan & gluten-free - the 'blue' may also contain dairy products, gluten-containing grains or eggs.`,
};

const soupInfo = {
  de: `Unsere schmackhaften Tagessuppen sind immer vegan & glutenfrei und gibt's klein um ${MENU_PRICES.SOUP_SMALL} / groß um ${MENU_PRICES.SOUP_LARGE}. Ein frisches Bio-Weckerl dazu? – ${MENU_PRICES.ROLL_EXTRA}`,
  en: `Our delicious daily soups are always vegan & gluten-free and are available small for ${MENU_PRICES.SOUP_SMALL} / large for ${MENU_PRICES.SOUP_LARGE}. A fresh organic roll with it? - ${MENU_PRICES.ROLL_EXTRA}`,
};

export const WeeklyMenuDialog = ({ open, onOpenChange }: WeeklyMenuDialogProps) => {
  const { menu } = useWeeklyMenu();
  const { language } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-cream">
        <DialogHeader className="pb-4 border-b-2 border-primary/20">
          <DialogTitle className="text-3xl md:text-4xl font-caveat font-bold text-primary text-center">
            {language === 'de' ? 'Wochenkarte' : 'Weekly Menu'}
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground font-lora pt-1">
            {translatePeriod(menu.period, language)}
          </p>
        </DialogHeader>

        {/* Info boxes - Gestalt: Proximity & Similarity */}
        <div className="grid md:grid-cols-2 gap-3 mt-4 mb-6">
          <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
            <p className="text-sm leading-relaxed text-foreground/90">{introText[language]}</p>
          </div>
          <div className="bg-accent/5 border-l-4 border-accent p-4 rounded-r-lg">
            <p className="text-sm leading-relaxed text-foreground/90">{soupInfo[language]}</p>
          </div>
        </div>

        {/* Days grid - Gestalt: Proximity, Figure/Ground, Similarity */}
        <div className="space-y-4">
          {menu.days.map((dayMenu, idx) => (
            <Card
              key={idx}
              className="bg-background/60 backdrop-blur-sm border-2 border-border/50 p-4 md:p-6 hover:shadow-lg transition-all"
            >
              {/* Day header - Gestalt: Continuity */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-primary/30">
                <h3 className="text-2xl md:text-3xl font-caveat font-bold text-primary">
                  {dayMenu.day[language]}
                </h3>
                <Badge variant="outline" className="text-xs uppercase tracking-wider border-primary/40">
                  {language === 'de' ? 'Bio & Frisch' : 'Organic & Fresh'}
                </Badge>
              </div>

              {/* Dishes grid - Gestalt: Proximity & Grouping */}
              <div className="space-y-4">
                {/* Soup - Gestalt: Similarity through consistent styling */}
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-muted-foreground/40 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {language === 'de' ? 'Suppe' : 'Soup'}
                      </span>
                      <Separator className="flex-1" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{dayMenu.soup[language]}</p>
                  </div>
                </div>

                {/* Green Dish - Gestalt: Color coding for grouping */}
                <div className="flex gap-3 items-start bg-primary/10 p-3 rounded-lg border-l-4 border-primary">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-0.5">
                        {language === 'de' ? 'Grün' : 'Green'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{MENU_PRICES.DISH}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground font-medium">{dayMenu.green[language]}</p>
                  </div>
                </div>

                {/* Blue Dish - Gestalt: Color coding for grouping */}
                {dayMenu.blue && (dayMenu.blue.de || dayMenu.blue.en) && (
                  <div className="flex gap-3 items-start bg-primary/10 p-3 rounded-lg border-l-4 border-primary">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-0.5">
                          {language === 'de' ? 'Blau' : 'Blue'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{MENU_PRICES.DISH}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground font-medium">
                        {dayMenu.blue[language] || dayMenu.blue.de || dayMenu.blue.en}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Price footer - Gestalt: Closure & Figure/Ground */}
        <div className="mt-6 p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
          <p className="text-sm text-center font-lora">
            <span className="font-bold text-primary">{language === 'de' ? 'Preise:' : 'Prices:'}</span>{' '}
            <span className="text-foreground/80">
              {language === 'de' 
                ? `Tagesgerichte ${MENU_PRICES.DISH} • Suppe klein ${MENU_PRICES.SOUP_SMALL} / groß ${MENU_PRICES.SOUP_LARGE} • Bio-Weckerl +${MENU_PRICES.ROLL_EXTRA}`
                : `Daily dishes ${MENU_PRICES.DISH} • Soup small ${MENU_PRICES.SOUP_SMALL} / large ${MENU_PRICES.SOUP_LARGE} • Organic roll +${MENU_PRICES.ROLL_EXTRA}`}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
