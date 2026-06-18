import { Hero, Logo, Navbar, type HeroConfig } from "@paa/ui";
import { VisionGlimpse } from "./glimpse/vision";
import { ProjectsGlimpse } from "./glimpse/projects";
import { ServicesGlimpse } from "./glimpse/services";

import branding from "../../../../../packages/ui/src/data/branding.json";
import heroData from "../../data/hero.json";
import navbar from "../../data/navbar.json";

const hero = heroData as HeroConfig;

export function HomePage() {
  return (
    <main className="paa-home-layout">
      <Navbar
        logo={<Logo logo={branding.logo} />}
        navigation={navbar}
      />
      
      <Hero hero={hero} />
      
      <div className="paa-home-section-card">
        <VisionGlimpse />
      </div>

      <div className="paa-home-section-card">
        <ProjectsGlimpse />
      </div>

      <div className="paa-home-section-card">
        <ServicesGlimpse />
      </div>


      <div className="paa-margin-buffer" aria-hidden="true" />
    </main>
  );
}
