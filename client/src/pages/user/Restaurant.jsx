import React, { useState, useEffect } from "react";
import image from "../../assets/menusec.jpg";
import { useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Restaurant = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const [cart, setCart] = useState([]);
  const {id} = useParams();

  // Assume user is logged in and we get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Unique User ID
  const userId = user?.id;

  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${id}`)) || [];
      setCart(storedCart);
    }
  }, [userId]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(`cart_${id}`, JSON.stringify(updatedCart)); // Store cart for specific user
  };

  const handleAddToCart = (item, section) => {
    if (!userId) {
      toast.error("Please log in to add items to the cart!");
      return;
    }

    const updatedCart = [...cart];
    const restaurantIndex = updatedCart.findIndex(
      (r) => r.restaurantId === restaurant._id
    );

    if (restaurantIndex !== -1) {
      const existingItemIndex = updatedCart[restaurantIndex].items.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        updatedCart[restaurantIndex].items[existingItemIndex].quantity += 1;
        toast.info(`Quantity increased: ${item.name}`, { autoClose: 1500 });
      } else {
        updatedCart[restaurantIndex].items.push({
          ...item,
          section: section.section,
          quantity: 1,
        });
        toast.success(`Added to cart: ${item.name}`, { autoClose: 1500 });
      }
    } else {
      updatedCart.push({
        userId: userId,
        restaurantId: restaurant._id,
        items: [{ ...item, section: section.section, quantity: 1 }],
      });
      toast.success(`Added to cart: ${item.name}`, { autoClose: 1500 });
    }

    updateCart(updatedCart);
  };

  return (
    <div className="min-h-[90vh] px-20 text-black p-4">
      <ToastContainer position="top-right" />

      <div className="flex justify-between items-center shadow-gray-900 shadow-2xl rounded-2xl bg-orange-500 p-4">
        <h1 className="text-xl font-bold border-b-2">{restaurant.restaurantName}</h1>
      </div>

      <div className="flex overflow-x-auto justify-evenly my-4">
        {restaurant.menu.map((section) => (
          <div key={section._id} className="text-center mx-2">
            <img src={image} alt="Food" className="h-24 w-24 rounded-full" />
            <p className="text-sm font-bold mt-1">{section.section}</p>
          </div>
        ))}
      </div>

      <div className="bg-orange-500 p-4 shadow-gray-900 shadow-2xl rounded-2xl">
        {restaurant.menu.flatMap((section) => (
          <div key={section._id} className="mb-4">
            <h2 className="text-xl font-bold border-b-2 border-black pb-1">{section.section}</h2>
            <ul className="mt-2 italic">
              {section.items.map((item) => (
                <li key={`${section._id}-${item._id}`} className="flex justify-between items-center">
                  <span>{item.name} - ₹{item.price}</span>
                  <button
                    onClick={() => handleAddToCart(item, section)}
                    className="ml-4 bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition"
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
