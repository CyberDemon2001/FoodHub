import React from "react";
import { useLocation } from "react-router-dom";

function Section() {
  const location = useLocation();
  const { section, restaurants } = location.state;

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 capitalize">
        {section} Items
      </h1>
      <div className="space-y-8 max-w-6xl mx-auto">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantName}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              {restaurant.restaurantName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {restaurant.menu
                .filter((menuSection) => menuSection.section === section)
                .flatMap((menuSection) => menuSection.items)
                .map((item) => (
                  <div
                    key={item.name}
                    className="bg-white border px-2 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-green-600 font-bold text-xl mt-2">Rs.{item.price}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section;
