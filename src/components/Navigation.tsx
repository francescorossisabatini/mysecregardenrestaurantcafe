import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      href: "#daily-menu", 
      label: language === "de" ? "Tagesmenü" : "Daily Menu" 
    },
    { 
      href: "#full-menu", 
      label: language === "de" ? "Wochenkarte" : "Weekly Menu" 
    },
    { 
      href: "#about", 
      label: language === "de" ? "Über uns" : "About us" 
    },
    { 
      href: "#contact", 
      label: language === "de" ? "Kontakt" : "Contact" 
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // If we're on a different page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-border/40 py-2"
        style={{
          background: 'rgba(245, 241, 227, 0.95)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg transition-colors lg:hidden touch-manipulation text-primary hover:bg-primary/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo - Left on Desktop */}
            <Link 
              to="/"
              className="transition-all duration-300"
            >
              <Logo className="w-11 h-11" showTagline={false} />
            </Link>

            {/* Desktop Navigation - Right (hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full py-1"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/privacy"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full py-1"
              >
                {language === "de" ? "Datenschutz" : "Privacy"}
              </Link>
              <div className="relative z-10 ml-2">
                <LanguageSwitcher />
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
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 px-4 text-lg font-medium text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200/60 dark:hover:bg-emerald-800/60 rounded-lg transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/privacy"
              className="block py-3 px-4 text-lg font-medium text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200/60 dark:hover:bg-emerald-800/60 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === "de" ? "Datenschutz" : "Privacy"}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
