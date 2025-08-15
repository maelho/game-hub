import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { queryKeys } from "./query-keys";
import type { Game } from "../entities/Game";

interface GameRating {
  gameId: number;
  rating: number;
  note?: string;
}

interface GameFavorite {
  gameId: number;
  isFavorite: boolean;
}

interface GameWishlist {
  gameId: number;
  isWishlisted: boolean;
}

export const useRateGame = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/games/ratings");

  return useMutation({
    mutationFn: async ({ gameId, rating, note }: GameRating) => {
      return apiClient.post({ game: gameId, rating, note });
    },
    onMutate: async ({ gameId, rating, note }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.game(gameId) });

      const previousGame = queryClient.getQueryData(queryKeys.game(gameId));

      queryClient.setQueryData(queryKeys.game(gameId), (old: Game) => {
        if (!old) return old;
        return {
          ...old,
          user_game: {
            ...old.user_game,
            rating,
            note,
          },
        };
      });

      return { previousGame, gameId };
    },
    onError: (err, variables, context) => {
      if (context?.previousGame) {
        queryClient.setQueryData(
          queryKeys.game(context.gameId),
          context.previousGame,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.game(variables.gameId),
      });
    },
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/games/favorites");

  return useMutation({
    mutationFn: async ({ gameId, isFavorite }: GameFavorite) => {
      if (isFavorite) {
        return apiClient.post({ game: gameId });
      } else {
        return apiClient.delete(gameId);
      }
    },
    onMutate: async ({ gameId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.game(gameId) });

      const previousGame = queryClient.getQueryData(queryKeys.game(gameId));

      queryClient.setQueryData(queryKeys.game(gameId), (old: Game) => {
        if (!old) return old;
        return {
          ...old,
          user_game: {
            ...old.user_game,
            is_favorite: isFavorite,
          },
        };
      });

      return { previousGame, gameId };
    },
    onError: (err, variables, context) => {
      if (context?.previousGame) {
        queryClient.setQueryData(
          queryKeys.game(context.gameId),
          context.previousGame,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.game(variables.gameId),
      });
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "favorites"],
      });
    },
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/games/wishlist");

  return useMutation({
    mutationFn: async ({ gameId, isWishlisted }: GameWishlist) => {
      if (isWishlisted) {
        return apiClient.post({ game: gameId });
      } else {
        return apiClient.delete(gameId);
      }
    },
    onMutate: async ({ gameId, isWishlisted }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.game(gameId) });

      const previousGame = queryClient.getQueryData(queryKeys.game(gameId));

      queryClient.setQueryData(queryKeys.game(gameId), (old: Game) => {
        if (!old) return old;
        return {
          ...old,
          user_game: {
            ...old.user_game,
            is_wishlisted: isWishlisted,
          },
        };
      });

      return { previousGame, gameId };
    },
    onError: (err, variables, context) => {
      if (context?.previousGame) {
        queryClient.setQueryData(
          queryKeys.game(context.gameId),
          context.previousGame,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.game(variables.gameId),
      });
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "wishlist"],
      });
    },
  });
};

export const useMarkAsPlayed = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/games/played");

  return useMutation({
    mutationFn: async (gameId: number) => {
      return apiClient.post({ game: gameId, played: true });
    },
    onMutate: async (gameId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.game(gameId) });

      const previousGame = queryClient.getQueryData(queryKeys.game(gameId));

      queryClient.setQueryData(queryKeys.game(gameId), (old: Game) => {
        if (!old) return old;
        return {
          ...old,
          user_game: {
            ...old.user_game,
            is_played: true,
          },
        };
      });

      return { previousGame, gameId };
    },
    onError: (err, variables, context) => {
      if (context?.previousGame) {
        queryClient.setQueryData(
          queryKeys.game(context.gameId),
          context.previousGame,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.game(variables),
      });
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "played"],
      });
    },
  });
};

export const useCreateGameCollection = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/collections");

  return useMutation({
    mutationFn: async ({
      name,
      description,
      gameIds,
    }: {
      name: string;
      description?: string;
      gameIds: number[];
    }) => {
      return apiClient.post({
        name,
        description,
        games: gameIds,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "collections"],
      });
    },
  });
};

export const useUpdateGameCollection = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/collections");

  return useMutation({
    mutationFn: async ({
      collectionId,
      name,
      description,
      gameIds,
    }: {
      collectionId: number;
      name?: string;
      description?: string;
      gameIds?: number[];
    }) => {
      return apiClient.put(collectionId, {
        name,
        description,
        games: gameIds,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "collections"],
      });
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "collections", variables.collectionId],
      });
    },
  });
};

export const useDeleteGameCollection = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/collections");

  return useMutation({
    mutationFn: async (collectionId: number) => {
      return apiClient.delete(collectionId);
    },
    onMutate: async (collectionId) => {
      await queryClient.cancelQueries({
        queryKey: [...queryKeys.all, "collections"],
      });

      const previousCollections = queryClient.getQueryData([
        ...queryKeys.all,
        "collections",
      ]);

      queryClient.setQueryData(
        [...queryKeys.all, "collections"],
        (old: any) => {
          if (!old?.results) return old;
          return {
            ...old,
            results: old.results.filter(
              (collection: any) => collection.id !== collectionId,
            ),
            count: old.count - 1,
          };
        },
      );

      return { previousCollections };
    },
    onError: (err, variables, context) => {
      if (context?.previousCollections) {
        queryClient.setQueryData(
          [...queryKeys.all, "collections"],
          context.previousCollections,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "collections"],
      });
    },
  });
};

export const useReportGame = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/games/reports");

  return useMutation({
    mutationFn: async ({
      gameId,
      reason,
      description,
    }: {
      gameId: number;
      reason: string;
      description?: string;
    }) => {
      return apiClient.post({
        game: gameId,
        reason,
        description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.all, "reports"],
      });
    },
  });
};

export const useUpdateGamePlaytime = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<any>("/games/playtime");

  return useMutation({
    mutationFn: async ({
      gameId,
      playtime,
    }: {
      gameId: number;
      playtime: number;
    }) => {
      return apiClient.post({
        game: gameId,
        playtime_seconds: playtime,
      });
    },
    onMutate: async ({ gameId, playtime }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.game(gameId) });

      const previousGame = queryClient.getQueryData(queryKeys.game(gameId));

      queryClient.setQueryData(queryKeys.game(gameId), (old: Game) => {
        if (!old) return old;
        return {
          ...old,
          user_game: {
            ...old.user_game,
            playtime_seconds: playtime,
          },
        };
      });

      return { previousGame, gameId };
    },
    onError: (err, variables, context) => {
      if (context?.previousGame) {
        queryClient.setQueryData(
          queryKeys.game(context.gameId),
          context.previousGame,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.game(variables.gameId),
      });
    },
  });
};
