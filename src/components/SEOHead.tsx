import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { absoluteUrl, isLocalizedPath, localizePath, SITE_ORIGIN } from "@/lib/i18nRoutes";

interface SEOHeadProps {
  title?: string;
  description?: string;
  /** Percorso della pagina, con o senza /en: la lingua la aggiunge SEOHead. */
  path?: string;
  image?: string;
  noindex?: boolean;
  notranslate?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/food-detail-real-D-Th9dqL.jpg`;

// La versione inglese dei default è nuova (24-26/09/2026, struttura /en/):
// prima la home aveva solo il testo tedesco anche quando mostrava l'inglese.
const DEFAULTS = {
  de: {
    title: "My Secret Garden Vegetarisches & Veganes Restaurant Wien",
    suffix: "My Secret Garden Wien",
    description: "Vegetarisches & veganes Restaurant in Wien. Geschmack, der entzückt. Bio, fair, regional & saisonal.",
    ogLocale: "de_AT",
  },
  en: {
    title: "My Secret Garden Vegetarian & Vegan Restaurant Vienna",
    suffix: "My Secret Garden Vienna",
    description: "Vegetarian & vegan restaurant in Vienna. Organic, fair, regional and seasonal.",
    ogLocale: "en_US",
  },
} as const;

export const SEOHead = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
  notranslate = false,
  jsonLd,
}: SEOHeadProps) => {
  const { language } = useLanguage();
  const d = DEFAULTS[language];
  const fullTitle = title ? `${title} | ${d.suffix}` : d.title;
  const metaDescription = description ?? d.description;

  // Canonical nella lingua della pagina: /en/menu dichiara sé stessa, non
  // /menu. Un canonical cross-lingua cancellerebbe la versione inglese
  // dall'indice (Google: il canonical vince sull'hreflang).
  const canonicalUrl = absoluteUrl(localizePath(path, language));

  // hreflang: ogni pagina elenca sé stessa e la sua coppia, reciproco in
  // entrambe le lingue, più x-default sul tedesco. Se una delle due punta
  // male, Google scarta la coppia intera. Niente hreflang su pagine noindex
  // o non doppie (404, /login).
  const alternates = !noindex && isLocalizedPath(path)
    ? [
        { hrefLang: "de", href: absoluteUrl(localizePath(path, "de")) },
        { hrefLang: "en", href: absoluteUrl(localizePath(path, "en")) },
        { hrefLang: "x-default", href: absoluteUrl(localizePath(path, "de")) },
      ]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {notranslate && <meta name="google" content="notranslate" />}
      <link rel="canonical" href={canonicalUrl} />
      {alternates.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={d.ogLocale} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
