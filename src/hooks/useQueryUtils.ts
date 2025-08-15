import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/query-keys";
import type { GameFilters } from "../entities/Game";

export const useQueryUtils = () => {
  const queryClient = useQueryClient();

  const invalidateGames = (filters?: GameFilters) => {
    if (filters) {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.gamesInfinite(filters),
      });
    }
    return queryClient.invalidateQueries({
      queryKey: queryKeys.games(),
    });
  };

  const invalidateGame = (id: string | number) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.game(id),
    });
  };

  const invalidateGenres = () => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.genres(),
    });
  };

  const invalidatePlatforms = () => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.platforms(),
    });
  };

  const invalidatePublishers = () => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.publishers(),
    });
  };

  const invalidateScreenshots = (gameId: string | number) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.screenshots(gameId),
    });
  };

  const invalidateTrailers = (gameId: string | number) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.trailers(gameId),
    });
  };

  const invalidateAll = () => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.all,
    });
  };

  const prefetchGame = (id: string | number) => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.game(id),
      queryFn: async () => {
        const { gameQueries } = await import("../lib/query-options");
        const options = gameQueries.detail(id);
        return options.queryFn();
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchGameScreenshots = (gameId: number) => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.gameScreenshots(gameId),
      queryFn: async () => {
        const { gameQueries } = await import("../lib/query-options");
        const options = gameQueries.screenshots(gameId);
        return options.queryFn();
      },
      staleTime: 24 * 60 * 60 * 1000,
    });
  };

  const prefetchGameTrailers = (gameId: number) => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.gameTrailers(gameId),
      queryFn: async () => {
        const { gameQueries } = await import("../lib/query-options");
        const options = gameQueries.trailers(gameId);
        return options.queryFn();
      },
      staleTime: 24 * 60 * 60 * 1000,
    });
  };

  const getGameFromCache = (id: string | number) => {
    return queryClient.getQueryData(queryKeys.game(id));
  };

  const getGamesFromCache = (filters?: GameFilters) => {
    return queryClient.getQueryData(queryKeys.gamesInfinite(filters));
  };

  const getGenresFromCache = () => {
    return queryClient.getQueryData(queryKeys.genresList());
  };

  const getPlatformsFromCache = () => {
    return queryClient.getQueryData(queryKeys.platformsList());
  };

  const setGameInCache = (id: string | number, data: any) => {
    return queryClient.setQueryData(queryKeys.game(id), data);
  };

  const removeGameFromCache = (id: string | number) => {
    return queryClient.removeQueries({
      queryKey: queryKeys.game(id),
    });
  };

  const cancelGameQueries = (id?: string | number) => {
    if (id) {
      return queryClient.cancelQueries({
        queryKey: queryKeys.game(id),
      });
    }
    return queryClient.cancelQueries({
      queryKey: queryKeys.games(),
    });
  };

  const resetGameQueries = () => {
    return queryClient.resetQueries({
      queryKey: queryKeys.games(),
    });
  };

  const ensureGameData = async (id: string | number) => {
    const cachedData = getGameFromCache(id);
    if (cachedData) return cachedData;

    return queryClient.fetchQuery({
      queryKey: queryKeys.game(id),
      queryFn: async () => {
        const { gameQueries } = await import("../lib/query-options");
        const options = gameQueries.detail(id);
        return options.queryFn();
      },
    });
  };

  const warmupGameData = async (ids: (string | number)[]) => {
    const promises = ids.map((id) => prefetchGame(id));
    return Promise.allSettled(promises);
  };

  const getQueryState = (queryKey: readonly unknown[]) => {
    const query = queryClient.getQueryState(queryKey);
    return {
      status: query?.status,
      dataUpdatedAt: query?.dataUpdatedAt,
      errorUpdatedAt: query?.errorUpdatedAt,
      fetchStatus: query?.fetchStatus,
      isInvalidated: query?.isInvalidated,
    };
  };

  const isFetching = (queryKey?: readonly unknown[]) => {
    if (queryKey) {
      return queryClient.isFetching({ queryKey }) > 0;
    }
    return queryClient.isFetching() > 0;
  };

  return {
    invalidateGames,
    invalidateGame,
    invalidateGenres,
    invalidatePlatforms,
    invalidatePublishers,
    invalidateScreenshots,
    invalidateTrailers,
    invalidateAll,
    prefetchGame,
    prefetchGameScreenshots,
    prefetchGameTrailers,
    getGameFromCache,
    getGamesFromCache,
    getGenresFromCache,
    getPlatformsFromCache,
    setGameInCache,
    removeGameFromCache,
    cancelGameQueries,
    resetGameQueries,
    ensureGameData,
    warmupGameData,
    getQueryState,
    isFetching,
  };
};

