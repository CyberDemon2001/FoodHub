const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  email: { type: String, required: true },
  restaurantName: { type: String, required: true },
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
});

// Export the model
module.exports = mongoose.model("Restaurant", RestaurantSchema);