import React, { useState, useEffect } from "react";
import { Sparkles, type LucideIcon } from "lucide-react";
import "./eyebrow-badge.css";

export type EyebrowBadgeSize = "sm" | "md" | "lg" | "xl";

export interface EyebrowBadgeProps {
  text?: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
  size?: EyebrowBadgeSize;
  iconSize?: number;
  showIcon?: boolean;
  className?: string;
}

const DESKTOP_ICON_SIZES: Record<EyebrowBadgeSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

const MOBILE_ICON_SIZES: Record<EyebrowBadgeSize, number> = {
  sm: 10,
  md: 13,
  lg: 16,
  xl: 18,
};

export function EyebrowBadge({
  text,
  children,
  icon: Icon = Sparkles,
  size = "md",
  iconSize,
  showIcon = true,
  className = "",
}: EyebrowBadgeProps): React.ReactElement {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const label = text || children;
  
  // Choose scale map based on viewport
  const sizeMap = isMobile ? MOBILE_ICON_SIZES : DESKTOP_ICON_SIZES;
  const computedIconSize = iconSize ?? sizeMap[size];

  return (
    <div className={`paa-eyebrow-badge paa-eyebrow-badge--${size} ${className}`.trim()}>
      {showIcon && Icon && (
        <Icon className="paa-eyebrow-badge__icon" size={computedIconSize} />
      )}
      <span className="paa-eyebrow-badge__label">{label}</span>
    </div>
  );
}