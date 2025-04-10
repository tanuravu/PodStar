const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
require("./connection/conn");

// API Routes
const userApi = require("./routes/user");
const catApi = require("./routes/category");
const PodcastApi = require("./routes/podcast");
const AdminApi = require("./routes/admin");

// Setup CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//const __dirname = path.resolve(); // ✅ Corrected

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/v1", userApi);
app.use("/api/v1", catApi);
app.use("/api/v1", PodcastApi);
app.use("/api/v1", AdminApi);

// Serve frontend build
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
