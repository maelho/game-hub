import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { formatPlatforms } from "@/lib/platform";
import {
  gameDetailsQueryOptions,
  gameScreenshotsQueryOptions,
} from "@/lib/query-options";
import { cn } from "@/lib/utils";
import type { Game } from "@/services/rawg";
import { getCroppedImageUrl } from "@/services/rawg/utils";

interface GameCardProps {
  game: Game;
  priority?: boolean;
}

function getScoreBadge(score: number) {
  if (score >= 75)
    return { bg: "bg-pastel-green-bg", text: "text-pastel-green-text" };
  if (score >= 50)
    return { bg: "bg-pastel-yellow-bg", text: "text-pastel-yellow-text" };
  return { bg: "bg-pastel-red-bg", text: "text-pastel-red-text" };
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  const imgSrc = getCroppedImageUrl(game.background_image);
  const platformCodes = formatPlatforms(
    game.parent_platforms,
    "short",
    " · ",
    4,
  );
  const queryClient = useQueryClient();
  const hasPrefetched = useRef(false);
  const prefetchTimeout = useRef<number | null>(null);
  const PREFETCH_DELAY = 150;

  const handlePrefetch = useCallback(() => {
    if (hasPrefetched.current || prefetchTimeout.current !== null) return;
    prefetchTimeout.current = window.setTimeout(() => {
      prefetchTimeout.current = null;
      if (hasPrefetched.current) return;
      hasPrefetched.current = true;
      void queryClient.prefetchQuery(gameDetailsQueryOptions(game.slug));
      void queryClient.prefetchQuery(gameScreenshotsQueryOptions(game.slug));
    }, PREFETCH_DELAY);
  }, [queryClient, game.slug]);

  const handleCancelPrefetch = useCallback(() => {
    if (prefetchTimeout.current === null) return;
    window.clearTimeout(prefetchTimeout.current);
    prefetchTimeout.current = null;
  }, []);

  const badge = game.metacritic ? getScoreBadge(game.metacritic) : null;

  return (
    <Link
      className="group block"
      onBlur={handleCancelPrefetch}
      onFocus={handlePrefetch}
      onMouseEnter={handlePrefetch}
      onMouseLeave={handleCancelPrefetch}
      onTouchStart={handlePrefetch}
      params={{ slug: game.slug }}
      preload={false}
      to="/games/$slug"
    >
      <article className="overflow-hidden rounded-md border border-industrial-border bg-industrial-secondary transition-all duration-200 hover:shadow-md hover:border-industrial-border-strong hover:-translate-y-0.5">
        <div className="relative aspect-video overflow-hidden bg-industrial-tertiary">
          {imgSrc ? (
            <img
              alt={game.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
              src={imgSrc}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-industrial-text-tertiary text-xs">
              NO_IMAGE
            </div>
          )}

          {badge && (
            <span
              className={cn(
                "mono-data absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                badge.bg,
                badge.text,
              )}
            >
              {game.metacritic}
            </span>
          )}
        </div>

        <div className="space-y-2 p-4">
          <h3 className="line-clamp-2 font-medium text-industrial-text text-sm leading-tight transition-colors duration-150 group-hover:text-industrial-accent">
            {game.name}
          </h3>

          <div className="flex items-center justify-between gap-2 border-industrial-border-strong border-t border-dotted pt-2">
            {platformCodes && (
              <span className="text-[10px] text-industrial-text-tertiary tracking-wide">
                {platformCodes}
              </span>
            )}

            <span className="mono-data text-[10px] text-industrial-text-secondary">
              {typeof game.rating === "number" && game.rating > 0
                ? `${game.rating.toFixed(1)}/5`
                : "N/A"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
