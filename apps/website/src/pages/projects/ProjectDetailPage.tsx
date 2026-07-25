import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar, MapPin, Maximize2, ShieldCheck, 
  CheckCircle2, ImageOff, ChevronLeft, ChevronRight, Video
} from "lucide-react";

import { EyebrowBadge } from "../../../../../packages/ui/src/components/textview/EyebrowBadge";
import { SectionHeader } from "../../../../../packages/ui/src/components/section/SectionHeader";
import { Button } from "../../../../../packages/ui/src/components/button";
import { NightSkyBackground } from "../../../../../packages/ui/src/components/anim/NightSkyBackground";

import projectDetailsData from "../../data/project-details.json";
import "./project-detail.css";

const WATERMARK_LOGO = "/PAA_Logo.png";

export interface ProjectSpecification {
  location: string;
  builtArea: string;
  year: string;
  scope: string;
  clientType: string;
}

export interface ProjectNarrative {
  title: string;
  story: string;
}

export interface ProjectVideo {
  hasVideo: boolean;
  videoUrl: string;
  poster: string;
  caption: string;
}

export interface GalleryItem {
  url: string;
  caption: string;
}

export interface ProjectDetailItem {
  slug: string;
  title: string;
  category: string;
  designStyle: string;
  projectStatus: string;
  tagline: string;
  specifications: ProjectSpecification;
  heroImage: string;
  narrative: ProjectNarrative;
  keyHighlights: string[];
  video: ProjectVideo;
  gallery: GalleryItem[];
}

