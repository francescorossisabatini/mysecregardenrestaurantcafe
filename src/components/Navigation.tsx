import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const rafRef = useRef<number | null>(null);

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      
      // Show navbar as soon as user starts scrolling (threshold of 50px)
      if (currentScrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      
      setLastScrollY(currentScrollY);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    // Home page: hide navbar at top, show on any scroll
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }

    // Other pages: always show navbar
    setShowNavbar(true);
    setNavbarOpacity(1);
  }, [isHomePage, handleScroll]);

  const navItems = [
    // Home link - brand navigation
    { 
      href: "/", 
      label: "My Secret Garden",
      isHome: true
    },
    // Secondary navigation - essential sections
    { 
      href: "#menu", 
      label: "Menu",
      isSecondary: true,
      isHash: true,
      subItem: {
        href: "#wochenmenu",
        label: language === "de" ? "Diese Woche" : "This week"
      }
    },
    { 
      href: "/about", 
      label: language === "de" ? "Über uns" : "About",
      isSecondary: true
    },
    { 
      href: "/contact", 
      label: language === "de" ? "Kontakt" : "Contact",
      isSecondary: true
    },
  ];

  const scrollToElement = (hash: string) => {
    // Use requestAnimationFrame to batch layout reads and prevent forced reflow
    requestAnimationFrame(() => {
      const element = document.querySelector(hash);
      if (element) {
        const offset = 80; // navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  };

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
      // If we're on a different page, navigate to home first then scroll
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation and DOM to be ready, then scroll
        setTimeout(() => {
          scrollToElement(href);
        }, 100);
        return;
      }
 
      // Already on home page, just scroll
      scrollToElement(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20 py-3 md:py-4 transition-all duration-500 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          opacity: showNavbar ? 1 : 0
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-lg transition-colors lg:hidden touch-manipulation text-primary hover:bg-primary/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo - Left on Desktop */}
            <Link 
              to="/"
              onClick={(e) => {
                // If already on home page, scroll to top
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                // Otherwise Link will handle navigation to home
              }}
              className="transition-all duration-300"
            >
              <Logo className="w-12 h-12 md:w-14 md:h-14" showTagline={false} />
            </Link>

            {/* Desktop Navigation - Right (hidden on mobile) - Gestalt: Hierarchy */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                // Only highlight actual pages, not hash sections
                const isActive = !item.href.startsWith('#') && !item.href.startsWith('http')
                  ? location.pathname === item.href
                  : false;

                // Gestalt: Similarity & Emphasis through visual weight
                const baseClasses = "transition-colors relative py-2 px-1";
                const afterClasses = "after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300";

                let itemClasses = baseClasses + " " + afterClasses;

                if (item.isHome) {
                  // Home: Elegant brand link
                  itemClasses += " font-caveat text-xl text-primary hover:text-primary/80 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full";
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={(e) => {
                        if (location.pathname === "/") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className={itemClasses}
                    >
                      {item.label}
                    </Link>
                  );
                }

                if (item.isSecondary) {
                  // Secondary: Medium weight, normal size
                  if (isActive) {
                    itemClasses += " text-base font-medium text-foreground after:w-full after:h-0.5 after:bg-foreground";
                  } else {
                    itemClasses += " text-base font-medium text-foreground/70 hover:text-foreground after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full";
                  }
                }

                return (
                  <div key={item.href} className="flex items-center gap-1">
                    {item.href.startsWith('#') ? (
                      // Hash link - use <a> but with custom handler
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, false, item.isHash)}
                        className={itemClasses}
                      >
                        {item.label}
                      </a>
                    ) : (
                      // Internal page - use Link
                      <Link
                        to={item.href}
                        className={itemClasses}
                      >
                        {item.label}
                      </Link>
                    )}
                    {/* Sub-item for weekly menu */}
                    {item.subItem && (
                      <>
                        <span className="text-muted-foreground/40 text-sm">/</span>
                        <a
                          href={item.subItem.href}
                          onClick={(e) => handleNavClick(e, item.subItem.href, false, true)}
                          className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors py-2"
                        >
                          {item.subItem.label}
                        </a>
                      </>
                    )}
                  </div>
                );
              })}
              <Link
                to="/privacy"
                className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full py-2 px-1"
              >
                {language === "de" ? "Datenschutz" : "Privacy"}
              </Link>
              <div className="ml-4 shrink-0">
                <LanguageSwitcher variant="navbar" />
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
        className={`fixed top-0 left-0 bottom-0 w-72 bg-background/95 backdrop-blur-lg border-r border-border/30 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          <nav className="flex-1 space-y-3">
            {navItems.map((item) => {
              // Only highlight actual pages, not hash sections
              const isActive = !item.href.startsWith('#') && !item.href.startsWith('http')
                ? location.pathname === item.href
                : false;
              
              // Minimal hierarchy for mobile menu with proper touch targets
              let itemClasses = "block py-4 px-5 text-lg rounded-lg transition-colors duration-200 text-foreground min-h-[44px]";
              
              if (isActive) {
                itemClasses += " bg-muted/50";
              } else {
                itemClasses += " hover:bg-muted/30";
              }
              
              if (item.isHome) {
                 itemClasses += " font-caveat text-2xl text-primary";
                } else if (item.isSecondary) {
                 itemClasses += " font-medium text-lg";
                }
               
               return (
                 <div key={item.href}>
                   {item.isHome ? (
                     // Home link - brand navigation
                     <Link
                       to={item.href}
                       onClick={(e) => {
                         setIsMobileMenuOpen(false);
                         if (location.pathname === "/") {
                           e.preventDefault();
                           window.scrollTo({ top: 0, behavior: "smooth" });
                         }
                       }}
                       className={itemClasses}
                     >
                       {item.label}
                     </Link>
                   ) : item.href.startsWith('#') ? (
                      // Hash link - use <a> but with custom handler
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, false, item.isHash)}
                        className={itemClasses}
                      >
                        {item.label}
                      </a>
                    ) : (
                      // Internal page - use Link
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={itemClasses}
                      >
                        {item.label}
                      </Link>
                    )}
                    {/* Sub-item for weekly menu - mobile */}
                    {item.subItem && (
                      <a
                        href={item.subItem.href}
                        onClick={(e) => handleNavClick(e, item.subItem.href, false, true)}
                        className="block py-3 px-8 text-sm text-muted-foreground/70 hover:text-foreground hover:bg-muted/20 rounded-lg transition-colors"
                      >
                        {item.subItem.label}
                      </a>
                    )}
                  </div>
                );
            })}
            <Link
              to="/privacy"
              className="block py-4 px-5 text-lg font-normal text-foreground hover:bg-muted/30 rounded-lg transition-colors duration-200 opacity-70 min-h-[44px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === "de" ? "Datenschutz" : "Privacy"}
            </Link>
          </nav>

          {/* Mobile language switcher at the bottom */}
          <div className="mt-auto">
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      </div>
    </>
  );
};
