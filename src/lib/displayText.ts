const HYPHEN_LIKE_CHARS = /[\u002d\u2010\u2011\u2012\u2013\u2014\u2212]/g;

export const cleanDisplayText = (value: string) => value.replace(HYPHEN_LIKE_CHARS, " ").replace(/\s{2,}/g, " ").trim();

export const joinDisplayText = (values: string[], separator = ", ") => values.map(cleanDisplayText).join(separator);

/**
 * Porta i prezzi a due decimali solo a schermo: "4,9" → "4,90", "6,5 / 10,9"
 * → "6,50 / 10,90". I dati restano come li scrive lo staff (la fonte è il
 * menu fotografato), così una modifica futura da Lovable non deve ricordarsi
 * del formato. Tocca solo i numeri con la virgola, quindi non altera note di
 * formato come "1 Shot / 2 Shots".
 */
export const formatPrice = (value: string) =>
  value.replace(/(\d+),(\d+)/g, (match: string, whole: string, decimals: string) =>
    // Solo padding, mai troncamento: un prezzo con più decimali resta intatto
    // invece di essere silenziosamente arrotondato.
    decimals.length >= 2 ? match : `${whole},${decimals.padEnd(2, "0")}`
  );