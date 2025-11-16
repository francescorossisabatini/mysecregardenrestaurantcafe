import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";

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
            ? "bg-background/95 backdrop-blur-md shadow-md py-1.5"
            : "bg-background/40 backdrop-blur-sm py-2"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 rounded-lg transition-colors lg:hidden touch-manipulation ${
                isScrolled 
                  ? "text-foreground hover:bg-muted" 
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            <div className="flex items-center gap-2">
              <div className="relative z-10">
                <LanguageSwitcher />
              </div>
              <div className={`transition-all duration-300 ${
                isScrolled ? "scale-90" : "scale-100"
              }`}>
                <Logo className={isScrolled ? "w-10 h-10" : "w-12 h-12"} />
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
        className={`fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-100 dark:from-emerald-900 dark:via-emerald-950 dark:to-teal-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 pb-6 px-6">
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block py-3 px-4 text-lg font-medium text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200/60 dark:hover:bg-emerald-800/60 rounded-lg transition-all duration-200"
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
