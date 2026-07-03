import { useState, useEffect, useRef } from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../../../../../packages/ui/src/components/button"; // Shared workspace package hook
import aboutData from "../../../../data/about-glimpse.json";
import "./about-glimpse.css";

interface MetricItem {
  value: string;
  label: string;
  subtext: string;
}

interface TeamMember {
  name: string;
  designation: string;
  bio: string;
  imagePath: string;
  imageAlt: string;
}

interface AboutStructure {
  company: { eyebrow: string; title: string; description: string; metrics: MetricItem[] };
  team: TeamMember[];
  globalCta: { label: string; path: string };
}

const data = aboutData as AboutStructure;

export function AboutGlimpse() {
  const { company, team, globalCta } = data;
  const [activeLeader, setActiveLeader] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const timerRef = useRef<number | null>(null);

  const hasMultipleLeaders = team.length > 1;
  const activeProfile = team[activeLeader] || team[0];
  const isProfileImageBroken = failedImages[activeProfile?.imagePath] || false;

  const handleNext = () => {
    setActiveLeader((prev) => (prev + 1) % team.length);
  };

  const handlePrev = () => {
    setActiveLeader((prev) => (prev - 1 + team.length) % team.length);
  };

  const handleCtaNavigation = () => {
    window.location.href = globalCta.path;
  };

  useEffect(() => {
    if (!hasMultipleLeaders || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveLeader((prev) => (prev + 1) % team.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasMultipleLeaders, isHovered, team.length]);

  return (
    <section className="paa-about-hub">
      <div className="paa-about-hub__wrapper">
        
        <div className="paa-about-company-block">
          <header className="paa-about-company-block__header">
            <span className="paa-about-hub__eyebrow">{company.eyebrow}</span>
            <h2 className="paa-about-company-block__title">{company.title}</h2>
            <p className="paa-about-company-block__desc">{company.description}</p>
          </header>

          <div className="paa-about-company-block__metrics-row">
            {company.metrics.map((metric, idx) => (
              <div key={idx} className="paa-company-metric-card">
                <span className="paa-company-metric-card__value">{metric.value}</span>
                <h3 className="paa-company-metric-card__label">{metric.label}</h3>
                <p className="paa-company-metric-card__text">{metric.subtext}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="paa-about-hub__divider-rail" aria-hidden="true" />

        <div 
          className="paa-about-team-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="paa-about-team-block__media">
            <div className="paa-about-team-block__image-container">
              {!isProfileImageBroken && activeProfile.imagePath ? (
                <img 
                  src={activeProfile.imagePath} 
                  alt={activeProfile.imageAlt} 
                  className="paa-about-team-block__img" 
                  onError={() => {
                    setFailedImages((prev) => ({ ...prev, [activeProfile.imagePath]: true }));
                  }}
                />
              ) : (
                <div className="paa-about-team-block__fallback-avatar">
                  <User className="paa-about-team-block__fallback-icon" />
                </div>
              )}

              <div className="paa-about-team-block__scrim">
                <div className="paa-about-team-block__badge-stack">
                  <span className="paa-about-team-block__badge-name">{activeProfile.name}</span>
                  <span className="paa-about-team-block__badge-role">{activeProfile.designation}</span>
                </div>
              </div>
            </div>
            <div className="paa-about-team-block__geometric-accent" />
          </div>

          <div className="paa-about-team-block__details">
            <div className="paa-about-team-block__header">
              <div className="paa-about-team-block__label-row">
                <span className="paa-about-hub__eyebrow">The Leadership</span>
                <span className="paa-about-team-block__pagination">
                  {activeLeader + 1} / {team.length}
                </span>
              </div>
              <h3 className="paa-about-team-block__director-name">{activeProfile.name}</h3>
              <span className="paa-about-team-block__director-title">{activeProfile.designation}</span>
            </div>

            <p className="paa-about-team-block__bio">{activeProfile.bio}</p>

            <footer className="paa-about-team-block__footer">
              <Button 
                variant="explore"
                onClick={handleCtaNavigation}
                className="paa-about-explore-override"
              >
                {globalCta.label}
              </Button>

              {hasMultipleLeaders && (
                <div className="paa-about-team-block__nav-buttons">
                  <button 
                    onClick={handlePrev} 
                    className="paa-about-team-nav-btn" 
                    aria-label="Previous Team Member"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={handleNext} 
                    className="paa-about-team-nav-btn" 
                    aria-label="Next Team Member"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </footer>
          </div>
        </div>

      </div>
    </section>
  );
}