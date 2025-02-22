import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function RestaurantMenu() {
  const { id } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
        console.log(id);
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/restaurant/${id}`);
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
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
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