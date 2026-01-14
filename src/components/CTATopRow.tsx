import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, MapPin, CalendarDays, UtensilsCrossed } from "lucide-react";
import { SITE } from "@/config/site";

type CTAType = "call" | "directions" | "weekly" | "menu";

interface CTATopRowProps {
  /** Which buttons to show */
  show: CTAType[];
  /** Optional className for the container */
  className?: string;
}

export const CTATopRow = ({ show, className = "" }: CTATopRowProps) => {
  const { language } = useLanguage();

  const buttons: Record<CTAType, { label: { de: string; en: string }; icon: React.ReactNode; href: string; isExternal?: boolean }> = {
    call: {
      label: { de: "Anrufen", en: "Call" },
      icon: <Phone className="w-4 h-4" />,
      href: `tel:${SITE.phoneTel}`,
    },
    directions: {
      label: { de: "Route", en: "Directions" },
      icon: <MapPin className="w-4 h-4" />,
      href: SITE.mapsUrl,
      isExternal: true,
    },
    weekly: {
      label: { de: "Wochenmenü", en: "Weekly Specials" },
      icon: <CalendarDays className="w-4 h-4" />,
      href: "/wochenkarte",
    },
    menu: {
      label: { de: "Speisekarte", en: "Menu" },
      icon: <UtensilsCrossed className="w-4 h-4" />,
      href: "/#menu",
    },
  };

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {show.map((type) => {
        const btn = buttons[type];
        const isPrimary = type === "call";
        
        if (btn.isExternal || type === "call") {
          return (
            <Button
              key={type}
              variant={isPrimary ? "default" : "outline"}
              size="sm"
              className="gap-2 font-work"
              asChild
            >
              <a 
                href={btn.href} 
                target={btn.isExternal ? "_blank" : undefined}
                rel={btn.isExternal ? "noopener noreferrer" : undefined}
              >
                {btn.icon}
                {btn.label[language]}
              </a>
            </Button>
          );
        }

        return (
          <Button
            key={type}
            variant="outline"
            size="sm"
            className="gap-2 font-work"
            asChild
          >
            <Link to={btn.href}>
              {btn.icon}
              {btn.label[language]}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};
