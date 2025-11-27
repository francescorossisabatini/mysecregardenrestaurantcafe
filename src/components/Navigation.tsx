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
    // Primary navigation - most important
    { 
      href: "#full-menu", 
      label: language === "de" ? "Speisekarte" : "Menu",
      isPrimary: true
    },
    // Secondary navigation - content sections
    { 
      href: "/gallery", 
      label: language === "de" ? "Galerie" : "Gallery",
      isExternal: true,
      isSecondary: true
    },
    { 
      href: "#about", 
      label: language === "de" ? "Über uns" : "About",
      isSecondary: true
    },
    { 
      href: "#contact", 
      label: language === "de" ? "Kontakt" : "Contact",
      isSecondary: true
    },
    // Tertiary navigation - external/auxiliary
    {
      href: "https://www.instagram.com/mysecretgardencafewien/",
      label: "Instagram",
      isExternal: true,
      isTertiary: true
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    setIsMobileMenuOpen(false);

    // Handle external links
    if (isExternal) {
      if (href.startsWith('http')) {
        window.open(href, '_blank');
      } else {
        navigate(href);
      }
      return;
    }

    e.preventDefault();

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
        className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm shadow-sm border-b border-border/40 py-2"
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

            {/* Desktop Navigation - Right (hidden on mobile) - Gestalt: Hierarchy */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                // Check if current page matches this nav item
                const isActive = item.isExternal && !item.href.startsWith('http')
                  ? location.pathname === item.href
                  : location.pathname === '/' && item.href.startsWith('#');
                
                // Gestalt: Similarity & Emphasis through visual weight
                const baseClasses = "transition-colors relative py-1";
                const afterClasses = "after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300";
                
                let itemClasses = baseClasses + " " + afterClasses;
                
                if (item.isPrimary) {
                  // Primary: Bold, larger, primary color
                  if (isActive) {
                    itemClasses += " text-base font-bold text-primary after:w-full after:h-0.5 after:bg-primary";
                  } else {
                    itemClasses += " text-base font-bold text-primary hover:text-primary/80 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full";
                  }
                } else if (item.isSecondary) {
                  // Secondary: Medium weight, normal size
                  if (isActive) {
                    itemClasses += " text-sm font-semibold text-foreground after:w-full after:h-0.5 after:bg-foreground";
                  } else {
                    itemClasses += " text-sm font-semibold text-foreground/80 hover:text-foreground after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full";
                  }
                } else if (item.isTertiary) {
                  // Tertiary: Light weight, smaller, muted
                  if (isActive) {
                    itemClasses += " text-sm font-medium text-foreground after:w-full after:h-0.5 after:bg-muted-foreground";
                  } else {
                    itemClasses += " text-sm font-medium text-muted-foreground hover:text-foreground after:w-0 after:h-0.5 after:bg-muted-foreground hover:after:w-full";
                  }
                }
                
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
                    className={itemClasses}
                  >
                    {item.label}
                  </a>
                );
              })}
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
            {navItems.map((item) => {
              // Check if current page matches this nav item
              const isActive = item.isExternal && !item.href.startsWith('http')
                ? location.pathname === item.href
                : location.pathname === '/' && item.href.startsWith('#');
              
              // Gestalt hierarchy for mobile menu
              let itemClasses = "block py-3 px-4 text-lg rounded-lg transition-all duration-200 text-emerald-900 dark:text-emerald-100";
              
              if (isActive) {
                itemClasses += " bg-emerald-300/80 dark:bg-emerald-700/80";
              } else {
                itemClasses += " hover:bg-emerald-200/60 dark:hover:bg-emerald-800/60";
              }
              
              if (item.isPrimary) {
                itemClasses += " font-bold text-xl border-l-4 border-primary";
              } else if (item.isSecondary) {
                itemClasses += " font-semibold";
              } else if (item.isTertiary) {
                itemClasses += " font-medium text-base opacity-80";
              }
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
                  className={itemClasses}
                >
                  {item.label}
                </a>
              );
            })}
            <Link
              to="/privacy"
              className="block py-3 px-4 text-lg font-medium text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200/60 dark:hover:bg-emerald-800/60 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === "de" ? "Datenschutz" : "Privacy"}
            </Link>
          </nav>

          {/* Mobile language switcher at the bottom */}
          <div className="mt-4 flex justify-start">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};
