import { useState, useEffect, useRef } from "react";
import { ArrowRight, User } from "lucide-react";
import aboutData from "../../../../data/about-glimpse.json";
import "./about-glimpse.css";

interface AboutMetric {
  value: string;
  label: string;
  subtext: string;
}

interface LeaderProfile {
  name: string;
  designation: string;
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  cta: { label: string; path: string };
  metrics: AboutMetric[];
}

const profiles = aboutData as LeaderProfile[];

export function AboutGlimpse() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // 🛠️ Tracks failed image states cleanly by path string keys to eliminate linter useEffect errors
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const currentProfile = profiles[activeIndex] || profiles[0];
  const hasMultiple = profiles.length > 1;
  const isImageBroken = failedImages[currentProfile?.imagePath] || false;

  // 🔄 CONDITIONAL SCROLL ENGINE (Only runs if more than 1 leader is found)
  useEffect(() => {
    if (!hasMultiple || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % profiles.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, hasMultiple]);

  // 📱 MOBILE SWIPE HANDLERS
  function handleTouchStart(e: React.TouchEvent) {
    if (!hasMultiple) return;
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!hasMultiple) return;
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (!hasMultiple) return;
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % profiles.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
      }
    }
  }

  if (!currentProfile) return null;

  return (
    <section 
      className="paa-about-glimpse"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="paa-about-glimpse__container">
        
        {/* 🖼️ LEFT SIDE: THE SEAMLESS EDITORIAL MEDIA BLOCK */}
        <div className="paa-about-glimpse__media-zone">
          <div className="paa-about-glimpse__image-wrapper">
            
            {!isImageBroken && currentProfile.imagePath ? (
              <img 
                src={currentProfile.imagePath} 
                alt={currentProfile.imageAlt} 
                className="paa-about-glimpse__live-image" 
                onError={() => {
                  setFailedImages((prev) => ({ ...prev, [currentProfile.imagePath]: true }));
                }}
              />
            ) : (
              /* 🛠️ PREMIUM DEFENSIVE RECONSTRUCTION USER ICON FALLBACK CONTAINER */
              <div className="paa-about-glimpse__fallback-avatar">
                <User className="paa-about-glimpse__fallback-icon" />
              </div>
            )}

            <div className="paa-about-glimpse__image-scrim">
              {/* 🛠️ CLEAN DESIGN: Name and designation running stacked one after another */}
              <div className="paa-about-glimpse__badge-stack">
                <span className="paa-about-glimpse__badge-name">{currentProfile.name}</span>
                <span className="paa-about-glimpse__badge-designation">{currentProfile.designation}</span>
              </div>
            </div>
          </div>
          <div className="paa-about-glimpse__geometric-frame-accent" />
        </div>

        {/* 📝 RIGHT SIDE: CONTENT MANAGEMENT HOOD */}
        <div className="paa-about-glimpse__content-zone">
          <header className="paa-about-glimpse__header">
            <span className="paa-about-glimpse__eyebrow">The Leadership</span>
            <h2 className="paa-about-glimpse__title">{currentProfile.title}</h2>
            <p className="paa-about-glimpse__description">{currentProfile.description}</p>
          </header>

          {/* 📊 CORE OPERATIONAL PILLARS GRID */}
          <div className="paa-about-glimpse__metrics-grid">
            {currentProfile.metrics.map((metric, index) => (
              <div key={index} className="paa-about-metric-card">
                <span className="paa-about-metric-card__value">{metric.value}</span>
                <h3 className="paa-about-metric-card__label">{metric.label}</h3>
                <p className="paa-about-metric-card__subtext">{metric.subtext}</p>
              </div>
            ))}
          </div>

          <footer className="paa-about-glimpse__footer">
            <a href={currentProfile.cta.path} className="paa-about-action-gate">
              <span className="paa-about-action-gate__text">{currentProfile.cta.label}</span>
              <div className="paa-about-action-gate__circle">
                <ArrowRight className="paa-about-action-gate__arrow" />
              </div>
            </a>
          </footer>
        </div>

      </div>
    </section>
  );
}