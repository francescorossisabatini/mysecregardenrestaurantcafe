import { SEOHead } from "@/components/SEOHead";
import { ReservationRequestForm } from "@/components/ReservationRequestForm";
import { useLanguage } from "@/contexts/LanguageContext";

const ReservationPreview = () => {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-section-soft px-4 py-10 font-work text-foreground md:py-16">
      <SEOHead
        title={language === "de" ? "Private Tischanfrage Vorschau" : "Private Table Request Preview"}
        description={language === "de" ? "Private Vorschau für das Tischanfrageformular." : "Private preview for the table request form."}
        path="/reservation-preview"
        noindex
      />
      <section className="mx-auto max-w-2xl">
        <ReservationRequestForm />
      </section>
    </main>
  );
};

export default ReservationPreview;