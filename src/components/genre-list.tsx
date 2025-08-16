import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGenres from "../hooks/useGenres";
import useGameQueryStore from "../store";

export default function GenreList() {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  if (error) return null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Genres
        </h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-muted border-t-foreground"></div>
        </div>
      </div>
    );
  }

  const hasActiveFilter = selectedGenreId !== undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Genres
        </h2>
        {hasActiveFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedGenreId(undefined)}
            className="h-7 px-2 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <button
          className={`
            w-full text-left px-3 py-2 rounded-md text-sm transition-colors
            hover:bg-muted
            ${
              !selectedGenreId
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:text-foreground"
            }
          `}
          onClick={() => setSelectedGenreId(undefined)}
        >
          <div className="flex items-center justify-between">
            <span>All Games</span>
            {!selectedGenreId && <Check className="w-3.5 h-3.5" />}
          </div>
        </button>

        {data?.results.map((genre) => (
          <button
            key={genre.id}
            className={`
              w-full text-left px-3 py-2 rounded-md text-sm transition-colors
              hover:bg-muted
              ${
                genre.id === selectedGenreId
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:text-foreground"
              }
            `}
            onClick={() => setSelectedGenreId(genre.id)}
          >
            <div className="flex items-center justify-between">
              <span className="truncate">{genre.name}</span>
              {genre.id === selectedGenreId && (
                <Check className="w-3.5 h-3.5 flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