export const useGameCache = () => {
  const queryClient = useQueryClient();

  const addGameToCache = (game: any) => {
    queryClient.setQueryData(queryKeys.game(game.id), game);
    queryClient.setQueryData(queryKeys.game(game.slug), game);
  };

  const updateGameInCache = (id: string | number, updater: (old: any) => any) => {
    queryClient.setQueryData(queryKeys.game(id), updater);
  };

  const updateGameField = (id: string | number, field: string, value: any) => {
    queryClient.setQueryData(queryKeys.game(id), (old: any) => {
      if (!old) return old;
      return { ...old, [field]: value };
    });
  };

  const updateUserGameData = (id: string | number, userData: any) => {
    queryClient.setQueryData(queryKeys.game(id), (old: any) => {
      if (!old) return old;
      return {
        ...old,
        user_game: { ...old.user_game, ...userData },
      };
    });
  };

  return {
    addGameToCache,
    updateGameInCache,
    updateGameField,
    updateUserGameData,
  };
};

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchOnHover = {
    game: (id: string | number) => () => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.game(id),
        queryFn: async () => {
          const { gameQueries } = await import("../lib/query-options");
          const options = gameQueries.detail(id);
          return options.queryFn();
        },
        staleTime: 5 * 60 * 1000,
      });
    },
    screenshots: (gameId: number) => () => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.gameScreenshots(gameId),
        queryFn: async () => {
          const { gameQueries } = await import("../lib/query-options");
          const options = gameQueries.screenshots(gameId);
          return options.queryFn();
        },
        staleTime: 24 * 60 * 60 * 1000,
      });
    },
    trailers: (gameId: number) => () => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.gameTrailers(gameId),
        queryFn: async () => {
          const { gameQueries } = await import("../lib/query-options");
          const options = gameQueries.trailers(gameId);
          return options.queryFn();
        },
        staleTime: 24 * 60 * 60 * 1000,
      });
    },
  };

  return { prefetchOnHover };
};

export const useOfflineSupport = () => {
  const queryClient = useQueryClient();

  const getOfflineData = () => {
    const gamesData = queryClient.getQueryData(queryKeys.games());
    const genresData = queryClient.getQueryData(queryKeys.genresList());
    const platformsData = queryClient.getQueryData(queryKeys.platformsList());

    return {
      games: gamesData,
      genres: genresData,
      platforms: platformsData,
      timestamp: Date.now(),
    };
  };

  const setOfflineData = (data: any) => {
    if (data.games) {
      queryClient.setQueryData(queryKeys.games(), data.games);
    }
    if (data.genres) {
      queryClient.setQueryData(queryKeys.genresList(), data.genres);
    }
    if (data.platforms) {
      queryClient.setQueryData(queryKeys.platformsList(), data.platforms);
    }
  };

  const isDataStale = (timestamp: number, maxAge = 24 * 60 * 60 * 1000) => {
    return Date.now() - timestamp > maxAge;
  };

  return {
    getOfflineData,
    setOfflineData,
    isDataStale,
  };
};
