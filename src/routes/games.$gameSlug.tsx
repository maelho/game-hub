import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { gameDetailsQueryOptions } from '@/lib/query-options'

export const Route = createFileRoute('/games/$gameSlug')({
  component: GameDetails,
  loader: ({ context: { queryClient }, params: { gameSlug } }) => {
    return queryClient.ensureQueryData(gameDetailsQueryOptions(gameSlug))
  },
})

function GameDetails() {
  const slug = Route.useParams().gameSlug
  const { data: game } = useSuspenseQuery(gameDetailsQueryOptions(slug))

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <h1>{game.name}</h1>
    </div>
  )
}
