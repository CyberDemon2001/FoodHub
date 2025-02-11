const adminSchema = require("../models/AdminSchema"); // CommonJS `require`
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const { name, email, password, restaurantName, dob, mobile } = req.body;
    // Check if the user already exists
    const admin = await adminSchema.findOne({ email });
    if (admin) {
      console.log("Admin already exists:", email);
      return res.status(400).json({ message: "Admin already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new user
    const newAdmin = new adminSchema({
      name,
      email,
      password: hashedPassword,
      restaurantName,
      dob,
      mobile,
    });
    // Save the user to the database
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error in admin registration:", error);
    res.status(500).json({ message: "Registration failed! Please try again." });
  }
};

// Export Signup function using module.exports (CommonJS)
module.exports = { Signup };
