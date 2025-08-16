import GameGrid from "../components/game-grid";
import GameHeading from "../components/game-heading";
import GenreList from "../components/genre-list";
import PlatformSelector from "../components/platform-selector";
import SortSelector from "../components/sort-selector";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <GenreList />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="space-y-6">
            <div className="space-y-4">
              <GameHeading />

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <PlatformSelector />
                <SortSelector />
              </div>
            </div>

            <GameGrid />
          </div>
        </main>
      </div>
    </div>
  );
}
