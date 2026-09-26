import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage, useLocalizedPath } from "@/contexts/LanguageContext";

// Prima era il default di scaffold ("Oops! Page not found", solo inglese,
// zero token del design system) — mai toccato da quando il sito è stato
// costruito. Corretto il 23/09/2026: audit "conoscenza di mestiere" contro i
// tell del copy generico (vedi docs/ux/divergence-ledger.md). Il gioco su
// "versteckt" riprende la tagline hero approvata in chat il 20/09/2026
// ("Das Restaurant, das du fast nicht findest") — opzione scelta da
// Francesco tra due proposte.
const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const lp = useLocalizedPath();
  const isGerman = language === "de";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title={isGerman ? "Seite nicht gefunden" : "Page Not Found"}
        description={
          isGerman
            ? "Diese Seite existiert nicht. Zur Startseite von My Secret Garden Wien."
            : "This page does not exist. Back to the My Secret Garden Vienna homepage."
        }
        path={location.pathname}
        noindex
      />

      <Navigation />

      <main
        id="main-content"
        role="main"
        className="flex flex-1 items-center justify-center px-5 py-24"
      >
        <div className="mx-auto max-w-md space-y-5 text-center">
          <span className="eyebrow-num">404</span>
          <h1 className="h2-editorial text-primary">
            {isGerman
              ? "Diese Seite ist noch besser versteckt als wir."
              : "This page is even harder to find than we are."}
          </h1>
          <p className="font-lora text-base text-muted-high-contrast">
            {isGerman
              ? "Dieser Weg führt ins Leere — der zum Garten nicht."
              : "This path leads nowhere — the one to the garden doesn't."}
          </p>
          <div className="pt-2">
            <Button asChild size="lg">
              <Link to={lp("/")}>{isGerman ? "Zur Startseite" : "Back to Home"}</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
