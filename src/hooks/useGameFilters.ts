import { parseAsString, useQueryStates } from 'nuqs'

export const gameFilterParams = {
  ordering: parseAsString.withDefault('-relevance'),
}

export function useGameFilters() {
  return useQueryStates(gameFilterParams)
}
