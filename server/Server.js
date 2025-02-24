const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require('cors');
const adminRoutes = require("./routes/adminRoutes"); // CommonJS `require`
const userRoutes = require("./routes/userRoutes"); // CommonJS `require`
const loginRoutes = require("./routes/loginRoutes"); // CommonJS `require`
const Restaurant = require("./models/Restaurant");
// const getAllRestaurants =require("./controllers/RestaurantController");

dotenv.config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// app.use("/", adminRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes) // Register the admin routes
app.use('/api', loginRoutes);
app.get("/", adminRoutes);
app.use("/restaurant",userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Use module.exports to export the app in CommonJS
module.exports = app;
