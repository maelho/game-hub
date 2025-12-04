import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import PlatformIconsList from '@/components/platform-icons-list'
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
      <PlatformIconsList limit={game.parent_platforms.length} parent_platform={game.parent_platforms} />

      <h1>{game.name}</h1>
      <p>{game.description_raw}</p>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  )
}
