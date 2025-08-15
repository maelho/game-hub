import { Card, CardContent } from "@/components/ui/card";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import Emoji from "./Emoji";
import { Link } from "react-router-dom";
import Game from "../entities/Game";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Card className="overflow-hidden">
      {game.background_image && (
        <img
          src={getCroppedImageUrl(game.background_image)}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
      )}
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </div>
        <h2 className="text-2xl font-bold">
          <Link to={"/games/" + game.slug} className="hover:underline">
            {game.name}
          </Link>
          <Emoji rating={game.rating_top} />
        </h2>
      </CardContent>
    </Card>
  );
}
