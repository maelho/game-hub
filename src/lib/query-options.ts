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

export const gameQueryOptions = (filters?: GamesQueryParams) =>
  infiniteQueryOptions({
    queryKey: ['games', 'infinite', filters ? filters : 'all'],
    queryFn: ({ pageParam = 1 }) => {
      if (filters?.search) {
        return getGames({
          params: {
            parent_platforms: filters?.parent_platforms,
            ordering: filters?.ordering,
            page: pageParam,
            page_size: 30,
            search: filters.search,
          },
        })
      }
      return getGameLists({
        params: {
          parent_platforms: filters?.parent_platforms,
          discover: true,
          ordering: filters?.ordering,
          page: pageParam,
          page_size: 30,
        },
      })
    },
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
