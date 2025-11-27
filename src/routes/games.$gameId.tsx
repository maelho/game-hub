import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { gameDetailsQueryOptions } from '@/lib/query-options'
import ExpandableText from '../components/expandable-text'
import GameAttributes from '../components/game-attributes'
import GameScreenshots from '../components/game-screenshots'
import GameTrailer from '../components/game-trailer'
import useGame from '../hooks/useGame'

export const Route = createFileRoute('/games/$gameId')({
  component: GameDetailComponent,
  loader: ({ context: { queryClient }, params: { gameId } }) => {
    return queryClient.ensureQueryData(gameDetailsQueryOptions(gameId))
  },
})

function GameDetailComponent() {
  const navigate = useNavigate()
  const { data: game, isLoading, error } = useGame(Route.useParams().gameId || '')

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-foreground"></div>
        </div>
      </div>
    )
  }

  if (error || !game) throw error

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="space-y-6">
        <Button
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate({ to: '/' })}
          variant="ghost"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Games</span>
        </Button>

        <div className="space-y-4">
          <h1 className="font-medium text-3xl text-foreground tracking-tight">{game.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-4">
              <h2 className="font-medium text-foreground text-lg">About</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ExpandableText>{game.description_raw || 'No description available.'}</ExpandableText>
              </div>
            </div>

            <GameTrailer gameId={game.id} />
            <GameScreenshots gameId={game.id} />
          </div>

          <div className="space-y-6">
            <GameAttributes game={game} />
          </div>
        </div>
      </div>
    </div>
  )
}