export interface CtaData {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface LabelsData {
  notFoundTitle: string;
  notFoundMessage: string;
  returnToPortfolio: string;
  heroFallback: string;
  architecturalBrief: string;
  engineeringTakeaways: string;
  walkthroughEyebrow: string;
  walkthroughTitle: string;
  videoUnavailable: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryFallback: string;
  specs: {
    location: string;
    builtArea: string;
    completionYear: string;
    scopeOfWork: string;
  };
}

export function ProjectDetailPage(): React.ReactElement {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const navigate = useNavigate();

  // Destructure metadata away from project records
  const { _cta: ctaData, _labels: labels, ...projectsOnly } = projectDetailsData as {
    _cta: CtaData;
    _labels: LabelsData;
    [key: string]: unknown;
  };

  const projectDataMap = projectsOnly as Record<string, ProjectDetailItem>;
  const project: ProjectDetailItem | undefined = projectSlug ? projectDataMap[projectSlug] : undefined;
  
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [activeMobileGalleryIndex, setActiveMobileGalleryIndex] = useState<number>(1);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const galleryGridRef = useRef<HTMLDivElement>(null);

  // NOT FOUND FALLBACK
  if (!project) {
    return (
      <main className="paa-detail-not-found">
        <NightSkyBackground />
        <div className="paa-detail-not-found__card">
          <h2>{labels.notFoundTitle}</h2>
          <p>{labels.notFoundMessage}</p>
          <Button 
            variant="explore-all"
            onClick={() => navigate("/projects")}
          >
            {labels.returnToPortfolio}
          </Button>
        </div>
      </main>
    );
  }

  const handleImageError = (key: string) => {
    setBrokenImages((prev) => ({ ...prev, [key]: true }));
  };

  const handlePrevImage = () => {
    if (activeGalleryIndex !== null && activeGalleryIndex > 0) {
      setActiveGalleryIndex(activeGalleryIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (activeGalleryIndex !== null && activeGalleryIndex < project.gallery.length - 1) {
      setActiveGalleryIndex(activeGalleryIndex + 1);
    }
  };

  const handleGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const itemWidth = container.clientWidth;
    if (itemWidth > 0 && project.gallery.length > 0) {
      const index = Math.round(container.scrollLeft / itemWidth) + 1;
      const boundedIndex = Math.max(1, Math.min(index, project.gallery.length));
      setActiveMobileGalleryIndex(boundedIndex);
    }
  };

  const contactUrl = `/contact?project=${encodeURIComponent(project.title)}&slug=${project.slug}`;

  return (
    <main className="paa-project-detail">
      {/* BACKGROUND ANIMATION LAYER */}
      <NightSkyBackground />

      {/* FOREGROUND CONTENT LAYER (Z-INDEX ABOVE ANIMATION) */}
      <div className="paa-detail-content">
        
        {/* HERO SECTION */}
        <header className="paa-detail-hero">
          <div 
            className="paa-detail-hero__bg"
            onContextMenu={(e) => e.preventDefault()}
          >
            {!brokenImages["hero"] ? (
              <>
                <img
                  src={project.heroImage}
                  alt={project.title}
                  onError={() => handleImageError("hero")}
                />
                <div className="paa-watermark-overlay paa-watermark-hero">
                  <img src={WATERMARK_LOGO} alt="Prerana Watermark" />
                </div>
              </>
            ) : (
              <div className="paa-detail-hero__fallback">
                <ImageOff size={48} />
                <span>{labels.heroFallback}</span>
              </div>
            )}
            <div className="paa-detail-hero__overlay" />
          </div>

          {/* GLASS CARD */}
          <div className="paa-detail-hero__card-container">
            <div className="paa-detail-glass-card">
              <EyebrowBadge size="sm" text={`${project.category} • ${project.designStyle}`} />
              <h1>{project.title}</h1>
              <p>{project.tagline}</p>
            </div>
          </div>
        </header>

        {/* SPECIFICATIONS HUD BAR */}
        <section className="paa-detail-specs">
          <div className="paa-detail-specs__container">
            <div className="paa-spec-card">
              <MapPin className="paa-spec-icon" />
              <div className="paa-spec-text">
                <strong>{labels.specs.location}</strong>
                <span>{project.specifications.location}</span>
              </div>
            </div>

            <div className="paa-spec-card">
              <Maximize2 className="paa-spec-icon" />
              <div className="paa-spec-text">
                <strong>{labels.specs.builtArea}</strong>
                <span>{project.specifications.builtArea}</span>
              </div>
            </div>

            <div className="paa-spec-card">
              <Calendar className="paa-spec-icon" />
              <div className="paa-spec-text">
                <strong>{labels.specs.completionYear}</strong>
                <span>{project.specifications.year}</span>
              </div>
            </div>

            <div className="paa-spec-card">
              <ShieldCheck className="paa-spec-icon" />
              <div className="paa-spec-text">
                <strong>{labels.specs.scopeOfWork}</strong>
                <span>{project.specifications.scope}</span>
              </div>
            </div>
          </div>
        </section>

        {/* NARRATIVE & HIGHLIGHTS */}
        <section className="paa-detail-body">
          <div className="paa-detail-body__container">
            <div className="paa-detail-story-grid">
              
              <article className="paa-detail-narrative">
                <EyebrowBadge size="sm" text={labels.architecturalBrief} />
                <h2>{project.narrative.title}</h2>
                <p className="paa-detail-lead-text">{project.narrative.story}</p>
              </article>

              {project.keyHighlights && project.keyHighlights.length > 0 && (
                <aside className="paa-detail-highlights">
                  <h3>{labels.engineeringTakeaways}</h3>
                  <div className="paa-highlights-list">
                    {project.keyHighlights.map((item: string) => (
                      <div className="paa-highlight-chip" key={item}>
                        <CheckCircle2 size={18} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </aside>
              )}

            </div>

            {/* VIDEO SECTION */}
            <div className="paa-detail-video-section">
              <SectionHeader
                eyebrow={labels.walkthroughEyebrow}
                title={labels.walkthroughTitle}
                align="center"
              />

              {project.video?.hasVideo ? (
                <div className="paa-detail-video-box">
                  <p className="paa-detail-video-caption">{project.video.caption}</p>
                  <div 
                    className="paa-detail-video-wrapper"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={project.video.poster}
                      className="paa-native-video-player"
                    >
                      <source src={project.video.videoUrl} type="video/mp4" />
                    </video>
                    <div className="paa-watermark-overlay">
                      <img src={WATERMARK_LOGO} alt="Prerana Watermark" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="paa-detail-video-box is-empty">
                  <Video size={32} />
                  <span>{labels.videoUnavailable}</span>
                </div>
              )}
            </div>

            {/* GALLERY GRID / MOBILE HORIZONTAL SWIPE CAROUSEL */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="paa-detail-gallery">
                <SectionHeader
                  eyebrow={labels.galleryEyebrow}
                  title={labels.galleryTitle}
                  align="center"
                />

                <div className="paa-gallery-mobile-counter">
                  <span>
                    Photo {activeMobileGalleryIndex} / {project.gallery.length}
                  </span>
                </div>

                <div 
                  className="paa-detail-gallery-grid"
                  ref={galleryGridRef}
                  onScroll={handleGalleryScroll}
                >
                  {project.gallery.map((item: GalleryItem, index: number) => {
                    const imgKey = `gallery-${index}`;
                    const isImgBroken = brokenImages[imgKey];

                    return (
                      <div
                        key={imgKey}
                        className={`paa-gallery-item ${isImgBroken ? "is-disabled" : ""}`}
                        onClick={() => !isImgBroken && setActiveGalleryIndex(index)}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        {!isImgBroken ? (
                          <>
                            <img
                              src={item.url}
                              alt={item.caption}
                              onError={() => handleImageError(imgKey)}
                              loading="lazy"
                            />
                            <div className="paa-watermark-overlay">
                              <img src={WATERMARK_LOGO} alt="Prerana Watermark" />
                            </div>
                          </>
                        ) : (
                          <div className="paa-gallery-fallback">
                            <ImageOff size={24} />
                            <span>{labels.galleryFallback}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* BOTTOM CONSULTATION SECTION */}
        <section className="paa-detail-cta">
          <div className="paa-detail-cta__container">
            <SectionHeader
              eyebrow={ctaData.eyebrow}
              title={ctaData.title}
              description={ctaData.description}
              align="center"
            />
            <div className="paa-detail-cta__action">
              <Button 
                variant="explore"
                onClick={() => navigate(contactUrl)}
              >
                {ctaData.buttonText}
              </Button>
            </div>
          </div>
        </section>

      </div>

      {/* LIGHTBOX MODAL */}
      {activeGalleryIndex !== null && (
        <div className="paa-lightbox" onClick={() => setActiveGalleryIndex(null)}>
          <div className="paa-lightbox__modal" onClick={(e) => e.stopPropagation()}>
            
            <button
              type="button"
              className="paa-lightbox__close"
              onClick={() => setActiveGalleryIndex(null)}
              aria-label="Close Gallery Modal"
            >
              ✕
            </button>

            <button
              type="button"
              className="paa-lightbox__nav is-prev"
              onClick={handlePrevImage}
              disabled={activeGalleryIndex === 0}
            >
              <ChevronLeft size={28} />
            </button>

            <div 
              className="paa-lightbox__stage"
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={project.gallery[activeGalleryIndex].url}
                alt={project.gallery[activeGalleryIndex].caption}
              />
              <div className="paa-watermark-overlay">
                <img src={WATERMARK_LOGO} alt="Prerana Watermark" />
              </div>
            </div>

            <button
              type="button"
              className="paa-lightbox__nav is-next"
              onClick={handleNextImage}
              disabled={activeGalleryIndex === project.gallery.length - 1}
            >
              <ChevronRight size={28} />
            </button>

            <div className="paa-lightbox__footer">
              <p>
                {project.gallery[activeGalleryIndex].caption} ({activeGalleryIndex + 1} of {project.gallery.length})
              </p>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}