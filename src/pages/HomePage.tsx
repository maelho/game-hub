import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <div className="hidden lg:block px-5">
        <GenreList />
      </div>

      <div>
        <div className="pl-2">
          <GameHeading />
          <div className="flex mb-5">
            <div className="mr-5">
              <PlatformSelector />
            </div>
            <SortSelector />
          </div>
        </div>

        <GameGrid />
      </div>
    </div>
  );
}
