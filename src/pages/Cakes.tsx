import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cake, Clock, Phone } from "lucide-react";
import { cakeCatalog } from "@/components/CakeOrderForm";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import tortaImage from "@/assets/torta-2.jpg";

const descriptions = {
  de: [
    "Dunkel, weich und klassisch für Schokoladenmomente.",
    "Nussig, mild und mit feiner Mohnnote.",
    "Gewürze, Karotte und ein warmes hausgemachtes Gefühl.",
    "Saftig, kompakt und für Brownie-Liebhaber.",
    "Süß-salzig, cremig und sehr beliebt am Tresen.",
    "Vegan, cashewbasiert und angenehm frisch.",
  ],
  en: [
    "Dark, soft and classic for chocolate moments.",
    "Nutty, gentle and finished with poppy seed depth.",
    "Spice, carrot and a warm homemade feeling.",
    "Dense, moist and made for brownie lovers.",
    "Sweet-salty, creamy and loved at the counter.",
    "Vegan, cashew-based and pleasantly fresh.",
  ],
} as const;

const copy = {
  de: {
    eyebrow: "Hausgemachte Torten",
    title: "Torten aus unserer Küche",
    intro: "Jede Torte wird im Garten gebacken: einfache Zutaten, ehrliche Geschmäcker und kein Marzipan-Theater. Du kannst eine ganze Torte für Geburtstage, kleine Feiern oder einfach einen guten Sonntag vorbestellen.",
    leadTitle: "Wie es funktioniert",
    lead1: "Bestellung mindestens 5 Tage im Voraus",
    lead2: "Abholung im Restaurant, Mo bis Sa",
    lead3: "Zahlung an der Kasse bei Abholung",
    price: "€ 39,00",
    orderCta: "Jetzt eine Torte bestellen",
    callCta: "Anrufen",
    catalogTitle: "Die aktuellen Sorten",
    catalogIntro: "Verfügbarkeit kann je nach Saison wechseln.",
  },
  en: {
    eyebrow: "Homemade cakes",
    title: "Cakes from our kitchen",
    intro: "Every cake is baked in the garden: simple ingredients, honest flavours and no marzipan theatre. You can pre-order a whole cake for birthdays, small celebrations or simply a good Sunday.",
    leadTitle: "How it works",
    lead1: "Order at least 5 days in advance",
    lead2: "Pickup at the restaurant, Mon to Sat",
    lead3: "Payment at the counter on pickup",
    price: "€ 39.00",
    orderCta: "Order a cake now",
    callCta: "Call us",
    catalogTitle: "Current selection",
    catalogIntro: "Availability may vary with the season.",
  },
} as const;

const Cakes = () => {
  const { language } = useLanguage();
  const labels = copy[language];

  useEffect(() => {
    window.gtag?.("event", "cakes_page_view", { event_category: "engagement" });
  }, []);

  return (
    <div className="min-h-screen bg-section-soft">
      <SEOHead
        title={language === "de" ? "Torten | My Secret Garden" : "Cakes | My Secret Garden"}
        description={language === "de" ? "Hausgemachte Torten von My Secret Garden zum Vorbestellen in Wien." : "Homemade cakes from My Secret Garden available for pre-order in Vienna."}
        path="/cakes"
      />
      <SkipLink />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Hero */}
        <section className="bg-section-accent">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-24">
            <div>
              <p className="font-work text-xs font-semibold uppercase tracking-[0.18em] text-accent">{labels.eyebrow}</p>
              <h1 className="mt-3 font-cormorant text-5xl font-semibold leading-tight text-primary md:text-6xl">{labels.title}</h1>
              <p className="mt-5 font-lora text-lg leading-relaxed text-foreground/85">{labels.intro}</p>

              <div className="mt-8 grid gap-3 rounded-lg border border-border bg-card/80 p-5">
                <p className="font-work text-sm font-semibold uppercase tracking-wider text-foreground">{labels.leadTitle}</p>
                <ul className="grid gap-2 text-sm leading-relaxed text-muted-high-contrast">
                  <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />{labels.lead1}</li>
                  <li className="flex items-start gap-2"><Cake className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />{labels.lead2}</li>
                  <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />{labels.lead3}</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="font-work">
                  <Link to="/order" onClick={() => window.gtag?.("event", "cakes_order_cta_click", { event_category: "conversion", source: "cakes_hero" })}>
                    {labels.orderCta}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-work">
                  <a href="tel:+4315864156" onClick={() => window.gtag?.("event", "cakes_call_click", { event_category: "conversion" })}>
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    {labels.callCta}
                  </a>
                </Button>
              </div>
            </div>

            <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
              <img
                src={tortaImage}
                alt={language === "de" ? "Hausgemachte Torte aus dem Garten" : "Homemade cake from the garden"}
                className="h-full w-full object-cover saturate-[0.96]"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <header className="max-w-2xl">
            <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-5xl">{labels.catalogTitle}</h2>
            <p className="mt-3 font-lora text-base leading-relaxed text-muted-high-contrast">{labels.catalogIntro}</p>
          </header>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cakeCatalog.map((cake, index) => (
              <article key={cake} className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card">
                <p className="font-work text-xs font-semibold uppercase tracking-[0.1em] text-accent">{labels.price}</p>
                <h3 className="mt-2 font-cormorant text-2xl font-semibold leading-tight text-foreground">{cake}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-high-contrast">{descriptions[language][index]}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-lora text-base leading-relaxed text-foreground">
              {language === "de" ? "Bereit, deine Torte vorzubestellen?" : "Ready to pre-order your cake?"}
            </p>
            <Button asChild size="lg" className="font-work">
              <Link to="/order" onClick={() => window.gtag?.("event", "cakes_order_cta_click", { event_category: "conversion", source: "cakes_catalog" })}>
                {labels.orderCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cakes;
