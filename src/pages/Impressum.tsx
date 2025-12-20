import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Impressum = () => {
  const { language } = useLanguage();
  const isGerman = language === "de";

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        {isGerman ? "Zum Hauptinhalt springen" : "Skip to main content"}
      </a>
      
      <Navigation />
      
      <main 
        id="main-content"
        className="container mx-auto px-4 py-24 max-w-3xl"
        role="main"
        aria-labelledby="page-title"
      >
        <header className="mb-12">
          <h1 
            id="page-title"
            className="text-3xl md:text-4xl font-bold text-foreground text-center"
          >
            {isGerman ? "Impressum" : "Legal Notice"}
          </h1>
          <p className="text-center text-muted-foreground mt-2 text-sm">
            {isGerman 
              ? "Rechtliche Informationen gemäß österreichischem Recht" 
              : "Legal information according to Austrian law"
            }
          </p>
        </header>
        
        {/* Table of Contents for easier navigation */}
        <nav aria-label={isGerman ? "Inhaltsverzeichnis" : "Table of contents"} className="mb-10 p-4 bg-muted/30 rounded-lg">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            {isGerman ? "Inhaltsverzeichnis" : "Contents"}
          </h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li><a href="#media-owner" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">{isGerman ? "Medieninhaber" : "Media Owner"}</a></li>
            <li><a href="#editorial" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">{isGerman ? "Redaktionelle Verantwortung" : "Editorial Responsibility"}</a></li>
            <li><a href="#editorial-line" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">{isGerman ? "Blattlinie" : "Editorial Line"}</a></li>
            <li><a href="#legal-info" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">{isGerman ? "Rechtliche Hinweise" : "Legal Information"}</a></li>
            <li><a href="#odr" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">{isGerman ? "Online-Streitbeilegung" : "Online Dispute Resolution"}</a></li>
          </ol>
        </nav>

        <article className="space-y-10 text-foreground leading-relaxed">
          
          {/* Media Owner */}
          <section id="media-owner" aria-labelledby="media-owner-title" className="scroll-mt-24">
            <h2 id="media-owner-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "1. Medieninhaber" : "1. Media Owner"}
            </h2>
            <address className="not-italic space-y-2">
              <p className="font-semibold">Purusha GmbH</p>
              <p>{isGerman ? "Geschäftsführer" : "Managing Director"}: Ashru Andreas Reichel</p>
              <p>Mariahilferstr. 45/6/48</p>
              <p>1060 {isGerman ? "Wien" : "Vienna"}, {isGerman ? "Österreich" : "Austria"}</p>
              <p className="pt-2">
                <span className="font-medium">{isGerman ? "Telefon" : "Phone"}:</span>{" "}
                <a href="tel:+4315862839" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  01/586 28 39
                </a>
              </p>
              <p>
                <span className="font-medium">E-Mail:</span>{" "}
                <a href="mailto:reichel@purusha.at" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  reichel@purusha.at
                </a>
              </p>
              <p className="pt-2">
                <span className="font-medium">{isGerman ? "UID-Nummer" : "VAT ID"}:</span> ATU 72821967
              </p>
              <p>
                <span className="font-medium">{isGerman ? "Firmenbuchnummer" : "Commercial Register No."}:</span> FN482788 ({isGerman ? "Handelsgericht Wien" : "Vienna Commercial Court"})
              </p>
            </address>
          </section>

          {/* Editorial Responsibility */}
          <section id="editorial" aria-labelledby="editorial-title" className="scroll-mt-24">
            <h2 id="editorial-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "2. Verantwortlich für den redaktionellen Inhalt" : "2. Editorially Responsible"}
            </h2>
            <address className="not-italic space-y-2">
              <p className="font-semibold">Ashru Andreas Reichel</p>
              <p>Mariahilferstr. 45/6/48</p>
              <p>1060 {isGerman ? "Wien" : "Vienna"}, {isGerman ? "Österreich" : "Austria"}</p>
              <p>
                <span className="font-medium">{isGerman ? "Telefon" : "Phone"}:</span>{" "}
                <a href="tel:+4315862839" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  01/586 28 39
                </a>
              </p>
            </address>
          </section>

          {/* Editorial Line */}
          <section id="editorial-line" aria-labelledby="editorial-line-title" className="scroll-mt-24">
            <h2 id="editorial-line-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "3. Blattlinie" : "3. Editorial Line"}
            </h2>
            <p>
              {isGerman 
                ? "Diese Website dient der Information über unser vegetarisches Restaurant My Secret Garden in Wien. Wir berichten über unser kulinarisches Angebot, unsere Philosophie der achtsamen Küche und die spirituelle Inspiration, die unserer Arbeit zugrunde liegt. Die Inhalte sind unabhängig und dienen keiner politischen oder kommerziellen Einflussnahme Dritter."
                : "This website serves to inform about our vegetarian restaurant My Secret Garden in Vienna. We report on our culinary offerings, our philosophy of mindful cooking, and the spiritual inspiration underlying our work. The content is independent and serves no political or commercial influence from third parties."
              }
            </p>
          </section>

          {/* Legal Information */}
          <section id="legal-info" aria-labelledby="legal-info-title" className="scroll-mt-24">
            <h2 id="legal-info-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "4. Rechtliche Hinweise" : "4. Legal Information"}
            </h2>
            <p>
              {isGerman 
                ? "Informationspflicht laut §5 E-Commerce Gesetz (ECG), §14 Unternehmensgesetzbuch (UGB) bzw. §63 Gewerbeordnung (GewO) und Offenlegungspflicht laut §25 Mediengesetz (MedienG)."
                : "Information obligation according to §5 E-Commerce Act (ECG), §14 Austrian Commercial Code (UGB) and §63 Trade Regulation Act (GewO), and disclosure obligation according to §25 Media Act (MedienG)."
              }
            </p>
          </section>

          {/* Online Dispute Resolution */}
          <section id="odr" aria-labelledby="odr-title" className="scroll-mt-24">
            <h2 id="odr-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "5. Online-Streitbeilegung" : "5. Online Dispute Resolution"}
            </h2>
            <p className="mb-3">
              {isGerman 
                ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:"
                : "The European Commission provides a platform for online dispute resolution (ODR):"
              }
            </p>
            <p className="mb-3">
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded inline-flex items-center gap-1"
                aria-label={isGerman ? "EU Online-Streitbeilegungsplattform (öffnet in neuem Tab)" : "EU Online Dispute Resolution platform (opens in new tab)"}
              >
                ec.europa.eu/consumers/odr
                <span className="sr-only"> ({isGerman ? "öffnet in neuem Tab" : "opens in new tab"})</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </p>
            <p>
              {isGerman 
                ? "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
                : "We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board."
              }
            </p>
          </section>

        </article>
        
        <footer className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            <time dateTime="2025-12">
              {isGerman ? "Stand: Dezember 2025" : "Last updated: December 2025"}
            </time>
          </p>
        </footer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
