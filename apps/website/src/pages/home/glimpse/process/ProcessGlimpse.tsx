import { useState, useEffect, useRef } from "react";
import { 
  Briefcase, 
  Compass, 
  Layers, 
  HardHat, 
  CheckSquare, 
  type LucideIcon 
} from "lucide-react";
import processData from "../../../../data/process.json";
import "./process-glimpse.css";

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
  1: "M 120 100 C 240 100, 240 220, 310 220", 
  2: "M 120 100 C 240 100, 240 220, 360 220 C 480 220, 480 100, 550 100", 
  3: "M 120 100 C 240 100, 240 220, 360 220 C 480 220, 480 100, 600 100 C 720 100, 720 220, 790 220", 
  4: "M 120 100 C 240 100, 240 220, 360 220 C 480 220, 480 100, 600 100 C 720 100, 720 220, 840 220 C 960 220, 960 100, 1030 100", 
};

export function ProcessGlimpse() {
  const { eyebrow, title, description, phases } = data;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // 📱 Touch Coordinates Tracking Refs for Manual Mobile Swapping
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // 🔄 INFINITE AUTO-PLAY TIMELINE LOOP ENGINE
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phases.length); // Infinite loop cycle
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, phases.length]);

  // 📱 GESTURE CONTROLS FOR MANUAL DRAG SWIPES
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
        // Swipe Left -> Next Card (Infinite Loop Bound)
        setActiveIndex((prev) => (prev + 1) % phases.length);
      } else {
        // Swipe Right -> Previous Card (Infinite Loop Bound)
        setActiveIndex((prev) => (prev - 1 + phases.length) % phases.length);
      }
    }
  }

  return (
    <section className="paa-process-journey">
      <div className="paa-process-journey__container">
        
        <header className="paa-process-journey__header">
          <span className="paa-process-journey__eyebrow">{eyebrow}</span>
          <h2 className="paa-process-journey__title">{title}</h2>
          <p className="paa-process-journey__description">{description}</p>
        </header>

        <div 
          className="paa-process-journey__arena"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* DESKTOP WAVE LAYER GRAPHIC */}
          <div className="paa-process-journey__vector-svg" aria-hidden="true">
            <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
              <defs>
                <marker
                  id="paa-journey-arrow"
                  viewBox="0 0 10 10"
                  refX="2" 
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--paa-accent)" />
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
                  markerEnd="url(#paa-journey-arrow)"
                />
              )}
            </svg>
          </div>

          <div className="paa-process-journey__track-grid">
            {phases.map((phase, index) => {
              const isActive = index === activeIndex;
              const positionClass = index % 2 === 0 ? "is-top-wave" : "is-bottom-wave";
              const IconAsset = iconComponents[phase.step] || Briefcase;

              // 📱 Layout index flags mapping horizontal viewport sliders cleanly
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
                  
                  {/* DESKTOP ONLY DETAILS SPEECH BUBBLE */}
                  <div className="paa-journey-card__speech-bubble-popup">
                    <div className="paa-journey-card__popup-header">
                      <span className="paa-journey-card__popup-step">Phase {phase.step}</span>
                      <span className="paa-journey-card__popup-summary">{phase.summary}</span>
                    </div>
                    <p className="paa-journey-card__popup-detail">{phase.detail}</p>
                    <div className="paa-journey-card__popup-arrow-pointer" />
                  </div>

                  {/* 🛠️ UNIFIED ALL-IN-ONE SYSTEM CARD SHELL */}
                  <div className="paa-journey-card__inner-box">
                    <div className="paa-journey-card__header-row">
                      <span className="paa-journey-card__badge">PHASE {phase.step}</span>
                      <IconAsset className="paa-journey-card__node-icon" />
                    </div>
                    
                    <h3 className="paa-journey-card__title">{phase.title}</h3>
                    
                    {/* 🛠️ MOBILE ACCESSIBLE INLINE WRAPPER ELEMENTS */}
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

      </div>
    </section>
  );
}