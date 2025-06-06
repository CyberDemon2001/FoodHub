const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        section: String,
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    deliveryBoy:{type: String, default: "Not Assigned"},
    deliveryTime: { type: Number, default: null }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);
