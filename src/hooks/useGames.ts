import { GameQuery } from "./../App";
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: string;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>
  useData<Game>("/games", { params: { genres: gameQuery.genre?.id, platforms: gameQuery.platform, ordering: gameQuery.sortOrder, search: gameQuery.searchText } }, [gameQuery]);

export default useGames;
