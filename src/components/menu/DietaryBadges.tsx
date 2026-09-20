import { joinDisplayText } from "@/lib/displayText";

export const parseDietaryLabels = (text: string): { isVegan: boolean; isGlutenFree: boolean; isBio: boolean } => {
  const lowerText = text.toLowerCase();
  return {
    isVegan: lowerText.includes("vegan"),
    isGlutenFree: lowerText.includes("glutenfrei") || lowerText.includes("gluten-free") || lowerText.includes("gluten free"),
    isBio: lowerText.includes("bio"),
  };
};

// DESIGN_SYSTEM.md §6 Dietary badge: font-work text-sm lowercase (mai VEGAN).
export const DietaryBadges = ({ text, language }: { text: string; language: "de" | "en" }) => {
  const labels = parseDietaryLabels(text);
  const visibleLabels = [
    labels.isVegan ? "vegan" : null,
    labels.isGlutenFree ? (language === "de" ? "ohne glutenhaltige Zutaten" : "no gluten ingredients") : null,
    labels.isBio ? "bio" : null,
  ].filter(Boolean);

  if (visibleLabels.length === 0) return null;

  return (
    <p className="mt-2 font-work text-[11px] font-semibold tracking-[0.06em] text-muted-high-contrast">
      {joinDisplayText(visibleLabels)}
    </p>
  );
};
