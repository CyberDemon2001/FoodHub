import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const UserOrders = () => {
  const [liveOrders, setLiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${id}/orders`);
        setLiveOrders(response.data.liveOrders || []);
        setPastOrders(response.data.pastOrders || []);
        console.log(liveOrders);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Auto-refresh every 10 seconds to get the latest order status
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [id]);

  // Cancel Order
  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`);
      toast.success("Order cancelled successfully!");

      // Refresh orders after cancellation
      setLiveOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="p-6 min-h-[90vh] bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Live Orders */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-orange-500">Live Orders</h2>
            <div className="space-y-4">
              {liveOrders.length > 0 ? (
                liveOrders.map((order, index) => (
                  <div key={index} className="p-4 bg-white shadow rounded-lg flex flex-col gap-2">
                    {/* Restaurant Name */}
                    <div className="text-lg font-semibold text-gray-800">
                      {order.restaurantId?.restaurantName || "Unknown Restaurant"}
                    </div>

                    <div className="flex justify-between">
                      <span className="text-lg font-medium">
                        {order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                      </span>
                      <span className="text-sm text-gray-500">
                        {moment(order.createdAt).format("DD MMM YYYY, hh:mm A")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm font-semibold ${
                          order.status === "Out for Delivery"
                            ? "text-blue-600"
                            : order.status === "Pending"
                            ? "text-yellow-500"
                            : "text-green-600"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-md font-semibold text-gray-800">
                        ₹{order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
                      </span>
                    </div>

                    {order.status === "Pending" && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No live orders</p>
              )}
            </div>
          </div>

          {/* Past Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">Past Orders</h2>
            <div className="space-y-4">
              {pastOrders.length > 0 ? (
                pastOrders.map((order, index) => (
                  <div key={index} className="p-4 bg-white shadow rounded-lg flex flex-col gap-2">
                    {/* Restaurant Name */}
                    <div className="text-lg font-semibold text-gray-800">
                      {order.restaurantId?.name || "Unknown Restaurant"}
                    </div>

                    <div className="flex justify-between">
                      <span className="text-lg font-medium">
                        {order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-700">{order.status}</span>
                      <span className="text-md font-semibold text-gray-800">
                        ₹{order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No past orders</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrders;
