// route/album.js
const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Album = require("../models/album");
const router = express.Router();

// Add Album
router.post("/add-album", authMiddleware, upload.single("coverImage"),
    async (req, res) => {
        try {
            console.log("Request body:", req.body); 
            console.log("Uploaded file:", req.file); 

            const { title, description } = req.body;

            if (!title || !description || !req.file) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Check if title is already used
            const existingAlbum = await Album.findOne({title: title });
            console.log("exising album",existingAlbum);
            if (existingAlbum) {
                return res.status(400).json({ message: "Album title already exists" });
            }
            else {
           
            const objAlbum= new Album({
                title:title,
                description:description,
                coverImage: req.file.path,
                user: req.user._id,
            });
    const result =await objAlbum.save();
        if(result)
            console.log(result);
        else
        { console.log("data saved"); 
            res.status(201).json({ message: "Album added successfully",album:objAlbum }) ;
        }
    }// end of else         
        } catch (error) {
            if(error)
            throw error;
            console.error("Failed to add album:", error);
            res.status(500).json({ message: "Failed to add album" });
        }
    }
);

// Get all albums
router.get("/get-albums", async (req, res) => {
    try {
        const albums = await Album.find().populate("user").sort({ createdAt: -1 });
        return res.status(200).json({ data: albums });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get album by ID
router.get("/get-album/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findById(id).populate("podcasts");
        return res.status(200).json({ data: album });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete album
router.delete("/delete-album/:id", async (req, res) => {
    try {
        const albumId = req.params.id;
        await Album.findByIdAndDelete(albumId);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete album" });
    }
});

// Update album
router.put("/update-album/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedAlbum = await Album.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        if (!updatedAlbum) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json({
            message: "Album updated successfully",
            data: updatedAlbum,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update album", error });
    }
});

module.exports = router;
