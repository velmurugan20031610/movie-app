import React from "react";
import { Link } from "react-router-dom";
import { useWatchList } from "../context/WatchListContext";

const Navbar = () => {
  const { watchList } = useWatchList();

  return (
    <nav
      style={{
        padding: "16px 32px",
        background: "rgba(17, 24, 39, 0.7)", // glass
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        color: "#fff",
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}>
        Movie App
      </Link>

      <Link to="/watchlist" style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}>
        Watchlist ({watchList.length})
      </Link>
    </nav>
  );
};

export default Navbar;
