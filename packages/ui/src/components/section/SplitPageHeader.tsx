import React from "react";
import {
  Building2,
  MapPin,
  Award,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { EyebrowBadgeSize } from "../textview/EyebrowBadge";
import "./split-page-header.css";

export interface HeroStatItem {
  title: string;
  subtitle: string;
  icon?: string | LucideIcon;
}

export interface SplitPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  stats?: HeroStatItem[];
  eyebrowSize?: EyebrowBadgeSize;
  eyebrowIcon?: LucideIcon;
  className?: string;
}

export function SplitPageHeader({
  eyebrow,
  title,
  description,
  stats = [],
  eyebrowSize = "md",
  eyebrowIcon = Sparkles,
  className = "",
}: SplitPageHeaderProps): React.ReactElement {
  const renderStatIcon = (icon?: string | LucideIcon) => {
    if (!icon) return <Building2 size={22} />;

    if (typeof icon !== "string") {
      const IconComp = icon;
      return <IconComp size={22} />;
    }

    switch (icon.toLowerCase()) {
      case "building":
      case "building2":
        return <Building2 size={22} />;
      case "map":
      case "mappin":
        return <MapPin size={22} />;
      case "award":
        return <Award size={22} />;
      default:
        return <Building2 size={22} />;
    }
  };

  return (
    <div className={`paa-split-hero-header ${className}`.trim()}>
      <div className="paa-split-hero-header__container">
        <div className="paa-split-hero-header__left">
          <SectionHeader
            align="left"
            eyebrow={eyebrow}
            title={title}
            description={description}
            eyebrowSize={eyebrowSize}
            icon={eyebrowIcon}
            headingTag="h1"
          />
        </div>

        {stats && stats.length > 0 && (
          <div className="paa-split-hero-header__right">
            <div className="paa-stats-card">
              {stats.map((stat, idx) => (
                <React.Fragment key={`${stat.title}-${idx}`}>
                  <div className="paa-stat-box">
                    <div className="paa-stat-icon">
                      {renderStatIcon(stat.icon)}
                    </div>
                    <div className="paa-stat-info">
                      <strong className="paa-stat-title">{stat.title}</strong>
                      <span className="paa-stat-subtitle">
                        {stat.subtitle}
                      </span>
                    </div>
                  </div>

                  {idx < stats.length - 1 && (
                    <div className="paa-stat-divider" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}