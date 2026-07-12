import { ReactNode } from "react";
import { getDishPhoto } from "./dishPhotoMap";

type KickerTone = "accent" | "blue" | "amber" | "muted";

interface DishRowProps {
  name: string;
  description?: string;
  price?: string;
  kicker?: { label: string; tone?: KickerTone };
  photoId?: string;
  photoUrl?: string;
  isUnavailable?: boolean;
  isNew?: boolean;
  newLabel?: string;
  language: "de" | "en";
  dietary?: { vegan?: boolean; glutenFree?: boolean; bio?: boolean };
  // Slot for MenuDishDetails / AllergenCodes / notes
  children?: ReactNode;
  // Bordered pill style container (default true)
  as?: "card" | "row";
}

const toneClass: Record<KickerTone, string> = {
  accent: "text-accent",
  blue: "text-blue",
  amber: "text-amber-700",
  muted: "text-muted-high-contrast",
};

export const DishRow = ({
  name,
  description,
  price,
  kicker,
  photoId,
  photoUrl,
  isUnavailable,
  isNew,
  newLabel,
  language,
  dietary,
  children,
  as = "card",
}: DishRowProps) => {
  const src = photoUrl ?? getDishPhoto(photoId);
  const containerClass =
    as === "card"
      ? `rounded-2xl border p-4 surface-card md:p-5 ${isUnavailable ? "border-dashed" : ""}`
      : "";

  const dietaryLabels = [
    dietary?.vegan ? "vegan" : null,
    dietary?.glutenFree
      ? language === "de"
        ? "ohne Gluten Zutaten"
        : "no gluten ingredients"
      : null,
    dietary?.bio ? "bio" : null,
  ].filter(Boolean) as string[];

  return (
    <div className={containerClass}>
      <div className="flex items-start gap-3 md:gap-4">
        {src && (
          <img
            src={src}
            alt={name}
            loading="lazy"
            decoding="async"
            className="h-16 w-16 shrink-0 rounded-xl object-cover md:h-24 md:w-24"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3
                  className={`font-cormorant text-xl font-semibold leading-snug md:text-2xl ${
                    isUnavailable ? "text-muted-high-contrast" : "text-foreground"
                  }`}
                >
                  {name}
                </h3>
                {kicker && (
                  <span
                    className={`font-work text-[10px] font-semibold uppercase tracking-[0.08em] ${
                      toneClass[kicker.tone ?? "accent"]
                    }`}
                  >
                    {kicker.label}
                  </span>
                )}
                {isNew && (
                  <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 font-work text-[9px] font-bold uppercase tracking-[0.12em] text-accent">
                    {newLabel ?? (language === "de" ? "Neu" : "New")}
                  </span>
                )}
                {isUnavailable && (
                  <span className="font-work text-xs italic text-muted-high-contrast">
                    ({language === "de" ? "derzeit nicht verfügbar" : "currently unavailable"})
                  </span>
                )}
              </div>
              {description && (
                <p
                  className={`mt-1.5 font-work text-sm leading-relaxed md:text-base ${
                    isUnavailable ? "text-muted-high-contrast/80" : "text-muted-high-contrast"
                  }`}
                >
                  {description}
                </p>
              )}
            </div>
            {price && (
              <p
                className={`shrink-0 font-work text-sm font-semibold md:text-base ${
                  isUnavailable ? "text-muted-high-contrast" : "text-accent"
                }`}
                aria-label={`€ ${price}`}
              >
                {price}
              </p>
            )}
          </div>

          {dietaryLabels.length > 0 && (
            <p className="mt-2 font-work text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-high-contrast">
              {dietaryLabels.join(" · ")}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
