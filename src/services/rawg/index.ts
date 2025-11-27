import type { GameSortOption } from './types'

type SortOptions = { name: string; filter: GameSortOption }[]

export const sortBy: SortOptions = [
  { name: 'Relevance', filter: '-relevance' },
  { name: 'Date added', filter: '-created' },
  { name: 'Name', filter: 'name' },
  { name: 'Release date', filter: '-released' },
  { name: 'Popularity', filter: '-added' },
  { name: 'Average rating', filter: '-rating' },
]

export * from './api-client.ts'

export type { Game, GameFilters, GamesQueryParams, Genre, Platform, Screenshot, Trailer } from './types'
