import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CakeOrderForm } from "@/components/CakeOrderForm";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const CakeOrder = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.gtag?.("event", "cake_order_page_view", { event_category: "engagement" });
  }, []);

  return (
    <div className="min-h-screen bg-section-soft">
      <SEOHead
        title={language === "de" ? "Torte bestellen | My Secret Garden" : "Order a Cake | My Secret Garden"}
        description={language === "de" ? "Bestelle deine hausgemachte Torte bei My Secret Garden in Wien." : "Pre-order your homemade cake from My Secret Garden in Vienna."}
        path="/order"
      />
      <SkipLink />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <section className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          <Link
            to="/cakes"
            className="inline-flex items-center gap-2 font-work text-sm text-muted-high-contrast transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {language === "de" ? "Zurück zu den Torten" : "Back to cakes"}
          </Link>

          <div className="mt-6">
            <CakeOrderForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CakeOrder;
