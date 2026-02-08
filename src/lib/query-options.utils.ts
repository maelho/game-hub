import { getGameLists, getGames } from '@/services/rawg'
import type { GamesQueryParams } from '@/services/rawg/types'

const DEFAULT_PAGE_SIZE = 30

export const STALE_TIMES = {
  games: 10 * 60 * 1000,
  gameDetails: 30 * 60 * 1000,
  platforms: 24 * 60 * 60 * 1000,
  gameMedia: 60 * 60 * 1000,
}

export const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: 1,
}

export const withCacheTimes = (staleTime: number, gcMultiplier = 1) => ({
  staleTime,
  gcTime: staleTime * gcMultiplier,
})

export const hasValidSlug = (slug: string) => Boolean(slug.trim())

const buildGamesParams = (filters: GamesQueryParams | undefined, page: number) => ({
  parent_platforms: filters?.parent_platforms,
  ordering: filters?.ordering,
  page,
  page_size: DEFAULT_PAGE_SIZE,
})

export const createGamesQueryFn = (filters?: GamesQueryParams) => {
  const search = filters?.search

  return ({ pageParam = 1, signal }: { pageParam?: number; signal: AbortSignal }) => {
    const commonParams = buildGamesParams(filters, pageParam)

    if (search) {
      return getGames({
        params: {
          ...commonParams,
          search,
        },
        signal,
      })
    }

    return getGameLists({
      params: {
        ...commonParams,
        discover: true,
      },
      signal,
    })
  }
}
