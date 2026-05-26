import { memo } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Game } from '@/services/rawg/types'
import { GameExternalLinks } from './game-external-links'
import { GameRatings } from './game-ratings'
import { GameSpecifications } from './game-specifications'

interface GameSidebarProps {
  game: Game
}

export const GameSidebar = memo(function GameSidebar({ game }: GameSidebarProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      className={`space-y-6 lg:sticky lg:top-20 transition-all duration-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`}
      ref={ref}
    >
      <GameSpecifications game={game} />
      <GameRatings game={game} />
      <GameExternalLinks game={game} />
    </div>
  )
})