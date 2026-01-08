import type { OpeningHours } from "@/lib/openStatus";

export const SITE = {
  name: "My Secret Garden",

  // ✅ UNICO NUMERO "vero" (testo visibile)
  phoneDisplay: "01 586 28 39",

  // ✅ UNICO NUMERO per tel: (stesso numero, senza spazi, con prefisso Austria)
  phoneTel: "+4315862839",

  // Address
  addressShort: "Mariahilferstraße 45, Im Raimundhof – 1060 Wien",

  // Google Maps share link (direct link to restaurant)
  mapsUrl: "https://www.google.com/maps/place/Secret+Garden+Caf%C3%A9+Restaurant/@48.1994275,16.353526,17z/data=!3m1!4b1!4m6!3m5!1s0x476d078f0451b459:0x76f7dc33e496ccb5!8m2!3d48.1994275!4d16.353526!16s%2Fg%2F1tj4fbv6",

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
