import "./navbar.css";

import { Lock, Menu, X } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

import type { NavbarConfig } from "../../types/navigation";
import { Button } from "../button";

export interface NavbarProps {
  logo: ReactNode;
  navigation: NavbarConfig;
}

export function Navbar({ logo, navigation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // 🛠️ RULE 3: Auto-close hamburger menu instantly if the user scrolls the page
      if (isOpen) {
        setIsOpen(false);
      }

      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); 
      } else {
        setIsVisible(true);  
      }
      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  return (
    <header className={`paa-navbar ${!isVisible ? "paa-navbar--hidden" : ""}`}>
      <div className="paa-navbar__inner">
        <div className="paa-navbar__logo">{logo}</div>

        <nav className="paa-navbar__menu" aria-label="Main navigation">
          {navigation.menuItems.map((item) => (
            <a key={item.path} href={item.path} className="paa-navbar__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="paa-navbar__actions">
          <div className="paa-navbar__quote-desktop">
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => window.location.href = navigation.cta.quote.path}
            >
              {navigation.cta.quote.label}
            </Button>
          </div>

          <div className="paa-navbar__action-separator" />

          <div className="paa-navbar__login-desktop">
            <Button 
              variant="client" 
              size="sm" 
              icon={<Lock />}
              onClick={() => window.location.href = navigation.cta.login.path}
            >
              {navigation.cta.login.label}
            </Button>
          </div>

          {/* 🛠️ RULE 3: Clicking this button naturally toggles isOpen state back and forth */}
          <button
            type="button"
            className="paa-navbar__mobile-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 📱 ADJUSTED DRAWER INTERFACE REGION */}
      <div className={`paa-navbar__mobile-panel ${isOpen ? "is-open" : ""}`}>
        
        {/* 🛠️ RULE 3: Invisible overlay catches clicks outside the menu block tray */}
        <div 
          className="paa-navbar__mobile-overlay" 
          onClick={() => setIsOpen(false)} 
          aria-hidden="true"
        />

        <div className="paa-navbar__mobile-card">
          {/* 🛠️ RULE 2: Scroll-isolated menu box keeps page from traveling */}
          <div className="paa-navbar__mobile-scroller">
            {navigation.menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="paa-navbar__mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="paa-navbar__mobile-cta-rack">
            <Button 
              variant="primary" 
              size="md"
              className="paa-navbar__mobile-btn"
              onClick={() => { setIsOpen(false); window.location.href = navigation.cta.quote.path; }}
            >
              {navigation.cta.quote.label}
            </Button>
            
            <Button 
              variant="client" 
              size="md"
              icon={<Lock />}
              className="paa-navbar__mobile-btn"
              onClick={() => { setIsOpen(false); window.location.href = navigation.cta.login.path; }}
            >
              {navigation.cta.login.label}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}