import { useEffect, useState } from "react";
import { CakeOrderForm, cakeCatalog } from "@/components/CakeOrderForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

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

const Cakes = () => {
  const { language } = useLanguage();
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  useEffect(() => {
    window.gtag?.("event", "cakes_page_view", { event_category: "engagement" });
  }, []);

  const openOrder = () => {
    window.gtag?.("event", "cake_order_start", { event_category: "engagement", source: "cakes" });
    setIsOrderOpen(true);
  };

  return (
    <main className="min-h-screen bg-section-soft font-work text-foreground">
      <SEOHead
        title={language === "de" ? "Torten | My Secret Garden" : "Cakes | My Secret Garden"}
        description={language === "de" ? "Hausgemachte Torten von My Secret Garden zum Vorbestellen in Wien." : "Homemade cakes from My Secret Garden available for pre-order in Vienna."}
        path="/cakes"
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">My Secret Garden</p>
          <h1 className="mt-2 font-cormorant text-5xl font-semibold leading-tight text-primary md:text-7xl">
            {language === "de" ? "Hausgemachte Torten" : "Homemade cakes"}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {language === "de" ? "Unsere sechs festen Torten können als ganze Torte vorbestellt und im Restaurant abgeholt werden." : "Our six house cakes can be pre-ordered as whole cakes and picked up at the restaurant."}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cakeCatalog.map((cake, index) => (
            <article key={cake} className="rounded-lg border border-border bg-card p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">€ 39,00</p>
              <h2 className="mt-2 font-cormorant text-3xl font-semibold leading-tight text-foreground">{cake}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{descriptions[language][index]}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {language === "de" ? "Mindestens 24h im Voraus. Bei 3 oder mehr Torten mindestens 48h." : "At least 24h in advance. For 3 or more cakes, at least 48h."}
          </p>
          <Button type="button" size="lg" className="h-12" onClick={openOrder}>{language === "de" ? "Torte bestellen" : "Order a cake"}</Button>
        </div>
      </section>

      <Sheet open={isOrderOpen} onOpenChange={setIsOrderOpen}>
        <SheetContent side="bottom" className="max-h-[92vh] overflow-y-auto rounded-t-2xl p-4 md:p-6">
          <SheetHeader className="sr-only">
            <SheetTitle>{language === "de" ? "Torte bestellen" : "Order a cake"}</SheetTitle>
          </SheetHeader>
          <div className="mx-auto max-w-2xl pb-4">
            <CakeOrderForm compact />
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default Cakes;
