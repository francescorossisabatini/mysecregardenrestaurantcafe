const DE_TO_EN_MONTHS: Record<string, string> = {
  "Januar": "January",
  "Februar": "February",
  "März": "March",
  "April": "April",
  "Mai": "May",
  "Juni": "June",
  "Juli": "July",
  "August": "August",
  "September": "September",
  "Oktober": "October",
  "November": "November",
  "Dezember": "December",
};

/** Translate German month names in a period string to English */
export function translatePeriod(period: string, language: "de" | "en"): string {
  if (language === "de") return period;
  let result = period;
  for (const [de, en] of Object.entries(DE_TO_EN_MONTHS)) {
    result = result.replace(new RegExp(de, "gi"), en);
  }
  return result;
}
