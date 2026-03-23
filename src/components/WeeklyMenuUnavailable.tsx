import { useLanguage } from "@/contexts/LanguageContext";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const WeeklyMenuUnavailable = () => {
  const { language } = useLanguage();

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-6 md:p-8 text-center space-y-4">
      <p className="font-cormorant text-lg md:text-xl italic text-foreground/80">
        {language === "de"
          ? "Das Wochenmenü wird gerade aktualisiert."
          : "The weekly menu is being updated."}
      </p>
      <p className="text-sm text-muted-foreground font-work">
        {language === "de"
          ? "Ruf uns an, um das aktuelle Menü zu erfahren!"
          : "Call us to find out the current menu!"}
      </p>
      <Button asChild size="lg" className="gap-2 font-work">
        <a href={`tel:${SITE.phoneTel}`}>
          <Phone className="w-4 h-4" />
          {SITE.phoneDisplay}
        </a>
      </Button>
    </div>
  );
};
