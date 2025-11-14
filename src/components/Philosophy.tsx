import { Card } from "@/components/ui/card";
import { Quote, Sparkles, Heart, Flower2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Philosophy = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Flower2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              {t("philosophy.title")}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          {/* Main Philosophy Content */}
          <Card className="p-8 md:p-10 mb-8 bg-gradient-subtle border-primary/20 shadow-elevated">
            <div className="space-y-6 text-foreground/90 leading-relaxed">
              <p className="text-lg md:text-xl font-medium text-primary">
                Es liegt uns am Herzen, dass die Welt zu einem{" "}
                <strong>besseren</strong> und <strong>schöneren</strong> Ort wird. 
                Wir wollen mit unserer Arbeit, unserem Lebensstil und unserem 
                Bewusstsein dazu beitragen.
              </p>

              <p className="text-base md:text-lg">
                Das Team und die Atmosphäre in unserem Restaurant sind von der 
                Philosophie und dem Meditationsweg{" "}
                <a 
                  href="https://www.srichinmoy.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline"
                >
                  Sri Chinmoys
                </a>{" "}
                inspiriert.
              </p>

              <p className="text-base md:text-lg">
                Wir nutzen Meditation um{" "}
                <strong className="text-primary">Harmonie und Bewusst-Sein</strong>{" "}
                in unsere Aktivitäten zu bringen.{" "}
                <strong className="text-primary">Familiäre Atmosphäre und Herzlichkeit</strong>{" "}
                wird großgeschrieben und unser spiritueller Background sorgt für 
                das Plus an Lebensfreude.
              </p>
            </div>
          </Card>

          {/* Quote Block */}
          <Card className="p-8 md:p-10 mb-8 bg-primary text-primary-foreground relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-16 h-16 opacity-10" />
            <div className="relative z-10 space-y-4">
              <p className="text-lg md:text-xl leading-relaxed italic">
                Im <strong>Secret Garden</strong> streben wir danach
              </p>
              <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                eine Oase des Friedens und bewussten Genusses zu schaffen.
              </p>
              <div className="space-y-2 text-base md:text-lg">
                <p>Einen Rückzugsort</p>
                <p>von der Hektik und Schnelllebigkeit des Alltags,</p>
                <p>an dem man die Seele baumeln lassen kann</p>
                <p className="font-semibold">
                  und Nahrung für Körper und Geist findet.
                </p>
              </div>
              <p className="text-xl md:text-2xl font-bold pt-4">
                Ein <em>Herzens-Garten</em> voller Geheimnisse …
              </p>
              <p className="text-lg">und Offenbarungen!</p>
            </div>
          </Card>

          {/* Sri Chinmoy Quote */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/30 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">
                  "In Heaven, peace has another name: light.<br />
                  On earth, peace has another name: love."
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                  — Sri Chinmoy
                </p>
              </div>
            </div>
          </Card>

          {/* Values Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-accent animate-pulse" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Mit Liebe</h3>
              <p className="text-sm text-muted-foreground">
                Jedes Gericht wird mit Liebe und positiver Energie zubereitet
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Bewusst</h3>
              <p className="text-sm text-muted-foreground">
                Meditation und Achtsamkeit fließen in alles, was wir tun
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flower2 className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Harmonisch</h3>
              <p className="text-sm text-muted-foreground">
                Familiäre Atmosphäre und Herzlichkeit als Grundlage
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
