import type { OpeningHours } from "@/lib/openStatus";

export const SITE = {
  name: "My Secret Garden",

  // Contact
  phoneDisplay: "01 597 05 47",
  phoneTel: "+4315970547",

  // Address
  addressShort: "Wien – Annagasse 4, 1010",

  // Google Maps share link
  mapsUrl: "https://www.google.com/maps/place/My+Secret+Garden/@48.2058449,16.3693511,17z",

  // Opening hours (Mo–Fr 11:30–14:30, Sa 11:30–15:00, So closed)
  openingHours: {
    mon: { open: "11:30", close: "14:30" },
    tue: { open: "11:30", close: "14:30" },
    wed: { open: "11:30", close: "14:30" },
    thu: { open: "11:30", close: "14:30" },
    fri: { open: "11:30", close: "14:30" },
    sat: { open: "11:30", close: "15:00" },
    sun: null,
  } satisfies OpeningHours,
} as const;
