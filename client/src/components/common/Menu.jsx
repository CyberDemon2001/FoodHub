import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import image from "../../assets/image.jpeg";
const baseURL = import.meta.env.VITE_API_BASE_URL;

import Loader from "../../Loader.jsx";

function Menu() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/home`);
        if (Array.isArray(response.data)) {
          setRestaurants(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Invalid Restaurants Data Received");
        }
      } catch (error) {
        console.error(
          "Error fetching restaurants:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message || "Failed to fetch restaurant details"
        );
        toast.error("Failed to fetch restaurant details");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleViewMenu = (selectedRestaurant) => {
    const path = id
      ? `/user/${id}/${selectedRestaurant.restaurantName}`
      : `/home/${selectedRestaurant.restaurantName}`;
    navigate(path, { state: { restaurant: selectedRestaurant } });
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-10 relative">
      {/* Loading Overlay */}
      {loading && (
        <Loader />
      )}

      {/* Blurred Background when Loading */}
      <div className={`${loading ? "blur-sm" : ""}`}>
        <div className="bg-orange-500 uppercase text-white text-center py-3 text-xl font-semibold">
          Restaurants
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 mt-6 max-w-6xl mx-auto">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id || restaurant.id}
              className="bg-white flex flex-col w-full h-70 sm:h-60 shadow-md  cursor-pointer"
              onClick={() => handleViewMenu(restaurant)}
            >
              <img
                src={restaurant.imageUrl || image}
                alt={restaurant.restaurantName}
                className="w-full h-[85%] object-fill"
                onError={(e) => {
                  e.target.src = image;
                }}
              />
              <div className="bg-orange-500 h-[15%] text-white text-center text-lg p-2 uppercase font-semibold">
                {restaurant.restaurantName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
