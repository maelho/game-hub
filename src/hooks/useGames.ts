import useData from "./useData";
import { Genre } from "./useGenres";

export interface Platform {
  id: string;
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

const useGames = (seletedGenre: Genre | null) => useData<Game>("/games", { params: { genres: seletedGenre?.id }}, [seletedGenre?.id]);

export default useGames;
