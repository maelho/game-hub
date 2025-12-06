import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import {
  getGameDetails,
  // getGameTrailers,
  //  getGenreDetails,
  // getGenres,
  // getPlatformDetails,
  // getPlatforms,
  getGameLists,
  // getGameScreenshots,
  getGames,
} from '@/services/rawg'
import type { GamesQueryParams } from '@/services/rawg/types'

const DEFAULT_PAGE_SIZE = 30
const GAMES_STALE_TIME = 5 * 60 * 1000 // 5 minutes
const GAME_DETAILS_STALE_TIME = 10 * 60 * 1000 // 10 minutes

export const gameQueryKeys = {
  all: ['games'] as const,
  infinite: (filters?: GamesQueryParams) => [...gameQueryKeys.all, 'infinite', filters || 'all'] as const,
  detail: (id: string | number) => [...gameQueryKeys.all, 'detail', id] as const,
  screenshots: (id: string | number) => [...gameQueryKeys.all, 'screenshots', id] as const,
  trailers: (id: string | number) => [...gameQueryKeys.all, 'trailers', id] as const,
}

export const gameQueryOptions = (filters?: GamesQueryParams) =>
  infiniteQueryOptions({
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
    getNextPageParam: (lastPage, allPages) => (lastPage.next ? allPages.length + 1 : undefined),
    staleTime: GAMES_STALE_TIME,
    gcTime: GAMES_STALE_TIME * 2, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

export const gameDetailsQueryOptions = (slug: string | number) =>
  queryOptions({
    queryKey: ['game', slug],
    queryFn: () => getGameDetails(slug),
    staleTime: GAME_DETAILS_STALE_TIME,
    gcTime: GAME_DETAILS_STALE_TIME, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
