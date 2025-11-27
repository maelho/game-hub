import { parseAsString, useQueryStates } from 'nuqs'

export function useGameFilters() {
  return useQueryStates({
    ordering: parseAsString.withDefault('-relevance'),
  })
}
