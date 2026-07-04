import { useEffect, useState } from "react";
import {
  Sparkles,
  Lightbulb,
  Compass,
  Hammer,
  Key,
  ChevronRight,
  type LucideProps,
} from "lucide-react";
import "./vision-glimpse.css";
import visionData from "../../../../data/vision.json";

interface Stage {
  id: string;
  label: string;
  description: string;
}

interface VisionData {
  eyebrow: string;
  title: string;
  stages: Stage[];
}

const data = visionData as VisionData;

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  dream: Sparkles,
  concept: Lightbulb,
  design: Compass,
  build: Hammer,
  handover: Key,
};

export function VisionGlimpse() {
  const { stages, eyebrow, title } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stages.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <section className="paa-vision-glimpse">
      <div className="paa-vision-glimpse__container">
        <div className="paa-vision-glimpse__header">
          <span className="paa-vision-glimpse__eyebrow">{eyebrow}</span>
          <h2 className="paa-vision-glimpse__title">{title}</h2>
        </div>

        <div className="paa-vision-glimpse__track--desktop">
          {stages.map((stage, index) => {
            const IconComponent = iconMap[stage.id] || Sparkles;
            const isActive = index === activeIndex;
            const isLastElement = index === stages.length - 1;

            return (
              <div
                key={`desk-${stage.id}`}
                className={`paa-vision-node-block ${isActive ? "is-node-active" : ""}`}
              >
                <div className="paa-vision-step">
                  <div className="paa-vision-step__icon-wrapper">
                    <IconComponent className="paa-vision-step__icon" />
                  </div>
                  <span className="paa-vision-step__label">{stage.label}</span>
                  <p className="paa-vision-step__description">
                    {stage.description}
                  </p>
                </div>

                {!isLastElement && (
                  <div className="paa-vision-connector-axis" aria-hidden="true">
                    <div className="paa-vision-connector-axis__rail">
                      <div
                        className={`paa-vision-connector-axis__laser ${isActive ? "is-charging" : ""}`}
                      />
                    </div>
                    <div
                      className={`paa-vision-connector-axis__chevron-flow ${isActive ? "is-flowing" : ""}`}
                    >
                      <ChevronRight className="paa-vision-chevron-node paa-vision-chevron-node--1" />
                      <ChevronRight className="paa-vision-chevron-node paa-vision-chevron-node--2" />
                      <ChevronRight className="paa-vision-chevron-node paa-vision-chevron-node--3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="paa-vision-glimpse__hub--mobile">
          <div className="paa-vision-hub-row">
            {stages.map((stage, index) => {
              const IconComponent = iconMap[stage.id] || Sparkles;
              const isActive = index === activeIndex;
              const isLastElement = index === stages.length - 1;

              return (
                <div
                  key={`hub-${stage.id}`}
                  className={`paa-vision-hub-tab ${isActive ? "is-tab-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="paa-vision-hub-tab__icon-wrapper">
                    <IconComponent className="paa-vision-hub-tab__icon" />
                  </div>
                  <span className="paa-vision-hub-tab__label">
                    {stage.label}
                  </span>

                  {!isLastElement && (
                    <div className="paa-vision-hub-rail" aria-hidden="true">
                      <div
                        className={`paa-vision-hub-rail__laser ${isActive ? "is-beaming" : ""}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="paa-vision-hub-narrative" key={activeIndex}>
            <h4 className="paa-vision-hub-narrative__title">
              {stages[activeIndex].label}
            </h4>
            <p className="paa-vision-hub-narrative__desc">
              {stages[activeIndex].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
