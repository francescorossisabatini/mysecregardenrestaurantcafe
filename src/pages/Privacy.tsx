import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();
  const isGerman = language === "de";

  // Table of contents items
  const tocItems = [
    { id: "overview", de: "Datenschutz im Überblick", en: "Privacy at a Glance" },
    { id: "general", de: "Allgemeine Hinweise", en: "General Information" },
    { id: "data-collection", de: "Datenerfassung", en: "Data Collection" },
    { id: "google-maps", de: "Google Maps", en: "Google Maps" },
    { id: "google-analytics", de: "Google Analytics", en: "Google Analytics" },
    { id: "social-media", de: "Social Media", en: "Social Media" },
    { id: "social-networks", de: "Soziale Netzwerke", en: "Social Networks" },
    { id: "changes", de: "Änderungen", en: "Changes" },
  ];

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
            {isGerman ? "Datenschutzerklärung" : "Privacy Policy"}
          </h1>
          <p className="text-center text-muted-foreground mt-2 text-sm">
            {isGerman 
              ? "Informationen zum Schutz Ihrer persönlichen Daten" 
              : "Information about the protection of your personal data"
            }
          </p>
        </header>

        {/* Summary box for quick understanding */}
        <div className="mb-10 p-5 bg-primary/5 border border-primary/20 rounded-lg" role="region" aria-labelledby="summary-title">
          <h2 id="summary-title" className="text-lg font-semibold text-foreground mb-3">
            {isGerman ? "Zusammenfassung" : "Summary"}
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5" aria-hidden="true">✓</span>
              <span>{isGerman ? "Wir speichern nur notwendige Daten für Ihren Besuch" : "We only store data necessary for your visit"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5" aria-hidden="true">✓</span>
              <span>{isGerman ? "Keine Weitergabe an Dritte ohne Ihre Einwilligung" : "No sharing with third parties without your consent"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5" aria-hidden="true">✓</span>
              <span>{isGerman ? "Sie können jederzeit Auskunft oder Löschung verlangen" : "You can request information or deletion at any time"}</span>
            </li>
          </ul>
        </div>
        
        {/* Table of Contents */}
        <nav aria-label={isGerman ? "Inhaltsverzeichnis" : "Table of contents"} className="mb-10 p-4 bg-muted/30 rounded-lg">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            {isGerman ? "Inhaltsverzeichnis" : "Contents"}
          </h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {tocItems.map((item, index) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  {isGerman ? item.de : item.en}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="space-y-10 text-foreground leading-relaxed">
          
          {/* Section 1 - Overview */}
          <section id="overview" aria-labelledby="overview-title" className="scroll-mt-24">
            <h2 id="overview-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "1. Datenschutz im Überblick" : "1. Privacy at a Glance"}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Wer ist verantwortlich?" : "Who is responsible?"}
                </h3>
                <p>
                  {isGerman 
                    ? "Purusha GmbH, Mariahilferstr. 45/6/48, 1060 Wien. Kontakt: reichel@purusha.at"
                    : "Purusha GmbH, Mariahilferstr. 45/6/48, 1060 Vienna. Contact: reichel@purusha.at"
                  }
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Welche Daten werden erfasst?" : "What data is collected?"}
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{isGerman ? "Name und Telefonnummer bei Reservierungen" : "Name and phone number for reservations"}</li>
                  <li>{isGerman ? "Technische Daten (Browser, IP-Adresse) beim Website-Besuch" : "Technical data (browser, IP address) when visiting the website"}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Ihre Rechte" : "Your Rights"}
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{isGerman ? "Auskunft über Ihre gespeicherten Daten" : "Information about your stored data"}</li>
                  <li>{isGerman ? "Berichtigung oder Löschung Ihrer Daten" : "Correction or deletion of your data"}</li>
                  <li>{isGerman ? "Widerruf erteilter Einwilligungen" : "Revocation of given consents"}</li>
                  <li>{isGerman ? "Beschwerde bei der Datenschutzbehörde" : "Complaint to the data protection authority"}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 - General Information */}
          <section id="general" aria-labelledby="general-title" className="scroll-mt-24">
            <h2 id="general-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "2. Allgemeine Hinweise und Pflichtinformationen" : "2. General Information and Mandatory Disclosures"}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Verantwortliche Stelle" : "Responsible Party"}
                </h3>
                <address className="not-italic p-4 bg-muted/20 rounded-lg">
                  <p className="font-semibold">Purusha GmbH</p>
                  <p>{isGerman ? "Geschäftsführer" : "Managing Director"}: Ashru Andreas Reichel</p>
                  <p>Mariahilferstr. 45/6/48, 1060 {isGerman ? "Wien" : "Vienna"}</p>
                  <p className="mt-2">
                    Tel.: <a href="tel:+4315862839" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">01/586 28 39</a>
                  </p>
                  <p>
                    E-Mail: <a href="mailto:reichel@purusha.at" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">reichel@purusha.at</a>
                  </p>
                </address>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Speicherdauer" : "Storage Duration"}
                </h3>
                <p>
                  {isGerman 
                    ? "Ihre Daten werden gelöscht, sobald der Zweck der Speicherung entfällt oder Sie die Löschung verlangen, sofern keine gesetzlichen Aufbewahrungsfristen bestehen."
                    : "Your data will be deleted as soon as the purpose of storage no longer applies or you request deletion, unless there are legal retention periods."
                  }
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Beschwerderecht" : "Right to Complain"}
                </h3>
                <p>
                  {isGerman 
                    ? "Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren:"
                    : "You have the right to complain to the Austrian data protection authority:"
                  }
                </p>
                <p className="mt-2">
                  <a 
                    href="https://www.dsb.gv.at/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded inline-flex items-center gap-1"
                  >
                    www.dsb.gv.at
                    <span className="sr-only"> ({isGerman ? "öffnet in neuem Tab" : "opens in new tab"})</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "SSL/TLS-Verschlüsselung" : "SSL/TLS Encryption"}
                </h3>
                <p>
                  {isGerman 
                    ? "Diese Website nutzt eine sichere SSL/TLS-Verschlüsselung. Sie erkennen dies am Schloss-Symbol in Ihrer Browserzeile und an \"https://\" in der Adresse."
                    : "This website uses secure SSL/TLS encryption. You can recognize this by the lock symbol in your browser bar and \"https://\" in the address."
                  }
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 - Data Collection */}
          <section id="data-collection" aria-labelledby="data-collection-title" className="scroll-mt-24">
            <h2 id="data-collection-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "3. Datenerfassung auf dieser Website" : "3. Data Collection on This Website"}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Server-Log-Dateien" : "Server Log Files"}
                </h3>
                <p className="mb-2">
                  {isGerman 
                    ? "Bei jedem Website-Besuch werden automatisch folgende Daten erfasst:"
                    : "The following data is automatically collected with each website visit:"
                  }
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{isGerman ? "Browsertyp und -version" : "Browser type and version"}</li>
                  <li>{isGerman ? "Betriebssystem" : "Operating system"}</li>
                  <li>{isGerman ? "Besuchte Seiten" : "Pages visited"}</li>
                  <li>{isGerman ? "Uhrzeit des Zugriffs" : "Time of access"}</li>
                  <li>{isGerman ? "IP-Adresse" : "IP address"}</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isGerman 
                    ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)"
                    : "Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest)"
                  }
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Kontaktaufnahme" : "Contact"}
                </h3>
                <p>
                  {isGerman 
                    ? "Bei Kontakt per Telefon oder E-Mail speichern wir Ihre Anfrage zur Bearbeitung. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
                    : "When contacting us by telephone or email, we store your inquiry for processing. We do not share this data without your consent."
                  }
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 - Google Maps */}
          <section id="google-maps" aria-labelledby="google-maps-title" className="scroll-mt-24">
            <h2 id="google-maps-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "4. Google Maps" : "4. Google Maps"}
            </h2>
            <p className="mb-3">
              {isGerman 
                ? "Auf unserer Kontaktseite nutzen wir Google Maps (Anbieter: Google Ireland Limited, Dublin). Beim Laden der Karte wird Ihre IP-Adresse an Google übermittelt."
                : "On our contact page, we use Google Maps (provider: Google Ireland Limited, Dublin). When loading the map, your IP address is transmitted to Google."
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {isGerman 
                ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Mehr Infos: "
                : "Legal basis: Art. 6 para. 1 lit. f GDPR. More info: "
              }
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                policies.google.com/privacy
              </a>
            </p>
          </section>

          {/* Section 5 - Google Analytics */}
          <section id="google-analytics" aria-labelledby="google-analytics-title" className="scroll-mt-24">
            <h2 id="google-analytics-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "5. Google Analytics" : "5. Google Analytics"}
            </h2>
            <p className="mb-3">
              {isGerman 
                ? "Wir nutzen Google Analytics zur Analyse des Website-Verhaltens. Die Nutzung erfolgt nur mit Ihrer Einwilligung (Cookie-Banner)."
                : "We use Google Analytics to analyze website behavior. Use is only with your consent (cookie banner)."
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {isGerman 
                ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können die Einwilligung jederzeit widerrufen."
                : "Legal basis: Art. 6 para. 1 lit. a GDPR (consent). You can revoke consent at any time."
              }
            </p>
          </section>

          {/* Section 6 - Social Media */}
          <section id="social-media" aria-labelledby="social-media-title" className="scroll-mt-24">
            <h2 id="social-media-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "6. Social Media" : "6. Social Media"}
            </h2>
            <p className="mb-3">
              {isGerman 
                ? "Wir sind auf folgenden Plattformen präsent:"
                : "We are present on the following platforms:"
              }
            </p>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.instagram.com/mysecretgardencafewien/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded inline-flex items-center gap-1"
                >
                  Instagram
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/secretgardencafewien/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded inline-flex items-center gap-1"
                >
                  Facebook
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              {isGerman 
                ? "Diese Plattformen verarbeiten Daten gemäß ihrer eigenen Datenschutzerklärungen."
                : "These platforms process data according to their own privacy policies."
              }
            </p>
          </section>

          {/* Section 7 - Social Networks Detail */}
          <section id="social-networks" aria-labelledby="social-networks-title" className="scroll-mt-24">
            <h2 id="social-networks-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "7. Soziale Netzwerke im Detail" : "7. Social Networks in Detail"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Facebook / Instagram (Meta)</h3>
                <p className="text-sm">
                  {isGerman 
                    ? "Anbieter: Meta Platforms Ireland Limited, Dublin. Datenübertragung in USA möglich."
                    : "Provider: Meta Platforms Ireland Limited, Dublin. Data transfer to USA possible."
                  }
                </p>
                <p className="text-sm mt-1">
                  <a href="https://www.facebook.com/about/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                    {isGerman ? "Datenschutzerklärung Facebook" : "Facebook Privacy Policy"}
                  </a>
                  {" | "}
                  <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                    {isGerman ? "Datenschutzerklärung Instagram" : "Instagram Privacy Policy"}
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 - Changes */}
          <section id="changes" aria-labelledby="changes-title" className="scroll-mt-24">
            <h2 id="changes-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "8. Änderungen" : "8. Changes"}
            </h2>
            <p>
              {isGerman 
                ? "Bei Änderungen unserer Dienste oder rechtlicher Grundlagen aktualisieren wir diese Datenschutzerklärung entsprechend."
                : "When our services or legal requirements change, we will update this privacy policy accordingly."
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
          <p className="text-sm text-muted-foreground mt-2">
            {isGerman 
              ? "Fragen? Kontaktieren Sie uns unter "
              : "Questions? Contact us at "
            }
            <a href="mailto:reichel@purusha.at" className="text-primary hover:underline">reichel@purusha.at</a>
          </p>
        </footer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
