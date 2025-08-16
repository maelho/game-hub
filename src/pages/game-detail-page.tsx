import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExpandableText from "../components/expandable-text";
import GameAttributes from "../components/game-attributes";
import GameScreenshots from "../components/game-screenshots";
import GameTrailer from "../components/game-trailer";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: game, isLoading, error } = useGame(slug || "");

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-muted border-t-foreground"></div>
        </div>
      </div>
    );
  }

  if (error || !game) throw error;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games</span>
        </Button>

        <div className="space-y-4">
          <h1 className="text-3xl font-medium text-foreground tracking-tight">
            {game.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">About</h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ExpandableText>
                  {game.description_raw || "No description available."}
                </ExpandableText>
              </div>
            </div>

            <GameTrailer gameId={game.id} />
            <GameScreenshots gameId={game.id} />
          </div>

          <div className="space-y-6">
            <GameAttributes game={game} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
