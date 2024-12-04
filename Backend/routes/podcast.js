const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Category = require("../models/category");
const User = require("../models/user");
const Podcast = require("../models/podcast");
const router = require("express").Router();

//add-podcast
router.post(
  "/add-podcast",
  authMiddleware, // Ensure this is a valid middleware function
  upload.single("audioFile"), // Ensure this is correctly imported
  async (req, res) => {
      try {
          const { title, description } = req.body;

          if (!title || !description || !req.file) {
              return res.status(400).json({ message: "All fields are required" });
          }

          const newPodcast = new Podcast({
              title,
              description,
              audioFile: req.file.path,
              user: req.user._id, // Assuming `authMiddleware` attaches `user`
          });

          await newPodcast.save();
          res.status(201).json({ message: "Podcast added successfully", podcast: newPodcast });
      } catch (error) {
          console.error("Failed to add podcast:", error);
          res.status(500).json({ message: "Failed to add podcast" });
      }
  }
);


//get all podcast
router.get("/get-podcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get-user-podcasts
router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userid = user._id;
    const data = await User.findById(userid)
      .populate({
        path: "podcasts",
        populate: { path: "category" },
      })
      .select("-password");
    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get podcast by id
router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcasts = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get podcast by categories
router.get("/category/:cat", async (req, res) => {
  try {
    const { cat } = req.params;
    const categories = await Category.find({ categoryName: cat }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });
    let podcasts = [];
    categories.forEach((category) => {
      podcasts = [...podcasts, ...category.podcasts];
    });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//delete podcast 
router.delete("/delete-podcast/:id", async (req, res) => {
  try {
    const podcastId = req.params.id;
    await Podcast.findByIdAndDelete(podcastId);
    res.status(200).json({ message: "Podcast deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete podcast" });
  }
});

// Backend route to update a podcast
router.put("/update-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    // Find the category document by category name
    const categoryDocument = await Category.findOne({ categoryName: category });
    if (!categoryDocument) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the podcast with the new category ID
    const updatedPodcast = await Podcast.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category: categoryDocument._id, // Use the category's ID here
      },
      { new: true }
    ).populate("category"); // Populate the category if needed

    if (!updatedPodcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    res.status(200).json({
      message: "Podcast updated successfully",
      data: updatedPodcast,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update podcast", error });
  }
});


module.exports = router;