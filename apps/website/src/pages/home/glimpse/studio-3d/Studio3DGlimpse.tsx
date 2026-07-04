import { useState } from "react";
import { VideoOff, Compass, ArrowRight } from "lucide-react";
import { Button } from "../../../../../../../packages/ui/src/components/button";
import studioData from "../../../../data/studio-3d.json";
import "./studio-3d-glimpse.css";

interface Hotspot {
  pitch: number;
  yaw: number;
  targetRoomId: string;
  text: string;
}

interface RoomConfig {
  panoramaUrl: string;
  caption: string;
  hotspots: Hotspot[];
}

interface ProjectItem {
  id: string;
  name: string;
  featured: boolean;
  videoUrl: string;
  videoCaption: string;
  initialRoomId: string;
  rooms: Record<string, RoomConfig>;
}

interface StudioStructure {
  eyebrow: string;
  title: string;
  description: string;
  projects: ProjectItem[];
  globalCta: { label: string; path: string };
}

const data = studioData as StudioStructure;

export function Studio3DGlimpse() {
  const { eyebrow, title, description, projects, globalCta } = data;
  const activeProject = projects.find((p) => p.featured) || projects[0];

  const [videoError, setVideoError] = useState<boolean>(false);
  const [currentRoomId, setCurrentRoomId] = useState<string>(activeProject.initialRoomId);
  const [prevProjectId, setPrevProjectId] = useState<string>(activeProject.id);

  if (activeProject.id !== prevProjectId) {
    setPrevProjectId(activeProject.id);
    setCurrentRoomId(activeProject.initialRoomId);
  }

  const currentRoom = activeProject.rooms[currentRoomId] || Object.values(activeProject.rooms)[0];
  
  const tourUrl = `https://cdn.pannellum.org/2.5/pannellum.htm?panorama=${encodeURIComponent(
    currentRoom.panoramaUrl
  )}&autoLoad=true&author=`;

  const handleCtaNavigation = () => {
    window.location.href = globalCta.path;
  };

  return (
    <section className="paa-studio-glimpse">
      <div className="paa-studio-glimpse__wrapper">
        
        <header className="paa-studio-glimpse__header">
          <span className="paa-studio-glimpse__eyebrow">{eyebrow}</span>
          <h2 className="paa-studio-glimpse__title">{title}</h2>
          <p className="paa-studio-glimpse__desc">{description}</p>
        </header>

        <div className="paa-studio-glimpse__grid">
          
          {/* LEFT COLUMN: CINEMATIC WALKTHROUGH */}
          <div className="paa-studio-media-card">
            <div className="paa-studio-media-card__container">
              {!videoError ? (
                <video 
                  src={activeProject.videoUrl}
                  className="paa-studio-media-card__video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className="paa-studio-media-card__error-fallback">
                  <VideoOff className="paa-studio-media-card__error-icon" />
                  <span className="paa-studio-media-card__error-title">Video Walkthrough Unavailable</span>
                  <p className="paa-studio-media-card__error-text">Unable to stream cinematic fly-through simulation.</p>
                </div>
              )}
              
              {!videoError && <div className="paa-studio-media-card__scrim" />}
              {!videoError && (
                <div className="paa-studio-media-card__badge">
                  <span className="paa-studio-media-card__type">Digital Reality Walkthrough</span>
                  <p className="paa-studio-media-card__label">{activeProject.videoCaption}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: 360° ENGINE PORTAL */}
          <div className="paa-studio-media-card paa-studio-media-card--interactive-portal">
            <div className="paa-studio-media-card__container paa-studio-media-card__container--tour-viewport">
              <iframe 
                src={tourUrl}
                className="paa-studio-tour-iframe"
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allowFullScreen
                scrolling="no"
                title={currentRoom.caption}
              />
              
              <div className="paa-studio-tour-hud-indicator">
                <Compass className="paa-studio-tour-hud-icon" />
                <span>360° Live View</span>
              </div>

              <div className="paa-studio-custom-label-badge">
                <span className="paa-studio-custom-label-type">Viewing</span>
                <p className="paa-studio-custom-label-text">{currentRoom.caption}</p>
              </div>
            </div>

            {/* 🛠️ RESTOWED ACTIONS BLOCK OUTSIDE THE IFRAME BOUNDS FOR CLEAN MOBILE FLOWS */}
            <div className="paa-studio-custom-hotspots-container">
              {currentRoom.hotspots.map((hotspot, index) => (
                <button
                  key={index}
                  className="paa-studio-navigation-hotspot-btn"
                  onClick={() => setCurrentRoomId(hotspot.targetRoomId)}
                >
                  <span>{hotspot.text}</span>
                  <ArrowRight className="paa-studio-hotspot-btn-icon" />
                </button>
              ))}
            </div>
          </div>

        </div>

        <footer className="paa-studio-glimpse__footer">
          <Button 
            variant="explore"
            onClick={handleCtaNavigation}
            className="paa-studio-explore-btn"
          >
            {globalCta.label}
          </Button>
        </footer>

      </div>
    </section>
  );
}