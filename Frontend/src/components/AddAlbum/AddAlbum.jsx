// components/AddAlbum/AddAlbum.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddAlbum = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
    });
    const navigate = useNavigate();

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);
        setCoverImage(file);
    };

    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmitAlbum = async (e) => {
        e.preventDefault(); // Prevent form default submission

        // Check for empty fields
        if (!inputs.title || !inputs.description || !coverImage) {
            toast.error("Please fill out all fields.");
            return;
        }

        const data = new FormData();
        data.append("title", inputs.title);
        data.append("description", inputs.description);
        data.append("coverImage", coverImage);

        try {
            console.log("Sending album data:", inputs, coverImage); 
            const res = await axios.post(
                "http://localhost:8080/api/v1/add-album", 
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            toast.success(res.data.message || "Album added successfully!"); 
            console.log("Response:", res.data); 
            navigate("/all-albums");
        } catch (error) {
            console.error("Error adding album:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to add album");
        } finally {
            // Reset inputs after submission
            setInputs({
                title: "",
                description: "",
            });
            setCoverImage(null);
        }
    };

    return (
        <div className="my-4 px-4 lg:px-12">
            <h1 className="text-2xl font-semibold">Create Your Album</h1>
            <form onSubmit={handleSubmitAlbum}>
                <div className="mt-5 flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title for your album"
                            className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
                            value={inputs.title}
                            onChange={onChangeInputs}
                        />
                    </div>

                    <div className="flex flex-col mt-4">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description of your album"
                            className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
                            rows={4}
                            value={inputs.description}
                            onChange={onChangeInputs}
                        />
                    </div>

                    <div className="flex flex-col mt-4">
                        <label htmlFor="coverImage">Cover Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="coverImage"
                            className="mt-4"
                            onChange={handleChangeImage}
                        />
                    </div>

                    <div className="mt-8 flex">
                        <button
                            type="submit"
                            className="bg-zinc-800 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-700 transition-all duration-300"
                        >
                            Create Album
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAlbum;
