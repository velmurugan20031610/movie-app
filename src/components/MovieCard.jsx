import React from "react";
import { useWatchList } from "../context/WatchListContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

// (rest of your code)


const MovieCard = ({ movie }) => {
  const { watchList, addToWatchList, removeFromWatchList } = useWatchList();

  const inWatchList = watchList.some((m) => m.id === movie.id);

  const toggleWatchList = () => {
    if (inWatchList) {
      removeFromWatchList(movie.id);
    } else {
      addToWatchList(movie);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-900 group">

      {/* Poster */}
      <img
        src={IMG_URL + movie.poster_path}
        alt={movie.title}
        className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-300"
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Movie Title */}
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <h3 className="font-semibold text-sm">{movie.title}</h3>
        <p className="text-xs opacity-80">{movie.release_date}</p>
      </div>


      {/* Rating */}
      <span className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 text-xs rounded-lg font-bold">
        ⭐ {movie.vote_average}
      </span>

      {/* Watchlist Heart */}
      <button
        className="absolute top-3 right-3 text-white text-2xl"
        onClick={toggleWatchList}
      >
        {inWatchList ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart />
        )}
      </button>

    </div>
  );
};

export default MovieCard;
