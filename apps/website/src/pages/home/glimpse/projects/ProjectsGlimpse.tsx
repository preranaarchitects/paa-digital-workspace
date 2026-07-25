import { useState, useEffect } from "react";
import { ImageOff,FolderKanban } from "lucide-react";
import { Button } from "../../../../../../../packages/ui/src/components/button";
import projectData from "../../../../data/projects.json";
import "./projects-glimpse.css"
import {SectionHeader} from "../../../../../../../packages/ui/src/components/section/SectionHeader"

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

  const visibleProjects = isMobileOrTablet 
    ? featuredProjects.slice(0, 2) 
    : featuredProjects.slice(0, 3);

  const handleCtaNavigation = () => {
    window.location.href = cta.path;
  };

  return (
    <section className="paa-projects-glimpse">
      <div className="paa-projects-glimpse__container">
        
        <header className="paa-projects-glimpse__header">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            eyebrowSize="xl"
            icon={FolderKanban}
          />
        </header>

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

          <Button 
            variant="explore-all" 
            onClick={handleCtaNavigation}
            className="paa-projects-endcard-trigger"
          >
            {cta.label}
          </Button>
        </div>

      </div>
    </section>
  );
}