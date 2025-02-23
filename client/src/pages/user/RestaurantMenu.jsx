import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function RestaurantMenu() {
  const { name } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      try {

        setLoading(true);
        const response = await axios.get(`http://localhost:5000/restaurant/${name}`);
        
        if (!response.data) {
          throw new Error("Restaurant not found");
        }

        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant menu:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to fetch restaurant menu");
        toast.error("Failed to fetch restaurant menu");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantMenu();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-600">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">{restaurant.restaurantName} - Full Menu</h1>
      {restaurant.menu.map((menuSection, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{menuSection.section}</h2>
          <ul>
            {menuSection.items.map((item, i) => (
              <li key={i} className="flex justify-between py-2 border-b">
                <span>{item.name}</span>
                <span className="font-bold">${item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RestaurantMenu;