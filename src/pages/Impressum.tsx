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

          {/* Editorial Line (Blattlinie) */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {language === "de" ? "Blattlinie" : "Editorial Line"}
            </h2>
            <p>
              {language === "de" 
                ? "Diese Website dient der Information über unser vegetarisches Restaurant My Secret Garden in Wien. Wir berichten über unser kulinarisches Angebot, unsere Philosophie der achtsamen Küche und die spirituelle Inspiration, die unserer Arbeit zugrunde liegt. Die Inhalte sind unabhängig und dienen keiner politischen oder kommerziellen Einflussnahme Dritter."
                : "This website serves to inform about our vegetarian restaurant My Secret Garden in Vienna. We report on our culinary offerings, our philosophy of mindful cooking, and the spiritual inspiration underlying our work. The content is independent and serves no political or commercial influence from third parties."
              }
            </p>
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

          {/* Online Dispute Resolution */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {language === "de" ? "Online-Streitbeilegung" : "Online Dispute Resolution"}
            </h2>
            <p>
              {language === "de" 
                ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:"
                : "The European Commission provides a platform for online dispute resolution (ODR):"
              }
            </p>
            <p>
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>
              {language === "de" 
                ? "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
                : "We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board."
              }
            </p>
          </section>

        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {language === "de" 
              ? "Stand: Dezember 2025"
              : "Last updated: December 2025"
            }
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
