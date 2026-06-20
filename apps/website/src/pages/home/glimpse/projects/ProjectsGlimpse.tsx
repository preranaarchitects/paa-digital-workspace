import { useState, useEffect } from "react";
import { ImageOff, ArrowRight } from "lucide-react";
import "./projects-glimpse.css";
import projectData from "../../../../data/projects.json";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  path: string;
}

interface ProjectData {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; path: string };
  featuredProjects: ProjectItem[];
}

const data = projectData as ProjectData;

export function ProjectsGlimpse() {
  const { eyebrow, title, description, cta, featuredProjects } = data;
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    function checkScreenSize() {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    }
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  function handleImageError(id: number) {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  }

  // 🛡️ DATA CAP GUARD: Controls presentation threshold flawlessly
  const visibleProjects = isMobileOrTablet 
    ? featuredProjects.slice(0, 2) 
    : featuredProjects.slice(0, 3);

  return (
    <section className="paa-projects-glimpse">
      <div className="paa-projects-glimpse__container">
        
        {/* 🏛️ VISION LAYOUT: Purely Centered Header Framework */}
        <header className="paa-projects-glimpse__header">
          <span className="paa-projects-glimpse__eyebrow">{eyebrow}</span>
          <h2 className="paa-projects-glimpse__title">{title}</h2>
          <p className="paa-projects-glimpse__description">{description}</p>
        </header>

        {/* 🖼️ REFINED IN-LINE EXPOSITION TRACK */}
        <div className="paa-projects-glimpse__grid">
          {visibleProjects.map((project) => (
            <a 
              href={project.path} 
              key={project.id} 
              className="paa-project-card"
              aria-label={`View details for ${project.title}`}
            >
              <div className="paa-project-card__image-wrapper">
                {brokenImages[project.id] ? (
                  <div className="paa-project-card__fallback-msg">
                    <ImageOff className="paa-project-card__fallback-icon" />
                    <span>Project Image Unavailable</span>
                  </div>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="paa-project-card__img"
                    loading="lazy"
                    onError={() => handleImageError(project.id)}
                  />
                )}
                <div className="paa-project-card__overlay" />
              </div>

              <div className="paa-project-card__content">
                <div className="paa-project-card__meta">
                  <span className="paa-project-card__category">{project.category}</span>
                  <span className="paa-project-card__separator">•</span>
                  <span className="paa-project-card__location">{project.location}</span>
                </div>
                <h3 className="paa-project-card__title">{project.title}</h3>
              </div>
            </a>
          ))}

          {/* 🌌 THE PRE-EMPTIVE IN-LINE GATEWAY (Drawn perfectly right at the end) */}
          <a href={cta.path} className="paa-projects-inline-action">
            <div className="paa-projects-inline-action__circle">
              <ArrowRight className="paa-projects-inline-action__arrow" />
            </div>
            <span className="paa-projects-inline-action__text">{cta.label}</span>
          </a>
        </div>

      </div>
    </section>
  );
}