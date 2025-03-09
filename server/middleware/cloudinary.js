const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "FoodHub",
      format: file.mimetype.split("/")[1], // Ensure correct format (jpg, png, etc.)
      public_id: req.params.id, // ✅ Use user ID as the Cloudinary public ID
      overwrite: true, // ✅ Ensures it replaces the previous image
    };
  },
});

const upload = multer({ storage });

module.exports = { upload };
