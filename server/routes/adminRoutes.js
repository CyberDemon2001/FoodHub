const express = require("express");
const { Signup } = require("../controllers/AdminController"); // Use require in CommonJS

const router = express.Router();

// POST route for admin sign up
router.post("/signup", Signup);

// Export the router using CommonJS
module.exports = router;
