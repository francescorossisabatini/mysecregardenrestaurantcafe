import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui/button";
import { resetCookieConsent } from "@/components/CookieConsent";

const Privacy = () => {
  const { language } = useLanguage();
  const isGerman = language === "de";

  // Table of contents items
  const tocItems = [
    { id: "overview", de: "Datenschutz im Überblick", en: "Privacy at a Glance" },
    { id: "general", de: "Allgemeine Hinweise", en: "General Information" },
    { id: "data-collection", de: "Datenerfassung", en: "Data Collection" },
    { id: "hosting", de: "Hosting & Auftragsverarbeiter", en: "Hosting & Processors" },
    { id: "google-fonts", de: "Google Fonts", en: "Google Fonts" },
    { id: "google-maps", de: "Google Maps", en: "Google Maps" },
    { id: "analytics", de: "Analyse Tools", en: "Analytics Tools" },
    { id: "ab-testing", de: "A/B-Testing", en: "A/B Testing" },
    { id: "storage", de: "Cookies & Local Storage", en: "Cookies & Local Storage" },
    { id: "social-media", de: "Social Media", en: "Social Media" },
    { id: "social-networks", de: "Soziale Netzwerke", en: "Social Networks" },
    { id: "changes", de: "Änderungen", en: "Changes" },
  ];


  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={isGerman ? "Datenschutz" : "Privacy Policy"}
        description={isGerman 
          ? "Datenschutzerklärung von My Secret Garden Restaurant Wien."
          : "Privacy policy for My Secret Garden Restaurant Vienna."}
        path="/privacy"
      />
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
          <p className="text-center text-muted-high-contrast mt-2 text-sm">
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
                    Tel.: <a href={`tel:${SITE.phoneTel}`} className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">{SITE.phoneDisplay}</a>
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
                <p className="mt-2 text-sm text-muted-high-contrast">
                  {isGerman
                    ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem Betrieb). Speicherdauer: max. 30 Tage, danach automatische Löschung oder Anonymisierung."
                    : "Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest in secure operation). Storage duration: max. 30 days, then automatically deleted or anonymized."
                  }
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {isGerman ? "Kontaktaufnahme & Reservierungsanfragen" : "Contact & Reservation Requests"}
                </h3>
                <p className="mb-2">
                  {isGerman
                    ? "Wenn du uns per Telefon, E-Mail oder über das Anfrage-Formular kontaktierst, verarbeiten wir folgende Daten zur Bearbeitung deiner Anfrage:"
                    : "When you contact us by phone, email or via the request form, we process the following data to handle your inquiry:"}
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{isGerman ? "Name" : "Name"}</li>
                  <li>{isGerman ? "Telefonnummer" : "Phone number"}</li>
                  <li>{isGerman ? "E-Mail-Adresse (optional)" : "Email address (optional)"}</li>
                  <li>{isGerman ? "Nachricht / gewünschtes Datum" : "Message / requested date"}</li>
                </ul>
                <p className="mt-2 text-sm text-muted-high-contrast">
                  {isGerman
                    ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anbahnung und Erfüllung einer Anfrage). Empfänger: nur intern (Team Purusha GmbH). Speicherdauer: bis zu 12 Monate nach Bearbeitung, danach Löschung, sofern keine gesetzlichen Aufbewahrungspflichten bestehen."
                    : "Legal basis: Art. 6 para. 1 lit. b GDPR (initiation and fulfilment of a request). Recipients: internal only (Purusha GmbH team). Storage duration: up to 12 months after processing, then deleted unless legal retention obligations apply."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 - Hosting & Processors */}
          <section id="hosting" aria-labelledby="hosting-title" className="scroll-mt-24">
            <h2 id="hosting-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "4. Hosting & Auftragsverarbeiter" : "4. Hosting & Processors"}
            </h2>
            <p className="mb-3">
              {isGerman
                ? "Diese Website wird auf der Lovable-Plattform (Lovable Labs Inc., USA) betrieben. Datenbank, Speicherplatz und serverseitige Funktionen (u. a. Speisekarten, Anfrage-Formular, Mitarbeiter-Login) laufen über Supabase (Supabase Inc., USA), betrieben in EU-Rechenzentren."
                : "This website is hosted on the Lovable platform (Lovable Labs Inc., USA). Database, storage and server-side functions (menus, request form, staff login) run on Supabase (Supabase Inc., USA), operated from EU data centres."}
            </p>
            <p className="text-sm text-muted-high-contrast">
              {isGerman
                ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem stabilen Betrieb der Website). Mit den Anbietern bestehen Auftragsverarbeitungsverträge nach Art. 28 DSGVO."
                : "Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest in stable operation). Data processing agreements under Art. 28 GDPR are in place with the providers."}
            </p>
          </section>

          {/* Section 5 - Google Fonts */}
          <section id="google-fonts" aria-labelledby="google-fonts-title" className="scroll-mt-24">
            <h2 id="google-fonts-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "5. Google Fonts" : "5. Google Fonts"}
            </h2>
            <p className="mb-3">
              {isGerman
                ? "Zur einheitlichen Darstellung von Schriftarten binden wir Google Fonts (Anbieter: Google Ireland Limited, Dublin) ein. Beim Laden einer Seite wird deine IP-Adresse an Google übermittelt."
                : "We use Google Fonts (provider: Google Ireland Limited, Dublin) for consistent typography. When a page loads, your IP address is transmitted to Google."}
            </p>
            <p className="text-sm text-muted-high-contrast">
              {isGerman
                ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen Darstellung)."
                : "Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest in consistent presentation)."}
            </p>
          </section>

          {/* Section 6 - Google Maps */}
          <section id="google-maps" aria-labelledby="google-maps-title" className="scroll-mt-24">
            <h2 id="google-maps-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "6. Google Maps" : "6. Google Maps"}
            </h2>
            <p className="mb-3">
              {isGerman
                ? "Auf unserer Kontaktseite binden wir Google Maps (Anbieter: Google Ireland Limited, Dublin) ein, damit du unseren Standort leicht findest. Beim Laden der Karte wird deine IP-Adresse an Google übermittelt; eine Übertragung in die USA ist möglich."
                : "On our contact page we embed Google Maps (provider: Google Ireland Limited, Dublin) so you can find our location easily. When the map loads, your IP address is transmitted to Google; transfer to the USA is possible."}
            </p>
            <p className="text-sm text-muted-high-contrast">
              {isGerman
                ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einfachen Wegbeschreibung). Mehr Infos: "
                : "Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest in easy directions). More info: "}
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


          {/* Section 7 - Analytics Tools */}
          <section id="analytics" aria-labelledby="analytics-title" className="scroll-mt-24">
            <h2 id="analytics-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "7. Analyse Tools" : "7. Analytics Tools"}
            </h2>
            <p className="mb-3">
              {isGerman
                ? "Wir nutzen Google Analytics, um zu verstehen, wie die Website genutzt wird und sie zu verbessern. Dieser Dienst wird erst nach deiner ausdrücklichen Einwilligung über das Cookie-Banner geladen."
                : "We use Google Analytics to understand how the site is used and to improve it. This service only loads after your explicit consent via the cookie banner."}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
              <li>{isGerman ? "Google Analytics 4, Anbieter: Google Ireland Limited, Dublin" : "Google Analytics 4, provider: Google Ireland Limited, Dublin"}</li>
            </ul>
            <p className="text-sm text-muted-high-contrast">
              {isGerman
                ? "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Du kannst die Einwilligung jederzeit widerrufen. Verarbeitet werden können: anonymisierte IP-Adresse, Geräteinformationen und Seitenaufrufe."
                : "Legal basis: Art. 6 para. 1 lit. a GDPR (consent). You can revoke consent at any time. Data that may be processed: anonymized IP address, device information and page views."}
            </p>
            <Button type="button" variant="outline" size="sm" className="mt-4 font-work" onClick={resetCookieConsent}>
              {isGerman ? "Cookie Entscheidung ändern" : "Change cookie choice"}
            </Button>
          </section>

          {/* Section 8 - A/B Testing */}
          <section id="ab-testing" aria-labelledby="ab-testing-title" className="scroll-mt-24">
            <h2 id="ab-testing-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "8. A/B-Testing" : "8. A/B Testing"}
            </h2>
            <p className="mb-3">
              {isGerman
                ? "Um die Startseite auf mobilen Geräten zu verbessern, zeigen wir gelegentlich unterschiedliche Varianten des Hero-Bereichs an. Die dir zugewiesene Variante wird in einem lokalen Speicher-Eintrag (Local Storage) deines Browsers festgehalten, damit du bei weiteren Besuchen dieselbe Version siehst."
                : "To improve the mobile home page, we occasionally show different variants of the hero section. The variant assigned to you is stored in a local storage entry in your browser so you see the same version on later visits."}
            </p>
            <p className="text-sm text-muted-high-contrast">
              {isGerman
                ? "Es werden keine personenbezogenen Daten erhoben. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer guten Nutzererfahrung)."
                : "No personal data is collected. Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest in a good user experience)."}
            </p>
          </section>

          {/* Section 9 - Storage table */}
          <section id="storage" aria-labelledby="storage-title" className="scroll-mt-24">
            <h2 id="storage-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "9. Cookies & Local Storage" : "9. Cookies & Local Storage"}
            </h2>
            <p className="mb-4">
              {isGerman
                ? "Diese Website nutzt keine klassischen Marketing-Cookies. Für den Betrieb speichern wir kleine technische Einträge im Local Storage deines Browsers:"
                : "This website does not use classic marketing cookies. For operational purposes we store small technical entries in your browser's local storage:"}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-md">
                <thead className="bg-muted/40 text-left">
                  <tr>
                    <th className="px-3 py-2 font-semibold">{isGerman ? "Eintrag" : "Entry"}</th>
                    <th className="px-3 py-2 font-semibold">{isGerman ? "Zweck" : "Purpose"}</th>
                    <th className="px-3 py-2 font-semibold">{isGerman ? "Dauer" : "Duration"}</th>
                    <th className="px-3 py-2 font-semibold">{isGerman ? "Kategorie" : "Category"}</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">cookie_consent_v2</td>
                    <td className="px-3 py-2">{isGerman ? "Speichert deine Cookie-Einstellungen" : "Stores your cookie preferences"}</td>
                    <td className="px-3 py-2">{isGerman ? "12 Monate" : "12 months"}</td>
                    <td className="px-3 py-2">{isGerman ? "Notwendig" : "Necessary"}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">msg_visit_count</td>
                    <td className="px-3 py-2">{isGerman ? "Zählt Besuche, um den App-Installations-Hinweis nicht sofort zu zeigen" : "Counts visits so the install hint is not shown immediately"}</td>
                    <td className="px-3 py-2">{isGerman ? "Dauerhaft (bis du ihn löschst)" : "Persistent (until you delete it)"}</td>
                    <td className="px-3 py-2">{isGerman ? "Notwendig" : "Necessary"}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">msg_install_dismissed</td>
                    <td className="px-3 py-2">{isGerman ? "Merkt sich, dass du den Installations-Hinweis geschlossen hast" : "Remembers that you closed the install hint"}</td>
                    <td className="px-3 py-2">{isGerman ? "Dauerhaft" : "Persistent"}</td>
                    <td className="px-3 py-2">{isGerman ? "Notwendig" : "Necessary"}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">secretgarden.hero_ab_assignment_v1</td>
                    <td className="px-3 py-2">{isGerman ? "Speichert die dir zugewiesene Test-Variante der Startseite" : "Stores the home-page test variant assigned to you"}</td>
                    <td className="px-3 py-2">{isGerman ? "Dauer des laufenden Tests" : "Duration of the running test"}</td>
                    <td className="px-3 py-2">{isGerman ? "Notwendig" : "Necessary"}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">_ga, _ga_*</td>
                    <td className="px-3 py-2">{isGerman ? "Google Analytics — anonyme Nutzungsstatistiken" : "Google Analytics — anonymous usage statistics"}</td>
                    <td className="px-3 py-2">{isGerman ? "bis zu 24 Monate" : "up to 24 months"}</td>
                    <td className="px-3 py-2">{isGerman ? "Statistik (Einwilligung)" : "Analytics (consent)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-high-contrast">
              {isGerman
                ? "Du kannst diese Einträge jederzeit in den Einstellungen deines Browsers löschen. Optionale Kategorien lassen sich zusätzlich über den Button oben widerrufen."
                : "You can delete these entries at any time in your browser settings. Optional categories can also be revoked via the button above."}
            </p>
          </section>

          {/* Section 10 - Social Media */}
          <section id="social-media" aria-labelledby="social-media-title" className="scroll-mt-24">
            <h2 id="social-media-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "10. Social Media" : "10. Social Media"}
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
            <p className="mt-3 text-sm text-muted-high-contrast">
              {isGerman 
                ? "Diese Plattformen verarbeiten Daten gemäß ihrer eigenen Datenschutzerklärungen."
                : "These platforms process data according to their own privacy policies."
              }
            </p>
          </section>

          {/* Section 7 - Social Networks Detail */}
          <section id="social-networks" aria-labelledby="social-networks-title" className="scroll-mt-24">
            <h2 id="social-networks-title" className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {isGerman ? "11. Soziale Netzwerke im Detail" : "11. Social Networks in Detail"}
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
              {isGerman ? "12. Änderungen" : "12. Changes"}
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
          <p className="text-sm text-muted-high-contrast">
            <time dateTime="2026-07">
              {isGerman ? "Stand: Juli 2026" : "Last updated: July 2026"}
            </time>
          </p>
          <p className="text-sm text-muted-high-contrast mt-2">
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
