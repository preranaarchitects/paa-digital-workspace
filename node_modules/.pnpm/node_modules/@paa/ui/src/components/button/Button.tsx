import "./button.css";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "client" | "explore" | "explore-all" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  ...props
}: ButtonProps) {
  const isExplore = variant === "explore";
  const isExploreAll = variant === "explore-all";

  return (
    <button
      className={cn(
        "paa-btn",
        `paa-btn--${variant}`,
        `paa-btn--${size}`,
        icon && !isExplore && !isExploreAll ? "paa-btn--has-icon" : "",
        className,
      )}
      {...props}
    >
      {!isExploreAll && <span className="paa-btn__bg-layer" aria-hidden="true" />}
      
      {icon && !isExplore && !isExploreAll && (
        <span className="paa-btn__icon-slot">{icon}</span>
      )}
      
      {isExploreAll ? (
        <div className="paa-btn__explore-all-layout">
          <div className="paa-btn__explore-all-circle">
            <ArrowRight strokeWidth={2.5} />
          </div>
          <span className="paa-btn__explore-all-text">{children}</span>
        </div>
      ) : (
        <span className="paa-btn__text">{children}</span>
      )}

      {isExplore && (
        <span className="paa-btn__explore-circle-frame">
          <ArrowUpRight strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}