import { useLanguage } from "@/contexts/LanguageContext";
import falstaff from "@/assets/partners/falstaff.png";
import happycow from "@/assets/partners/happycow.png";
import tripadvisor from "@/assets/partners/tripadvisor.png";
import supermind from "@/assets/partners/supermind.png";

interface VoceItem {
  name: string;
  logo: string;
  quote: { de: string; en: string };
}

const items: VoceItem[] = [
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
  const eyebrowLabel = language === "de" ? "Stimmen" : "Voices";
  const heading = language === "de" ? "Worte, die uns freuen." : "Words that mean something to us.";


  return (
    <section aria-labelledby="voci-heading" className="bg-verde-tint py-20 md:py-28">
      <div className="container mx-auto px-5">
        <div className="max-w-2xl mb-10 md:mb-14 space-y-4">
          <span className="eyebrow-num">
            05 · {eyebrowLabel}
          </span>
          <h2 id="voci-heading" className="h2-editorial text-primary">
            {heading}
          </h2>
          <span className="rule-short" aria-hidden="true" />
        </div>
      </div>

      {/* Mobile: stacked list */}
      <div className="container mx-auto px-5 md:hidden">
        <ul className="border-t border-border-default">
          {items.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-4 py-5 border-b border-border-default"
            >
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                loading="lazy"
                className="h-8 w-auto object-contain shrink-0"
                style={{ maxWidth: 80 }}
              />
              <p className="text-text-secondary italic text-sm leading-snug">
                {item.quote[language]}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: infinite marquee */}
      <div
        className="hidden md:block relative overflow-hidden group"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max voci-marquee">
          {looped.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-6 px-8 shrink-0"
            >
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                loading="lazy"
                className="h-10 w-auto object-contain shrink-0"
                style={{ maxWidth: 120 }}
              />
              <p className="text-text-secondary italic text-sm whitespace-nowrap">
                {item.quote[language]}
              </p>
              <span
                aria-hidden="true"
                className="ml-8 h-8 w-px bg-border-default"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes voci-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .voci-marquee {
          animation: voci-scroll 40s linear infinite;
        }
        .group:hover .voci-marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .voci-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default Voci;
