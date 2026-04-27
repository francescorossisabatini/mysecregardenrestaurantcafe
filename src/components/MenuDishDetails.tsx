import { ChevronDown, Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ALLERGENS, getAllergenByCode, type DishDetails } from "@/data/allergensData";
import { useLanguage } from "@/contexts/LanguageContext";

interface MenuDishDetailsProps {
  details: DishDetails;
  compact?: boolean;
}

export const AllergenCodes = ({ codes }: { codes?: string[] }) => {
  if (!codes?.length) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5" aria-label="Allergen codes">
      {codes.map((code) => (
        <span key={code} className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-border bg-muted px-2 font-work text-[11px] font-semibold text-foreground">
          {code}
        </span>
      ))}
    </div>
  );
};

export const MenuDishDetails = ({ details, compact = false }: MenuDishDetailsProps) => {
  const { language } = useLanguage();
  const hasDetails = !!details.descriptionShort || !!details.ingredientsMain?.length || !!details.allergens?.length || !!details.ingredientProducers;

  if (!hasDetails) return null;

  return (
    <div className="mt-3">
      {details.descriptionShort && (
        <p className="font-work text-xs leading-relaxed text-muted-foreground">{details.descriptionShort}</p>
      )}
      <AllergenCodes codes={details.allergens} />

      <Collapsible>
        <CollapsibleTrigger className="group mt-3 inline-flex items-center gap-1.5 font-work text-xs font-semibold text-primary transition-colors hover:text-primary/80">
          {language === "de" ? "Details & Allergene" : "Details & allergens"}
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className={`${compact ? "mt-2" : "mt-3"} space-y-3 rounded-xl border border-border/60 bg-background/70 p-3`}>
            {!!details.ingredientsMain?.length && (
              <div>
                <p className="mb-1 font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {language === "de" ? "Zutaten" : "Ingredients"}
                </p>
                <p className="font-work text-sm leading-relaxed text-foreground/90">{details.ingredientsMain.join(", ")}</p>
              </div>
            )}

            {!!details.allergens?.length && (
              <div>
                <p className="mb-1 font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {language === "de" ? "Allergene" : "Allergens"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {details.allergens.map((code) => {
                    const allergen = getAllergenByCode(code);
                    if (!allergen) return null;
                    return (
                      <span key={code} className="rounded-full bg-muted px-2 py-1 font-work text-xs text-foreground/90">
                        {code} · {allergen.label[language]}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {details.gfDisclaimer && (
              <div className="flex items-start gap-2 rounded-lg bg-muted/70 p-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                <p className="font-work text-xs leading-relaxed text-muted-foreground">
                  {language === "de"
                    ? "Glutenfrei nach Rezept. Nicht geeignet bei Zöliakie — wir arbeiten in einer Küche, in der Gluten verwendet wird."
                    : "Gluten-free by recipe. Not suitable for coeliac disease — our kitchen uses gluten-containing ingredients."}
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export const AllergenLegend = () => {
  const { language } = useLanguage();

  return (
    <section className="mt-12 rounded-2xl border border-border/75 bg-card p-4 shadow-card md:p-5" aria-labelledby="allergen-legend-title">
      <h3 id="allergen-legend-title" className="font-cormorant text-xl font-semibold text-foreground">
        {language === "de" ? "Allergene" : "Allergens"}
      </h3>
      <p className="mt-1 font-work text-xs leading-relaxed text-muted-foreground">
        {language === "de"
          ? "Kennzeichnung nach LMIV (EU 1169/2011). Angaben ohne Gewähr. Bei schweren Allergien bitte direkt im Lokal nachfragen."
          : "Labelled according to LMIV (EU 1169/2011). Information provided in good faith. For severe allergies, please ask us directly in the café."}
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {ALLERGENS.map((allergen) => (
          <div key={allergen.code} className="flex items-start gap-2 rounded-xl bg-background/70 p-2">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-border bg-muted px-2 font-work text-[11px] font-semibold text-foreground">
              {allergen.code}
            </span>
            <span className="font-work text-xs leading-relaxed text-foreground/90">
              {allergen.label[language]}
              {allergen.note && <span className="text-muted-foreground"> · {allergen.note[language]}</span>}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
