import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import parse from 'html-react-parser'
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
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1">
          {/* <PlatformIconsList limit={game.parent_platforms.length} parent_platform={game.parent_platforms} /> */}
          <h1 className="text-2xl">{game.name}</h1>

          <img alt={game.name} loading="lazy" src={game.background_image} />
        </div>
        <div className="col-span-2">
          <h3>About</h3>

          {game.description && (
            <div className="font-light text-lg [&>p>strong]:font-bold [&>p]:mb-2">{parse(game.description)}</div>
          )}
        </div>
      </div>

      {/* Debug view — remove in production */}
      <details className="rounded bg-neutral-900/40 p-4">
        <summary className="cursor-pointer text-neutral-400 text-sm">Debug Game JSON</summary>
        <pre className="mt-2 overflow-auto text-sm">{JSON.stringify(game, null, 2)}</pre>
      </details>
    </div>
  )
}
