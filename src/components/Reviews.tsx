import { Star, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviews = [
  {
    textDe: "Sehr schönes und gemütliches Lokal. Das Essen war wirklich ausgezeichnet und die Portionen großzügig. Das Personal ist hilfsbereit und freundlich, und das Preis-Leistungs-Verhältnis stimmt.",
    textEn: "Very nice and cozy place. The food was really excellent and the portions generous. The staff is helpful and friendly, and the value for money is fair.",
    author: "Serena Saccaro",
    role: "Google Maps",
    dateDe: "vor 6 Tagen",
    dateEn: "6 days ago",
  },
  {
    textDe: "Ausgezeichnet! Gesundes Essen von hoher Qualität. Hier ist alles perfekt; das Personal ist wirklich leidenschaftlich bei der Arbeit. Wenn es mehr Sterne gäbe, würde ich alle vergeben!",
    textEn: "Excellent! Healthy, high-quality food. Everything is perfect here; the staff is truly passionate about their work. If there were more stars, I would give them all!",
    author: "Gabor Nyaradi",
    role: "Google Maps",
    dateDe: "vor 2 Wochen",
    dateEn: "2 weeks ago",
  },
  {
    textDe: "Der Ort ist wirklich wunderbar: Er bietet raffiniertes, hochwertiges veganes Essen in einer ruhigen und spirituellen Atmosphäre.",
    textEn: "The place is truly wonderful: it offers refined, high-quality vegan food in a serene and spiritual atmosphere.",
    author: "b.kishore Bala",
    role: "Google Maps",
    dateDe: "vor 2 Wochen",
    dateEn: "2 weeks ago",
  },
];

export const Reviews = () => {
  const { language } = useLanguage();

  return (
    <section id="reviews" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-foreground mb-4">
            {language === "de" ? "Stimmen aus dem Garten" : "Voices from the Garden"}
          </h2>
          <div className="flex justify-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
        </div>

        {/* Mobile: vertical, Desktop: horizontal */}
        <div className="flex flex-col md:flex-row md:gap-8 gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="flex-1 text-center md:text-left">
              <div className="flex gap-0.5 mb-4 justify-center md:justify-start text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-base md:text-lg font-lora text-foreground/90 leading-relaxed mb-4">
                "{language === "de" ? review.textDe : review.textEn}"
              </blockquote>
              <div>
                <p className="font-medium text-sm text-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">
                  {review.role} · {language === "de" ? review.dateDe : review.dateEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle link to all reviews */}
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/maps/place/My+Secret+Garden/@48.1975697,16.3515233,17z/data=!4m8!3m7!1s0x476d078f0451b459:0x76f7dc33e496ccb5!8m2!3d48.1975697!4d16.3540982!9m1!1b1!16s%2Fg%2F11c3q3yxrb?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-work"
          >
            {language === "de" ? "Alle Bewertungen auf Google" : "All reviews on Google"}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
