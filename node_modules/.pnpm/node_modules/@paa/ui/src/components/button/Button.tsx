import "./button.css";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "client" | "explore" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "paa-btn",
        `paa-btn--${variant}`,
        `paa-btn--${size}`,
        className,
      )}
      {...props}
    >
      <span>{children}</span>

      {variant === "explore" && (
        <span
          aria-hidden="true"
          className="paa-btn__arrow"
        >
          →
        </span>
      )}
    </button>
  );
}