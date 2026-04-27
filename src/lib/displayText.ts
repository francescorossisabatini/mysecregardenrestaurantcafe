const HYPHEN_LIKE_CHARS = /[\u002d\u2010\u2011\u2012\u2013\u2014\u2212]/g;

export const cleanDisplayText = (value: string) => value.replace(HYPHEN_LIKE_CHARS, " ").replace(/\s{2,}/g, " ").trim();

export const joinDisplayText = (values: string[], separator = " · ") => values.map(cleanDisplayText).join(separator);