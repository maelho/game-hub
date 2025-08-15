import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import ms from "ms";
import type { AxiosRequestConfig } from "axios";
import APIClient from "../services/api-client";
import type { Game, GameFilters } from "../entities/Game";
import type { Genre } from "../entities/Genre";
import type { Platform } from "../entities/Platform";
import type { Publisher } from "../entities/Publisher";
import type { Screenshot } from "../entities/Screenshot";
import type { Trailer } from "../entities/Trailer";
import { queryKeys } from "./query-keys";

const DEFAULT_STALE_TIME = ms("5m");
const LONG_STALE_TIME = ms("24h");
const DEFAULT_RETRY = 3;
const DEFAULT_RETRY_DELAY = (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000);

export const gameQueries = {
  all: () => queryKeys.games(),

  infinite: (filters?: GameFilters) =>
    infiniteQueryOptions({
      queryKey: queryKeys.gamesInfinite(filters),
      queryFn: ({ pageParam = 1 }) => {
        const apiClient = new APIClient<Game>("/games");
        return apiClient.getAll({
          params: {
            genres: filters?.genreId,
            parent_platforms: filters?.platformId,
            ordering: filters?.sortOrder,
            search: filters?.searchText,
            page: pageParam,
            page_size: 20,
          },
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.next ? allPages.length + 1 : undefined,
      staleTime: DEFAULT_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }),

  detail: (slug: string | number) =>
    queryOptions({
      queryKey: queryKeys.game(slug),
      queryFn: () => {
        const apiClient = new APIClient<Game>("/games");
        return apiClient.get(slug);
      },
      staleTime: DEFAULT_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!slug,
    }),

  screenshots: (gameId: number) =>
    queryOptions({
      queryKey: queryKeys.gameScreenshots(gameId),
      queryFn: () => {
        const apiClient = new APIClient<Screenshot>(`/games/${gameId}/screenshots`);
        return apiClient.getAll();
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!gameId && gameId > 0,
    }),

  trailers: (gameId: number) =>
    queryOptions({
      queryKey: queryKeys.gameTrailers(gameId),
      queryFn: () => {
        const apiClient = new APIClient<Trailer>(`/games/${gameId}/movies`);
        return apiClient.getAll();
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!gameId && gameId > 0,
    }),
};

export const genreQueries = {
  all: () => queryKeys.genres(),

  list: (initialData?: { count: number; results: Genre[] }) =>
    queryOptions({
      queryKey: queryKeys.genresList(),
      queryFn: () => {
        const apiClient = new APIClient<Genre>("/genres");
        return apiClient.getAll();
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      initialData,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: queryKeys.genre(id),
      queryFn: () => {
        const apiClient = new APIClient<Genre>("/genres");
        return apiClient.get(id);
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!id && id > 0,
    }),
};

export const platformQueries = {
  all: () => queryKeys.platforms(),

  list: (initialData?: { count: number; results: Platform[] }) =>
    queryOptions({
      queryKey: queryKeys.platformsList(),
      queryFn: () => {
        const apiClient = new APIClient<Platform>("/platforms");
        return apiClient.getAll();
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      initialData,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: queryKeys.platform(id),
      queryFn: () => {
        const apiClient = new APIClient<Platform>("/platforms");
        return apiClient.get(id);
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!id && id > 0,
    }),
};

export const publisherQueries = {
  all: () => queryKeys.publishers(),

  list: () =>
    queryOptions({
      queryKey: queryKeys.publishersList(),
      queryFn: () => {
        const apiClient = new APIClient<Publisher>("/publishers");
        return apiClient.getAll();
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: queryKeys.publisher(id),
      queryFn: () => {
        const apiClient = new APIClient<Publisher>("/publishers");
        return apiClient.get(id);
      },
      staleTime: LONG_STALE_TIME,
      retry: DEFAULT_RETRY,
      retryDelay: DEFAULT_RETRY_DELAY,
      enabled: !!id && id > 0,
    }),
};
