const Restaurant = require("../models/Restaurant");

const RestaurantController = async (req, res) => {
  try {
    const { email } = req.params;
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { RestaurantController };
