import React from "react";
import image from "../../assets/menusec.jpg";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;

  if (!restaurant) {
    return <p className="text-center text-gray-600">No restaurant data available.</p>;
  }

  return (
    <div className="bg-white min-h-[90vh] text-black p-4">
      {/* Header */}
      <div className="flex justify-between items-center shadow-gray-900 shadow-2xl rounded-2xl bg-orange-500 p-4">
        <h1 className="text-xl font-bold border-b-2">{restaurant.restaurantName}</h1>
      </div>

      {/* Horizontal Scrollable Food Sections */}
      <div className="flex overflow-x-auto justify-evenly my-4">
        {restaurant.menu.map((section) => (
          <div key={section._id} className="text-center mx-2">
            <img src={image} alt="Food" className="h-24 w-24 rounded-2xl" />
            <p className="text-sm font-bold mt-1">{section.section}</p>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="bg-orange-500 p-4 shadow-gray-900 shadow-2xl rounded-2xl">
        {restaurant.menu.flatMap((section) => (
          <div key={section._id} className="mb-4">
            <h2 className="text-xl font-bold border-b-2 border-black pb-1">{section.section}</h2>
            <ul className="mt-2 italic">
              {section.items.map((item) => (
                <li key={`${section._id}-${item._id}`}>
                  {item.name} - ₹{item.price} - {item._id}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
