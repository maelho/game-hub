import { parseAsString, useQueryStates } from 'nuqs'

export const gameFilterParams = {
  ordering: parseAsString.withDefault('-relevance'),
  parent_platforms: parseAsString,
  search: parseAsString,
}

export function useGameFilters() {
  return useQueryStates(gameFilterParams)
}
