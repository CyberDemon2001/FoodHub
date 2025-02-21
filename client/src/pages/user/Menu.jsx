import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

const Menu = () => {
  

 
  

 
  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurant ? (
          restaurant.menu.map((menuSection, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{menuSection.section}</h2>
              <ul className="mt-2">
                {menuSection.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-bold">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No restaurant data available.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;