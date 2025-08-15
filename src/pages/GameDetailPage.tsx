import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug || "");

  if (isLoading)
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  if (error || !game) throw error;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
        <ExpandableText>{game.description_raw}</ExpandableText>
        <GameAttributes game={game} />
      </div>
      <div>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </div>
    </div>
  );
};

export default GameDetailPage;
