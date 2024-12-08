// route/album.js
const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const album = require("../models/album");
const router = express.Router();

// Add Album
router.post("/add-album", authMiddleware, upload.single("coverImage"), async (req, res) => {
    try {
        console.log("Request body:", req.body); 
        console.log("Uploaded file:", req.file); 
        
        const { title, description } = req.body;

        // Validate required fields
        if (!title || !description || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if title is already used
        const existingAlbum = await album.findOne({ title: title });
        if (existingAlbum) {
            return res.status(400).json({ message: `Album with the title "${title}" already exists` });
        }

        // Create new album
        const newAlbum = new album({
            title: title,
            description: description,
            coverImage: "/uploads/"+req.file.filename,
            user: req.user._id

        });
            console.log(newAlbum);
        // Save the album to the database
      await   newAlbum.save().then((result)=>{
        console.log(result);
        res.status(201).json({
            message: "Album added successfully",
            album: result,
        });
    });
    } catch (error) {
        console.error("Failed to add album:", error);
        res.status(500).json({ message: "Failed to add album" });
    }
});

// Get all albums
router.get("/get-albums", async (req, res) => {
    try {
        const albums = await album.find().populate("user").sort({ createdAt: -1 });
        return res.status(200).json({ data: albums });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get album by ID
router.get("/get-album/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const album = await album.findById(id).populate("podcasts");
        return res.status(200).json({ data: album });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete album
router.delete("/delete-album/:id", async (req, res) => {
    try {
        const albumId = req.params.id;
        await album.findByIdAndDelete(albumId);
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

        const updatedAlbum = await album.findByIdAndUpdate(
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