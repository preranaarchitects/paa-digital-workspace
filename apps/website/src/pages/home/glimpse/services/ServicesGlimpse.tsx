import { useState } from "react";
import { Button } from "../../../../../../../packages/ui/src/components/button/Button";
import servicesData from "../../../../data/services.json";
import "./services-glimpse.css";

interface ServiceTeaserItem {
  id: string;
  label: string;
  tagline: string;
  teaser: string;
}

interface ServicesGlimpseStructure {
  eyebrow: string;
  title: string;
  description: string;
  services: ServiceTeaserItem[];
  cta: { label: string; path: string };
}

const data = servicesData as ServicesGlimpseStructure;

export function ServicesGlimpse() {
  const { eyebrow, title, description, services, cta } = data;
  const [activeId, setActiveId] = useState<string | null>(services[0].id);

  return (
    <section className="paa-services-glimpse">
      <div className="paa-services-glimpse__container">
        
        {/* Isolated Root Eyebrow: Anchored to the top left of the entire section */}
        <span className="paa-services-glimpse__eyebrow">{eyebrow}</span>

        {/* Inner Grid wrapper handling the symmetrical 6fr 4fr layout splits */}
        <div className="paa-services-glimpse__grid-layout">
          
          {/* RIGHT COLUMN: Swapped via CSS order mechanics */}
          <div className="paa-services-glimpse__info-block">
            <h2 className="paa-services-glimpse__title">{title}</h2>
            <p className="paa-services-glimpse__description">{description}</p>
            
            <a href={cta.path} className="paa-services-glimpse__cta-wrapper">
              <Button variant="explore" size="sm">
                {cta.label}
              </Button>
            </a>
          </div>

          {/* LEFT COLUMN: Runway Node Track list */}
          <div className="paa-services-glimpse__runway-list">
            {services.map((service, index) => {
              const isActive = service.id === activeId;

              return (
                <div
                  key={service.id}
                  className={`paa-services-runway-node ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => setActiveId(isActive ? null : service.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveId(isActive ? null : service.id);
                  }}
                >
                  <div className="paa-services-runway-node__main-row">
                    <div className="paa-services-runway-node__content">
                      <span className="paa-services-runway-node__index">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <h3 className="paa-services-runway-node__label">{service.label}</h3>
                    </div>
                  </div>

                  <div className="paa-services-runway-node__drawer">
                    <div className="paa-services-runway-node__drawer-inner">
                      <span className="paa-services-runway-node__tagline">{service.tagline}</span>
                      <p className="paa-services-runway-node__teaser">{service.teaser}</p>
                    </div>
                  </div>

                  <div className="paa-services-runway-node__shutter" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}