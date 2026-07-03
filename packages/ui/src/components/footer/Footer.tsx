import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./footer.css";

export function Footer() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScrollTracking() {
      setIsScrolled(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScrollTracking, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollTracking);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="paa-footer">
      <div className="paa-footer__container">
        <div className="paa-footer__layout-row">
          
          <div className="paa-footer__copyright-box">
            <p className="paa-footer__copyright-text">
              &copy; 2026 Prerana Architects & Associates. All Rights Reserved.
            </p>
          </div>

          <div className="paa-footer__action-box">
            <button 
              onClick={handleScrollToTop}
              className={`paa-footer__top-trigger ${isScrolled ? "is-visible" : ""}`}
              aria-label="Scroll back to top of the page"
            >
              <span className="paa-footer__trigger-label">Back to Top</span>
              <div className="paa-footer__trigger-circle">
                <ArrowUp className="paa-footer__trigger-arrow" strokeWidth={2.5} />
              </div>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}