import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import {
  getGameDetails,
  // getGameScreenshots,
  // getGames,
  // getGameTrailers,
  //  getGenreDetails,
  // getGenres,
  // getPlatformDetails,
  // getPlatforms,
  getGameLists,
} from '@/services/rawg'
import type { GamesQueryParams } from '@/services/rawg/types'

// const DEFAULT_STALE_TIME = ms('5m')
// const LONG_STALE_TIME = ms('24h')
// const DEFAULT_RETRY = 3
// const DEFAULT_RETRY_DELAY = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
//
// export const queryKeys = {
//   all: ['game-hub'] as const,
//
//   games: () => [...queryKeys.all, 'games'] as const,
//
//   gamesInfinite: (filters?: Record<string, unknown>) => [...queryKeys.games(), 'infinite', filters] as const,
//   game: (id: string | number) => [...queryKeys.games(), 'detail', id] as const,
//   gameScreenshots: (id: string | number) => [...queryKeys.game(id), 'screenshots'] as const,
//   gameTrailers: (id: string | number) => [...queryKeys.game(id), 'trailers'] as const,
//
//   genres: () => [...queryKeys.all, 'genres'] as const,
//   genresList: () => [...queryKeys.genres(), 'list'] as const,
//   genre: (id: string | number) => [...queryKeys.genres(), 'detail', id] as const,
//
//   platforms: () => [...queryKeys.all, 'platforms'] as const,
//   platformsList: () => [...queryKeys.platforms(), 'list'] as const,
//   platform: (id: string | number) => [...queryKeys.platforms(), 'detail', id] as const,
//
//   screenshots: (gameId: string | number) => [...queryKeys.all, 'screenshots', gameId] as const,
//   trailers: (gameId: string | number) => [...queryKeys.all, 'trailers', gameId] as const,
// } as const

export const gameQueryOptions = (filters?: GamesQueryParams) =>
  infiniteQueryOptions({
    queryKey: ['games', 'infinite', filters ? filters : 'all'],
    queryFn: ({ pageParam = 1 }) =>
      getGameLists({
        params: {
          parent_platforms: filters?.parent_platforms,
          discover: true,
          ordering: filters?.ordering,
          page: pageParam,
          page_size: 30,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.next ? allPages.length + 1 : undefined),
  })

export const gameDetailsQueryOptions = (slug: string | number) =>
  queryOptions({
    queryKey: ['game', slug],
    queryFn: () => getGameDetails(slug),
  })
//
// export const gameScreenshotsQueryOptions = (slug: string | number) =>
//   queryOptions({
//     queryKey: ['game', 'screenshots', slug],
//     queryFn: () => getGameScreenshots(slug),
//   })
//
// export const gameTrailersQueryOptions = (gameId: number) =>
//   queryOptions({
//     queryKey: queryKeys.gameTrailers(gameId),
//     queryFn: () => getGameTrailers(gameId),
//   })

// export const gameQueries = {
//   all: () => queryKeys.games(),
//
//   infinite: (filters?: GameFilters) =>
//     infiniteQueryOptions({
//       queryKey: queryKeys.gamesInfinite(filters),
//       queryFn: ({ pageParam = 1 }) =>
//         getGames({
//           params: {
//             genres: filters?.genreId,
//             parent_platforms: filters?.platformId,
//             ordering: filters?.sortOrder,
//             search: filters?.searchText,
//             page: pageParam,
//             page_size: 20,
//           },
//         }),
//       initialPageParam: 1,
//       getNextPageParam: (lastPage, allPages) => (lastPage.next ? allPages.length + 1 : undefined),
//       staleTime: DEFAULT_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       refetchOnWindowFocus: false,
//       refetchOnMount: true,
//     }),
//
//   detail: (slug: string | number) =>
//     queryOptions({
//       queryKey: queryKeys.game(slug),
//       queryFn: () => getGameDetails(slug),
//       staleTime: DEFAULT_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       enabled: !!slug,
//     }),
//
//   screenshots: (gameId: number) =>
//     queryOptions({
//       queryKey: queryKeys.gameScreenshots(gameId),
//       queryFn: () => getGameScreenshots(gameId),
//       staleTime: LONG_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       enabled: !!gameId && gameId > 0,
//     }),
//
//   trailers: (gameId: number) =>
//     queryOptions({
//       queryKey: queryKeys.gameTrailers(gameId),
//       queryFn: () => getGameTrailers(gameId),
//       staleTime: LONG_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       enabled: !!gameId && gameId > 0,
//     }),
// }
//
// export const genreQueries = {
//   all: () => queryKeys.genres(),
//
//   list: (initialData?: { count: number; results: Genre[] }) =>
//     queryOptions({
//       queryKey: queryKeys.genresList(),
//       queryFn: () => getGenres(),
//       staleTime: LONG_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       initialData,
//     }),
//
//   detail: (id: number) =>
//     queryOptions({
//       queryKey: queryKeys.genre(id),
//       queryFn: () => getGenreDetails(id),
//       staleTime: LONG_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       enabled: !!id && id > 0,
//     }),
// }
//
// export const platformQueries = {
//   all: () => queryKeys.platforms(),
//
//   list: (initialData?: { count: number; results: Platform[] }) =>
//     queryOptions({
//       queryKey: queryKeys.platformsList(),
//       queryFn: () => getPlatforms(),
//       staleTime: LONG_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       initialData,
//     }),
//
//   detail: (id: number) =>
//     queryOptions({
//       queryKey: queryKeys.platform(id),
//       queryFn: () => getPlatformDetails(id),
//       staleTime: LONG_STALE_TIME,
//       retry: DEFAULT_RETRY,
//       retryDelay: DEFAULT_RETRY_DELAY,
//       enabled: !!id && id > 0,
//     }),
// }
