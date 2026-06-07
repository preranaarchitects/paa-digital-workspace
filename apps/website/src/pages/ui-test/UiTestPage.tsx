import { Button, Logo, Navbar } from "@paa/ui";

import branding from "../../../../../packages/ui/src/data/branding.json";
import navbar from "../../data/navbar.json";

export function UiTestPage() {
  return (
    <div className="min-h-screen">
      <Navbar logo={<Logo logo={branding.logo} />} navigation={navbar} />

      <main className="p-8">
        <Button variant="primary">Get a Quote</Button>
      </main>
    </div>
  );
}