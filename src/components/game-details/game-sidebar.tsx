import { memo } from 'react'
import type { Game } from '@/services/rawg/types'
import { GameExternalLinks } from './game-external-links'
import { GameRatings } from './game-ratings'
import { GameSpecifications } from './game-specifications'

interface GameSidebarProps {
  game: Game
}

export const GameSidebar = memo(function GameSidebar({ game }: GameSidebarProps) {
  return (
    <div className="space-y-6 lg:sticky lg:top-20">
      <GameSpecifications game={game} />
      <GameRatings game={game} />
      <GameExternalLinks game={game} />
    </div>
  )
})
