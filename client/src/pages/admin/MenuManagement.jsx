import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuManagement = ({ adminId }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [section, setSection] = useState("");
  const [items, setItems] = useState([{ name: "", price: "" }]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    console.log("AdminId:", adminId); // Debugging check
    if (adminId) {
      fetchRestaurant();
    }
  }, [adminId]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/admin/restaurant/${adminId}`);
      setRestaurant(response.data);
      console.log("Menu Data:", response.data.menu); // Debugging menu data
    } catch (error) {
      console.error("Error fetching restaurant:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to fetch restaurant details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Validate Inputs
    if (!adminId) {
      setError("Admin ID is missing! Please refresh the page.");
      return;
    }
    if (!section.trim()) {
      setError("Section name cannot be empty!");
      return;
    }
    if (items.some(item => !item.name.trim() || !item.price || item.price <= 0)) {
      setError("Please fill out all item fields correctly!");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/admin/restaurant/${adminId}/menu`, {
        section,
        items: items.map(item => ({ name: item.name, price: Number(item.price) })),
      });

      alert("Menu section added successfully!");
      fetchRestaurant(); // Refresh menu
      setSection("");
      setItems([{ name: "", price: "" }]);
    } catch (error) {
      console.error("Error adding menu:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to add menu section");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen p-6 overflow-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold">Welcome, {restaurant?.adminName}</h1>
      <h2 className="text-lg">{restaurant?.restaurantName}</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* ✅ Display Existing Menu */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Menu</h3>
        {restaurant?.menu && restaurant.menu.length > 0 ? (
          restaurant.menu.map((menuSection, index) => (
            <div key={index} className="mb-4 p-4 border rounded shadow">
              <h4 className="font-semibold text-lg">{menuSection.section}</h4>
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
          <p>No menu sections added yet.</p>
        )}
      </div>

      {/* ✅ Form to Add New Menu Section */}
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
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].price = Math.max(0, Number(e.target.value)); // Prevent negative prices
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
        <button type="submit" className="bg-green-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Section"}
        </button>
      </form>
    </div>
  );
};

export default MenuManagement;
