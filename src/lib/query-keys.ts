export const queryKeys = {
  all: ['game-hub'] as const,

  games: () => [...queryKeys.all, 'games'] as const,

  gamesInfinite: (filters?: Record<string, unknown>) => [...queryKeys.games(), 'infinite', filters] as const,
  game: (id: string | number) => [...queryKeys.games(), 'detail', id] as const,
  gameScreenshots: (id: string | number) => [...queryKeys.game(id), 'screenshots'] as const,
  gameTrailers: (id: string | number) => [...queryKeys.game(id), 'trailers'] as const,

  genres: () => [...queryKeys.all, 'genres'] as const,
  genresList: () => [...queryKeys.genres(), 'list'] as const,
  genre: (id: string | number) => [...queryKeys.genres(), 'detail', id] as const,

  platforms: () => [...queryKeys.all, 'platforms'] as const,
  platformsList: () => [...queryKeys.platforms(), 'list'] as const,
  platform: (id: string | number) => [...queryKeys.platforms(), 'detail', id] as const,



  screenshots: (gameId: string | number) => [...queryKeys.all, 'screenshots', gameId] as const,
  trailers: (gameId: string | number) => [...queryKeys.all, 'trailers', gameId] as const,
} as const;

export type QueryKeys = typeof queryKeys;
