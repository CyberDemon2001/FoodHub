const Restaurant = require("../models/Restaurant");
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ adminId: req.params.id });


    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Failed to fetch restaurant" });
  }
};
const getAllRestaurants = async(req,res)=>{
  try{
    const restaurant = await Restaurant.find();
    res.json(restaurant);
  }
  catch(error){
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRestaurant,getAllRestaurants,getRestaurantById };
