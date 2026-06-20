import { useState, useEffect, useRef } from "react";
import { ArrowRight, Plus, Minus, Briefcase, Compass, HardHat, Layers, type LucideIcon } from "lucide-react";
import servicesData from "../../../../data/services.json";
import "./services-glimpse.css";

interface ServiceTeaserItem {
  id: string;
  label: string;
  tagline: string;
  teaser: string;
  showInGlimpse: boolean;
  pageDetails: {
    iconName: string;
  };
}

interface ServicesGlimpseStructure {
  eyebrow: string;
  title: string;
  description: string;
  services: ServiceTeaserItem[];
  cta: { label: string; path: string };
}

const data = servicesData as ServicesGlimpseStructure;

const iconComponents: Record<string, LucideIcon> = {
  Briefcase: Briefcase,
  Compass: Compass,
  HardHat: HardHat,
  Layers: Layers,
};

export function ServicesGlimpse() {
  const { eyebrow, title, description, services, cta } = data;
  const glimpseServices = services.filter((service) => service.showInGlimpse);
  
  const [activeId, setActiveId] = useState<string | null>(glimpseServices[0]?.id || null);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  // 🔄 AUTOMATIC ACCORDION SLIDESHOW LOOP ENGINE
  useEffect(() => {
    if (glimpseServices.length === 0) return;
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = glimpseServices.findIndex((s) => s.id === currentId);
        const nextIndex = (currentIndex + 1) % glimpseServices.length;
        return glimpseServices[nextIndex].id;
      });
    }, 4000); 

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, glimpseServices]);

  // 🛠️ SAFE HOVER TRACKER: Only sets item active on hover if device is NOT a touch screen
  function handleNodeMouseEnter(id: string) {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) {
      setActiveId(id);
    }
  }

  function handleNodeClick(id: string) {
    setActiveId((currentId) => (currentId === id ? null : id));
  }

  return (
    <section className="paa-services-glimpse">
      <div className="paa-services-glimpse__container">
        
        <header className="paa-services-glimpse__header">
          <span className="paa-services-glimpse__eyebrow">{eyebrow}</span>
          <h2 className="paa-services-glimpse__title">{title}</h2>
          <p className="paa-services-glimpse__description">{description}</p>
        </header>

        <div 
          className="paa-services-glimpse__runway-list"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {glimpseServices.map((service, index) => {
            const isActive = service.id === activeId;
            const IconAsset = iconComponents[service.pageDetails.iconName] || Briefcase;

            return (
              <div
                key={service.id}
                className={`paa-services-runway-node ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => handleNodeMouseEnter(service.id)}
                onClick={() => handleNodeClick(service.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleNodeClick(service.id);
                }}
              >
                <div className="paa-services-runway-node__grid-frame">
                  
                  <span className="paa-services-runway-node__index">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  
                  <div className="paa-services-runway-node__core-body">
                    <IconAsset className="paa-services-runway-node__category-icon" />
                    
                    <div className="paa-services-runway-node__text-stack">
                      <h3 className="paa-services-runway-node__label">{service.label}</h3>
                      
                      <div className="paa-services-runway-node__drawer">
                        <div className="paa-services-runway-node__drawer-inner">
                          <span className="paa-services-runway-node__tagline">{service.tagline}</span>
                          <p className="paa-services-runway-node__teaser">{service.teaser}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="paa-services-runway-node__toggle-icon">
                    {isActive ? (
                      <Minus className="paa-services-runway-node__icon-asset" />
                    ) : (
                      <Plus className="paa-services-runway-node__icon-asset" />
                    )}
                  </div>
                  
                </div>

                <div className="paa-services-runway-node__shutter" />
              </div>
            );
          })}
        </div>

        <footer className="paa-services-glimpse__footer">
          <a href={cta.path} className="paa-services-action-gate">
            <span className="paa-services-action-gate__text">{cta.label}</span>
            <div className="paa-services-action-gate__circle">
              <ArrowRight className="paa-services-action-gate__arrow" />
            </div>
          </a>
        </footer>

      </div>
    </section>
  );
}