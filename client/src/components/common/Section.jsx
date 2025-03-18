import React from "react";
import { useLocation } from "react-router-dom";

function Section() {
  const location = useLocation();
  const { section, restaurants } = location.state;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{section} Items</h1>
      <div className="space-y-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantName}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">
              {restaurant.restaurantName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurant.menu
                .filter((menuSection) => menuSection.section === section)
                .flatMap((menuSection) => menuSection.items) 
                .map((item) => (
                  <div key={item.name} className="border p-4 rounded-lg">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-green-600 font-bold">${item.price}</p>
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