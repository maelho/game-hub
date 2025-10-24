import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import type { Game } from '../entities/Game'
import getCroppedImageUrl from '../services/image-url'
import CriticScore from './critic-score'
import PlatformIconList from './platform-icon-list'

interface Props {
  game: Game
}

export default function GameCard({ game }: Props) {
  return (
    <Card className="group relative gap-0 overflow-hidden border bg-card p-0 transition-all duration-200 hover:bg-accent/50 hover:shadow-md">
      <Link to={`/games/${game.slug}`} className="block">
        {game.background_image && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={getCroppedImageUrl(game.background_image)}
              alt={game.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <PlatformIconList platforms={game.parent_platforms.map((p) => p.platform)} />
            {game.metacritic && <CriticScore score={game.metacritic} />}
          </div>

          <h3 className="line-clamp-2 font-semibold text-foreground text-sm leading-tight transition-colors duration-200 group-hover:text-primary">
            {game.name}
          </h3>
        </div>
      </Link>
    </Card>
  )
}
