import "./logo.css";
import type { LogoConfig } from "../../types/branding";
import { cn } from "../../utils/cn";

type LogoVariant = "full" | "compact" | "icon";

export interface LogoProps {
  logo: LogoConfig;
  variant?: LogoVariant;
  className?: string;
}

export function Logo({ logo, variant = "full", className }: LogoProps) {
  return (
    <div className={cn("paa-logo-container", className)}>
      <div className="paa-logo__top-row">
        <div className="paa-logo__mark-container">
          <img src={logo.imageSrc} alt={logo.alt} className="paa-logo__image" />
        </div>

        {variant !== "icon" && (
          <div className="paa-logo__titlecontainer">
            <div className="paa-logo__title">
              {logo.title}
            </div>
            <div className="paa-logo__subtitle">
              {logo.subtitle}
            </div>
          </div>
        )}
      </div>

      {/* {variant === "full" && (
        <div className="paa-logo__tagline">
          {logo.tagline}
        </div>
      )} */}
    </div>
  );
}
