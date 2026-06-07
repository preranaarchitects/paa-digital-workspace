import { Navbar, Logo } from "@paa/ui";

import branding from "../../../../../packages/ui/src/data/branding.json";
import navbar from "../../data/navbar.json";

export function UiTestPage() {
  return (

    <div className="min-h-screen">
      <Navbar
        logo={<Logo logo={branding.logo} />}
        navigation={navbar}
      />
    </div>

    
  );
}
