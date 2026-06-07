export interface HeroCta {
  label: string;
  path: string;
}

export interface HeroSlide {
  id: number;
  mediaSrc: string;
  mediaAlt: string;
  subtitle: string;
  title: string;
  description: string;
  cta: HeroCta;
}

export interface HeroSettings {
  autoPlay: boolean;
  autoPlayInterval: number;
  pauseOnHover: boolean;
  showIndicators: boolean;
  showNavigationArrows: boolean;
  loop: boolean;
}

export interface HeroConfig {
  slides: HeroSlide[];
  settings: HeroSettings;
}