import { Hero, Logo, Navbar, Footer, type HeroConfig } from "@paa/ui";
import { VisionGlimpse } from "./glimpse/vision";
import { ProjectsGlimpse } from "./glimpse/projects";
import { ServicesGlimpse } from "./glimpse/services";
import { ProcessGlimpse } from "./glimpse/process";
import { AboutGlimpse } from "./glimpse/about";
import { ConversionGlimpse } from "./glimpse/conversion";
import { SEOManager } from "../../components/seo/SEOManager";

import branding from "../../../../../packages/ui/src/data/branding.json";
import heroData from "../../data/hero.json";
import navbar from "../../data/navbar.json";

const hero = heroData as HeroConfig;

export function HomePage() {
  return (
    <>
      <SEOManager pageKey="home" />
      <main className="paa-home-layout">
        <Navbar logo={<Logo logo={branding.logo} />} navigation={navbar} />

        <Hero hero={hero} />

        <div className="paa-margin-buffer" aria-hidden="true" />

        <VisionGlimpse />

        <div className="paa-margin-buffer" aria-hidden="true" />

        <ProjectsGlimpse />

        <div className="paa-margin-buffer" aria-hidden="true" />

        <ServicesGlimpse />

        <div className="paa-margin-buffer" aria-hidden="true" />

        <ProcessGlimpse />

        <div className="paa-margin-buffer" aria-hidden="true" />

        <AboutGlimpse />

        <div className="paa-margin-buffer" aria-hidden="true" />

        <ConversionGlimpse />

        <div className="paa-margin-buffer" aria-hidden="true" />

        <Footer />
      </main>
    </>
  );
}
