interface SectionDividerProps {
  variant?: "default" | "accent" | "subtle";
  showDecoration?: boolean;
}

/**
 * Editorial section divider — "No-Line Rule".
 * Provides vertical breathing between sections without a hard rule.
 * Surface changes on the sections themselves carry the visual rhythm.
 */
export const SectionDivider = ({ showDecoration = true }: SectionDividerProps) => {
  return (
    <div className="relative w-full py-10 md:py-14" aria-hidden="true">
      {showDecoration && (
        <div className="flex justify-center">
          <span className="rule-short opacity-70" />
        </div>
      )}
    </div>
  );
};
