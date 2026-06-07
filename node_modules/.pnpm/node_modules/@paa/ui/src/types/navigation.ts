export interface NavigationItem {
  label: string;
  path: string;
}

export interface NavbarCtaItem {
  label: string;
  path: string;
  subtext?: string;
}

export interface NavbarConfig {
  menuItems: NavigationItem[];
  cta: {
    quote: NavbarCtaItem;
    login: NavbarCtaItem;
  };
}