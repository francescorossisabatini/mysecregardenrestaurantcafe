import type { OpeningHours } from "@/lib/openStatus";

export const SITE = {
  name: "My Secret Garden",

  // ✅ UNICO NUMERO "vero" (testo visibile)
  phoneDisplay: "01 586 28 39",

  // ✅ UNICO NUMERO per tel: (stesso numero, senza spazi, con prefisso Austria)
  phoneTel: "+4315862839",

  // Address
  addressShort: "Mariahilferstraße 45, Im Raimundhof – 1060 Wien",

  // Google Maps share link
  mapsUrl: "https://www.google.com/maps/place/My+Secret+Garden/@48.1975697,16.3515233,17z/",

  // Opening hours (Mo–Sa 11:00–19:00, So closed)
  openingHours: {
    mon: { open: "11:00", close: "19:00" },
    tue: { open: "11:00", close: "19:00" },
    wed: { open: "11:00", close: "19:00" },
    thu: { open: "11:00", close: "19:00" },
    fri: { open: "11:00", close: "19:00" },
    sat: { open: "11:00", close: "19:00" },
    sun: null,
  } satisfies OpeningHours,
} as const;
