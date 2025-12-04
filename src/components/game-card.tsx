import { Link } from '@tanstack/react-router'
import type { Game } from '@/services/rawg'
import { getCroppedImageUrl } from '@/services/rawg/utils'
import MetacriticScore from './metacritic-score'
import PlatformIconsList from './platform-icons-list'
import { Card, CardContent, CardFooter } from './ui/card'

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link
      className="inline-flex"
      params={{
        gameSlug: game.slug,
      }}
      to="/games/$gameSlug"
    >
      <Card className="overflow-hidden pt-0">
        <CardContent className="px-0">
          <img alt={game.name} className="object-cover" src={getCroppedImageUrl(game.background_image)} />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="flex justify-between">
            <PlatformIconsList parent_platform={game.parent_platforms} />
            {game.metacritic && <MetacriticScore score={game.metacritic} />}
          </div>

          <h3 className="text-left font-bold text-2xl">{game.name}</h3>
        </CardFooter>
      </Card>
    </Link>
  )
}
