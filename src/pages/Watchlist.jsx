import React, { useState } from "react";
import { useWatchList } from "../context/WatchListContext";
import MovieCard from "../components/MovieCard";

const GENRES = [
  { id: 0, name: "All Genres" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 10751, name: "Family" }
];

const Watchlist = () => {
  const { watchList } = useWatchList();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(0);

  // Filter logic
  const filteredMovies = watchList.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      genre === 0 ? true : movie.genre_ids?.includes(Number(genre));
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-4 pt-20">

      {/* SEARCH + GENRE DROPDOWN */}
      <div className="sticky top-16 z-40 w-full bg-transparent py-4">
        <div className="flex justify-center items-center gap-4 max-w-5xl mx-auto">

          {/* SEARCH BOX */}
          <input
            type="text"
            placeholder="Search watchlist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-md border border-gray-300
                       bg-gray-800 bg-opacity-40 backdrop-blur text-white
                       placeholder-white shadow-lg focus:outline-none"
          />

          {/* GENRE DROPDOWN */}
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-3 rounded-md border border-gray-300 bg-gray-800 
                       text-white shadow-lg focus:outline-none"
          >
            {GENRES.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

        </div>
      </div>

      {/* MOVIE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {filteredMovies.length === 0 && (
          <p className="text-black text-center col-span-full mt-10">
            No movies in your watchlist 😢
          </p>
        )}
      </div>

    </div>
  );
};

export default Watchlist;
