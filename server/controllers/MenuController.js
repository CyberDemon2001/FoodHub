const RestaurantSchema = require("../models/Restaurant");

const addMenuSection = async (req, res) => {
  try {
    const { section, items } = req.body;

    if (!section || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const restaurant = await RestaurantSchema.findOneAndUpdate(
      { adminId: req.params.id },
      { $push: { menu: { section, items } } },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json({ message: "Menu section added successfully!", restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addMenuSection };
