import { useQuery } from "@tanstack/react-query";
import APICLient from "../services/api-client";
import { Game } from "./useGames";

const apiCLient = new APICLient<Game>("/games");

const useGame = (slug: string |  number) =>
  useQuery({
    queryKey: ["game", slug],
    queryFn: () => apiCLient.getGAme(slug),
  });

export default useGame;
