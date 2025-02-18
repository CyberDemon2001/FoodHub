const express = require("express");
const { Signup } = require("../controllers/AdminController");
const { RestaurantController } = require("../controllers/RestaurantController");
const router = express.Router();
const {MenuController}=require('../controllers/MenuController');

// POST route for admin sign up
router.post("/signup", Signup);

// Get Restaurant Details
router.get("/restaurant/:email", RestaurantController);

// Add Menu Section
router.post("/restaurant/:email/menu", MenuController);

// Export the router using CommonJS
module.exports = router;
