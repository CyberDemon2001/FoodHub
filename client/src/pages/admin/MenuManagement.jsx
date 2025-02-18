import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuManagement = ({ email }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [section, setSection] = useState("");
  const [items, setItems] = useState([{ name: "", price: "" }]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`/api/restaurant/${email}`);
        setRestaurant(response.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchRestaurant();
  }, [email]);

  const handleAddMenu = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/restaurant/${email}/menu`, { section, items });
      alert("Menu section added successfully!");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="h-screen p-6 overflow-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold">Welcome, {restaurant?.adminName}</h1>
      <h2 className="text-lg">{restaurant?.restaurantName}</h2>
      <form onSubmit={handleAddMenu} className="mt-4">
        <input
          type="text"
          placeholder="Section Name"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].name = e.target.value;
                setItems(newItems);
              }}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Price"
              value={item.price}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].price = e.target.value;
                setItems(newItems);
              }}
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setItems([...items, { name: "", price: "" }])}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Item
        </button>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Section
        </button>
      </form>
    </div>
  );
};

export default MenuManagement;
