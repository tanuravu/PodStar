const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure that the 'uploads' folder exists and is writable
        cb(null, "uploads/"); // Path to save uploaded files
    },
    filename: (req, file, cb) => {
        // Generate a unique filename by appending the current timestamp
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        // Accept image files only
        cb(null, true);
    } else {
        // Reject non-image files with an error
        cb(new Error("Only image files are allowed"), false);
    }
};

// Initialize multer with custom storage and file validation
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Export the upload middleware
module.exports = upload;
