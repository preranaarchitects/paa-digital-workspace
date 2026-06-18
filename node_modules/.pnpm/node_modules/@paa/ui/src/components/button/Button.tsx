import "./button.css";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "client" | "explore" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode; // Supports prefix icon configuration natively
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "paa-btn",
        `paa-btn--${variant}`,
        `paa-btn--${size}`,
        icon ? "paa-btn--has-icon" : "",
        className,
      )}
      {...props}
    >
      {/* Dynamic Background Sliding Overlay Layer */}
      <span className="paa-btn__bg-layer" aria-hidden="true" />
      
      {/* Prefix Icon: Positioned before text content node for uniform alignment */}
      {icon && <span className="paa-btn__icon-slot">{icon}</span>}
      
      {/* Core Text Label Block */}
      <span className="paa-btn__text">{children}</span>
    </button>
  );
}