interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type PlataformNames =
  | 'pc'
  | 'playstation'
  | 'xbox'
  | 'ios'
  | 'mac'
  | 'linux'
  | 'android'
  | 'nintendo'
  | 'web'
  | 'atari'
  | 'sega'
  | 'neo-geo'
  | '3do'
  | 'commodore-amiga'

export type GameSortOption =
  | 'name'
  | '-name'
  | 'released'
  | '-released'
  | 'added'
  | '-added'
  | 'created'
  | '-created'
  | 'updated'
  | '-updated'
  | 'rating'
  | '-rating'
  | 'metacritic'
  | '-metacritic'
  | 'relevance'
  | '-relevance'

export interface GamesQueryParams {
  page?: number
  page_size?: number
  search?: string
  search_precise?: boolean
  search_exact?: boolean
  parent_platforms?: string | number // e.g. "1,2,3"
  platforms?: string // e.g. "4,5"
  stores?: string // e.g. "5,6"
  developers?: string // e.g. "1612,18893" or "valve-software,feral-interactive"
  publishers?: string // e.g. "354,20987" or "electronic-arts,microsoft-studios"
  genres?: string | number // e.g. "4,51" or "action,indie"
  tags?: string // e.g. "31,7" or "singleplayer,multiplayer"
  creators?: string // e.g. "78,28" or "cris-velasco,mike-morasky"
  dates?: string // e.g. "2010-01-01,2018-12-31"
  updated?: string // e.g. "2020-12-01,2020-12-31"
  platforms_count?: number
  metacritic?: string // e.g. "80,100"
  exclude_collection?: number
  exclude_additions?: boolean
  exclude_parents?: boolean
  exclude_game_series?: boolean
  discover?: boolean
  exclude_stores?: string // e.g. "5,6"
  ordering?: GameSortOption | string
  [index: string]: string | boolean | number | undefined
}

export type ListNames = 'main' | 'greatest' | 'greatest' | 'popular'

export interface GameLits {
  list?: ListNames
  params?: GamesQueryParams
  signal?: AbortSignal
}

export interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
  games: {
    id: number
    slug: string
    name: string
    added: number
  }[]
}

export interface Game {
  id: number
  name: string
  slug: string
  description?: string
  description_raw?: string
  background_image?: string
  metacritic?: number
  rating_top?: number
  released?: string
  updated?: string
  rating?: number
  rating_count?: number
  ratings_count?: number
  reviews_text_count?: number
  added?: number
  added_by_status?: {
    yet?: number
    owned?: number
    beaten?: number
    toplay?: number
    dropped?: number
    playing?: number
  }
  suggestions_count?: number
  playtime?: number
  esrb_rating?: {
    id: number
    name: string
    slug: string
  }
  genres: Genre[]
  publishers: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background?: string
  }[]
  parent_platforms: ParentPlatform[]
  platforms?: {
    platform: Platform
    released_at?: string
    requirements_en?: string
    requirements_ru?: string
  }[]
  developers?: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background?: string
  }[]
  tags?: {
    id: number
    name: string
    slug: string
    language: string
    games_count: number
    image_background?: string
  }[]
  stores?: {
    id: number
    store: {
      id: number
      name: string
      slug: string
      domain: string
      games_count: number
      image_background?: string
    }
  }[]
  short_screenshots?: { id: number; image: string }[]
  dominant_color?: string
  saturated_color?: string
  website?: string
  reddit_url?: string
  reddit_name?: string
  reddit_description?: string
  reddit_logo?: string
  reddit_count?: number
  twitch_count?: number
  youtube_count?: number
  reviews_count?: number
  community_rating?: number
  alternative_names?: string[]
  metacritic_platforms?: {
    metascore: number
    url: string
    platform: {
      platform: number
      name: string
      slug: string
    }
  }[]
  user_game?: {
    rating?: number
    note?: string
  }
}

export interface GameDetails extends Game {
  description?: string
  metacritic_url?: string
  reactions?: Record<string, number>
  added_by_status: {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
  }
}

export interface GameFilters {
  genreId?: number
  platformId?: number
  sortOrder?: string
  searchText?: string
  [key: string]: unknown
}

export interface GameListItem extends Omit<Game, 'description_raw'> {
  clip?: {
    clip: string
    clips: Record<string, string>
    video: string
    preview: string
  }
}

export interface Platform {
  id: number
  name: string
  slug: PlataformNames
  games_count?: number
  image_background?: string
  image?: string
  year_start?: number
  year_end?: number
}

export interface ParentPlatform {
  id: number
  name: string
  slug: PlataformNames
  platform: Platform
}

export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
  is_deleted?: boolean
}

export interface ScreenshotDetails extends Screenshot {
  hidden?: boolean
}

export interface Trailer {
  id: number
  name: string
  preview: string
  data: {
    480: string
    max: string
  }
}

export interface TrailerDetails extends Trailer {
  description?: string
  duration?: number
  created_at?: string
  updated_at?: string
}

export type GamesListResponse = PaginatedResponse<Game>
export type PlatformsParentsResponse = PaginatedResponse<ParentPlatform>
export type TrailersListResponse = PaginatedResponse<Trailer>
export type ScreenshotsListResponse = PaginatedResponse<Screenshot>

export type GameDetailResponse = Game
