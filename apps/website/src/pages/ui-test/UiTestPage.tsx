import { Hero, Logo, Navbar, type HeroConfig } from "@paa/ui";

import branding from "../../../../../packages/ui/src/data/branding.json";

import heroData from "../../data/hero.json";
import navbar from "../../data/navbar.json";

const hero = heroData as HeroConfig;

export function UiTestPage() {
  return (
    <>
      <Navbar
        logo={<Logo logo={branding.logo} />}
        navigation={navbar}
      />

      <Hero hero={hero} />

      <section
        style={{
          minHeight: "100vh",
          padding: "6rem 2rem",
          background: "var(--paa-bg)",
        }}
      >
        <h2>Next Section</h2>
        <p>
          This section exists only to verify hero height,
          scrolling behavior, and future scroll animations.
        </p>
      </section>
    </>
  );
}