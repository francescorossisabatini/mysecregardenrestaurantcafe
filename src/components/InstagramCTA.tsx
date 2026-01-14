import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const InstagramCTA = () => {
  const { language } = useLanguage();
  
  const text = language === "de" 
    ? "Der Garten geht auch hier weiter."
    : "The garden continues here, too.";

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <a
          href="https://www.instagram.com/mysecretgardencafewien/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-4 group"
        >
          <p className="text-muted-foreground text-sm md:text-base font-light tracking-wide text-center">
            {text}
          </p>
          
          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-500 underline-offset-2 group-hover:underline">
            <Instagram className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-xs md:text-sm tracking-widest">
              @mysecretgardencafewien
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};
