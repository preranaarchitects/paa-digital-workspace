import { useState, useEffect, useRef } from "react";
import { 
  Briefcase, 
  RefreshCw,
  Compass, 
  Layers, 
  HardHat, 
  CheckSquare, 
  type LucideIcon 
} from "lucide-react";
import { Button } from "../../../../../../../packages/ui/src/components/button";
import processData from "../../../../data/process.json";
import "./process-glimpse.css";
import { SectionHeader } from "../../../../../../../packages/ui/src/components/section/SectionHeader";

interface ProcessPhase {
  step: string;
  title: string;
  summary: string;
  detail: string;
}

interface ProcessStructure {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; path: string };
  phases: ProcessPhase[];
}

const data = processData as ProcessStructure;

const iconComponents: Record<string, LucideIcon> = {
  "01": Briefcase,
  "02": Compass,
  "03": Layers,
  "04": HardHat,
  "05": CheckSquare,
};

const journeyPaths: Record<number, string> = {
  0: "M 120 100", 
  1: "M 120 100 C 240 100, 240 220, 360 220", 
  2: "M 120 100 C 240 100, 240 220, 360 220 C 480 220, 480 100, 600 100", 
  3: "M 120 100 C 240 100, 240 220, 360 220 C 480 220, 480 100, 600 100 C 720 100, 720 220, 840 220", 
  4: "M 120 100 C 240 100, 240 220, 360 220 C 480 220, 480 100, 600 100 C 720 100, 720 220, 840 220 C 960 220, 960 100, 1080 100", 
};

export function ProcessGlimpse() {
  const { eyebrow, title, description, cta, phases } = data;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);
  
  const sectionRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered || !isSectionVisible) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phases.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, isSectionVisible, phases.length]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    const swipeThreshold = 40;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % phases.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + phases.length) % phases.length);
      }
    }
  }

  const handleCtaRoute = () => {
    window.location.href = cta.path;
  };

  return (
    <section ref={sectionRef} className="paa-process-journey">
      <div className="paa-process-journey__container">
        
        <header className="paa-process-journey__header">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            eyebrowSize="xl"
            icon={RefreshCw}
          />
        </header>

        <div 
          className="paa-process-journey__arena"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          <div className="paa-process-journey__vector-svg" aria-hidden="true">
            <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
              <defs>
                <marker
                  id="paa-journey-flow-arrow"
                  viewBox="0 0 10 10"
                  refX="6" 
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 2 1 L 7 5 L 2 9" fill="none" stroke="var(--paa-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>

              <path 
                d="M 120 100 C 240 100, 240 220, 360 220 C 480 220, 480 100, 600 100 C 720 100, 720 220, 840 220 C 960 220, 960 100, 1080 100" 
                fill="none" 
                className="paa-process-journey__svg-bg-curve" 
              />
              
              {activeIndex > 0 && (
                <path 
                  d={journeyPaths[activeIndex]} 
                  fill="none" 
                  className="paa-process-journey__svg-active-pulse"
                  markerEnd="url(#paa-journey-flow-arrow)"
                />
              )}
            </svg>
          </div>

          <div className="paa-process-journey__track-grid">
            {phases.map((phase, index) => {
              const isActive = index === activeIndex;
              const positionClass = index % 2 === 0 ? "is-top-wave" : "is-bottom-wave";
              const IconAsset = iconComponents[phase.step] || Briefcase;

              let mobilePositionState = "is-next-deck-card";
              if (isActive) mobilePositionState = "is-active-deck-card";
              else if (index < activeIndex) mobilePositionState = "is-prev-deck-card";

              return (
                <div
                  key={phase.step}
                  className={`paa-journey-card ${positionClass} ${isActive ? "is-active" : ""} ${mobilePositionState}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveIndex(index);
                  }}
                >
                  
                  <div className="paa-journey-card__speech-bubble-popup">
                    <div className="paa-journey-card__popup-header">
                      <span className="paa-journey-card__popup-step">Phase {phase.step}</span>
                      <span className="paa-journey-card__popup-summary">{phase.summary}</span>
                    </div>
                    <p className="paa-journey-card__popup-detail">{phase.detail}</p>
                    <div className="paa-journey-card__popup-arrow-pointer" />
                  </div>

                  <div className="paa-journey-card__inner-box">
                    <div className="paa-journey-card__header-row">
                      <span className="paa-journey-card__badge">PHASE {phase.step}</span>
                      <IconAsset className="paa-journey-card__node-icon" />
                    </div>
                    
                    <h3 className="paa-journey-card__title">{phase.title}</h3>
                    
                    <div className="paa-journey-card__mobile-content-package">
                      <span className="paa-journey-card__mobile-summary">{phase.summary}</span>
                      <p className="paa-journey-card__mobile-detail">{phase.detail}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        <footer className="paa-process-journey__footer">
          <Button 
            variant="explore" 
            onClick={handleCtaRoute}
            className="paa-process-gate-trigger"
          >
            {cta.label}
          </Button>
        </footer>

      </div>
    </section>
  );
}