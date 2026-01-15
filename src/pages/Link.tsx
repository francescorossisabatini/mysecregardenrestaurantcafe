import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";
import { Phone, MapPin, CalendarDays, UtensilsCrossed } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";

const LinkPage = () => {
  const { language } = useLanguage();

  const links = [
    { href: `tel:${SITE.phoneTel}`, label: { de: "Jetzt anrufen", en: "Call Now" }, icon: Phone, isTel: true },
    { href: SITE.mapsUrl, label: { de: "Route anzeigen", en: "Get Directions" }, icon: MapPin, isExternal: true },
    { href: "/wochenkarte", label: { de: "Wochenmenü", en: "Weekly Specials" }, icon: CalendarDays },
    { href: "/#menu", label: { de: "Speisekarte", en: "View Menu" }, icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo className="w-16 h-16 mx-auto mb-4" showTagline={false} />
          <h1 className="font-caveat text-3xl text-primary mb-1">{SITE.name}</h1>
          <p className="text-sm text-muted-foreground font-work">
            {language === "de" ? "Vegetarisches Café & Restaurant" : "Vegetarian Café & Restaurant"}
          </p>
        </div>

        {/* Links */}
        <div className="w-full max-w-sm space-y-3">
          {links.map((link) => {
            const Icon = link.icon;
            const content = (
              <span className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-primary text-primary-foreground rounded-xl text-lg font-medium font-work shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 touch-manipulation">
                <Icon className="w-5 h-5" />
                {link.label[language]}
              </span>
            );

            if (link.isExternal || link.isTel) {
              return (
                <a key={link.href} href={link.href} target={link.isExternal ? "_blank" : undefined} rel={link.isExternal ? "noopener noreferrer" : undefined} className="block">
                  {content}
                </a>
              );
            }
            return <Link key={link.href} to={link.href} className="block">{content}</Link>;
          })}
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-work">{SITE.addressShort}</p>
          <p className="text-xs text-muted-foreground font-work mt-1">
            {language === "de" ? "Mo–Sa 11:00–19:00" : "Mon–Sat 11:00–19:00"}
          </p>
        </div>
      </div>
      
      {/* Footer with legal links */}
      <Footer />
    </div>
  );
};

export default LinkPage;
