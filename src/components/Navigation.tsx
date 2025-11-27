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
      isPrimary: true,
      isHash: true
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
      isSecondary: true,
      isHash: true
    },
    { 
      href: "#contact", 
      label: language === "de" ? "Kontakt" : "Contact",
      isSecondary: true,
      isHash: true
    },
    // Tertiary navigation - external/auxiliary
    {
      href: "https://www.instagram.com/mysecretgardencafewien/",
      label: "Instagram",
      isExternal: true,
      isTertiary: true
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean, isHash?: boolean) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Handle external URLs (Instagram)
    if (isExternal && href.startsWith('http')) {
      window.open(href, '_blank');
      return;
    }

    // Handle internal page navigation (like /gallery)
    if (isExternal && !isHash) {
      navigate(href);
      return;
    }
 
    // Handle hash/section links on homepage
    if (isHash || href.startsWith('#')) {
      // If we're on a different page, navigate to home with the hash
      if (location.pathname !== "/") {
        navigate(`/${href}`); // e.g. "#full-menu" -> "/#full-menu"
        return;
      }
 
      // Already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30 py-3"
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
                // Only highlight actual pages, not hash sections
                const isActive = !item.href.startsWith('#') && !item.href.startsWith('http')
                  ? location.pathname === item.href
                  : false;

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
 
                  // Speisekarte: use custom hash navigation handler
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.isExternal, item.isHash)}
                      className={itemClasses}
                    >
                      {item.label}
                    </a>
                  );
                }

                if (item.isSecondary) {
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
                  <>
                    {item.href.startsWith('http') ? (
                      // External link - use <a> tag
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.isExternal, item.isHash)}
                        className={itemClasses}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : item.href.startsWith('#') ? (
                      // Hash link - use <a> but with custom handler
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.isExternal, item.isHash)}
                        className={itemClasses}
                      >
                        {item.label}
                      </a>
                    ) : (
                      // Internal page - use Link
                      <Link
                        key={item.href}
                        to={item.href}
                        className={itemClasses}
                      >
                        {item.label}
                      </Link>
                    )}
                  </>
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
        className={`fixed top-0 left-0 bottom-0 w-64 bg-background/95 backdrop-blur-lg border-r border-border/30 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 pb-6 px-6">
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              // Only highlight actual pages, not hash sections
              const isActive = !item.href.startsWith('#') && !item.href.startsWith('http')
                ? location.pathname === item.href
                : false;
              
              // Minimal hierarchy for mobile menu
              let itemClasses = "block py-3 px-4 text-base rounded-md transition-colors duration-200 text-foreground";
              
              if (isActive) {
                itemClasses += " bg-muted/50";
              } else {
                itemClasses += " hover:bg-muted/30";
              }
              
              if (item.isPrimary) {
                 itemClasses += " font-semibold text-lg";
                } else if (item.isSecondary) {
                 itemClasses += " font-medium";
                } else if (item.isTertiary) {
                 itemClasses += " font-normal opacity-70";
                }
               
               return (
                 <>
                   {item.href.startsWith('http') ? (
                     // External link - use <a> tag
                     <a
                       key={item.href}
                       href={item.href}
                       onClick={(e) => handleNavClick(e, item.href, item.isExternal, item.isHash)}
                       className={itemClasses}
                       target="_blank"
                       rel="noopener noreferrer"
                     >
                       {item.label}
                     </a>
                   ) : item.isPrimary ? (
                     // Primary item (Speisekarte) - use custom hash navigation handler
                     <a
                       key={item.href}
                       href={item.href}
                       onClick={(e) => handleNavClick(e, item.href, item.isExternal, item.isHash)}
                       className={itemClasses}
                     >
                       {item.label}
                     </a>
                   ) : item.href.startsWith('#') ? (
                     // Hash link - use <a> but with custom handler
                     <a
                       key={item.href}
                       href={item.href}
                       onClick={(e) => handleNavClick(e, item.href, item.isExternal, item.isHash)}
                       className={itemClasses}
                     >
                       {item.label}
                     </a>
                   ) : (
                     // Internal page - use Link
                     <Link
                       key={item.href}
                       to={item.href}
                       onClick={() => setIsMobileMenuOpen(false)}
                       className={itemClasses}
                     >
                       {item.label}
                     </Link>
                   )}
                 </>
               );
            })}
            <Link
              to="/privacy"
              className="block py-3 px-4 text-base font-normal text-foreground hover:bg-muted/30 rounded-md transition-colors duration-200 opacity-70"
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
