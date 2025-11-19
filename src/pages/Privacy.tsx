import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();

  const content = {
    de: {
      title: "Datenschutzerklärung",
      sections: [
        {
          title: "1. Datenschutz auf einen Blick",
          subtitle: "Allgemeine Hinweise",
          content: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können."
        },
        {
          title: "2. Verantwortliche Stelle",
          content: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:\n\nMy Secret Garden Restaurant\nMariahilferstraße 45 – Im Raimundhof\n1060 Wien, Österreich\n\nVerantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet."
        },
        {
          title: "3. Datenerfassung auf unserer Website",
          subtitle: "Cookies",
          content: "Unsere Internetseiten verwenden so genannte \"Cookies\". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert."
        },
        {
          title: "4. Server-Log-Dateien",
          content: "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:\n\n• Browsertyp und Browserversion\n• Verwendetes Betriebssystem\n• Referrer URL\n• Hostname des zugreifenden Rechners\n• Uhrzeit der Serveranfrage\n• IP-Adresse\n\nEine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO."
        },
        {
          title: "5. Kontaktformular",
          content: "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
        },
        {
          title: "6. Social Media",
          content: "Unsere Website enthält Links zu unserem Instagram-Profil. Beim Besuch unserer Social-Media-Präsenzen werden möglicherweise Daten durch die jeweiligen Anbieter erhoben. Bitte beachten Sie die Datenschutzhinweise der jeweiligen Plattformen."
        },
        {
          title: "7. Ihre Rechte",
          content: "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden."
        },
        {
          title: "8. SSL- bzw. TLS-Verschlüsselung",
          content: "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von \"http://\" auf \"https://\" wechselt."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      sections: [
        {
          title: "1. Privacy at a Glance",
          subtitle: "General Information",
          content: "The following notices provide a simple overview of what happens to your personal data when you visit our website. Personal data is any data that can be used to personally identify you."
        },
        {
          title: "2. Responsible Party",
          content: "The responsible party for data processing on this website is:\n\nMy Secret Garden Restaurant\nMariahilferstraße 45 – Im Raimundhof\n1060 Vienna, Austria\n\nThe responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of processing personal data."
        },
        {
          title: "3. Data Collection on Our Website",
          subtitle: "Cookies",
          content: "Our website uses so-called \"cookies\". Cookies are small text files and do not cause any damage to your device. They are stored either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on your device."
        },
        {
          title: "4. Server Log Files",
          content: "The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:\n\n• Browser type and version\n• Operating system used\n• Referrer URL\n• Hostname of the accessing computer\n• Time of server request\n• IP address\n\nThis data is not combined with other data sources. The collection of this data is based on Art. 6 para. 1 lit. f GDPR."
        },
        {
          title: "5. Contact Form",
          content: "If you send us inquiries via the contact form, your information from the inquiry form, including the contact data you provide there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent."
        },
        {
          title: "6. Social Media",
          content: "Our website contains links to our Instagram profile. When visiting our social media presences, data may be collected by the respective providers. Please note the privacy policies of the respective platforms."
        },
        {
          title: "7. Your Rights",
          content: "You have the right at any time to receive free information about your stored personal data, its origin and recipients, and the purpose of data processing, as well as the right to correct or delete this data. For this and further questions about personal data, you can contact us at any time."
        },
        {
          title: "8. SSL/TLS Encryption",
          content: "For security reasons and to protect the transmission of confidential content, this site uses SSL/TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from \"http://\" to \"https://\"."
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="font-caveat text-5xl md:text-6xl text-primary text-center mb-12">
          {currentContent.title}
        </h1>
        
        <div className="space-y-8 font-lora text-foreground/80">
          {currentContent.sections.map((section, index) => (
            <section key={index} className="space-y-3">
              <h2 className="font-caveat text-3xl text-primary">
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="font-lora text-xl font-semibold text-foreground">
                  {section.subtitle}
                </h3>
              )}
              <p className="whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {language === "de" 
              ? "Stand: " + new Date().toLocaleDateString("de-AT")
              : "Last updated: " + new Date().toLocaleDateString("en-US")
            }
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
