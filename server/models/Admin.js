const { Schema, model } = require("mongoose"); // CommonJS `require`

const adminSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  restaurantName: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  mobile: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model using CommonJS
module.exports = model("Admin", adminSchema);
