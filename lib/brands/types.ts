// ─── Brand Types ─────────────────────────────────────────

export const VALID_BRANDS = ["netflix"] as const;
export type Brand = (typeof VALID_BRANDS)[number];

export function isValidBrand(brand: string): brand is Brand {
  return VALID_BRANDS.includes(brand as Brand);
}

// ─── Shared Config Types ─────────────────────────────────

export type NavLink = {
  label: string;
  active: boolean;
};

export type BottomNavItem = {
  label: string;
  iconName: "Home" | "Clapperboard" | null;
  active: boolean;
  avatar: boolean;
};

export type ContentRowConfig = {
  title: string;
  showIds: number[];
};

export type ShowDetail = {
  id: number;
  title: string;
  image: string;
  tag?: string;
  matchPercent: number;
  year: number;
  rating: string;
  episodes: string;
  headline: string;
  synopsis: string;
  cast: string[];
  genres: string[];
  mood: string;
};

export type BrandConfig = {
  navbar: {
    logo: string;
    profileColor: string;
    navLinks: NavLink[];
  };
  hero: {
    image: string;
    mobileImage: string;
    imageAlt: string;
    titleFont: "default" | "bebas" | "sf-pro";
    title: string;
    description: string;
    genreTags: string[];
    maturityRating: string;
    playButtonLabel: string;
    myListButtonLabel: string;
  };
  bottomNav: {
    items: BottomNavItem[];
  };
  contentRows: ContentRowConfig[];
  modal: {
    seriesBadgeLabel: string;
    playButtonLabel: string;
    addToListLabel: string;
    likeLabel: string;
    volumeLabel: string;
    closeLabel: string;
    castLabel: string;
    genresLabel: string;
    moodLabel: string;
    moreLabel: string;
    hdBadge: string;
    adBadge: string;
    /** Message shown in fullscreen play overlay after the intro; supports line breaks */
    fullscreenMessage: string;
  };
  shows: ShowDetail[];
};
