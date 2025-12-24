import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import {
  getGameDetails,
  getGameLists,
  getGameScreenshots,
  getGames,
  getGameTrailers,
  getPlatformsParents,
} from '@/services/rawg'
import type { GamesQueryParams } from '@/services/rawg/types'

const DEFAULT_PAGE_SIZE = 30
const GAMES_STALE_TIME = 5 * 60 * 1000 // 5 minutes
const GAME_DETAILS_STALE_TIME = 10 * 60 * 1000 // 10 minutes

const gameQueryKeys = {
  all: ['games'] as const,
  infinite: (filters?: GamesQueryParams) => [...gameQueryKeys.all, 'infinite', filters || 'all'] as const,
  detail: (id: string | number) => [...gameQueryKeys.all, 'detail', id] as const,
  screenshots: (id: string | number) => [...gameQueryKeys.all, 'screenshots', id] as const,
  trailers: (id: string | number) => [...gameQueryKeys.all, 'trailers', id] as const,

  platformsParents: () => [...gameQueryKeys.all, 'platforms'] as const,
}

const defaultQueryOptions = {
  staleTime: GAME_DETAILS_STALE_TIME,
  gcTime: GAME_DETAILS_STALE_TIME,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retry: 2,
}

export function gameQueryOptions(filters?: GamesQueryParams) {
  return infiniteQueryOptions({
    queryKey: gameQueryKeys.infinite(filters),
    queryFn: ({ pageParam = 1 }) => {
      const commonParams = {
        parent_platforms: filters?.parent_platforms,
        ordering: filters?.ordering,
        page: pageParam,
        page_size: DEFAULT_PAGE_SIZE,
      }

      if (filters?.search) {
        return getGames({
          params: {
            ...commonParams,
            search: filters.search,
          },
        })
      }
      return getGameLists({
        params: {
          ...commonParams,
          discover: true,
        },
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => (lastPage.next ? lastPageParam + 1 : undefined),
    ...defaultQueryOptions,

    staleTime: GAMES_STALE_TIME,
    gcTime: GAMES_STALE_TIME * 2, // 10 minutes
  })
}

export function gameDetailsQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.detail(slug),
    queryFn: () => getGameDetails(slug),
    ...defaultQueryOptions,
    enabled: Boolean(slug?.trim()),
  })
}

export function gameScreenshotsQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.screenshots(slug),
    queryFn: () => getGameScreenshots(slug),
    ...defaultQueryOptions,
    enabled: Boolean(slug?.trim()),
  })
}

export function gameTrailersQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.trailers(slug),
    queryFn: () => getGameTrailers(slug),
    ...defaultQueryOptions,
    enabled: Boolean(slug?.trim()),
  })
}

export function platformsQueryOptions() {
  return queryOptions({
    queryKey: gameQueryKeys.platformsParents(),
    queryFn: () => getPlatformsParents(),
    ...defaultQueryOptions,
  })
}
