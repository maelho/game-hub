import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import {
  createGamesQueryFn,
  defaultQueryOptions,
  hasValidSlug,
  STALE_TIMES,
  withCacheTimes,
} from '@/lib/query-options.utils'
import { getGameDetails, getGameScreenshots, getGameTrailers, getPlatformsParents } from '@/services/rawg'
import type { GamesQueryParams } from '@/services/rawg/types'

const gameQueryKeys = {
  all: ['games'] as const,
  infinite: (filters?: GamesQueryParams) => [...gameQueryKeys.all, 'infinite', filters ?? 'all'] as const,
  detail: (id: string | number) => [...gameQueryKeys.all, 'detail', id] as const,
  screenshots: (id: string | number) => [...gameQueryKeys.all, 'screenshots', id] as const,
  trailers: (id: string | number) => [...gameQueryKeys.all, 'trailers', id] as const,
  platformsParents: () => [...gameQueryKeys.all, 'platforms'] as const,
}

export function gameQueryOptions(filters?: GamesQueryParams) {
  return infiniteQueryOptions({
    queryKey: gameQueryKeys.infinite(filters),
    queryFn: createGamesQueryFn(filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => (lastPage.next ? lastPageParam + 1 : undefined),
    ...defaultQueryOptions,
    ...withCacheTimes(STALE_TIMES.games, 2),
  })
}

export function gameDetailsQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.detail(slug),
    queryFn: ({ signal }) => getGameDetails(slug, signal),
    ...defaultQueryOptions,
    enabled: hasValidSlug(slug),
    ...withCacheTimes(STALE_TIMES.gameDetails, 2),
  })
}

export function gameScreenshotsQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.screenshots(slug),
    queryFn: ({ signal }) => getGameScreenshots(slug, signal),
    ...defaultQueryOptions,
    enabled: hasValidSlug(slug),
    ...withCacheTimes(STALE_TIMES.gameMedia),
  })
}

export function gameTrailersQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.trailers(slug),
    queryFn: ({ signal }) => getGameTrailers(slug, signal),
    ...defaultQueryOptions,
    enabled: hasValidSlug(slug),
    ...withCacheTimes(STALE_TIMES.gameMedia),
  })
}

export function platformsQueryOptions() {
  return queryOptions({
    queryKey: gameQueryKeys.platformsParents(),
    queryFn: ({ signal }) => getPlatformsParents(signal),
    ...defaultQueryOptions,
    ...withCacheTimes(STALE_TIMES.platforms),
  })
}
