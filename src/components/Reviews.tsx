import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviews = [
  {
    text: "Als Veganer war dieses Kleinod eine Entdeckung und ist mit Abstand mein Lieblingsrestaurant in Wien…entspannt sitzt man zwischen Blumen…alle Speisen sind der absolute Wahnsinn! Man spürt die Liebe und Leidenschaft in jedem einzelnen Gericht.",
    author: "Silent Rocco",
    role: "Local Guide",
  },
  {
    text: "Mit Abstand das beste Restaurant in Wien. Schönes Ambiente und mit Liebe und guter Energie zubereitete, gesunde Speisen. Was will man mehr?",
    author: "Elbie",
    role: "Google Review",
  },
  {
    text: "Vegetarische und vegane Speisen werden hier vom entspannten und herzenswarmen Team gekocht und serviert, etwa Curry oder Dal.",
    author: "Stadtbekannt",
    role: "Lokalführer",
  },
  {
    text: "Ich entschied mich bei meinem Besuch für das Tagescurry mit Gemüse, Salat und Reis. Als Nachspeise … 'vegan Cheesecake'. Beides schaute nicht nur lecker aus, sondern schmeckte ausgezeichnet!",
    author: "Lisa",
    role: "Cheerfulsoul.blog",
  },
];

export const Reviews = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              {t("reviews.title")}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-elevated transition-all animate-slide-up bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-4 leading-relaxed italic">
                  "{review.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
