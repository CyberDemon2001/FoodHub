const express = require("express");
const { Signup } = require("../controllers/AdminController");
const { getRestaurant } = require("../controllers/RestaurantController");
const { addMenuSection } = require("../controllers/MenuController");

const router = express.Router();

// POST route for admin sign up
router.post("/signup", Signup);

// ✅ Corrected: Get Restaurant Details by Name
router.get("/restaurant/:id", getRestaurant);

// ✅ Corrected: Add Menu Section by Restaurant Name
router.post("/restaurant/:id/menu", addMenuSection);

module.exports = router;
