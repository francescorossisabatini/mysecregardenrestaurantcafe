export const splitDishText = (text: string, language: "de" | "en", dishKey?: string) => {
  const trimmed = text.trim();
  const firstLineBreak = trimmed.search(/\r?\n/);

  if (firstLineBreak > 4) {
    return {
      name: trimmed.slice(0, firstLineBreak).trim(),
      description: trimmed.slice(firstLineBreak).trim(),
    };
  }

  const firstPeriod = trimmed.indexOf(".");

  if (firstPeriod > 8) {
    return {
      name: trimmed.slice(0, firstPeriod).trim(),
      description: trimmed.slice(firstPeriod + 1).trim(),
    };
  }

  const separators = [":", ";", language === "de" ? " mit " : " with ", language === "de" ? " auf " : " on "];
  const match = separators
    .map((separator) => ({ separator, index: trimmed.toLowerCase().indexOf(separator) }))
    .filter(({ index }) => index > 8)
    .sort((a, b) => a.index - b.index)[0];

  if (!match) return { name: trimmed, description: "" };

  const name = trimmed.slice(0, match.index).trim();
  const rawDescription = trimmed.slice(match.index + match.separator.length).trim();
  const description = match.separator.trim().length > 1
    ? `${match.separator.trim()} ${rawDescription}`
    : rawDescription;

  return { name, description };
};