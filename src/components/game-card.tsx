import { Card } from "@/components/ui/card";
import PlatformIconList from "./platform-icon-list";
import CriticScore from "./critic-score";
import getCroppedImageUrl from "../services/image-url";
import { Link } from "react-router-dom";
import Game from "../entities/Game";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Card className="group overflow-hidden border bg-card hover:bg-accent/50 hover:shadow-md transition-all duration-200 relative">
      <Link to={"/games/" + game.slug} className="block">
        {game.background_image && (
          <div className="relative overflow-hidden aspect-video">
            <img
              src={getCroppedImageUrl(game.background_image)}
              alt={game.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content without padding */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            {game.metacritic && <CriticScore score={game.metacritic} />}
          </div>

          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight text-sm">
            {game.name}
          </h3>
        </div>
      </Link>
    </Card>
  );
}
