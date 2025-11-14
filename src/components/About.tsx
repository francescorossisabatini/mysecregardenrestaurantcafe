import { Card } from "@/components/ui/card";
import { Leaf, Heart, Coffee, Sprout } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              WIR über uns
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/90 mb-12">
            <p className="text-lg md:text-xl leading-relaxed">
              Wir servieren <strong className="text-primary">Geschmack, der entzückt</strong>. 
              Erleben Sie eine spannende vegetarische & vegane Küche mit{" "}
              <strong className="text-primary">schmackhaften Gerichten aus aller Welt</strong>.
            </p>

            <p className="leading-relaxed">
              Wir lieben <strong className="text-primary">bio</strong>,{" "}
              <strong className="text-primary">fair</strong>,{" "}
              <strong className="text-primary">regional</strong> und{" "}
              <strong className="text-primary">saisonal</strong>. In der Früh 
              liefern Dogi vom Naschmarkt und Biogast feldfrisches Gemüse, knackige 
              Salate und biologisches Getreide, aus dem unsere Köche mit Talent, 
              Erfindungsreichtum und aromatischen Kräutern und authentischen Gewürzen 
              für Sie gesunde Mahlzeiten zaubern, die satt machen und Kraft für den Tag geben.
            </p>

            <p className="leading-relaxed">
              In unseren umweltfreundlichen <strong className="text-primary">"TO GO"</strong>-Boxen 
              lassen sich unsere Speisen auch schnell und unkompliziert überallhin mitnehmen und genießen.
            </p>

            <p className="leading-relaxed">
              Von Montag bis Samstag gibt's von 11:00 bis 19:00 Uhr warmes Essen, 
              reichhaltige Salate, Spezialitätenkaffee, auch mit veganen Milchsorten, 
              und raffinierte Heißgetränke, sowie hausgemachte Torten und roh-köstliche 
              süße Verführungen. Bei allem kommt auch die glutenfreie Ernährung nicht zu kurz!
            </p>

            <p className="leading-relaxed text-lg">
              Neben unseren zwei gemütlichen Gasträumen lockt unser{" "}
              <strong className="text-accent">ruhiger, begrünter Innenhof im Biedermeierstil</strong>, 
              nur 80 m von der belebten Mariahilferstraße entfernt. Schaut doch herein! 🙂
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Leaf className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground">Bio</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Heart className="w-10 h-10 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-foreground">Fair</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Sprout className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground">Regional</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Coffee className="w-10 h-10 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-foreground">Saisonal</h3>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
