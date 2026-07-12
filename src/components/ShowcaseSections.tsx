import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock, MapPin } from "lucide-react";
import { SITE } from "@/config/site";
import tavolataDallAlto from "@/assets/photos/tavolata-dall-alto.jpg";
import gardenCourtyard from "@/assets/photos/garden-courtyard.jpg";

export const ShowcaseSections = () => {
  const { language } = useLanguage();

  return (
    <>
      {/* SHOWCASE 1: Menu - Image Left, Text Right */}
      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="container mx-auto px-5 max-w-6xl lg:max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center md:p-8">
            {/* Image */}
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-elevated lg:aspect-[5/6]">
                <img
                  src={tavolataDallAlto}
                  alt={language === "de" ? "Tisch mit vegetarischen Tagesgerichten von oben" : "Table with vegetarian dishes from above"}
                  className="w-full h-full object-cover saturate-[0.96]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6 lg:max-w-lg">
              <span className="eyebrow-num">
                02 · {language === "de" ? "Heute am Tresen" : "At the counter today"}
              </span>
              <h2 className="h2-editorial text-primary">
                {language === "de" ? "Was heute gut passt" : "What works today"}
              </h2>
              <span className="rule-short" aria-hidden="true" />
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de"
                  ? "Jeden Tag kochen wir zwei Hauptgerichte und eine Suppe. Manchmal entscheidet die Saison, manchmal ein gutes Gemüse, das morgens in der Küche steht."
                  : "Every day we cook two main dishes and a soup. Sometimes the season decides, sometimes it is a good vegetable that arrives in the morning."}
              </p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de"
                  ? "Und ja, ein paar Klassiker bleiben. Manche bestellt ihr einfach zu oft."
                  : "And yes, a few classics stay. People ask for them too often."}
              </p>
              <Button className="font-work" asChild>
                <Link to="/menu">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {language === "de" ? "Speisekarte ansehen" : "View Menu"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE 2: Visit - Text Left, Image Right (Reversed) */}
      <section className="py-20 md:py-28 lg:py-32 bg-verde-tint">
        <div className="container mx-auto px-5 max-w-6xl lg:max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center md:p-8">
            {/* Text - Left on desktop */}
            <div className="space-y-6 order-2 md:order-1 lg:max-w-lg">
              <span className="eyebrow-num">
                03 · {language === "de" ? "Unser Garten" : "Our garden"}
              </span>
              <h2 className="h2-editorial text-primary">
                {language === "de" ? "Der Hof hinter dem Bogen" : "The courtyard behind the arch"}
              </h2>
              <span className="rule-short" aria-hidden="true" />
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de" 
                  ? "Du gehst durch den Bogen an der Mariahilferstraße. Ein paar Schritte später wird es leiser, und der Raimundhof öffnet sich." 
                  : "You walk through the arch on Mariahilferstraße. A few steps later it gets quieter, and Raimundhof opens up."}
              </p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de" 
                  ? "Pflanzen, Holztische, Teller vom Tresen. Kein großes Theater, eher ein guter Platz für eine Pause." 
                  : "Plants, wooden tables, plates from the counter. No big show, just a good place to pause."}
              </p>
              <div className="rounded-lg border border-border/70 bg-background/60 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h3 className="font-work text-sm font-semibold text-foreground">
                    {language === "de" ? "Öffnungszeiten" : "Opening hours"}
                  </h3>
                </div>
                <p className="font-work text-sm leading-relaxed text-muted-high-contrast">
                  {language === "de" ? "Montag bis Samstag: 11:00 bis 19:00" : "Monday to Saturday: 11:00 to 19:00"}<br />
                  {language === "de" ? "Sonn- und Feiertage geschlossen." : "Closed on Sundays and public holidays."}
                </p>
              </div>
              <Button variant="outline" className="font-work group" asChild>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.gtag?.('event', 'click_directions', { event_category: 'engagement', event_label: 'visit_section' })}
                  aria-label={language === "de" ? "Route auf Google Maps (öffnet in neuem Tab)" : "Directions on Google Maps (opens in new tab)"}
                  className="inline-flex items-center gap-2 transition-all duration-200 ease-in-out"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  {language === "de" ? "Route auf Google Maps" : "Directions on Google Maps"}
                </a>
              </Button>
            </div>
            
            {/* Image - Right on desktop */}
            <div className="order-1 md:order-2">
              <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-elevated lg:aspect-[5/6]">
                <img
                  src={gardenCourtyard}
                  alt={language === "de" ? "Innenhof mit Holztischen und gelben Sonnenschirmen" : "Courtyard with wooden tables and yellow umbrellas"}
                  className="w-full h-full object-cover saturate-[0.96]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
