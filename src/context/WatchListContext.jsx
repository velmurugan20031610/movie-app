import { createContext, useContext, useState } from "react";

const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (movie) => {
    setWatchList((prev) =>
      prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromWatchList = (id) => {
    setWatchList((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);
