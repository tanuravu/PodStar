import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { playerActions } from "../../store/player";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const PodcastCard = ({ items, handleRemove, isFavorite }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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

  const handlePlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(
        playerActions.changeImage(`http://localhost:8080/${items.frontImage}`)
      );
      dispatch(
        playerActions.changeSong(`http://localhost:8080/${items.audioFile}`)
      );
    }
  };

  return (
    <div className="border p-4 bg-zinc-800 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300">
      <Link
        to={`/description/${items._id}`}
        className="flex flex-col items-center"
      >
        {/* Podcast Image */}
        <img
          src={`http://localhost:8080/${items.frontImage}`}
          alt={items.title}
          className="rounded w-full h-40 object-cover"
        />

        {/* Podcast Title */}
        <h3 className="text-xl font-bold mt-2">{items.title.slice(0, 20)}</h3>

        {/* Podcast Description */}
        <p className="mt-2 text-slate-500 text-sm">
          {items.description.slice(0, 50)}...
        </p>

        {/* Category and Add to Favorites Section */}
        <div>
        <div className="mt-2  bg-white text-black border border-black rounded-full px-4 py-2 flex justify-between items-center">
          {/* Category Name */}
          <span className="text-sm font-medium">
            {items.category.categoryName}
          </span>
        </div>
        {/* Add to Favorites Button */}
        <div>
          {!isFavorite && (
            <button
              className=" px-4 py-2 rounded-full flex items-center justify-center  transition-all duration-300"
              onClick={handleFavorite}
            >
              <FaHeart className="text-red-700 text-xl" />
            </button>
          )}
        </div>
        </div>
      </Link>

      {/* Play Now Button */}
      <div className="mt-2">
        <Link
          to={isLoggedIn ? "#" : "/signup"}
          className="bg-zinc-700 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300"
          onClick={handlePlay}
        >
          Play Now
        </Link>
      </div>

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
    audioFile: PropTypes.string.isRequired,
    category: PropTypes.shape({
      categoryName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleRemove: PropTypes.func,
  isFavorite: PropTypes.bool.isRequired,
};

export default PodcastCard;
