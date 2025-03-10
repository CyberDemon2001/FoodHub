const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const orderRoutes = require("./routes/orderRoutes"); // 🔥 Fix Import
const menuRoutes = require("./routes/menuRoutes");



const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api", menuRoutes);
app.use("/api/admin", adminRoutes,menuRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", loginRoutes);
// app.use("/api/orders", orderRoutes); // 🔥 FIXED ROUTE
app.use("/api", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app if needed
