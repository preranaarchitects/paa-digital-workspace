import { Hero, Logo, Navbar, Footer, type HeroConfig } from "@paa/ui";
import { VisionGlimpse } from "./glimpse/vision";
import { ProjectsGlimpse } from "./glimpse/projects";
import { Studio3DGlimpse } from "./glimpse/studio-3d";
import { ServicesGlimpse } from "./glimpse/services";
import { ProcessGlimpse } from "./glimpse/process";
import { AboutGlimpse } from "./glimpse/about";
import { ConversionGlimpse } from "./glimpse/conversion";
import { SEOManager } from "../../components/seo/SEOManager";

import branding from "../../../../../packages/ui/src/data/branding.json";
import heroData from "../../data/hero.json";
import navbar from "../../data/navbar.json";
import { NightSkyBackground } from "../../../../../packages/ui/src/components/anim/NightSkyBackground";

import "./home-page.css";

const hero = heroData as HeroConfig;

export function HomePage() {
  return (
    <>
      <SEOManager pageKey="home" />
      
      <main className="paa-home-layout">
        <NightSkyBackground />

        <div className="paa-home-hero-wrapper">
          <div className="paa-navbar-overlay">
            <Navbar logo={<Logo logo={branding.logo} />} navigation={navbar} />
          </div>
          <Hero hero={hero} />
        </div>

        <div className="paa-home-sections">
          <VisionGlimpse />
          <div className="paa-section-divider" aria-hidden="true" />

          <ProjectsGlimpse />
          <div className="paa-section-divider" aria-hidden="true" />

          <Studio3DGlimpse />
          <div className="paa-section-divider" aria-hidden="true" />

          <ServicesGlimpse />
          <div className="paa-section-divider" aria-hidden="true" />

          <ProcessGlimpse />
          <div className="paa-section-divider" aria-hidden="true" />

          <AboutGlimpse />
          <div className="paa-section-divider" aria-hidden="true" />

          <ConversionGlimpse />
          <div className="paa-section-divider" aria-hidden="true" />

          <Footer />
        </div>
      </main>
    </>
  );
}