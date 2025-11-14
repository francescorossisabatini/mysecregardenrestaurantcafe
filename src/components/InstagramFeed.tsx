import { Card } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const InstagramFeed = () => {
  const { t } = useLanguage();
  
  // Per integrare il vero feed Instagram, segui questi passaggi:
  // 1. Vai su https://snapwidget.com/widgets/instagram-feed
  // 2. Inserisci "mysecretgardencafewien" come username
  // 3. Personalizza il layout (consiglio: Grid o Board, 6-9 foto)
  // 4. Genera il codice embed
  // 5. Copia l'iframe o script generato e sostituiscilo qui sotto

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Instagram className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              <span className="font-dancing text-4xl md:text-6xl">{t("instagram.title")}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t("instagram.subtitle")}
            </p>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          {/* Instagram Feed Container */}
          <div className="mb-8">
            {/* 
              ISTRUZIONI PER INTEGRARE IL FEED INSTAGRAM:
              
              Metodo 1 - SnapWidget (Gratuito, consigliato):
              1. Vai su: https://snapwidget.com/widgets/instagram-feed
              2. Inserisci username: mysecretgardencafewien
              3. Scegli layout "Grid" e 9 foto
              4. Genera il widget e copia il codice
              5. Incolla il codice qui sotto sostituendo il placeholder
              
              Metodo 2 - Juicer (Gratuito con watermark):
              1. Vai su: https://www.juicer.io/
              2. Crea account gratuito
              3. Aggiungi il feed Instagram
              4. Copia il codice embed
              5. Incolla qui sotto
              
              Esempio di codice SnapWidget:
              <iframe src="https://snapwidget.com/embed/XXXXXX" 
                className="snapwidget-widget" 
                allowTransparency={true}
                frameBorder="0" 
                scrolling="no"
                style={{ border: 'none', overflow: 'hidden', width: '100%', height: '600px' }}
              />
            */}
            
            {/* Placeholder temporaneo */}
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-elevated">
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg animate-pulse"
                  />
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  {t("instagram.configure")}
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  asChild
                >
                  <a 
                    href="https://www.instagram.com/mysecretgardencafewien/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    {t("instagram.visitPage")}
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-base text-muted-foreground">
              {t("instagram.follow")} 
              <a 
                href="https://www.instagram.com/mysecretgardencafewien/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline ml-1"
              >
                @mysecretgardencafewien
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};