import React, { useState } from "react";

const SearchPlayer = () => {
  const [search, setSearch] = useState("");
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");

  const filterPlayers = (players, query) => {
    return players.find(
      (player) => player.codeconvocation.toLowerCase() === query.toLowerCase()
    );
  };

  const handleSearch = async () => {
    try {
      setError(""); // Reset any previous error
      const response = await fetch(
        `http://localhost:5000/api/inscritinfoevent`
      );
      const data = await response.json();

      const filteredPlayer = filterPlayers(data, search);

      if (filteredPlayer) {
        setPlayer(filteredPlayer);
      } else {
        setPlayer(null);
        setError("Code incorrect");
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
      setError("An error occurred while fetching player data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter Code Convocation"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="w-full p-2 mt-2 text-white bg-blue-500 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {error && (
        <div className="w-full max-w-md p-4 mt-4 text-red-500 bg-white rounded-lg shadow-md">
          {error}
        </div>
      )}

      {player && (
        <div className="w-full max-w-md p-4 mt-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold">
            {player.user.nom} {player.user.prenom}
          </h2>
          <p className="text-gray-700">
            Code Convocation: {player.codeconvocation}
          </p>
          <div className="flex mt-4 space-x-2">
            <button className="w-full p-2 text-white bg-green-500 rounded-lg">
              Activate Premium
            </button>
            <button className="w-full p-2 text-white bg-yellow-500 rounded-lg">
              Send Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPlayer;
