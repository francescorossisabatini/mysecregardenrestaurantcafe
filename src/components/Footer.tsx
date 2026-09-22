import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";

/**
 * Impaginazione decisa da Francesco il 22 settembre 2026: firma del brand
 * centrata in alto, sotto due gruppi affiancati (dove siamo e quando · dove
 * seguirci e il legale). È una deroga consapevole alla regola del corpo
 * sempre a sinistra: qui la simmetria è la forma, e il footer non è corpo
 * di lettura ma una chiusura.
 *
 * Nessun padding orizzontale sui link: il target da 44px lo dà min-h, e la
 * larghezza del testo è comunque sopra i 44px su tutte le voci. Con il
 * padding i testi partivano da x diverse fra righe con e senza link.
 */
export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-10 pb-24 md:pb-10">
      <div className="container mx-auto px-4">

        <div className="text-center">
          <p className="font-cormorant text-xl font-semibold md:text-2xl">
            {SITE.name}
          </p>
          <p className="mt-1 font-caveat text-base italic text-primary-foreground">
            "Cooking is prayer. Eating is gratitude."
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">

          {/* Dove siamo e quando */}
          <div className="flex flex-col items-start">
            <Link
              to="/visit"
              className="inline-flex min-h-[44px] items-center font-work text-sm text-primary-foreground underline-offset-2 transition-colors hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "So findest du uns" : "How to find us"}
            >
              {SITE.addressShort}
            </Link>

            {/* Gli orari uscivano con ShowcaseSections, che è stata fusa in IlPosto.
                Il footer è il posto giusto: uno solo, su ogni pagina.
                Stringhe invariate. */}
            <p className="font-work text-sm leading-relaxed text-primary-foreground/90">
              {language === "de" ? "Montag bis Samstag: 11:00 bis 19:00" : "Monday to Saturday: 11:00 to 19:00"}
              <br />
              {language === "de" ? "Sonn- und Feiertage geschlossen." : "Closed on Sundays and public holidays."}
            </p>
          </div>

          {/* Dove seguirci e il legale */}
          <div className="flex flex-col items-start sm:items-end sm:text-right">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 font-work text-sm text-primary-foreground transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={`${SITE.instagramHandle} on Instagram (opens in new tab)`}
              title={`${SITE.instagramHandle} on Instagram`}
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              {SITE.instagramHandle}
            </a>

            {/* Required Legal Links - MUST be on every page */}
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center font-work text-sm text-primary-foreground underline-offset-2 transition-colors duration-200 hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Kontakt" : "Contact Us"}
            >
              {language === "de" ? "Kontakt" : "Contact Us"}
            </Link>
            <Link
              to="/impressum"
              className="inline-flex min-h-[44px] items-center font-work text-sm text-primary-foreground underline-offset-2 transition-colors duration-200 hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Impressum" : "Legal Notice"}
            >
              {language === "de" ? "Impressum" : "Legal Notice"}
            </Link>
            <Link
              to="/privacy"
              className="inline-flex min-h-[44px] items-center font-work text-sm text-primary-foreground underline-offset-2 transition-colors duration-200 hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Datenschutz" : "Privacy Policy"}
            >
              {language === "de" ? "Datenschutz" : "Privacy Policy"}
            </Link>
          </div>

        </div>

        <p className="mt-10 text-center font-work text-xs text-primary-foreground/80">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
};
