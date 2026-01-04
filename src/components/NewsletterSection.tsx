import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export const NewsletterSection = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const translations = {
    de: {
      title: "Bleib in Kontakt mit My Secret Garden",
      subtitle: "Erhalte geheime Events, exklusive Angebote und Inspirationen aus unserem geheimen Garten.",
      namePlaceholder: "Dein Name (optional)",
      emailPlaceholder: "Deine E-Mail",
      subscribe: "Anmelden",
      thankYou: "Danke! Du bist jetzt auf unserer geheimen Liste.",
      error: "Es gab einen Fehler. Bitte versuche es erneut.",
      alreadySubscribed: "Diese E-Mail ist bereits angemeldet."
    },
    en: {
      title: "Stay in touch with My Secret Garden",
      subtitle: "Receive secret events, exclusive offers and inspirations from our secret garden.",
      namePlaceholder: "Your name (optional)",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      thankYou: "Thank you! You're now on our secret list.",
      error: "There was an error. Please try again.",
      alreadySubscribed: "This email is already subscribed."
    }
  };

  const t = translations[language] || translations.de;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ name: name || null, email }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: t.alreadySubscribed,
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: t.thankYou,
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: t.error,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <Leaf className="w-8 h-8 text-primary opacity-60" />
        </div>
        
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
          {t.title}
        </h2>
        
        <p className="text-muted-foreground mb-8 font-body">
          {t.subtitle}
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-md mx-auto bg-background/80 border-border/50 focus:border-primary/50"
            />
            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="max-w-md mx-auto bg-background/80 border-border/50 focus:border-primary/50"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              {isSubmitting ? "..." : t.subscribe} 🌸
            </Button>
          </form>
        ) : (
          <div className="py-8">
            <p className="text-primary font-display text-xl">
              🎉 {t.thankYou}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
