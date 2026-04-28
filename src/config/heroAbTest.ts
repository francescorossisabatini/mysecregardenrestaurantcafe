export const HERO_AB_TEST = {
  id: "mobile_hero_context_v1",
  enabled: false,
  startsAt: "2026-04-26T00:00:00+02:00",
  endsAt: "2026-05-03T23:59:59+02:00",
  storageKey: "msg_mobile_hero_context_v1",
  sessionImpressionKey: "msg_mobile_hero_context_v1_impression",
  variants: ["food", "dining", "garden"] as const,
} as const;

export type HeroAbVariantId = (typeof HERO_AB_TEST.variants)[number];