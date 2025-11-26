import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl bg-[#F5F1E3] border-2 border-[#1E1C1A] rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-8 md:p-12" style={{ maxHeight: '90vh' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              {language === "de" ? "Diese Woche" : "This Week"}
            </p>
            <h2 className="text-4xl md:text-5xl font-caveat font-bold text-primary mb-2">
              {language === "de" ? "Wochenkarte" : "Weekly Menu"}
            </h2>
            <p className="text-lg font-lora text-foreground/80">
              {menu.period}
            </p>
          </div>

          {/* Menu content in columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menu.days.map((day, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-lora text-xl text-primary font-bold border-b-2 border-primary/20 pb-2">
                  {day.day[language]}
                </h3>
                
                {/* Soup */}
                {day.soup[language] && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                      {language === "de" ? "Suppe" : "Soup"}
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">
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
                    <p className="text-sm text-foreground/90 leading-relaxed">
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
                    <p className="text-sm text-foreground/90 leading-relaxed">
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

          {/* Footer info */}
          <div className="mt-8 pt-6 border-t border-border/30 text-center">
            <p className="text-sm text-muted-foreground">
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
