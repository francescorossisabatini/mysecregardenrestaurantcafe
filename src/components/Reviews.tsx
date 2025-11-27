import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviews = [
  {
    text: "Als Veganer ist dies mein Lieblingsrestaurant in Wien. Man spürt die Liebe in jedem Gericht.",
    author: "Silent Rocco",
    role: "Local Guide",
  },
  {
    text: "Schönes Ambiente und mit Liebe zubereitete, gesunde Speisen. Was will man mehr?",
    author: "Elbie",
    role: "Google Review",
  },
  {
    text: "Das Tagescurry mit Gemüse und der vegane Cheesecake schmeckten ausgezeichnet!",
    author: "Lisa",
    role: "Cheerfulsoul.blog",
  },
];

export const Reviews = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              <span className="font-dancing text-4xl md:text-6xl">{t("reviews.title")}</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx}>
                <Card
                  className="p-6 hover:shadow-elevated transition-all animate-slide-up bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/90 mb-4 leading-relaxed italic text-sm">
                    "{review.text}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-primary text-sm">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </Card>
                {idx < reviews.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2" 
                       style={{ left: `${((idx + 1) / reviews.length) * 100}%` }}>
                    <Star className="w-4 h-4 text-accent/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
