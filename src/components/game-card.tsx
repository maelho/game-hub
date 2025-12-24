import { Link } from '@tanstack/react-router'
import type { Game } from '@/services/rawg'
import { getCroppedImageUrl } from '@/services/rawg/utils'
import MetacriticScore from './metacritic-score'
import PlatformIconsList from './platform-icons-list'
import { AspectRatio } from './ui/aspect-ratio'
import { Card, CardContent, CardFooter } from './ui/card'

export default function GameCard({ game }: { game: Game }) {
  const imgSrc = getCroppedImageUrl(game.background_image)

  return (
    <Link
      className="block"
      params={{
        slug: game.slug,
      }}
      to="/games/$slug"
    >
      <Card className="gap-0 overflow-hidden pt-0 pb-0">
        <CardContent className="px-0">
          <AspectRatio ratio={16 / 9}>
            {imgSrc && <img alt={game.name} className="w-full object-cover" src={imgSrc} />}
          </AspectRatio>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
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
