import { Link } from "react-router-dom";
import { ArrowRight, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import tortaImage from "@/assets/torta-2.jpg";

export const CakesHomeSection = () => {
  const { language } = useLanguage();

  const copy = {
    de: {
      eyebrow: "Hausgemachte Torten",
      title: "Eine Torte für deinen Anlass",
      body: "Schokolade, Karotte, vegane Cheesecake und mehr. Wir backen ganze Torten zur Vorbestellung für Geburtstage, kleine Feiern oder einfach einen guten Sonntag.",
      detail: "Mindestens 5 Tage im Voraus, Abholung im Restaurant.",
      discover: "Die Torten ansehen",
      order: "Direkt bestellen",
      alt: "Hausgemachte Torte aus dem Garten",
    },
    en: {
      eyebrow: "Homemade cakes",
      title: "A cake for your moment",
      body: "Chocolate, carrot, vegan cheesecake and more. We bake whole cakes to pre-order for birthdays, small celebrations or simply a good Sunday.",
      detail: "At least 5 days in advance, pickup at the restaurant.",
      discover: "See the cakes",
      order: "Order directly",
      alt: "Homemade cake from the garden",
    },
  } as const;

  const labels = copy[language];

  return (
    <section className="bg-section-soft py-16 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-6xl px-4 lg:max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20 md:p-8">
          <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-lg lg:aspect-[5/6]">
            <img
              src={tortaImage}
              alt={labels.alt}
              className="h-full w-full object-cover saturate-[0.96]"
              loading="lazy"
            />
          </div>

          <div className="space-y-6 lg:max-w-lg">
            <span className="font-work text-xs uppercase tracking-widest text-accent">{labels.eyebrow}</span>
            <h2 className="font-cormorant text-4xl text-primary md:text-5xl">{labels.title}</h2>
            <p className="font-lora text-lg leading-relaxed text-foreground/85">{labels.body}</p>
            <p className="font-work text-sm leading-relaxed text-muted-high-contrast">{labels.detail}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="font-work">
                <Link
                  to="/cakes"
                  onClick={() => window.gtag?.("event", "home_cakes_discover_click", { event_category: "engagement" })}
                >
                  <Cake className="mr-2 h-4 w-4" aria-hidden="true" />
                  {labels.discover}
                </Link>
              </Button>
              <Button asChild variant="outline" className="font-work">
                <Link
                  to="/order"
                  onClick={() => window.gtag?.("event", "home_cakes_order_click", { event_category: "conversion" })}
                >
                  {labels.order}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
