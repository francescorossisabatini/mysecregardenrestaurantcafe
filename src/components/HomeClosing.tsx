import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const HomeClosing = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Silent closing phrase */}
          <p className="font-cormorant text-xl md:text-2xl text-muted-foreground/80 italic">
            {language === "de" 
              ? "Wir freuen uns auf dich." 
              : "We look forward to seeing you."}
          </p>

          {/* Discrete exploration CTA */}
          <div className="pt-4">
            <Link 
              to="/about" 
              className="font-lora text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              {language === "de" ? "Wer wir sind" : "Who we are"}
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};