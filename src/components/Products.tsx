import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { productsData, Product } from "@/data/productData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export const Products = () => {
  const { language, t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredProducts = productsData.filter(p => p.featured);
  const otherProducts = productsData.filter(p => !p.featured);

  return (
    <section id="products" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t("products.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              {t("products.featured")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in"
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">
                        {product.name[language]}
                      </CardTitle>
                      <Badge variant="secondary">
                        {product.category[language]}
                      </Badge>
                    </div>
                    <CardDescription>
                      {product.shortDescription[language]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("products.clickToLearnMore")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Products */}
        {otherProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              {t("products.all")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in"
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">
                        {product.name[language]}
                      </CardTitle>
                      <Badge variant="outline">
                        {product.category[language]}
                      </Badge>
                    </div>
                    <CardDescription>
                      {product.shortDescription[language]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("products.clickToLearnMore")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between mb-2">
                  <DialogTitle className="text-2xl">
                    {selectedProduct.name[language]}
                  </DialogTitle>
                  <Badge variant={selectedProduct.featured ? "default" : "outline"}>
                    {selectedProduct.category[language]}
                  </Badge>
                </div>
                <DialogDescription className="text-base">
                  {selectedProduct.shortDescription[language]}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-foreground leading-relaxed">
                  {selectedProduct.fullDescription[language]}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
