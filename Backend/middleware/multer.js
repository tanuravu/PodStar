const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure that the 'uploads' folder exists and is writable
        cb(null, path.join(__dirname, "../uploads")); // Save files in the uploads directory
    },
    filename: (req, file, cb) => {
        // Generate a unique filename by appending the current timestamp
        cb(null, `${Date.now()}-${file.originalname}`); // Use a timestamp for uniqueness
    },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("audio/")) {
        // Accept image and audio files only
        cb(null, true);
    } else {
        // Reject unsupported file types with an error
        cb(new Error("Only image and audio files are allowed"), false);
    }
};

// Initialize multer with custom storage, file validation, and limits
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// Export the upload middleware
module.exports = upload;
