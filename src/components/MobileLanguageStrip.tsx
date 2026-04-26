import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const MobileLanguageStrip = () => {
  return (
    <div className="hidden">
      <div>
        <LanguageSwitcher variant="mobile" />
      </div>
    </div>
  );
};
