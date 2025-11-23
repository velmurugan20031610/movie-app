import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = "d3474faf6a3ee6f90a128631ed559a85";

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

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(0);

  // Fetch movies
  const getMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      setMovies(res.data.results);
    } catch (err) {
      console.log("Movie fetch error:", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  // Filtered results
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      genre === 0 ? true : movie.genre_ids.includes(Number(genre));

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-4 pt-20">

      {/* SEARCH + GENRE DROPDOWN */}
      <div className="sticky top-16 z-40 w-full bg-transparent py-4">
        <div className="flex justify-center items-center gap-4 max-w-5xl mx-auto">

          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Search movies..."
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
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
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
          <p className="text-white text-center col-span-full mt-10">
            No movies found 😢
          </p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-10 px-4">

        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Home;
