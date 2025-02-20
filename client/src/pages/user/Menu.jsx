import React from "react";

const Menu = () => {
  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Restaurant 1</h2>
          <p className="text-gray-600">Section</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Restaurant 2</h2>
          <p className="text-gray-600">Section</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;