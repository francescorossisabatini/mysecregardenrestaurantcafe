import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import sriChinmoyImage from "@/assets/sri-chinmoy.jpg";

const Inspiration = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero - Minimal */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-caveat font-bold text-primary">
              {language === "de" ? "Unsere Inspiration" : "Our Inspiration"}
            </h1>
          </div>
        </div>
      </div>

      {/* Portrait */}
      <div className="container mx-auto px-4 mb-16 md:mb-24">
        <div className="max-w-md mx-auto">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl">
            <img 
              src={sriChinmoyImage} 
              alt="Sri Chinmoy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* BLOCCO 1 - Introduction (Context, not poetry) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Sri Chinmoy war ein spiritueller Lehrer aus Indien. Seine Schüler gründeten Orte auf der ganzen Welt, an denen das tägliche Leben zu einer Form der Meditation wurde." 
                : "Sri Chinmoy was a spiritual teacher from India. His students founded places around the world where daily life became a form of meditation."}
            </p>
          </div>
        </div>
      </section>

      {/* BLOCCO 2 - Central Manifesto (isolated, breathing) */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-caveat text-2xl md:text-4xl text-accent leading-relaxed">
              {language === "de" ? (
                <>
                  Kochen ist Gebet.<br />
                  Essen ist Dankbarkeit.
                </>
              ) : (
                <>
                  Cooking is prayer.<br />
                  Eating is gratitude.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* BLOCCO 3 - Connection to the kitchen (narrative, compact) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <p className="font-lora text-base md:text-lg text-foreground/70 leading-relaxed">
              {language === "de" 
                ? "Diese Haltung prägt unsere Küche. Einfachheit, Sorgfalt und Stille begleiten, wie wir kochen und wie wir servieren." 
                : "This attitude shapes our kitchen. Simplicity, care and stillness guide how we cook and how we serve."}
            </p>
          </div>
        </div>
      </section>

      {/* Visual pause - soft gradient block */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted/40 via-muted/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Link */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <a 
              href="https://www.srichinmoy.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-lora text-base text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              {language === "de" ? "Mehr über Sri Chinmoy" : "More about Sri Chinmoy"}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Inspiration;
