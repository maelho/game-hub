import useData from "./useData";
import { Genre } from "./useGenres";

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
}

const useGames = (seletedGenre: Genre | null, seletedPlatform: Platform | null) =>
  useData<Game>("/games", { params: { genres: seletedGenre?.id, platforms: seletedPlatform } }, [
    seletedGenre?.id,
    seletedPlatform?.id,
  ]);

export default useGames;
