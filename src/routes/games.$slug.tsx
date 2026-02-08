import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { GameAbout, GameHeader, GameScreenshots, GameSidebar } from '@/components/game-details'
import { gameDetailsQueryOptions } from '@/lib/query-options'

export const Route = createFileRoute('/games/$slug')({
  component: GameDetails,
  loader: ({ context: { queryClient }, params: { slug } }) => {
    return queryClient.ensureQueryData(gameDetailsQueryOptions(slug))
  },
})

function GameDetails() {
  const slug = Route.useParams().slug
  const { data: game } = useSuspenseQuery(gameDetailsQueryOptions(slug))

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6">
      <GameHeader game={game} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="space-y-8 lg:col-span-2">
          <Suspense>
            <GameScreenshots initialScreenshots={game.short_screenshots} slug={game.slug} />
          </Suspense>

          <GameAbout description={game.description} />
        </div>

        <aside className="lg:col-span-1">
          <GameSidebar game={game} />
        </aside>
      </div>
    </div>
  )
}
