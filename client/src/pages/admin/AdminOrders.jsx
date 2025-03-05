import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const Orders = ({ adminId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!adminId) {
        toast.error("Admin ID is missing!");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/${adminId}/orders`
        );
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
        setOrders(sortedOrders); // ✅ Fix structure
        // toast.success("Orders fetched successfully!");
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch orders!"
        );
        setOrders([]);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [adminId]);

  const updateOrderStatus = async (orderId, restaurantId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        { status: newStatus, restaurantId }
      );
  
      if (response.status === 200) {
        toast.success(`Order status updated to ${newStatus}`);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.response?.data?.message || "Failed to update order status!");
    }
  };



  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Created At</th>
                  <th className="border p-2">User</th>
                  <th className="border p-2">Items</th>
                  <th className="border p-2">Total Price</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">
                      {moment(order.createdAt).format("DD MMMM YYYY, hh:mm A")}
                    </td>
                    <td className="border p-2">
                      {order.userId?.name || "N/A"} {/* ✅ Fix user display */}
                    </td>
                    <td className="border p-2">
                      {order.items.map((item, idx) => (
                        <p key={idx}>
                          {item.name} - {item.quantity}x ₹{item.price}
                        </p>
                      ))}
                    </td>
                    <td className="border p-2">
                      ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </td>
                    <td className="border p-2">{order.status || "Pending"}</td>
                    <td className="border p-2">
                      {order.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order._id, order.restaurantId._id, "Accepted")}
                            className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order._id, order.restaurantId._id, "Rejected")}
                            className="bg-red-500 text-white px-4 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {order.status === "Accepted" && (
                        <button
                          onClick={() => updateOrderStatus(order._id, order.restaurantId._id, "Out for Delivery")}
                          className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                        >
                          Out for Delivery
                        </button>
                      )}
                      {(order.status === "Accepted" || order.status === "Out for Delivery") && (
                        <button
                          onClick={() => updateOrderStatus(order._id, order.restaurantId._id, "Delivered")}
                          className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
                        >
                          Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Orders;
  