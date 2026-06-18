import { useEffect, useState } from "react";
import { Sparkles, Lightbulb, Compass, Hammer, Key, ChevronRight, type LucideProps } from "lucide-react";
import "./vision-glimpse.css";
import visionData from "../../../../data/vision.json";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  dream: Sparkles,
  concept: Lightbulb,
  design: Compass,
  build: Hammer,
  handover: Key,
};

export function VisionGlimpse() {
  const { stages } = visionData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRewinding, setIsRewinding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        // When Handover (index 4) finishes, trigger fast rewind back to 0
        if (prev === stages.length - 1) {
          setIsRewinding(true);
          return 0;
        }
        return prev + 1;
      });
    }, 2500); // 2.5 seconds per animation step window

    return () => clearInterval(interval);
  }, [stages.length]);

  useEffect(() => {
    if (activeIndex === 0 && isRewinding) {
      const timeout = setTimeout(() => setIsRewinding(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [activeIndex, isRewinding]);

  // Calculate sliding translation offset for mobile & tablet (shifts left by 20% each step)
  const mobileXTranslation = activeIndex * -20;

  return (
    <div className="paa-vision-glimpse">
      <div className="paa-vision-glimpse__header">
        <span className="paa-vision-glimpse__eyebrow">{visionData.eyebrow}</span>
        <h2 className="paa-vision-glimpse__title">{visionData.title}</h2>
      </div>

      {/* --- DESKTOP VIEW TRACK (All 5 items visible at once) --- */}
      <div className="paa-vision-glimpse__track--desktop">
        {stages.map((stage, index) => {
          const IconComponent = iconMap[stage.id] || Sparkles;
          const isActive = index === activeIndex;

          return (
            <div key={`desk-${stage.id}`} className="paa-vision-glimpse__step-container">
              <div className={`paa-vision-step ${isActive ? "is-active" : ""}`}>
                <div className="paa-vision-step__icon-wrapper">
                  <IconComponent className="paa-vision-step__icon" />
                </div>
                <span className="paa-vision-step__label">{stage.label}</span>
                <p className="paa-vision-step__description">{stage.description}</p>
              </div>

              {index < stages.length - 1 && (
                <div className={`paa-vision-arrow ${isActive ? "is-animating" : ""}`}>
                  <div className="paa-vision-arrow__line-track">
                    <div className="paa-vision-arrow__line-fill" />
                  </div>
                  <ChevronRight className="paa-vision-arrow__icon" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- MOBILE & TABLET CONVEYOR WINDOW (Exactly 2 items visible at once) --- */}
      <div className="paa-vision-glimpse__window--mobile">
        <div 
          className={`paa-vision-glimpse__conveyor--mobile ${isRewinding ? "is-rewinding" : ""}`}
          style={{ transform: `translateX(${mobileXTranslation}%)` }}
        >
          {stages.map((stage, index) => {
            const IconComponent = iconMap[stage.id] || Sparkles;
            const isActive = index === activeIndex;
            const isNextSibling = index === activeIndex + 1;

            return (
              <div key={`mob-${stage.id}`} className="paa-vision-glimpse__node-cell">
                <div className={`paa-vision-step ${isActive ? "is-active" : ""} ${isNextSibling ? "is-upcoming" : ""}`}>
                  <div className="paa-vision-step__icon-wrapper">
                    <IconComponent className="paa-vision-step__icon" />
                  </div>
                  <span className="paa-vision-step__label">{stage.label}</span>
                  <p className="paa-vision-step__description">{stage.description}</p>
                </div>

                {index < stages.length - 1 && (
                  <div className={`paa-vision-arrow ${isActive ? "is-animating" : ""}`}>
                    <div className="paa-vision-arrow__line-track">
                      <div className="paa-vision-arrow__line-fill" />
                    </div>
                    <ChevronRight className="paa-vision-arrow__icon" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
