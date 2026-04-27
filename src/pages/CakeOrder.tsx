import { CakeOrderForm } from "@/components/CakeOrderForm";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const CakeOrder = () => {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-section-soft px-4 py-10 font-work text-foreground md:py-16">
      <SEOHead
        title={language === "de" ? "Torte bestellen | My Secret Garden" : "Order a Cake | My Secret Garden"}
        description={language === "de" ? "Hausgemachte Torten in Wien online vorbestellen und im Secret Garden abholen." : "Pre-order homemade cakes in Vienna and pick them up at Secret Garden."}
        path="/order"
      />
      <section className="mx-auto max-w-2xl">
        <CakeOrderForm />
      </section>
    </main>
  );
};

export default CakeOrder;
