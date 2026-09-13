import { Star, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";
import falstaff from "@/assets/partners/falstaff.png";
import happycow from "@/assets/partners/happycow.png";
import tripadvisor from "@/assets/partners/tripadvisor.png";
import supermind from "@/assets/partners/supermind.png";

/**
 * Voci — fusione di Voci (05 · stampa) e Reviews (06 · ospiti), che erano due
 * sezioni consecutive per lo stesso lavoro (antipatterns.md § S6).
 *
 * Le cinque stelle sopra ogni recensione sono sparite: erano quindici icone che
 * dicevano tutte la stessa cosa. La valutazione sta una volta sola, con il numero
 * di recensioni accanto — che è il dato che convince davvero.
 */

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/My+Secret+Garden/@48.1975697,16.3515233,17z/data=!4m8!3m7!1s0x476d078f0451b459:0x76f7dc33e496ccb5!8m2!3d48.1975697!4d16.3540982!9m1!1b1!16s%2Fg%2F11c3q3yxrb?entry=ttu";

const guests = [
  {
    text: {
      de: "Sehr schönes und gemütliches Lokal. Das Essen war wirklich ausgezeichnet und die Portionen großzügig. Das Personal ist hilfsbereit und freundlich, und das Preis-Leistungs-Verhältnis stimmt.",
      en: "Very nice and cozy place. The food was really excellent and the portions generous. The staff is helpful and friendly, and the value for money is fair.",
    },
    author: "Serena Saccaro",
    date: { de: "vor 6 Tagen", en: "6 days ago" },
  },
  {
    text: {
      de: "Ausgezeichnet! Gesundes Essen von hoher Qualität. Hier ist alles perfekt; das Personal ist wirklich leidenschaftlich bei der Arbeit. Wenn es mehr Sterne gäbe, würde ich alle vergeben!",
      en: "Excellent! Healthy, high-quality food. Everything is perfect here; the staff is truly passionate about their work. If there were more stars, I would give them all!",
    },
    author: "Gabor Nyaradi",
    date: { de: "vor 2 Wochen", en: "2 weeks ago" },
  },
];

const press = [
  {
    name: "Falstaff",
    logo: falstaff,
    quote: {
      de: "Eines der besten vegetarischen Restaurants Wiens.",
      en: "One of the best vegetarian restaurants in Vienna.",
    },
  },
  {
    name: "HappyCow",
    logo: happycow,
    quote: {
      de: "A hidden gem in the heart of Vienna.",
      en: "A hidden gem in the heart of Vienna.",
    },
  },
  {
    name: "TripAdvisor",
    logo: tripadvisor,
    quote: {
      de: "Ruhig, lecker, besonders. Immer wieder.",
      en: "Quiet, delicious, special. Again and again.",
    },
  },
  {
    name: "Supermind",
    logo: supermind,
    quote: {
      de: "Spezialitätenkaffee, der den Unterschied macht.",
      en: "Specialty coffee that makes the difference.",
    },
  },
];

export const Voci = () => {
  const { language } = useLanguage();

  return (
    <section id="reviews" aria-labelledby="voci-heading" className="bg-verde-tint py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-5">

        <div className="max-w-[62ch] space-y-4">
          <span className="eyebrow-num">{language === "de" ? "Stimmen" : "Voices"}</span>
          <h2 id="voci-heading" className="h2-editorial text-primary">
            {language === "de" ? "Stimmen aus dem Garten" : "Voices from the Garden"}
          </h2>
          <p className="flex flex-wrap items-center gap-2 font-work text-sm text-muted-high-contrast">
            <span className="inline-flex gap-0.5 text-brand-star" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span>
              {SITE.rating} {language === "de" ? "von" : "from"} {SITE.reviewCount}{" "}
              {language === "de" ? "Bewertungen auf Google" : "reviews on Google"}
            </span>
          </p>
        </div>

        {/* Ospiti — corpo allineato a sinistra, nessuna card */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          {guests.map((guest) => (
            <figure key={guest.author} className="max-w-[52ch]">
              {/* Le virgolette seguono la lingua: „…“ in tedesco, “…” in inglese. */}
              <blockquote className="font-lora text-base leading-relaxed text-foreground/90 md:text-lg">
                {language === "de" ? `„${guest.text.de}“` : `“${guest.text.en}”`}
              </blockquote>
              <figcaption className="mt-3 font-work text-xs text-muted-high-contrast">
                <span className="font-medium text-foreground">{guest.author}</span>
                {" · "}
                {guest.date[language]}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Stampa e partner — la stessa sezione, un registro diverso */}
        <ul className="mt-14 grid gap-x-12 gap-y-8 border-t border-border-default pt-10 md:grid-cols-2">
          {press.map((item) => (
            <li key={item.name} className="flex items-start gap-5">
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                loading="lazy"
                className="h-8 w-auto shrink-0 object-contain md:h-10"
                style={{ maxWidth: 110 }}
              />
              <p className="font-lora text-sm italic leading-relaxed text-text-secondary md:text-base">
                {item.quote[language]}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 font-work text-sm text-muted-high-contrast transition-colors hover:text-foreground"
          >
            {language === "de" ? "Alle Bewertungen auf Google" : "All reviews on Google"}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Voci;
