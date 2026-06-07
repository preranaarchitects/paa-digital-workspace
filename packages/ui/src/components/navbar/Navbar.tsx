import "./navbar.css";

import { Lock, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import type { NavbarConfig } from "../../types/navigation";
import { Button } from "../button";

export interface NavbarProps {
  logo: ReactNode;
  navigation: NavbarConfig;
}

export function Navbar({ logo, navigation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="paa-navbar">
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
            <Button variant="primary" size="sm">
              {navigation.cta.quote.label}
            </Button>
          </div>

          <div className="paa-navbar__action-separator" />

          <a href={navigation.cta.login.path} className="paa-navbar__login">
            <Lock className="paa-navbar__login-icon" />
            <span>{navigation.cta.login.label}</span>
          </a>

          <button
            type="button"
            className="paa-navbar__mobile-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`paa-navbar__mobile-panel ${isOpen ? "is-open" : ""}`}>
        <div className="paa-navbar__mobile-card">
          {navigation.menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="paa-navbar__mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              <span>→</span>
            </a>
          ))}

          <a
            href={navigation.cta.quote.path}
            className="paa-navbar__mobile-quote"
            onClick={() => setIsOpen(false)}
          >
            {navigation.cta.quote.label}
            <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}