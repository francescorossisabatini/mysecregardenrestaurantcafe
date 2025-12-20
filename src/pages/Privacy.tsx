import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();
  const isGerman = language === "de";

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="font-caveat text-5xl md:text-6xl text-primary text-center mb-12">
          {isGerman ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>
        
        <div className="space-y-10 font-lora text-foreground/80 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "1. Datenschutz im Überblick" : "1. Privacy at a Glance"}
            </h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Allgemeines zum Datenschutz" : "General Information on Data Protection"}
            </h3>
            <p>
              {isGerman 
                ? "Im Folgenden bekommen Sie einen einfachen Überblick darüber, wie wir mit Ihren personenbezogenen Daten umgehen, die wir durch Ihren Besuch dieser Website erhalten. Unter personenbezogene Daten versteht man zum Beispiel Name, Adresse, Telefonummer, E-Mail-Adresse – alle Daten, mit denen Ihre Person identifiziert werden kann. Wir schenken dem Schutz Ihrer personenbezogenen Daten große Beachtung und verwenden außer nicht personenbezogenen, technisch notwendigen und automatisch übermittelten Informationen keine Cookies oder andere Mittel zu Analyse- oder Werbezwecken."
                : "The following gives you a simple overview of how we handle your personal data that we receive through your visit to this website. Personal data includes, for example, name, address, telephone number, email address – all data that can be used to identify you. We pay great attention to the protection of your personal data and do not use cookies or other means for analysis or advertising purposes, except for non-personal, technically necessary, and automatically transmitted information."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Datenerfassung auf dieser Website" : "Data Collection on This Website"}
            </h3>
            <p>
              {isGerman 
                ? "Wer ist verantwortlich für die Datenerfassung auf dieser Website? Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt «Hinweis zur Verantwortlichen Stelle» in dieser Datenschutzerklärung entnehmen."
                : "Who is responsible for data collection on this website? Data processing on this website is carried out by the website operator. You can find their contact details in the section 'Notice on the Responsible Party' in this privacy policy."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Wie erhalten wir Ihre Daten?" : "How Do We Obtain Your Data?"}
            </h3>
            <p>
              {isGerman 
                ? "Daten zu Ihrer Person werden uns dadurch bekannt, dass wir Ihre Telefonummer erkennen oder Sie uns diese mitteilen und Sie bei einem Anruf Ihren Namen nennen, wenn Sie sich bei uns anmelden. Wir notieren Ihre Telefonummer, Ihren Namen für den Besuch unseres Restaurants oder unserer Veranstaltungen. Wir verwenden das Wort «wir», weil ein Mitarbeiter des Restaurants oder Veranstaltungsleiter Ihre Informationen zur Abwicklung des Besuchs bei uns erhalten kann. Wir löschen die von Ihnen bekannt gegebenen Daten nach dem Besuch unseres Restaurants oder unserer Veranstaltung, außer Sie treffen mit uns eine andere Vereinbarung, um zum Beispiel regelmäßig Informationen über unsere kommenden Veranstaltungen zu erhalten."
                : "We obtain data about you when we recognize your telephone number or when you provide it to us, and when you give your name during a call to make a reservation. We note your telephone number and name for your visit to our restaurant or our events. We use the word 'we' because a restaurant employee or event organizer may receive your information to process your visit. We delete the data you provide after your visit to our restaurant or event, unless you make a different arrangement with us, for example, to regularly receive information about our upcoming events."
              }
            </p>
            <p>
              {isGerman 
                ? "Andere nicht personenbezogene technische Daten erfassen unsere IT-Systeme automatisch beim Besuch der Website, darunter Internetbrowser, Betriebssystem, IP-Adresse um eine fehlerfreie Bereitstellung der Website zu gewährleisten."
                : "Other non-personal technical data is automatically collected by our IT systems when you visit the website, including internet browser, operating system, and IP address to ensure error-free provision of the website."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Welche Rechte haben Sie bezüglich Ihrer Daten?" : "What Rights Do You Have Regarding Your Data?"}
            </h3>
            <p>
              {isGerman 
                ? "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu."
                : "You have the right at any time to receive free information about the origin, recipient, and purpose of your stored personal data. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future. You also have the right to request the restriction of processing of your personal data under certain circumstances. Furthermore, you have the right to lodge a complaint with the competent supervisory authority."
              }
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "2. Allgemeine Hinweise und Pflicht­informationen" : "2. General Information and Mandatory Disclosures"}
            </h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Datenschutz" : "Data Protection"}
            </h3>
            <p>
              {isGerman 
                ? "Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."
                : "We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy."
              }
            </p>
            <p>
              {isGerman 
                ? "Wenn Sie diese Website benutzen, werden durch Nutzung der Kontaktmöglichkeiten verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen."
                : "When you use this website, various personal data is collected through the use of contact options. Personal data is data that can be used to personally identify you. This privacy policy explains what data we collect and what we use it for."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Hinweis zur verantwortlichen Stelle" : "Notice on the Responsible Party"}
            </h3>
            <p>{isGerman ? "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:" : "The responsible party for data processing on this website is:"}</p>
            <p className="pl-4">
              Purusha GmbH<br />
              {isGerman ? "Geschäftsführer" : "Managing Director"} Ashru Andreas Reichel<br />
              Mariahilferstr. 45/6/48<br />
              1060 {isGerman ? "Wien" : "Vienna"}<br />
              Tel.: 01/586 28 39<br />
              E-Mail: reichel@purusha.at
            </p>
            <p>
              {isGerman 
                ? "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet."
                : "The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of processing personal data (e.g., names, email addresses, etc.)."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Speicherdauer" : "Storage Duration"}
            </h3>
            <p>
              {isGerman 
                ? "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bis wir Ihr Anliegen bearbeitet haben, oder bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben."
                : "Unless a more specific storage period is stated in this privacy policy, your personal data will remain with us until we have processed your request, or until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Widerruf Ihrer Einwilligung zur Datenverarbeitung" : "Revocation of Your Consent to Data Processing"}
            </h3>
            <p>
              {isGerman 
                ? "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt."
                : "Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of the data processing carried out until the revocation remains unaffected by the revocation."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Beschwerderecht bei der zuständigen Aufsichtsbehörde" : "Right to Lodge a Complaint with the Supervisory Authority"}
            </h3>
            <p>
              {isGerman 
                ? "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Die Aufsichtsbehörde für Österreich finden Sie hier: "
                : "In the event of violations of the GDPR, data subjects have a right of appeal to a supervisory authority, in particular in the Member State of their habitual residence, their place of work, or the place of the alleged infringement. The supervisory authority for Austria can be found here: "
              }
              <a href="https://www.dsb.gv.at/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.dsb.gv.at/</a>
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Recht auf Datenübertragbarkeit" : "Right to Data Portability"}
            </h3>
            <p>
              {isGerman 
                ? "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist."
                : "You have the right to have data that we process automatically based on your consent handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of data to another controller, this will only be done to the extent that it is technically feasible."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Auskunft, Berichtigung und Löschung" : "Information, Correction, and Deletion"}
            </h3>
            <p>
              {isGerman 
                ? "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten."
                : "Within the framework of the applicable legal provisions, you have the right at any time to free information about your stored personal data, its origin and recipient, and the purpose of data processing, and, if applicable, a right to correction or deletion of this data."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "SSL- bzw. TLS-Verschlüsselung" : "SSL/TLS Encryption"}
            </h3>
            <p>
              {isGerman 
                ? "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von «http://» auf «https://» wechselt und an dem Schloss-Symbol in Ihrer Browserzeile."
                : "For security reasons and to protect the transmission of confidential content, such as inquiries you send to us as the site operator, this site uses SSL/TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from 'http://' to 'https://' and by the lock symbol in your browser line."
              }
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "3. Datenerfassung auf dieser Website" : "3. Data Collection on This Website"}
            </h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Server-Log-Dateien" : "Server Log Files"}
            </h3>
            <p>
              {isGerman 
                ? "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:"
                : "The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:"
              }
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{isGerman ? "Browsertyp und Browserversion" : "Browser type and version"}</li>
              <li>{isGerman ? "Verwendetes Betriebssystem" : "Operating system used"}</li>
              <li>{isGerman ? "URL der besuchten Webseiten" : "URL of visited web pages"}</li>
              <li>{isGerman ? "Hostname des zugreifenden Rechners" : "Hostname of the accessing computer"}</li>
              <li>{isGerman ? "Uhrzeit der Serveranfrage" : "Time of server request"}</li>
              <li>{isGerman ? "IP-Adresse" : "IP address"}</li>
            </ul>
            <p>
              {isGerman 
                ? "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO."
                : "This data is not merged with other data sources. The collection of this data is based on Art. 6 para. 1 lit. f GDPR."
              }
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Anfrage per E-Mail oder Telefon" : "Inquiries by Email or Telephone"}
            </h3>
            <p>
              {isGerman 
                ? "Wenn Sie uns per Telefon oder E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
                : "If you contact us by telephone or email, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of processing your request. We do not pass on this data without your consent."
              }
            </p>
          </section>

          {/* Section 4 - Google Maps */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "4. Google Maps" : "4. Google Maps"}
            </h2>
            <p>
              {isGerman 
                ? "Wir nutzen den Kartendienst Google Maps auf unserer Kontaktseite. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland."
                : "We use the Google Maps mapping service on our contact page. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland."
              }
            </p>
            <p>
              {isGerman 
                ? "Beim Laden der Karte wird eine Verbindung zu den Servern von Google hergestellt. Dabei kann Ihre IP-Adresse an Google übermittelt werden. Wenn Sie in Ihrem Google-Konto eingeloggt sind, kann Google Ihr Surfverhalten Ihrem persönlichen Profil zuordnen."
                : "When loading the map, a connection to Google's servers is established. Your IP address may be transmitted to Google. If you are logged into your Google account, Google can associate your browsing behavior with your personal profile."
              }
            </p>
            <p>
              {isGerman 
                ? "Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar."
                : "The use of Google Maps is in the interest of an appealing presentation of our online offerings and easy findability of the locations indicated by us on the website. This represents a legitimate interest within the meaning of Art. 6 para. 1 lit. f GDPR."
              }
            </p>
            <p>
              {isGerman ? "Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: " : "For more information on how user data is handled, see Google's privacy policy: "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a>
            </p>
          </section>

          {/* Section 5 - Google Analytics (prepared) */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "5. Google Analytics" : "5. Google Analytics"}
            </h2>
            <p>
              {isGerman 
                ? "Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland."
                : "This website uses features of the web analytics service Google Analytics. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland."
              }
            </p>
            <p>
              {isGerman 
                ? "Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z. B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft des Nutzers."
                : "Google Analytics enables the website operator to analyze the behavior of website visitors. The website operator receives various usage data, such as page views, session duration, operating systems used, and the origin of the user."
              }
            </p>
            <p>
              {isGerman 
                ? "Die Nutzung dieses Analyse-Tools erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit widerrufen."
                : "The use of this analysis tool is based on Art. 6 para. 1 lit. a GDPR (consent). You can revoke your consent at any time."
              }
            </p>
            <p>
              {isGerman ? "Weitere Informationen finden Sie in der Datenschutzerklärung von Google: " : "For more information, see Google's privacy policy: "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a>
            </p>
          </section>

          {/* Section 6 - Social Media */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "6. Datenschutzerklärung für unsere Social-Media-Auftritte" : "6. Privacy Policy for Our Social Media Presence"}
            </h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Unsere Social-Media-Auftritte" : "Our Social Media Presence"}
            </h3>
            <p>{isGerman ? "Diese Datenschutzerklärung gilt für folgende Social-Media-Auftritte:" : "This privacy policy applies to the following social media presences:"}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><a href="https://www.instagram.com/mysecretgardencafewien/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram</a></li>
              <li><a href="https://www.facebook.com/secretgardencafewien/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Facebook</a></li>
            </ul>

            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Datenverarbeitung durch soziale Netzwerke" : "Data Processing by Social Networks"}
            </h3>
            <p>
              {isGerman 
                ? "Wir unterhalten öffentlich zugängliche Profile in sozialen Netzwerken. Soziale Netzwerke wie Facebook, Instagram etc. können Ihr Nutzerverhalten in der Regel umfassend analysieren, wenn Sie deren Website oder eine Website mit integrierten Social-Media-Inhalten besuchen."
                : "We maintain publicly accessible profiles on social networks. Social networks such as Facebook, Instagram, etc. can generally analyze your user behavior extensively when you visit their website or a website with integrated social media content."
              }
            </p>
            <p>
              {isGerman 
                ? "Wenn Sie in Ihrem Social-Media-Account eingeloggt sind und unsere Social-Media-Präsenz besuchen, kann der Betreiber des Social-Media-Portals diesen Besuch Ihrem Benutzerkonto zuordnen. Mit Hilfe der so erfassten Daten können die Betreiber der Social-Media-Portale Nutzerprofile erstellen, in denen Ihre Präferenzen und Interessen hinterlegt sind."
                : "If you are logged into your social media account and visit our social media presence, the operator of the social media portal can assign this visit to your user account. With the help of the data collected in this way, the operators of the social media portals can create user profiles in which your preferences and interests are stored."
              }
            </p>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">
              {isGerman ? "Ihre Rechte" : "Your Rights"}
            </h3>
            <p>
              {isGerman 
                ? "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Ihnen steht außerdem ein Recht auf Widerspruch, auf Datenübertragbarkeit und ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu."
                : "You have the right at any time to receive free information about the origin, recipient, and purpose of your stored personal data. You also have a right to object, to data portability, and a right to lodge a complaint with the competent supervisory authority."
              }
            </p>
          </section>

          {/* Section 7 - Social Networks Detail */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "7. Soziale Netzwerke im Einzelnen" : "7. Social Networks in Detail"}
            </h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">Facebook</h3>
            <p>
              {isGerman 
                ? "Wir verfügen über ein Profil bei Facebook. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland (nachfolgend Meta). Die erfassten Daten werden nach Aussage von Meta auch in die USA und in andere Drittländer übertragen."
                : "We have a profile on Facebook. The provider of this service is Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland (hereinafter Meta). According to Meta, the collected data is also transferred to the USA and other third countries."
              }
            </p>
            <p>
              {isGerman ? "Details entnehmen Sie der Datenschutzerklärung von Facebook: " : "For details, see Facebook's privacy policy: "}
              <a href="https://www.facebook.com/about/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/about/privacy/</a>
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Instagram</h3>
            <p>
              {isGerman 
                ? "Wir verfügen über ein Profil bei Instagram. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland."
                : "We have a profile on Instagram. The provider of this service is Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland."
              }
            </p>
            <p>
              {isGerman ? "Details zu deren Umgang mit Ihren personenbezogenen Daten entnehmen Sie der Datenschutzerklärung von Instagram: " : "For details on how they handle your personal data, see Instagram's privacy policy: "}
              <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://privacycenter.instagram.com/policy/</a>
            </p>
          </section>

          {/* Section 8 - Changes */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">
              {isGerman ? "8. Änderung des Datenschutzes" : "8. Changes to Privacy Policy"}
            </h2>
            <p>
              {isGerman 
                ? "Wenn wir unsere Dienste ergänzen oder neue rechtliche Grundlagen eine Änderung dieser Datenschutzerklärung erforderlich machen, gilt beim wiederholten Besuch unserer Webseite die neue Datenschutzerklärung."
                : "If we add to our services or new legal requirements make a change to this privacy policy necessary, the new privacy policy will apply when you revisit our website."
              }
            </p>
          </section>

        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {isGerman 
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


export default Privacy;
