import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="font-caveat text-5xl md:text-6xl text-primary text-center mb-12">
          {language === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>
        
        <div className="space-y-10 font-lora text-foreground/80 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">1. Datenschutz im Überblick</h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">Allgemeines zum Datenschutz</h3>
            <p>
              Im Folgenden bekommen Sie einen einfachen Überblick darüber, wie wir mit Ihren personenbezogenen Daten umgehen, die wir durch Ihren Besuch dieser Website erhalten. Unter personenbezogene Daten versteht man zum Beispiel Name, Adresse, Telefonummer, E-Mail-Adresse – alle Daten, mit denen Ihre Person identifiziert werden kann. Wir schenken dem Schutz Ihrer personenbezogenen Daten große Beachtung und verwenden außer nicht personenbezogenen, technisch notwendigen und automatisch übermittelten Informationen keine Cookies oder andere Mittel zu Analyse- oder Werbezwecken.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Datenerfassung auf dieser Website</h3>
            <p>
              Wer ist verantwortlich für die Datenerfassung auf dieser Website? Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Wie erhalten wir Ihre Daten?</h3>
            <p>
              Daten zu Ihrer Person werden uns dadurch bekannt, dass wir Ihre Telefonummer erkennen oder Sie uns diese mitteilen und Sie bei einem Anruf Ihren Namen nennen, wenn Sie sich bei uns anmelden. Wir notieren Ihre Telefonummer, Ihren Namen für den Besuch unseres Restaurants oder unserer Veranstaltungen. Wir verwenden das Wort „wir", weil ein Mitarbeiter des Restaurants oder Veranstaltungsleiter Ihre Informationen zur Abwicklung des Besuchs bei uns erhalten kann. Wir löschen die von Ihnen bekannt gegebenen Daten nach dem Besuch unseres Restaurants oder unserer Veranstaltung, außer Sie treffen mit uns eine andere Vereinbarung, um zum Beispiel regelmäßig Informationen über unsere kommenden Veranstaltungen zu erhalten. Zudem besteht die Möglichkeit, dass Sie uns bezüglich dem Datenschutz oder anderem eine E-Mail senden. Dadurch erhalten wir Ihre E-Mail-Adresse und die in der E-Mail enthaltenen Informationen.
            </p>
            <p>
              Andere nicht personenbezogene technische Daten erfassen unsere IT-Systeme automatisch beim Besuch der Website, darunter Internetbrowser, Betriebssystem, IP-Adresse um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">2. Allgemeine Hinweise und Pflicht­informationen</h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">Datenschutz</h3>
            <p>
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p>
              Wenn Sie diese Website benutzen, werden durch Nutzung der Kontaktmöglichkeiten verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Hinweis zur verantwortlichen Stelle</h3>
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p className="pl-4">
              Purusha GmbH<br />
              Geschäftsführer Ashru Andreas Reichel<br />
              Mariahilferstr. 45/6/48<br />
              1060 Wien<br />
              Tel.: 01/586 28 39<br />
              E-Mail: reichel@purusha.at
            </p>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bis wir Ihr Anliegen bearbeitet haben, oder bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben; im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sofern Sie in die Datenverarbeitung ihrer personenbezogenen Daten für einen oder mehrere bestimmte Zwecke eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden.</li>
              <li>Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.</li>
              <li>Die Datenverarbeitung kann ferner auf Grundlage des berechtigten Interesses des Verantwortlichen oder eines Dritten nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.</li>
              <li>Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO.</li>
              <li>Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Die Einwilligung ist jederzeit widerrufbar.</li>
            </ul>
            <p>Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
            <p>
              Falls eine Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
            </p>
            <p>
              Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschliessend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe. Die Aufsichtsbehörde für Österreich finden Sie hier:{" "}
              <a href="https://www.dsb.gv.at/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.dsb.gv.at/</a>
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Recht auf Datenübertragbarkeit</h3>
            <p>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Auskunft, Berichtigung und Löschung</h3>
            <p>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Recht auf Einschränkung der Verarbeitung</h3>
            <p>
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
              <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            </ul>
            <p>
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p>
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">3. Datenerfassung auf dieser Website</h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>URL der besuchten Webseiten</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            </p>
            <p>
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Anfrage per E-Mail oder Telefon</h3>
            <p>
              Wenn Sie uns per Telefon oder E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p>
              Die von Ihnen an uns per Anfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </section>

          {/* Section 4 - Social Media */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">4. Datenschutzerklärung für unsere Social-Media-Auftritte</h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">Unsere Social-Media-Auftritte</h3>
            <p>Diese Datenschutzerklärung gilt für folgende Social-Media-Auftritte:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><a href="https://www.instagram.com/mysecretgardencafewien/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.instagram.com/mysecretgardencafewien/</a></li>
              <li><a href="https://www.facebook.com/secretgardencafewien/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/secretgardencafewien/</a></li>
            </ul>

            <h3 className="font-lora text-lg font-semibold text-foreground">Datenverarbeitung durch soziale Netzwerke</h3>
            <p>
              Wir unterhalten öffentlich zugängliche Profile in sozialen Netzwerken. Die im Einzelnen von uns genutzten sozialen Netzwerke finden Sie weiter unten.
            </p>
            <p>
              Soziale Netzwerke wie Facebook, Instagram etc. können Ihr Nutzerverhalten in der Regel umfassend analysieren, wenn Sie deren Website oder eine Website mit integrierten Social-Media-Inhalten (z. B. Like-Buttons oder Werbebannern) besuchen. Durch den Besuch unserer Social-Media-Präsenzen werden zahlreiche datenschutzrelevante Verarbeitungsvorgänge ausgelöst. Im Einzelnen:
            </p>
            <p>
              Wenn Sie in Ihrem Social-Media-Account eingeloggt sind und unsere Social-Media-Präsenz besuchen, kann der Betreiber des Social-Media-Portals diesen Besuch Ihrem Benutzerkonto zuordnen. Ihre personenbezogenen Daten können unter Umständen aber auch dann erfasst werden, wenn Sie nicht eingeloggt sind oder keinen Account beim jeweiligen Social-Media-Portal besitzen. Diese Datenerfassung erfolgt in diesem Fall beispielsweise über Cookies, die auf Ihrem Endgerät gespeichert werden oder durch Erfassung Ihrer IP-Adresse.
            </p>
            <p>
              Mit Hilfe der so erfassten Daten können die Betreiber der Social-Media-Portale Nutzerprofile erstellen, in denen Ihre Präferenzen und Interessen hinterlegt sind. Auf diese Weise kann Ihnen interessenbezogene Werbung in- und außerhalb der jeweiligen Social-Media-Präsenz angezeigt werden. Sofern Sie über einen Account beim jeweiligen sozialen Netzwerk verfügen, kann die interessenbezogene Werbung auf allen Geräten angezeigt werden, auf denen Sie eingeloggt sind oder eingeloggt waren.
            </p>
            <p>
              Bitte beachten Sie außerdem, dass wir nicht alle Verarbeitungsprozesse auf den Social-Media-Portalen nachvollziehen können. Je nach Anbieter können daher ggf. weitere Verarbeitungsvorgänge von den Betreibern der Social-Media-Portale durchgeführt werden. Details hierzu entnehmen Sie den Nutzungsbedingungen und Datenschutzbestimmungen der jeweiligen Social-Media-Portale.
            </p>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">Rechtsgrundlage</h3>
            <p>
              Unsere Social-Media-Auftritte sollen eine möglichst umfassende Präsenz im Internet gewährleisten. Hierbei handelt es sich um ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO. Die von den sozialen Netzwerken initiierten Analyseprozesse beruhen ggf. auf abweichenden Rechtsgrundlagen, die von den Betreibern der sozialen Netzwerke anzugeben sind (z. B. Einwilligung im Sinne des Art. 6 Abs. 1 lit. a DSGVO).
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Verantwortlicher und Geltendmachung von Rechten</h3>
            <p>
              Wenn Sie einen unserer Social-Media-Auftritte (z. B. Facebook) besuchen, sind wir gemeinsam mit dem Betreiber der Social-Media-Plattform für die bei diesem Besuch ausgelösten Datenverarbeitungsvorgänge verantwortlich. Sie können Ihre Rechte (Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Beschwerde) grundsätzlich sowohl ggü. uns als auch ggü. dem Betreiber des jeweiligen Social-Media-Portals (z. B. ggü. Facebook) geltend machen.
            </p>
            <p>
              Bitte beachten Sie, dass wir trotz der gemeinsamen Verantwortlichkeit mit den Social-Media-Portal-Betreibern nicht vollumfänglich Einfluss auf die Datenverarbeitungsvorgänge der Social-Media-Portale haben. Unsere Möglichkeiten richten sich maßgeblich nach der Unternehmenspolitik des jeweiligen Anbieters.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Speicherdauer</h3>
            <p>
              Die unmittelbar von uns über die Social-Media-Präsenz erfassten Daten werden von unseren Systemen gelöscht, sobald Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Gespeicherte Cookies verbleiben auf Ihrem Endgerät, bis Sie sie löschen. Zwingende gesetzliche Bestimmungen – insb. Aufbewahrungsfristen – bleiben unberührt.
            </p>
            <p>
              Auf die Speicherdauer Ihrer Daten, die von den Betreibern der sozialen Netzwerke zu eigenen Zwecken gespeichert werden, haben wir keinen Einfluss. Für Einzelheiten dazu informieren Sie sich bitte direkt bei den Betreibern der sozialen Netzwerke (z. B. in deren Datenschutzerklärung, siehe unten).
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Ihre Rechte</h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Ihnen steht außerdem ein Recht auf Widerspruch, auf Datenübertragbarkeit und ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Ferner können Sie die Berichtigung, Sperrung, Löschung und unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.
            </p>
          </section>

          {/* Section 5 - Social Networks */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">5. Soziale Netzwerke im Einzelnen</h2>
            
            <h3 className="font-lora text-lg font-semibold text-foreground">Facebook</h3>
            <p>
              Wir verfügen über ein Profil bei Facebook. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland (nachfolgend Meta). Die erfassten Daten werden nach Aussage von Meta auch in die USA und in andere Drittländer übertragen.
            </p>
            <p>
              Sie können Ihre Werbeeinstellungen selbstständig in Ihrem Nutzer-Account anpassen. Klicken Sie hierzu auf folgenden Link und loggen Sie sich ein:{" "}
              <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/settings?tab=ads</a>
            </p>
            <p>
              Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier:{" "}
              <a href="https://www.facebook.com/legal/EU_data_transfer_addendum" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/legal/EU_data_transfer_addendum</a>
            </p>
            <p>
              Details entnehmen Sie der Datenschutzerklärung von Facebook:{" "}
              <a href="https://www.facebook.com/about/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/about/privacy/</a>
            </p>
            <p>
              Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework" (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll.
            </p>

            <h3 className="font-lora text-lg font-semibold text-foreground">Instagram</h3>
            <p>
              Wir verfügen über ein Profil bei Instagram. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.
            </p>
            <p>
              Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier:{" "}
              <a href="https://www.facebook.com/legal/EU_data_transfer_addendum" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/legal/EU_data_transfer_addendum</a>
            </p>
            <p>
              Details zu deren Umgang mit Ihren personenbezogenen Daten entnehmen Sie der Datenschutzerklärung von Instagram:{" "}
              <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://privacycenter.instagram.com/policy/</a>
            </p>
            <p>
              Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework" (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="font-caveat text-3xl text-primary">6. Änderung des Datenschutzes</h2>
            <p>
              Wenn wir unsere Dienste ergänzen oder neue rechtliche Grundlagen eine Änderung dieser Datenschutzerklärung erforderlich machen, gilt beim wiederholten Besuch unserer Webseite die neue Datenschutzerklärung.
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

export default Privacy;
