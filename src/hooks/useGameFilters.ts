import { parseAsString, useQueryStates } from 'nuqs'

export const gameFilterParams = {
  ordering: parseAsString.withDefault('-relevance'),
  parent_platforms: parseAsString.withDefault(''),
  search: parseAsString.withDefault(''),
}

export function useGameFilters() {
  return useQueryStates(gameFilterParams)
}
