import { createFileRoute } from '@tanstack/react-router'
import GameFilters from '@/components/game-filters'
import Games from '@/components/games'
import { gameQueryOptions } from '@/lib/query-options'

export const Route = createFileRoute('/')({
  component: RootIndexComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureInfiniteQueryData(gameQueryOptions({ ordering: '-relevance' })),
})

function RootIndexComponent() {
  return (
    <div className="container mx-auto px-6 py-6">
      <GameFilters />
      <Games />
    </div>
  )
}
