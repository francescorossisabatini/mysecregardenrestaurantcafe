import { HERO_AB_TEST, type HeroAbVariantId } from "@/config/heroAbTest";
import { supabase } from "@/integrations/supabase/client";

export type { HeroAbVariantId } from "@/config/heroAbTest";

type HeroAbAssignment = {
  testId: string;
  variant: HeroAbVariantId;
  assignedAt: string;
};

const isVariantId = (value: unknown): value is HeroAbVariantId =>
  typeof value === "string" && HERO_AB_TEST.variants.includes(value as HeroAbVariantId);

export const isHeroAbTestActive = () => {
  if (!HERO_AB_TEST.enabled) return false;
  const now = Date.now();
  return now >= Date.parse(HERO_AB_TEST.startsAt) && now <= Date.parse(HERO_AB_TEST.endsAt);
};

export const isMobileHeroViewport = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
};

const pickVariant = (): HeroAbVariantId => {
  const randomValue = globalThis.crypto?.getRandomValues
    ? globalThis.crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
    : Math.random();
  const index = Math.floor(randomValue * HERO_AB_TEST.variants.length);
  return HERO_AB_TEST.variants[index] ?? HERO_AB_TEST.variants[0];
};

const readAssignment = (): HeroAbAssignment | null => {
  try {
    const raw = localStorage.getItem(HERO_AB_TEST.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<HeroAbAssignment>;
    if (parsed.testId !== HERO_AB_TEST.id || !isVariantId(parsed.variant)) return null;
    return parsed as HeroAbAssignment;
  } catch {
    return null;
  }
};

export const getHeroAbVariant = ({ assign = true } = {}): HeroAbVariantId | null => {
  if (typeof window === "undefined" || !isHeroAbTestActive() || !isMobileHeroViewport()) return null;

  const existing = readAssignment();
  if (existing) return existing.variant;
  if (!assign) return null;

  const assignment: HeroAbAssignment = {
    testId: HERO_AB_TEST.id,
    variant: pickVariant(),
    assignedAt: new Date().toISOString(),
  };

  localStorage.setItem(HERO_AB_TEST.storageKey, JSON.stringify(assignment));
  return assignment.variant;
};

export const getHeroAbTrackingParams = (variant = getHeroAbVariant({ assign: false })) =>
  variant
    ? {
        hero_ab_test_id: HERO_AB_TEST.id,
        hero_variant: variant,
      }
    : {};

export const trackHeroAbEvent = (
  eventName: string,
  params: Record<string, unknown> = {},
  variant = getHeroAbVariant({ assign: false }),
  attempt = 0,
) => {
  const eventParams = { ...params, ...getHeroAbTrackingParams(variant) };

  if (variant) {
    void (supabase as any).from("ab_test_events").insert({
      test_id: HERO_AB_TEST.id,
      variant,
      event_name: eventName,
      page_path: window.location.pathname,
      user_agent: navigator.userAgent,
      metadata: eventParams,
    });
  }

  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
    return;
  }

  if (attempt < 8) {
    window.setTimeout(() => trackHeroAbEvent(eventName, params, variant, attempt + 1), 500);
  }
};

export const trackHeroAbImpression = (variant: HeroAbVariantId | null) => {
  if (!variant || typeof window === "undefined") return;

  const key = `${HERO_AB_TEST.sessionImpressionKey}_${variant}`;
  if (sessionStorage.getItem(key)) return;

  sessionStorage.setItem(key, "1");
  trackHeroAbEvent(
    "hero_variant_impression",
    { event_category: "experiment", event_label: "mobile_hero" },
    variant,
  );
};