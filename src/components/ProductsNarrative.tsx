import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { RoseFlower, OrchidFlower, FlowingLines, DetailedFlower } from "@/components/FloralDecorations";

export const ProductsNarrative = () => {
  const { language } = useLanguage();

  // Low-fidelity placeholder data
  const narrativeSections = [
    {
      id: "intro",
      layout: "full-width",
    },
    {
      id: "story-1",
      layout: "text-image",
    },
    {
      id: "story-2", 
      layout: "image-text",
    },
    {
      id: "gallery",
      layout: "grid",
    },
    {
      id: "story-3",
      layout: "text-image",
    },
  ];

  return (
    <section id="products" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative Flowers and Lines - Maggiore contrasto */}
      <div className="absolute top-0 left-0 right-0 h-28 text-teal-600 opacity-60">
        <FlowingLines className="w-full h-full" />
      </div>
      <div className="absolute top-20 left-16 w-28 h-28 text-emerald-600 opacity-80">
        <RoseFlower className="w-full h-full" />
      </div>
      <div className="absolute top-1/2 right-16 w-32 h-32 text-blue-600 opacity-80">
        <OrchidFlower className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 left-1/3 w-24 h-24 text-cyan-700 opacity-75">
        <DetailedFlower className="w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="font-dancing text-4xl md:text-6xl text-primary">
              {language === 'de' ? 'Unsere Produkte' : 'Our Products'}
            </span>
          </h2>
          <div className="bg-muted/30 rounded-lg p-8 border border-dashed border-border">
            <p className="text-muted-foreground text-sm">
              [Intro text placeholder - Tell the story of your products]
            </p>
          </div>
        </div>

        {/* Narrative Section 1: Text + Image */}
        <div className="mb-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              [Section Title 1]
            </h3>
            <div className="bg-muted/30 rounded-lg p-6 border border-dashed border-border">
              <p className="text-muted-foreground text-sm">
                [Story paragraph placeholder]<br/>
                [More narrative text about this product category]<br/>
                [Details about ingredients, process, or philosophy]
              </p>
            </div>
          </div>
          <Card className="aspect-[4/3] bg-muted/30 flex items-center justify-center border-dashed">
            <span className="text-muted-foreground text-sm">[Product Image 1]</span>
          </Card>
        </div>

        {/* Narrative Section 2: Image + Text */}
        <div className="mb-16 grid md:grid-cols-2 gap-8 items-center">
          <Card className="aspect-[4/3] bg-muted/30 flex items-center justify-center border-dashed md:order-first">
            <span className="text-muted-foreground text-sm">[Product Image 2]</span>
          </Card>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              [Section Title 2]
            </h3>
            <div className="bg-muted/30 rounded-lg p-6 border border-dashed border-border">
              <p className="text-muted-foreground text-sm">
                [Story paragraph placeholder]<br/>
                [More narrative text about this product category]<br/>
                [Details about ingredients, process, or philosophy]
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            [Product Gallery]
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card 
                key={i} 
                className="aspect-square bg-muted/30 flex items-center justify-center border-dashed hover:border-primary/50 transition-all cursor-pointer hover:scale-105"
              >
                <span className="text-muted-foreground text-xs">[Img {i}]</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Narrative Section 3: Text + Image */}
        <div className="mb-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              [Section Title 3]
            </h3>
            <div className="bg-muted/30 rounded-lg p-6 border border-dashed border-border">
              <p className="text-muted-foreground text-sm">
                [Story paragraph placeholder]<br/>
                [More narrative text about this product category]<br/>
                [Details about ingredients, process, or philosophy]
              </p>
            </div>
          </div>
          <Card className="aspect-[4/3] bg-muted/30 flex items-center justify-center border-dashed">
            <span className="text-muted-foreground text-sm">[Product Image 3]</span>
          </Card>
        </div>

        {/* Closing CTA */}
        <Card className="p-8 md:p-12 bg-primary/5 border-primary/20 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              [Call to Action Title]
            </h3>
            <div className="bg-muted/30 rounded-lg p-6 border border-dashed border-border">
              <p className="text-muted-foreground text-sm">
                [Closing text placeholder - Invite to visit, order, or contact]
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
