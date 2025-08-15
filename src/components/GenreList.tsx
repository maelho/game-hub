import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";

export default function GenreList() {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  if (error) return null;
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mt-9 mb-3">Genres</h2>
      <ul>
        {data?.results.map((genre) => (
          <li key={genre.id} className="py-1.5">
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-lg object-cover"
                src={getCroppedImageUrl(genre.image_background)}
                alt={genre.name}
              />
              <button
                className={`ml-3 text-left text-lg hover:underline whitespace-normal ${
                  genre.id === selectedGenreId
                    ? "font-bold text-primary"
                    : "font-normal text-foreground"
                }`}
                onClick={() => setSelectedGenreId(genre.id)}
              >
                {genre.name}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
