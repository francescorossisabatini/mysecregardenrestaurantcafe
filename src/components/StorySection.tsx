import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import gardenReal from "@/assets/garden-real.jpg";
import interiorReal from "@/assets/interior-real.jpg";
import foodDetailReal from "@/assets/food-detail-real.jpg";

interface StorySlide {
  image: string;
  title: { de: string; en: string };
  subtitle: { de: string; en: string };
  quote?: { de: string; en: string };
  align: "left" | "right" | "center";
}

const storySlides: StorySlide[] = [
  {
    image: gardenReal,
    title: { 
      de: "Ein Garten der Stille", 
      en: "A Garden of Stillness" 
    },
    subtitle: { 
      de: "Versteckt im Herzen Wiens, fernab vom Lärm der Mariahilferstraße, öffnet sich ein geheimer Innenhof. Hier beginnt die Reise.", 
      en: "Hidden in the heart of Vienna, away from the bustle of Mariahilferstraße, a secret courtyard opens up. Here begins the journey." 
    },
    align: "left"
  },
  {
    image: interiorReal,
    title: { 
      de: "Wo die Seele atmet", 
      en: "Where the Soul Breathes" 
    },
    subtitle: { 
      de: "Jeder Raum erzählt eine Geschichte von Ruhe und Hingabe. Kunst an den Wänden, Pflanzen in jeder Ecke, Frieden in der Luft.", 
      en: "Every space tells a story of calm and devotion. Art on the walls, plants in every corner, peace in the air." 
    },
    quote: {
      de: "Der beste Weg, die Zukunft zu finden, ist, die Gegenwart zu umarmen.",
      en: "The best way to find the future is to embrace the present."
    },
    align: "right"
  },
  {
    image: foodDetailReal,
    title: { 
      de: "Mit Liebe zubereitet", 
      en: "Prepared with Love" 
    },
    subtitle: { 
      de: "Jedes Gericht ist ein Gedicht. Frische Bio-Zutaten, jahrhundertealte Rezepte und die unsichtbare Zutat: Liebe.", 
      en: "Every dish is a poem. Fresh organic ingredients, age-old recipes, and the invisible ingredient: love." 
    },
    align: "center"
  }
];

export const StorySection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative">
      {storySlides.map((slide, index) => (
        <StorySlide key={index} slide={slide} language={language} index={index} />
      ))}
    </section>
  );
};

interface StorySlideProps {
  slide: StorySlide;
  language: "de" | "en";
  index: number;
}

const StorySlide = ({ slide, language, index }: StorySlideProps) => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const alignmentClasses = {
    left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
    right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
    center: "items-center text-center px-8"
  };

  return (
    <div 
      ref={ref as any}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url(${slide.image})`,
          transform: isVisible ? 'scale(1)' : 'scale(1.1)',
          transition: 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      />
      
      {/* Gradient Overlay - varies based on alignment */}
      <div className={`absolute inset-0 ${
        slide.align === "left" 
          ? "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
          : slide.align === "right"
          ? "bg-gradient-to-l from-black/70 via-black/40 to-transparent"
          : "bg-gradient-to-t from-black/70 via-black/50 to-black/30"
      }`} />

      {/* Content */}
      <div className={`relative z-10 container mx-auto flex flex-col justify-center min-h-[100vh] py-20 ${alignmentClasses[slide.align]}`}>
        <div className={`max-w-xl space-y-6 ${
          slide.align === "center" ? "max-w-2xl" : ""
        }`}>
          {/* Decorative line */}
          <div 
            className={`h-px bg-background/50 transition-all duration-1000 ${
              isVisible ? "w-20 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: '200ms' }}
          />

          {/* Title */}
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-background drop-shadow-2xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {slide.title[language]}
          </h2>

          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl lg:text-2xl font-lora text-background/90 leading-relaxed drop-shadow-lg transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {slide.subtitle[language]}
          </p>

          {/* Quote (optional) */}
          {slide.quote && (
            <div 
              className={`mt-8 pt-6 border-t border-background/30 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <p className="text-base md:text-lg font-lora italic text-background/80">
                "{slide.quote[language]}"
              </p>
            </div>
          )}

          {/* Scroll indicator on first slide */}
          {index === 0 && (
            <div 
              className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <span className="text-sm font-lora text-background/70 uppercase tracking-widest">
                {language === "de" ? "Scrollen" : "Scroll"}
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-background/50 to-transparent animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
