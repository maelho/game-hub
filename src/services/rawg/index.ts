import type { GameSortOption } from './types'

type SortOptions = { label: string; value: GameSortOption }[]

export const sortBy: SortOptions = [
  { label: 'Relevance', value: '-relevance' },
  { label: 'Date added', value: '-created' },
  { label: 'Name', value: 'name' },
  { label: 'Release date', value: '-released' },
  { label: 'Popularity', value: '-added' },
  { label: 'Average rating', value: '-rating' },
]

export * from './api-client.ts'

export type {
  Game,
  GamesListResponse,
  GamesQueryParams,
  ParentPlatform,
  PlataformNames,
  Platform,
  Screenshot,
  Trailer,
} from './types'
