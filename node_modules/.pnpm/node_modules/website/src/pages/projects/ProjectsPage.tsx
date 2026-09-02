import React, { useState, useMemo, useRef } from "react";
import { ImageOff } from "lucide-react";
import { Button } from "../../../../../packages/ui/src/components/button";
import { NightSkyBackground } from "../../../../../packages/ui/src/components/anim/NightSkyBackground";
import { SplitPageHeader } from "../../../../../packages/ui/src/components/section/SplitPageHeader";
import projectsData from "../../data/projects.json";
import "./projects-page.css";

const WATERMARK_LOGO = "/PAA_Logo.png";

type StatusFilter = "All" | "In Progress" | "Completed";

export function ProjectsPage(): React.ReactElement {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(1);

  const gridRef = useRef<HTMLDivElement>(null);

  const handleStatusSelect = (status: StatusFilter) => {
    setSelectedStatus(status);
    setSelectedCategory("All");
    setCurrentCardIndex(1);
    if (gridRef.current) gridRef.current.scrollLeft = 0;
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentCardIndex(1);
    if (gridRef.current) gridRef.current.scrollLeft = 0;
  };

  const statusChips = useMemo(() => {
    const hasInProgress = projectsData.featuredProjects.some(
      (p) => p.projectStatus?.toLowerCase() === "in progress"
    );

    const list: { label: string; value: StatusFilter }[] = [
      { label: "All", value: "All" },
    ];

    if (hasInProgress) {
      list.push({ label: "Ongoing Projects", value: "In Progress" });
    }

    list.push({ label: "Completed Projects", value: "Completed" });

    return list;
  }, []);

  const categoryTabs = useMemo(() => {
    const rawCategories = projectsData.featuredProjects.map((p) => p.category);
    return ["All", ...Array.from(new Set(rawCategories))];
  }, []);

  const topRowCounts = useMemo(() => {
    return {
      all: projectsData.featuredProjects.length,
      inProgress: projectsData.featuredProjects.filter(
        (p) => p.projectStatus?.toLowerCase() === "in progress"
      ).length,
      completed: projectsData.featuredProjects.filter(
        (p) => p.projectStatus?.toLowerCase() === "completed"
      ).length,
    };
  }, []);

  const getBottomRowCategoryCount = (category: string) => {
    return projectsData.featuredProjects.filter((project) => {
      const statusMatch =
        selectedStatus === "All" ||
        (selectedStatus === "In Progress" &&
          project.projectStatus?.toLowerCase() === "in progress") ||
        (selectedStatus === "Completed" &&
          project.projectStatus?.toLowerCase() === "completed");

      const categoryMatch = category === "All" || project.category === category;

      return statusMatch && categoryMatch;
    }).length;
  };

  const filteredProjects = projectsData.featuredProjects.filter((project) => {
    const statusMatch =
      selectedStatus === "All" ||
      (selectedStatus === "In Progress" &&
        project.projectStatus?.toLowerCase() === "in progress") ||
      (selectedStatus === "Completed" &&
        project.projectStatus?.toLowerCase() === "completed");

    const categoryMatch =
      selectedCategory === "All" || project.category === selectedCategory;

    return statusMatch && categoryMatch;
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const cardWidth = container.clientWidth;
    if (cardWidth > 0 && filteredProjects.length > 0) {
      const index = Math.round(container.scrollLeft / cardWidth) + 1;
      const boundedIndex = Math.max(1, Math.min(index, filteredProjects.length));
      setCurrentCardIndex(boundedIndex);
    }
  };

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <main className="paa-projects-page">
      {/* BACKGROUND ANIMATION ENGINE */}
      <NightSkyBackground />

      {/* HERO SECTION WITH REUSABLE SPLIT HERO HEADER */}
      <section className="paa-projects-hero">
        <SplitPageHeader
          eyebrow={projectsData.eyebrow}
          title={projectsData.title}
          description={projectsData.description}
          stats={projectsData.heroStats}
        />
      </section>

      {/* GALLERY & FILTER CONTROL SECTION */}
      <section className="paa-projects-gallery">
        <div className="paa-projects-gallery__container">
          
          <div className="paa-filter-wrapper">
            {/* TOP ROW: MAIN STATUS CHIPS */}
            <div className="paa-status-chips" aria-label="Project Status Filter">
              {statusChips.map((chip) => {
                const count =
                  chip.value === "All"
                    ? topRowCounts.all
                    : chip.value === "In Progress"
                    ? topRowCounts.inProgress
                    : topRowCounts.completed;

                return (
                  <button
                    key={chip.value}
                    type="button"
                    className={`paa-chip-btn ${
                      selectedStatus === chip.value ? "is-active" : ""
                    }`}
                    onClick={() => handleStatusSelect(chip.value)}
                  >
                    <span>{chip.label}</span>
                    <span className="paa-chip-badge">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* BOTTOM ROW: DEPENDENT CATEGORY SEGMENTED CONTROL TABS */}
            <div className="paa-segmented-tabs-wrapper">
              <nav className="paa-segmented-tabs" aria-label="Project Category Tabs">
                {categoryTabs.map((cat) => {
                  const count = getBottomRowCategoryCount(cat);
                  const isSelected = selectedCategory === cat;
                  const isDisabled = count === 0;

                  return (
                    <button
                      key={cat}
                      type="button"
                      disabled={isDisabled}
                      className={`paa-segment-tab ${
                        isSelected ? "is-active" : ""
                      } ${isDisabled ? "is-disabled" : ""}`}
                      onClick={() => !isDisabled && handleCategorySelect(cat)}
                    >
                      <span>{cat === "All" ? "All Types" : cat}</span>
                      <span className="paa-segment-badge">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* MOBILE SWIPE COUNTER */}
          {filteredProjects.length > 0 && (
            <div className="paa-mobile-swipe-counter">
              <span>
                Project {currentCardIndex} / {filteredProjects.length}
              </span>
            </div>
          )}

          {/* PROJECT GRID */}
          {filteredProjects.length > 0 ? (
            <div
              className="paa-projects-grid"
              ref={gridRef}
              onScroll={handleScroll}
            >
              {filteredProjects.map((project) => {
                const isImgBroken = brokenImages[String(project.id)];

                return (
                  <a
                    key={project.id}
                    href={project.path}
                    className="paa-portfolio-card"
                  >
                    <div
                      className="paa-portfolio-card__image-box"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      {!isImgBroken ? (
                        <>
                          <img
                            src={project.image}
                            alt={project.title}
                            onError={() => handleImageError(String(project.id))}
                            loading="lazy"
                          />
                          <div className="paa-watermark-overlay">
                            <img src={WATERMARK_LOGO} alt="Prerana Watermark" />
                          </div>
                        </>
                      ) : (
                        <div className="paa-portfolio-card__fallback">
                          <ImageOff size={32} />
                          <span>Project Image Unavailable</span>
                        </div>
                      )}

                      <div className="paa-portfolio-card__badge">
                        {project.styleBadge}
                      </div>
                    </div>

                    <div className="paa-portfolio-card__content">
                      <div className="paa-portfolio-card__header">
                        <span className="paa-portfolio-card__category">
                          {project.category}
                        </span>
                        <span className="paa-portfolio-card__location">
                          • {project.location}
                        </span>
                      </div>

                      <div className="paa-portfolio-card__title-row">
                        <h3>{project.title}</h3>
                        <Button
                          variant="explore-icon"
                          className="paa-project-card-button"
                          aria-label={`Explore ${project.title}`}
                        />
                      </div>

                      <div className="paa-portfolio-card__footer">
                        <span className="paa-tag">
                          Style: {project.designStyle}
                        </span>
                        <span
                          className={`paa-status-pill is-${project.projectStatus
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {project.projectStatus}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="paa-projects-empty">
              <h3>No projects match your selected criteria</h3>
              <p>Try switching categories using the filters above.</p>
              <button
                type="button"
                onClick={() => handleStatusSelect("All")}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}