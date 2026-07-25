import React from "react";
import { type LucideIcon } from "lucide-react";
import { EyebrowBadge, type EyebrowBadgeSize } from "../textview/EyebrowBadge";
import "./section-header.css";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  eyebrowSize?: EyebrowBadgeSize;
  icon?: LucideIcon;
  iconSize?: number;
  showIcon?: boolean;
  headingTag?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  eyebrowSize = "md",
  icon,
  iconSize,
  showIcon = true,
  headingTag: Heading = "h2",
  className = "",
}: SectionHeaderProps): React.ReactElement {
  return (
    <header
      className={`paa-section-header paa-section-header--${align} ${className}`.trim()}
    >
      {eyebrow && (
        <div className="paa-section-header__eyebrow-wrapper">
          <EyebrowBadge
            text={eyebrow}
            size={eyebrowSize}
            icon={icon}
            iconSize={iconSize}
            showIcon={showIcon}
          />
        </div>
      )}

      <Heading className="paa-section-header__title">{title}</Heading>

      {description && (
        <p className="paa-section-header__description">{description}</p>
      )}
    </header>
  );
}