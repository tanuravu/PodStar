import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const PodcastCard = ({ items, handleRemove, isFavorite }) => {
  const handleFavorite = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/add-to-favorites/${items._id}`,
        {},
        { withCredentials: true }
      );
      alert("Added to favorites");
    } catch (error) {
      alert("Failed to add to favorites");
    }
  };

  return (
    <div className="border p-4 bg-zinc-800 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col items-center">
        <img
          src={`http://localhost:8080/${items.frontImage}`}
          alt={items.title}
          className="rounded w-full h-40 object-cover"
        />
        <h3 className="text-xl font-bold mt-2">{items.title.slice(0, 20)}</h3>
        <p className="mt-2 text-slate-500 text-sm">
          {items.description.slice(0, 50)}...
        </p>
        <div className="mt-2 bg-white text-black border border-black rounded-full px-4 py-2 text-center">
          {items.category.categoryName}
        </div>
      </div>

      {/* Play Now Button */}
      <div className="mt-2">
        <a
          href={items.audioFile}
          className="bg-zinc-700 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300"
        >
          Play Now
        </a>
      </div>

      {/* Add to Favorites Button */}
      {!isFavorite && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full hover:bg-blue-600 transition-all duration-300"
          onClick={handleFavorite}
        >
          Add to Favorites
        </button>
      )}

      {/* Remove from Favorites Button */}
      {isFavorite && (
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full w-full hover:bg-red-600 transition-all duration-300"
          onClick={handleRemove}
        >
          Remove from Favorites
        </button>
      )}
    </div>
  );
};

PodcastCard.propTypes = {
  items: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    frontImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.shape({
      categoryName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleRemove: PropTypes.func,
  isFavorite: PropTypes.bool.isRequired,
};

export default PodcastCard;
