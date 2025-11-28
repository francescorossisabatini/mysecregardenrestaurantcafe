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
    <section id="reviews" className="py-32 md:py-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-caveat font-bold text-primary mb-8">
            {t("reviews.title")}
          </h2>
          <div className="flex justify-center gap-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-current" />
            ))}
          </div>
        </div>

        <div className="space-y-24">
          {reviews.map((review, index) => (
            <div key={index} className="text-center">
              <div className="flex gap-1 mb-8 justify-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-lora text-foreground/90 leading-relaxed mb-8 max-w-3xl mx-auto">
                "{review.text}"
              </blockquote>
              <div className="space-y-2">
                <p className="font-semibold text-xl text-foreground">{review.author}</p>
                <p className="text-base text-muted-foreground">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
