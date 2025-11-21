import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Wheat } from "lucide-react";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { useLanguage } from "@/contexts/LanguageContext";

interface WeeklyMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const introText = {
  de: "Jeden Tag haben Sie die Wahl zwischen zwei frischen, saisonalen Tagesgerichten für 15.20€. Das 'grüne' bereiten wir immer vegan & glutenfrei zu – das 'blaue' kann auch mal Milchprodukte, glutenhaltiges Getreide oder Ei enthalten.",
  en: "Every day you have the choice between two fresh, seasonal daily dishes for 15.20€. We always prepare the 'green' vegan & gluten-free - the 'blue' may also contain dairy products, gluten-containing grains or eggs."
};

const soupInfo = {
  de: "Unsere schmackhaften Tagessuppen sind immer vegan & glutenfrei und gibt's klein um 4.50€ / groß um 6.50€. Ein frisches Bio-Weckerl dazu? – 1.90€",
  en: "Our delicious daily soups are always vegan & gluten-free and are available small for 4.50€ / large for 6.50€. A fresh organic roll with it? - 1.90€"
};

export const WeeklyMenuDialog = ({ open, onOpenChange }: WeeklyMenuDialogProps) => {
  const { menu } = useWeeklyMenu();
  const { language } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-primary">
            {language === 'de' ? 'Wochenkarte' : 'Weekly Menu'} {menu.period}
          </DialogTitle>
          <DialogDescription className="text-base pt-4 space-y-2">
            <p>{introText[language]}</p>
            <p className="text-sm text-muted-foreground italic">{soupInfo[language]}</p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {menu.days.map((dayMenu, idx) => (
            <Card
              key={idx}
              className="p-6 hover:shadow-soft transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                {dayMenu.day[language]}
              </h3>

              {/* Soup */}
              <div className="mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-sm px-3 py-1 font-semibold border-2">
                    {language === 'de' ? 'Suppe des Tages' : 'Soup of the Day'}
                  </Badge>
                  <div className="flex gap-1.5">
                    <Leaf className="w-5 h-5 text-primary" />
                    <Wheat className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-foreground text-base leading-relaxed mb-2">{dayMenu.soup[language]}</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {language === 'de' ? 'vegan & glutenfrei' : 'vegan & gluten-free'}
                </p>
              </div>

              {/* Green Dish */}
              <div className="mb-6 pb-4 bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-accent text-accent-foreground text-base px-4 py-1.5 font-bold">
                    {language === 'de' ? 'TAGESGERICHT GRÜN' : 'DAILY DISH GREEN'}
                  </Badge>
                  <div className="flex gap-1.5">
                    <Leaf className="w-5 h-5 text-accent" />
                    <Wheat className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-foreground font-medium text-base leading-relaxed mb-2">{dayMenu.green[language]}</p>
                <p className="text-sm text-accent font-bold">
                  {language === 'de' ? 'vegan & glutenfrei' : 'vegan & gluten-free'}
                </p>
              </div>

              {/* Blue Dish */}
              {dayMenu.blue && (dayMenu.blue.de || dayMenu.blue.en) && (
                <div className="bg-blue/5 p-4 rounded-lg border-l-4 border-blue">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue text-blue-foreground text-base px-4 py-1.5 font-bold">
                      {language === 'de' ? 'TAGESGERICHT BLAU' : 'DAILY DISH BLUE'}
                    </Badge>
                    <div className="flex gap-1.5">
                      <Leaf className="w-5 h-5 text-blue" />
                      <Wheat className="w-5 h-5 text-blue" />
                    </div>
                  </div>
                  <p className="text-foreground font-medium text-base leading-relaxed mb-2">
                    {dayMenu.blue[language] || dayMenu.blue.de || dayMenu.blue.en}
                  </p>
                  <p className="text-sm text-blue font-bold">
                    {language === 'de' ? 'vegan & glutenfrei' : 'vegan & gluten-free'}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>{language === 'de' ? 'Preis:' : 'Price:'}</strong> {language === 'de' ? 'Tagesgerichte 15.20€ | Suppe klein 4.50€ / groß 6.50€' : 'Daily dishes 15.20€ | Soup small 4.50€ / large 6.50€'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
