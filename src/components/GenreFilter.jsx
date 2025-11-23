import React from "react";

const GenreFilter = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 px-2">
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold
            ${selectedGenre === g.id ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}
          `}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
