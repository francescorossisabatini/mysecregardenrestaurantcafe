import { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";

const MAPS_CONSENT_KEY = "msg_maps_consent_v1";

type Props = {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * GDPR-konformes Google Maps Embed:
 * Lädt den Google-iframe erst, wenn der Nutzer explizit zustimmt.
 * Rechtsgrundlage: Art. 6(1)(a) DSGVO — vgl. Privacy §4.
 */
export const MapConsentGate = ({ src, title, className, style }: Props) => {
  const { language } = useLanguage();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(MAPS_CONSENT_KEY) === "granted") {
        setAccepted(true);
      }
    } catch {
      // storage disabled — bleibt Consent Gate
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(MAPS_CONSENT_KEY, "granted");
    } catch {
      // ignore
    }
    setAccepted(true);
  };

  if (accepted) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0, ...style }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={className}
      />
    );
  }

  const copy = language === "de"
    ? {
        title: "Karte deaktiviert",
        body: "Wenn du die Karte lädst, überträgt dein Browser Daten (u. a. deine IP-Adresse) an Google in den USA. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.",
        accept: "Karte laden",
        external: "Route in Google Maps öffnen",
        more: "Details in der Datenschutzerklärung",
      }
    : {
        title: "Map disabled",
        body: "If you load the map, your browser sends data (including your IP address) to Google in the US. Legal basis: Art. 6(1)(a) GDPR.",
        accept: "Load map",
        external: "Open route in Google Maps",
        more: "Details in our privacy policy",
      };

  return (
    <div
      className={`flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-4 bg-muted/40 p-6 text-center ${className ?? ""}`}
      style={style}
      role="region"
      aria-label={copy.title}
    >
      <MapPin className="h-8 w-8 text-primary" aria-hidden="true" />
      <div className="max-w-md space-y-2">
        <p className="font-cormorant text-xl font-semibold text-foreground">{copy.title}</p>
        <p className="font-work text-sm leading-relaxed text-muted-high-contrast">{copy.body}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button size="sm" onClick={handleAccept} className="bg-primary text-primary-foreground hover:bg-primary/90">
          {copy.accept}
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            {copy.external}
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
      <a href="/privacy" className="font-work text-xs text-muted-high-contrast underline underline-offset-2 hover:text-foreground">
        {copy.more}
      </a>
    </div>
  );
};
