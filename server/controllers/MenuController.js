const Restaurant=require('../models/Restaurant');


const MenuController=async (req, res) => {
    try {
      const { email } = req.params;
      const { section, items } = req.body;
  
      const restaurant = await Restaurant.findOne({ email });
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
  
      restaurant.menu.push({ section, items });
      await restaurant.save();
  
      res.status(201).json({ message: "Menu section added successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports={MenuController};