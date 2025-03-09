const express = require("express");
const { getRestaurant, getAllRestaurants } = require("../controllers/RestaurantController");

const router = express.Router();

router.get("/home", getAllRestaurants);

// GET restaurant details by ID
router.get("/restaurant/:id", getRestaurant);

module.exports = router;