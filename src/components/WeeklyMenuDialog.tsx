import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Wheat } from "lucide-react";

interface WeeklyMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const weeklyMenu = {
  period: "10-15. November",
  intro: "Jeden Tag haben Sie die Wahl zwischen zwei frischen, saisonalen Tagesgerichten für 15.20€. Das 'grüne' bereiten wir immer vegan & glutenfrei zu – das 'blaue' kann auch mal Milchprodukte, glutenhaltiges Getreide oder Ei enthalten.",
  soupInfo: "Unsere schmackhaften Tagessuppen sind immer vegan & glutenfrei und gibt's klein um 4.50€ / groß um 6.50€. Ein frisches Bio-Weckerl dazu? – 1.90€",
  days: [
    {
      day: "Montag",
      soup: "Erdäpfel-Champignoncremesuppe",
      green: "Grünes Pattaya-Curry mit Zucchini, Kohlrabi, Brokkoli, Erbsen, Kartoffeln und Spinat in milden Limetten-Kokosmilchsauce mit frischem Koriander und Ingwer; dazu Bio-Basmati-Vollkornreis und bunter Salat.",
      blue: "Afrikanischer Raglan-Eintopf mit Schwarzaugenbohnen und Süßkartoffeln; dazu Bio-Quinoa, Cashew-Aioli und bunter Salat mit Zitronen-Tahinidressing.",
    },
    {
      day: "Dienstag",
      soup: "Brokkolicremesuppe",
      green: "Spinat & Kichererbsen-Curry mit Karotten und Süßkartoffeln in cremiger Tomaten-Kokosmilchsauce mit authentischen indischen Gewürzen; dazu duftiger Jasminreis und bunter Salat.",
      blue: "Mexican Bowl mit Salat, Bio-Basmati Vollkornreis, Kidneybohnepaste, Bio-Röstmais, Nachos, Pico de Gallo und Avocadodip.",
    },
    {
      day: "Mittwoch",
      soup: "Gelbe Linsensuppe mit Dill",
      green: "Baigan Takari Curry: Melanzani und buntem Paprika in cremiger Tomaten-Kokosmilchsauce mit Garam Masala Gewürzmischung, frischem Koriander und Ingwer; dazu Bio-Basmati Vollkornreis und bunter Salat.",
      blue: "Penne al forno aus glutenfreien Italienischen Bio-Nudeln mit aromatischen Bio-Soja, Spinat, Karotten und frischem Basilikum in zitroniger Tomaten-Kapern-Sauce; dazu bunter Salat mit Tahini-Dressing.",
    },
    {
      day: "Donnerstag",
      soup: "Chinesische Pak Choy Suppe mit Austernpilzen",
      green: "Bengalisches Curry aus Hokkaidokürbis, Erdäpfeln, grünen Erbsen und Kichererbsen in aromatischer Garam-Masala-Sauce mit authentischen indischen Gewürzen und frischem Ingwer; dazu duftiger Jasminreis und bunter Salat.",
      blue: "Türkische Brathähnchenbowl mit gerösteten Karotten, Brokkoli, Pilaw, Korinthen und Pinienkernen, Dill-Joghurt-Sauce und unserem Haussalat mit Zitronen-Tahini-Dressing.",
      blueNote: "vegetarisch & glutenfrei",
    },
    {
      day: "Freitag",
      soup: "Blumenkohl-Mandelcremesuppe",
      green: "Balinesisches Erdnusscurry mit Karotten, Brokkoli, Erdäpfeln, gelbe Bohnen und Champignons in duftender Erdnuss-Kokossauce; dazu Bio-Basmati Vollkornreis und bunter Salat.",
      blue: "Griechisches Moussaka: überbackene Erdäpfel, Bio-Soja-Faschiertes, Melanzani, Tomaten und vegane Bechamel-Sauce; dazu bunter Salat.",
    },
    {
      day: "Samstag",
      soup: "Fenchel-Erdäpfelcremesuppe",
      green: "Karibisches Curry: Rote und gelbe Paprika, Süßkartoffel, Karotten und Zucchini in fruchtiger Orangen-Kokosmilchsauce mit Limettenblättern und Zitronengras; dazu Bio-Basmati-Vollkornreis und bunter Salat.",
      blue: "Ofen-Champignons auf grünen Erbsenpüree und Ofenkartoffeln mit geröstetem Brokkoli und Tahini-Dressing, bestreut mit Haselnusskrokant; dazu bunter Salat.",
    },
  ],
};

export const WeeklyMenuDialog = ({ open, onOpenChange }: WeeklyMenuDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-primary">
            Wochenkarte {weeklyMenu.period}
          </DialogTitle>
          <DialogDescription className="text-base pt-4 space-y-2">
            <p>{weeklyMenu.intro}</p>
            <p className="text-sm text-muted-foreground italic">{weeklyMenu.soupInfo}</p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {weeklyMenu.days.map((dayMenu, idx) => (
            <Card
              key={idx}
              className="p-6 hover:shadow-soft transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <h3 className="text-xl font-bold text-primary mb-4">{dayMenu.day}</h3>

              {/* Soup */}
              <div className="mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    Suppe
                  </Badge>
                  <div className="flex gap-1">
                    <Leaf className="w-4 h-4 text-primary" />
                    <Wheat className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p className="text-foreground/90">{dayMenu.soup}</p>
                <p className="text-xs text-muted-foreground italic mt-1">
                  vegan & glutenfrei
                </p>
              </div>

              {/* Green Dish */}
              <div className="mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-accent text-accent-foreground text-sm font-semibold">
                    Tagesgericht GRÜN
                  </Badge>
                  <div className="flex gap-1">
                    <Leaf className="w-4 h-4 text-accent" />
                    <Wheat className="w-4 h-4 text-accent" />
                  </div>
                </div>
                <p className="text-foreground font-medium leading-relaxed">{dayMenu.green}</p>
                <p className="text-xs text-accent/80 font-semibold mt-2">
                  vegan & glutenfrei
                </p>
              </div>

              {/* Blue Dish */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue text-blue-foreground text-sm font-semibold">
                    Tagesgericht BLAU
                  </Badge>
                  {dayMenu.blueNote !== "vegetarisch & glutenfrei" && (
                    <div className="flex gap-1">
                      <Leaf className="w-4 h-4 text-blue" />
                      <Wheat className="w-4 h-4 text-blue" />
                    </div>
                  )}
                </div>
                <p className="text-foreground font-medium leading-relaxed">{dayMenu.blue}</p>
                <p className="text-xs text-blue font-semibold mt-2">
                  {dayMenu.blueNote || "vegan & glutenfrei"}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Preis:</strong> Tagesgerichte 15.20€ | Suppe klein 4.50€ / groß 6.50€
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
