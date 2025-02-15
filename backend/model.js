const mongoose = require('mongoose');

// Define the schema for menu items
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

// Define the schema for menu sections
const menuSectionSchema = new mongoose.Schema({
  section: { type: String, required: true },
  items: [menuItemSchema] // Array of items in this section
});

// Define the schema for the restaurant
const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  menu: [menuSectionSchema] // Array of menu sections
});

// Create the Mongoose model for the restaurant
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
   