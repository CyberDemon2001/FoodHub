const express = require("express");
const { Signup } = require("../controllers/AdminController");
const { addMenuSection, updateMenuItem, deleteMenuItem, deleteSection, updateSection } = require("../controllers/MenuController");
const { ExistingSection } = require("../controllers/ExistingSectionController");

const Restaurant = require("../models/Restaurant"); // Import restaurant model
const { upload } = require("../middleware/cloudinary");

const router = express.Router();

// 🛠️ Admin Signup Route
router.post("/signup", Signup);

// 🛠️ Add a new menu section
router.post("/restaurant/:id/menu", addMenuSection);

// 🛠️ Update an existing menu section
router.put("/restaurant/:id/menu/:sectionId", ExistingSection);

// 🛠️ Update a specific menu item within a section
router.put("/restaurant/:adminId/menu/:sectionId/item/:itemId", updateMenuItem);


// 🛠️ Delete a specific menu item from a section
router.delete("/restaurant/:adminId/menu/:sectionId/item/:itemId", deleteMenuItem);

// 🔄 Upload & Update Restaurant Image on Cloudinary
router.post("/:id/settings", upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("Uploaded Image Public ID:", req.params.id);
    console.log("Cloudinary Response URL:", req.file.path);

    res.json({ message: "Image uploaded successfully", imageUrl: req.file.path });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//update Section
router.put("/restaurant/:adminId/menu/:sectionId", updateSection);

// Delete section
router.delete("/restaurant/:adminId/menu/:sectionId", deleteSection);

module.exports = router;
