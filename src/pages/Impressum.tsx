import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Impressum = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="font-caveat text-5xl md:text-6xl text-primary text-center mb-12">
          {language === "de" ? "Impressum" : "Legal Notice"}
        </h1>
        
        <div className="space-y-8 font-lora text-foreground/80 leading-relaxed">
          
          {/* Media Owner */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {language === "de" ? "Medieninhaber" : "Media Owner"}
            </h2>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Purusha GmbH</p>
              <p>{language === "de" ? "Geschäftsführer" : "Managing Director"} Ashru Andreas Reichel</p>
              <p>Mariahilferstr. 45/6/48</p>
              <p>1060 {language === "de" ? "Wien" : "Vienna"}</p>
              <p>{language === "de" ? "Österreich" : "Austria"}</p>
            </div>
            <div className="space-y-1 pt-2">
              <p>{language === "de" ? "Telefon" : "Phone"}: 01/586 28 39</p>
              <p>E-Mail: <a href="mailto:reichel@purusha.at" className="text-primary hover:underline">reichel@purusha.at</a></p>
            </div>
            <div className="space-y-1 pt-2">
              <p>{language === "de" ? "UID" : "VAT ID"}: ATU 72821967</p>
              <p>{language === "de" ? "Firmenbuchnummer Handelsgericht Wien" : "Commercial Register No. Vienna"}: FN482788</p>
            </div>
          </section>

          {/* Editorial Responsibility */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {language === "de" ? "Verantwortlich für den redaktionellen Inhalt" : "Editorially Responsible"}
            </h2>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Ashru Andreas Reichel</p>
              <p>Mariahilferstr. 45/6/48</p>
              <p>1060 {language === "de" ? "Wien" : "Vienna"}</p>
              <p>{language === "de" ? "Österreich" : "Austria"}</p>
              <p>{language === "de" ? "Telefon" : "Phone"}: 01/586 28 39</p>
            </div>
          </section>

          {/* Legal Information */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {language === "de" ? "Rechtliche Hinweise" : "Legal Information"}
            </h2>
            <p>
              {language === "de" 
                ? "Informationspflicht lt. §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch bzw. §63 Gewerbeordnung und Offenlegungspflicht lt. §25 Mediengesetz."
                : "Information obligation according to §5 E-Commerce Act, §14 Austrian Commercial Code and §63 Trade Regulation Act, and disclosure obligation according to §25 Media Act."
              }
            </p>
          </section>

        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {language === "de" 
              ? "Stand: Dezember 2024"
              : "Last updated: December 2024"
            }
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
