const express = require("express");
const { Signup } = require("../controllers/AdminController");
const {
  getRestaurant,
  getAllRestaurants,
} = require("../controllers/RestaurantController");
const {
  addMenuSection,
  updateMenuItem,
  deleteMenuItem,
  updateSection,
  deleteSection,
} = require("../controllers/MenuController");
const { ExistingSection } = require("../controllers/ExistingSectionController");

const router = express.Router();

// POST route for admin sign up
router.post("/signup", Signup);

router.get("/", getAllRestaurants);

// GET restaurant details by ID
router.get("/restaurant/:id", getRestaurant);

// POST add a new menu section
router.post("/restaurant/:id/menu", addMenuSection);

// PUT add items to an existing section
router.put("/restaurant/:id/menu/:sectionId", ExistingSection);

// Update a specific menu item within a section
router.put("/restaurant/:adminId/menu/:sectionId/item/:itemId", updateMenuItem);

// Delete a specific menu item from a section
router.delete(
  "/restaurant/:adminId/menu/:sectionId/item/:itemId",
  deleteMenuItem
);

//update Section
router.put("/restaurant/:adminId/menu/:sectionId", updateSection);

// Delete section
router.delete("/restaurant/:adminId/menu/:sectionId", deleteSection);

module.exports = router;
