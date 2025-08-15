export {
  default as useGame,
  useGameDetails,
  useGameBasicInfo,
} from "./useGame";
export {
  default as useGames,
  useGamesCount,
  useGamesData,
  useGamesPagination,
} from "./useGames";
export {
  default as useGenre,
  useGenreDetails,
  useGenreBasicInfo,
} from "./useGenre";
export {
  default as useGenres,
  useGenresList,
  useGenreBySlug,
  useGenreOptions,
  useGenresWithGamesCount,
  usePopularGenres,
} from "./useGenres";
export {
  default as usePlatform,
  usePlatformDetails,
  usePlatformBasicInfo,
} from "./usePlatform";
export {
  default as usePlatforms,
  usePlatformsList,
  usePlatformBySlug,
  usePlatformOptions,
  usePlatformsWithGamesCount,
  usePopularPlatforms,
  useCurrentGenPlatforms,
  usePlatformsByGeneration,
} from "./usePlatforms";
export {
  default as useScreenshots,
  useScreenshotsList,
  useScreenshotsData,
  useScreenshotsByDimensions,
  useHighQualityScreenshots,
  useScreenshotUrls,
  useFeaturedScreenshot,
} from "./useScreenshots";
export {
  default as useTrailers,
  useTrailersList,
  useTrailersData,
  useMainTrailer,
  useTrailersByQuality,
  useTrailerUrls,
  useFeaturedTrailer,
  useTrailerPreviews,
} from "./useTrailers";
export {
  useQueryUtils,
  useGameCache,
  usePrefetch,
  useOfflineSupport,
} from "./useQueryUtils";

export type { GameFilters, GameSortOption } from "../entities/Game";
export type { Genre } from "../entities/Genre";
export type { Platform } from "../entities/Platform";
export type { Publisher } from "../entities/Publisher";
export type { Screenshot } from "../entities/Screenshot";
export type { Trailer } from "../entities/Trailer";
