import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import ms from 'ms'
import {
  getGameScreenshots,
  getGames,
  getGameTrailers,
  getGenres,
  getGenresDetails,
  getPlatformDetails,
  getPlatforms,
  getGamesDetails,
} from '@/services/rawg/api-client'
import type { GameFilters, Genre, Platform } from '@/services/rawg/types'
import { queryKeys } from './query-keys'

const DEFAULT_STALE_TIME = ms('5m')
const LONG_STALE_TIME = ms('24h')
const DEFAULT_RETRY = 3
const DEFAULT_RETRY_DELAY = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)

export const gameQueries = {
  all: () => queryKeys.games(),

  infinite: (filters?: GameFilters) =>
    infiniteQueryOptions({
      queryKey: queryKeys.gamesInfinite(filters),
      queryFn: ({ pageParam = 1 }) =>
        getGames({
          params: {
            genres: filters?.genreId,
            parent_platforms: filters?.platformId,
            ordering: filters?.sortOrder,
            search: filters?.searchText,
            page: pageParam,
            page_size: 20,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => (lastPage.next ? allPages.length + 1 : undefined),
      staleTime: DEFAULT_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }),

  detail: (slug: string | number) =>
    queryOptions({
      queryKey: queryKeys.game(slug),
      queryFn: () => getGamesDetails(slug),
      staleTime: DEFAULT_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!slug,
    }),

  screenshots: (gameId: number) =>
    queryOptions({
      queryKey: queryKeys.gameScreenshots(gameId),
      queryFn: () => getGameScreenshots(gameId),
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!gameId && gameId > 0,
    }),

  trailers: (gameId: number) =>
    queryOptions({
      queryKey: queryKeys.gameTrailers(gameId),
      queryFn: () => getGameTrailers(gameId),
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!gameId && gameId > 0,
    }),
}

export const genreQueries = {
  all: () => queryKeys.genres(),

  list: (initialData?: { count: number; results: Genre[] }) =>
    queryOptions({
      queryKey: queryKeys.genresList(),
      queryFn: () => getGenres(),
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      initialData,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: queryKeys.genre(id),
      queryFn: () => getGenresDetails(id),
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!id && id > 0,
    }),
}

export const platformQueries = {
  all: () => queryKeys.platforms(),

  list: (initialData?: { count: number; results: Platform[] }) =>
    queryOptions({
      queryKey: queryKeys.platformsList(),
      queryFn: () => getPlatforms(),
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      initialData,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: queryKeys.platform(id),
      queryFn: () => getPlatformDetails(id),
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!id && id > 0,
    }),
}
