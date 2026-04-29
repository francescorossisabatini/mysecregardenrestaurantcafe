import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const CakeOrder = () => {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-section-soft px-4 py-10 font-work text-foreground md:py-16">
      <SEOHead
        title={language === "de" ? "Torte bestellen | My Secret Garden" : "Order a Cake | My Secret Garden"}
        description={language === "de" ? "Tortenvorbestellungen pausieren momentan bei My Secret Garden." : "Cake pre-orders are currently paused at My Secret Garden."}
        path="/order"
      />
      <section className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6 text-center shadow-card md:p-8">
        <h1 className="font-cormorant text-4xl font-semibold text-primary md:text-5xl">
          {language === "de" ? "Tortenbestellung pausiert" : "Cake orders paused"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-high-contrast md:text-base">
          {language === "de" ? "Momentan nehmen wir online keine ganzen Torten zur Vorbestellung an. Frag gern direkt im Restaurant nach den heutigen Sorten." : "We are not taking online whole cake pre-orders at the moment. Please ask at the restaurant for today’s available cakes."}
        </p>
      </section>
    </main>
  );
};

export default CakeOrder;
