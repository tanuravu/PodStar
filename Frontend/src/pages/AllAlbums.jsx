import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "../components/AlbumCard/AlbumCard";

const AllAlbums = () => {
  const [Albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch albums data on component mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/get-albums");
        console.log("Fetched albums:", res.data.data);
        setAlbums(res.data.data);
      } catch (error) {
        console.error(
          "Failed to fetch albums:",
          error.response?.data || error.message
        );
      }
    };

    fetchAlbums();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter albums based on search query
  const filteredAlbums = Albums.filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-zinc-900 min-h-screen text-zinc-50">
      <div className="w-full px-4 lg:px-12 py-6">
        <h1 className="text-3xl font-bold mb-6">All Albums</h1>

        {/* Search Bar */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or category"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-zinc-700 text-white px-4 py-2 rounded w-80 focus:outline-none"
          />
        </div>

        {/* Display Albums */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAlbums && filteredAlbums.length > 0 ? (
            filteredAlbums.map((album, i) => (
              <div
                key={i}
                className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden p-4"
              >
                <AlbumCard album={album} />{" "}
              </div>
            ))
          ) : (
            <div className="text-3xl font-bold text-zinc-400 h-screen flex items-center justify-center">
              No Albums Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAlbums;
