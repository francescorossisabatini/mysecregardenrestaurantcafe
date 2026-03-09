// Map German month names (including common misspellings) to English
const DE_TO_EN_MONTHS: [RegExp, string][] = [
  [/j[aä]n(?:uar|ner)/gi, "January"],
  [/feb(?:ruar)?/gi, "February"],
  [/m[aä]r(?:tz|z)/gi, "March"],
  [/april/gi, "April"],
  [/mai/gi, "May"],
  [/juni/gi, "June"],
  [/juli/gi, "July"],
  [/august/gi, "August"],
  [/sep(?:tember)?/gi, "September"],
  [/okt(?:ober)?/gi, "October"],
  [/nov(?:ember)?/gi, "November"],
  [/dez(?:ember)?/gi, "December"],
];

/** Translate German month names in a period string to English */
export function translatePeriod(period: string, language: "de" | "en"): string {
  if (language === "de") return period;
  let result = period;
  for (const [de, en] of Object.entries(DE_TO_EN_MONTHS)) {
    result = result.replace(new RegExp(de, "gi"), en);
  }
  return result;
}
