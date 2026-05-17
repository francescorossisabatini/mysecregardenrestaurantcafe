import { SEOHead } from "@/components/SEOHead";
import { ReservationRequestForm } from "@/components/ReservationRequestForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const ReservationPreview = () => {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-section-soft px-4 py-10 font-work text-foreground md:py-16">
      <SEOHead
        title={language === "de" ? "Tisch reservieren" : "Book a table"}
        description={language === "de" ? "Reserviere deinen Tisch im My Secret Garden." : "Book your table at My Secret Garden."}
        path="/reservation-preview"
        noindex
      />
      <section className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        <ReservationRequestForm />
      </section>
    </main>
  );
};

export default ReservationPreview;
