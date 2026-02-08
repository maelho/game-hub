import { memo } from 'react'
import { formatPlatforms } from '@/lib/platform'
import type { Game } from '@/services/rawg/types'
import { SpecRow } from './spec-row'

interface GameSpecificationsProps {
  game: Game
}

export const GameSpecifications = memo(function GameSpecifications({ game }: GameSpecificationsProps) {
  const formattedDate = game.released
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(game.released))
    : null

  const platforms = formatPlatforms(game.parent_platforms, 'full')
  const genres = game.genres?.map((g) => g.name).join(' / ')
  const developers = game.developers?.map((d) => d.name).join(', ')
  const publishers = game.publishers?.map((p) => p.name).join(', ')

  return (
    <div className="rounded-sm border border-industrial-border bg-industrial-secondary p-4">
      <h3 className="mb-4 border-industrial-border-strong border-b pb-2 font-medium text-[10px] text-industrial-accent uppercase tracking-wider">
        Specifications
      </h3>

      <div className="space-y-0">
        <SpecRow label="Release" value={formattedDate} />
        <SpecRow label="Platforms" value={platforms} />
        <SpecRow label="Genres" value={genres} />
        <SpecRow label="Developers" value={developers} />
        <SpecRow label="Publishers" value={publishers} />
        {game.playtime !== undefined && game.playtime > 0 && (
          <SpecRow label="Playtime" value={`${game.playtime} hrs avg`} />
        )}
        {game.esrb_rating && <SpecRow label="Age Rating" value={game.esrb_rating.name} />}
      </div>
    </div>
  )
})
