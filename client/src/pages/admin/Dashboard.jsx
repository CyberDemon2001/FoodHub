import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = ({ email }) => {
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
    <div>
      <h1>Welcome, {restaurant?.adminName}</h1>
      <h2>{restaurant?.restaurantName}</h2>
      <form onSubmit={handleAddMenu}>
        <input
          type="text"
          placeholder="Section Name"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].name = e.target.value;
                setItems(newItems);
              }}
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
            />
          </div>
        ))}
        <button type="button" onClick={() => setItems([...items, { name: "", price: "" }])}>
          Add Item
        </button>
        <button type="submit">Add Section</button>
      </form>
    </div>
  );
};

export default AdminDashboard;