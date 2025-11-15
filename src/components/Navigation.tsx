import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { DetailedFlower, RoseFlower } from "@/components/FloralDecorations";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#full-menu", label: t("nav.menu") },
    { href: "#products", label: t("nav.products") },
    { href: "#about", label: t("nav.about") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors lg:hidden ${
                isScrolled 
                  ? "text-foreground hover:bg-muted" 
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation - Center/Left (hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isScrolled ? "text-foreground" : "text-primary-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Logo & Language - Right */}
            <div className="flex items-center gap-3">
              <div className={isScrolled ? "" : "opacity-90"}>
                <LanguageSwitcher />
              </div>
              <div className={`transition-all duration-300 ${
                isScrolled ? "scale-90" : "scale-100"
              }`}>
                <Logo className={isScrolled ? "w-12 h-12" : "w-16 h-16"} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 shadow-xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden overflow-hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Decorazioni floreali verdi */}
        <div className="absolute top-8 right-4 w-20 h-20 text-emerald-600 dark:text-emerald-400 opacity-40">
          <DetailedFlower className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 left-4 w-16 h-16 text-teal-600 dark:text-teal-400 opacity-40">
          <RoseFlower className="w-full h-full" />
        </div>
        <div className="absolute bottom-16 right-6 w-18 h-18 text-emerald-500 dark:text-emerald-300 opacity-40">
          <DetailedFlower className="w-full h-full" />
        </div>
        <div className="absolute bottom-1/3 left-6 w-14 h-14 text-teal-500 dark:text-teal-300 opacity-35">
          <RoseFlower className="w-full h-full" />
        </div>
        
        <div className="relative z-10 flex flex-col h-full pt-20 pb-6 px-6">
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block py-3 px-4 text-lg font-medium text-foreground hover:bg-white/50 dark:hover:bg-black/20 rounded-lg transition-colors backdrop-blur-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
