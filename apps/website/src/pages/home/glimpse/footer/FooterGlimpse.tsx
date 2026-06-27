import { useState } from "react";
import { ArrowUp, ChevronDown } from "lucide-react";
import footerData from "../../../../data/footer.json";
import "./footer-glimpse.css";

interface LinkItem {
  label: string;
  url: string;
}

interface HoursItem {
  days: string;
  time: string;
}

interface FooterStructure {
  firmName: string;
  tagline: string;
  coaRegistration: string;
  navigationTitle: string;
  navigationLinks: LinkItem[];
  servicesTitle: string;
  servicesLinks: LinkItem[];
  operationalTitle: string;
  operationalHours: HoursItem[];
  copyrightText: string;
}

const data = footerData as FooterStructure;

export function FooterGlimpse() {
  const {
    firmName,
    tagline,
    coaRegistration,
    navigationTitle,
    navigationLinks,
    servicesTitle,
    servicesLinks,
    operationalTitle,
    operationalHours,
    copyrightText
  } = data;

  const currentYear = new Date().getFullYear();

  // Control panel states to keep mobile view heights minimal and eliminate scrolling fatigue
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="paa-footer-glimpse">
      <div className="paa-footer-glimpse__container">
        
        {/* 🏛️ INDUSTRIAL MULTI-ACCORDION QUAD GRID LAYER */}
        <div className="paa-footer-glimpse__grid">
          
          {/* COLUMN 1: BRAND SUMMARY PROFILE OVERLAY */}
          <div className="paa-footer-col paa-footer-col--brand">
            <h3 className="paa-footer-brand-title">{firmName}</h3>
            <p className="paa-footer-brand-tagline">{tagline}</p>
            <div className="paa-footer-badge">
              <span className="paa-footer-badge__dot" />
              <span className="paa-footer-badge__text">{coaRegistration}</span>
            </div>
          </div>

          {/* COLUMN 2: STUDIO CORE NAVIGATION ACCORDION CHIP */}
          <div className="paa-footer-col">
            <button 
              className="paa-footer-accordion-trigger"
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-expanded={isNavOpen}
            >
              <h4 className="paa-footer-col-title">{navigationTitle}</h4>
              <ChevronDown size={16} className={`paa-accordion-chevron ${isNavOpen ? "is-rotated" : ""}`} />
            </button>
            
            <nav className={`paa-footer-nav ${isNavOpen ? "is-expanded" : "is-collapsed"}`} aria-label="Footer Studio Navigation">
              {navigationLinks.map((link, idx) => (
                <a key={idx} href={link.url} className="paa-footer-nav__link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* COLUMN 3: STUDIO PRACTICAL SERVICES ACCORDION CHIP */}
          <div className="paa-footer-col">
            <button 
              className="paa-footer-accordion-trigger"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              aria-expanded={isServicesOpen}
            >
              <h4 className="paa-footer-col-title">{servicesTitle}</h4>
              <ChevronDown size={16} className={`paa-accordion-chevron ${isServicesOpen ? "is-rotated" : ""}`} />
            </button>
            
            <nav className={`paa-footer-nav ${isServicesOpen ? "is-expanded" : "is-collapsed"}`} aria-label="Footer Services Directory">
              {servicesLinks.map((link, idx) => (
                <a key={idx} href={link.url} className="paa-footer-nav__link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* COLUMN 4: STUDIO OPERATIONAL RUNTIMES */}
          <div className="paa-footer-col paa-footer-col--hours">
            <h4 className="paa-footer-col-title static-title">{operationalTitle}</h4>
            <div className="paa-footer-hours-block">
              {operationalHours.map((item, idx) => (
                <div key={idx} className="paa-footer-hours-row">
                  <span className="paa-footer-hours__days">{item.days}</span>
                  <span className="paa-footer-hours__time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 📋 BASELINE LEGAL MATRIX STRIP ROW */}
        <div className="paa-footer-baseline">
          <p className="paa-footer-baseline__copyright">
            &copy; {currentYear} {copyrightText}
          </p>
          <button 
            onClick={scrollToTop} 
            className="paa-footer-top-btn"
            aria-label="Scroll smooth back to the top of the page"
          >
            <span className="paa-footer-top-btn__text">Back To Top</span>
            <div className="paa-footer-top-btn__circle">
              <ArrowUp size={14} strokeWidth={2.5} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}