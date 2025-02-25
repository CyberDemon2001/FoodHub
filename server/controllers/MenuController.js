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

const updateMenuItem = async (req, res) => {
  try {
      const { adminId, sectionId, itemId } = req.params;
      const { name, price } = req.body;

      const restaurant = await RestaurantSchema.findOneAndUpdate(
          { adminId, "menu._id": sectionId, "menu.items._id": itemId },
          { $set: { "menu.$[].items.$[item].name": name, "menu.$[].items.$[item].price": price } },
          { arrayFilters: [{ "item._id": itemId }], new: true }
      );

      if (!restaurant) return res.status(404).json({ message: "Restaurant or item not found" });

      res.json(restaurant);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteMenuItem =  async (req, res) => {
  try {
      const { adminId, sectionId, itemId } = req.params;

      const restaurant = await RestaurantSchema.findOneAndUpdate(
          { adminId, "menu._id": sectionId },
          { $pull: { "menu.$.items": { _id: itemId } } },
          { new: true }
      );

      if (!restaurant) return res.status(404).json({ message: "Restaurant or item not found" });

      res.json(restaurant);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


module.exports = { addMenuSection ,updateMenuItem,deleteMenuItem};
