import type { Game } from '@/services/rawg'
import { getCroppedImageUrl } from '@/services/rawg/utils'
import MetacriticScore from './metacritic-score'
import { Card, CardContent, CardFooter } from './ui/card'

// import { Link } from '@tanstack/react-router'

interface Props {
  game: Game
}

export default function GameCard({ game }: Props) {
  return (
    <Card className="inline-flex overflow-hidden pt-0">
      <CardContent className="px-0">
        <img alt={game.name} className="object-cover" src={getCroppedImageUrl(game.background_image)} />
      </CardContent>
      <CardFooter className="flex justify-between">
        {game.metacritic && <MetacriticScore score={game.metacritic} />}

        <h3 className="text-left font-bold text-2xl">{game.name}</h3>
      </CardFooter>
    </Card>
  )
}
