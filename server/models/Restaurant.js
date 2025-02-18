const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // References Admin collection
    required: true,
    unique: true, // Ensures one admin per restaurant
  },
  adminName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique to prevent duplicate admin entries
  restaurantName: { type: String, required: true, unique: true }, // Ensures unique restaurant names
  menu: [
    {
      section: { type: String, required: true },
      items: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically adds timestamp
  },
});

// Export the model
module.exports = mongoose.model("Restaurant", RestaurantSchema);
