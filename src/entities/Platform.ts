export interface Platform {
  readonly id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
  image?: string;
  year_start?: number;
  year_end?: number;
}

export interface PlatformDetails extends Platform {
  description?: string;
  games_count: number;
}

export interface ParentPlatform {
  readonly id: number;
  name: string;
  slug: string;
  platforms: Platform[];
}

export default Platform;
