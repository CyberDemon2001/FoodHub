import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import image from "../../assets/image.jpeg";

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
        const response = await axios.get("http://localhost:5000/api/home");
        // console.log("API Response", response.data);
        if (Array.isArray(response.data)) {
          setRestaurants(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Invalid Restaurants Data Received");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to fetch restaurant details");
        toast.error("Failed to fetch restaurant details");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleViewMenu = (selectedRestaurant) => {
    if (!id) {
      navigate(`/home/${selectedRestaurant.restaurantName}`, { state: { restaurant: selectedRestaurant } });
    } else {
      navigate(`/user/${id}/${selectedRestaurant.restaurantName}`, { state: { restaurant: selectedRestaurant } });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <div className="bg-orange-500 text-white text-center py-2 text-lg font-semibold">MENU</div>
      <div className="grid grid-cols-4 gap-x-20 gap-y-15 mt-10 max-w-6xl mx-auto">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id || restaurant.id} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={() => handleViewMenu(restaurant)}>
            <img src={restaurant.image || image} alt={restaurant.restaurantName} className="w-full h-40 object-cover" />
            <div className="bg-orange-500 text-white text-center py-2 font-semibold">{restaurant.restaurantName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
