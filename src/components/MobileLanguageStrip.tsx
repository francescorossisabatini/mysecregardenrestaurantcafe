import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const MobileLanguageStrip = () => {
  return (
    <div className="lg:hidden bg-background border-b border-border/20">
      <div className="container mx-auto px-4 py-3 flex justify-end">
        <LanguageSwitcher variant="mobile" />
      </div>
    </div>
  );
};
