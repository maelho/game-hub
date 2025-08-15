import type { Genre } from "./Genre";
import type { Platform } from "./Platform";
import type { Publisher } from "./Publisher";

export interface Game {
  readonly id: number;
  name: string;
  slug: string;
  description_raw?: string;
  background_image?: string;
  metacritic?: number;
  rating_top?: number;
  released?: string;
  updated?: string;
  rating?: number;
  rating_count?: number;
  ratings_count?: number;
  reviews_text_count?: number;
  added?: number;
  added_by_status?: {
    yet?: number;
    owned?: number;
    beaten?: number;
    toplay?: number;
    dropped?: number;
    playing?: number;
  };
  suggestions_count?: number;
  playtime?: number;
  esrb_rating?: {
    id: number;
    name: string;
    slug: string;
  };
  genres: Genre[];
  publishers: Publisher[];
  parent_platforms: { platform: Platform }[];
  platforms?: {
    platform: Platform;
    released_at?: string;
    requirements_en?: string;
    requirements_ru?: string;
  }[];
  developers?: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background?: string;
  }[];
  tags?: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background?: string;
  }[];
  stores?: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      games_count: number;
      image_background?: string;
    };
  }[];
  short_screenshots?: { id: number; image: string }[];
  dominant_color?: string;
  saturated_color?: string;
  website?: string;
  reddit_url?: string;
  reddit_name?: string;
  reddit_description?: string;
  reddit_logo?: string;
  reddit_count?: number;
  twitch_count?: number;
  youtube_count?: number;
  reviews_count?: number;
  community_rating?: number;
  alternative_names?: string[];
  metacritic_platforms?: {
    metascore: number;
    url: string;
    platform: {
      platform: number;
      name: string;
      slug: string;
    };
  }[];
  user_game?: {
    rating?: number;
    note?: string;
  };
}

export interface GameDetails extends Game {
  description?: string;
  metacritic_url?: string;
  reactions?: Record<string, number>;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
}

export interface GameSearchParams {
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  genres?: string;
  platforms?: string;
  parent_platforms?: string;
  stores?: string;
  developers?: string;
  publishers?: string;
  dates?: string;
  added?: string;
  created?: string;
  updated?: string;
  released?: string;
  metacritic?: string;
  exclude_collection?: number;
  exclude_additions?: boolean;
  exclude_parents?: boolean;
  exclude_game_series?: boolean;
  tags?: string;
}

export interface GameFilters {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

export interface GameListItem extends Omit<Game, "description_raw"> {
  clip?: {
    clip: string;
    clips: Record<string, string>;
    video: string;
    preview: string;
  };
}

export type GameSortOption =
  | "name"
  | "-name"
  | "released"
  | "-released"
  | "added"
  | "-added"
  | "created"
  | "-created"
  | "updated"
  | "-updated"
  | "rating"
  | "-rating"
  | "metacritic"
  | "-metacritic";

export default Game;
