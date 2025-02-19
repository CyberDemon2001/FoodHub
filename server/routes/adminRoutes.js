const express = require("express");
const { Signup } = require("../controllers/AdminController");
const { getRestaurant } = require("../controllers/RestaurantController");
const { addMenuSection } = require("../controllers/MenuController");
const { ExistingSection } = require("../controllers/ExistingSectionController");

const router = express.Router();

// POST route for admin sign up
router.post("/signup", Signup);

// GET restaurant details by ID
router.get("/restaurant/:id", getRestaurant);

// POST add a new menu section
router.post("/restaurant/:id/menu", addMenuSection);

// PUT add items to an existing section
router.put("/restaurant/:id/menu/:sectionId", ExistingSection);

module.exports = router;