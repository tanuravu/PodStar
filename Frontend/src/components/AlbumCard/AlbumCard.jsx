// components/AlbumCard/AlbumCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ album }) => {
    return (
        <div className="border p-4 bg-zinc-800 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300">
            <Link to={`/album/${album._id}`} className="flex flex-col items-center">
                <img
                    src={`http://localhost:8080/${album.coverImage}`}
                    alt={album.title}
                    className="rounded w-full h-40 object-cover"
                />
                <h3 className="text-xl font-bold mt-2">{album.title}</h3>
            </Link>
            <p className="mt-2 text-slate-500 text-sm">
                {album.description.slice(0, 50)}...
            </p>
        </div>
    );
};

export default AlbumCard;