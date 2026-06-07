import { Hero, Logo, Navbar, type HeroConfig } from "@paa/ui";

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
    </main>
  );
}
