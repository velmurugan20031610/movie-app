import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const V4_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQ3NGZhZjZhM2VlNmY5MGExMjg2MzFlZDU1OWE4NSIsIm5iZiI6MTc2Mzg0MTk1OC4xNjk5OTk4LCJzdWIiOiI2OTIyMTdhNmNlZjVjMGNiMjc3Njg3NmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mrajQCsSPjKGUj0coR0ESV1CwZIEJW77nPpQGqFlOOk";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const fetchMovies = async () => {
    let url = search
      ? "https://api.themoviedb.org/3/search/movie"
      : API_URL;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${V4_TOKEN}`,
          Accept: "application/json",
        },
        params: {
          page,
          query: search || undefined,
          with_genres: genre || undefined,
          language: "en-US",
        },
      });

      setMovies(res.data.results || []);
    } catch (err) {
      console.log("API ERROR:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, search, genre]);

  return (
    <div className="p-4 pt-20">

      {/* SEARCH + GENRE FILTER */}
      <div className="sticky top-16 z-40 flex gap-4 justify-center py-3 bg-white/10 backdrop-blur-md">

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-3 rounded border border-gray-400 bg-gray-800 text-white placeholder-gray-300"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white border border-gray-400"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="18">Drama</option>
          <option value="14">Fantasy</option>
          <option value="27">Horror</option>
          <option value="878">Sci-Fi</option>
          <option value="10751">Family</option>
        </select>

      </div>

      {/* MOVIE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-10 px-4">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="px-5 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 bg-gray-800 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
