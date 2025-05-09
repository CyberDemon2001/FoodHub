import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const deliveryBoyOptions = ["Ravi", "Amit", "Suresh"];

// [No change to import statements, baseURL, and deliveryBoyOptions]

const Orders = ({ adminId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!adminId) {
        toast.error("Admin ID is missing!");
        return;
      }
      try {
        const response = await axios.get(`${baseURL}/admin/${adminId}/orders`);
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch orders!");
        setOrders([]);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [adminId]);

  const handleDeliveryBoyChange = (orderId, deliveryBoy) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, deliveryBoy } : order
      )
    );
  };

  const updateOrderStatus = async (orderId, restaurantId, newStatus, deliveryBoy) => {
    if (newStatus === "Out for Delivery" && !deliveryBoy) {
      toast.error("Please select a delivery boy before proceeding.");
      return;
    }

    let deliveryTime = null;
    if (newStatus === "Accepted") {
      deliveryTime = 20;
    } else if (newStatus === "Out for Delivery") {
      deliveryTime = 10;
    }

    try {
      const response = await axios.put(`${baseURL}/admin/orders/${orderId}/status`, {
        status: newStatus,
        restaurantId,
        deliveryBoy,
        deliveryTime,
      });

      if (response.status === 200) {
        toast.success(`Order status updated to ${newStatus}`);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: newStatus, deliveryBoy, deliveryTime }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status!"
      );
    }
  };

  const groupedOrders = orders.reduce((acc, order) => {
    const date = moment(order.createdAt).format("YYYY-MM-DD");
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  const todayDate = moment().format("YYYY-MM-DD");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-300 text-gray-800";
      case "Accepted":
        return "bg-blue-200 text-blue-800";
      case "Out for Delivery":
        return "bg-yellow-200 text-yellow-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <>
      <div className="px-2 sm:px-4 md:px-8 bg-gradient-to-r from-orange-50 via-white to-yellow-50 min-h-screen">
        <h2 className="text-3xl font-extrabold text-center text-white bg-gradient-to-r from-orange-500 to-yellow-500 py-4 rounded-md shadow-lg my-6">
          🍽️ Manage Orders
        </h2>

        {Object.keys(groupedOrders).length === 0 ? (
          <p className="text-center text-lg font-medium">No orders found.</p>
        ) : (
          Object.keys(groupedOrders).map((date, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-orange-600 underline">
                {date === todayDate
                  ? "📌 Today's Orders"
                  : moment(date).format("DD MMMM YYYY")}
              </h3>

              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto rounded shadow-lg">
                <table className="min-w-full border-collapse text-sm border border-gray-300 bg-white">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="border p-2">Time</th>
                      <th className="border p-2">User</th>
                      <th className="border p-2">Items</th>
                      <th className="border p-2">Total</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Delivery Boy</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedOrders[date].map((order, idx) => (
                      <tr key={idx} className="text-center hover:bg-orange-50">
                        <td className="border p-2">{moment(order.createdAt).format("hh:mm A")}</td>
                        <td className="border p-2">{order.userId?.name || "N/A"}</td>
                        <td className="border p-2 text-left">
                          {order.items.map((item, i) => (
                            <div key={i}>
                              • {item.name} × {item.quantity}
                            </div>
                          ))}
                        </td>
                        <td className="border p-2 font-semibold text-green-700">
                          ₹
                          {order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                        </td>
                        <td className={`border p-2 font-semibold rounded ${getStatusColor(order.status)} `}>
                          {order.status}
                        </td>
                        <td className="border p-2">
                          {order.status === "Accepted" ? (
                            <select
                              value={order.deliveryBoy || ""}
                              onChange={(e) =>
                                handleDeliveryBoyChange(order._id, e.target.value)
                              }
                              className="border px-2 py-1 rounded"
                            >
                              <option value="">Select</option>
                              {deliveryBoyOptions.map((boy) => (
                                <option key={boy} value={boy}>
                                  {boy}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-sm font-medium">
                              {order.deliveryBoy || "N/A"}
                            </span>
                          )}
                        </td>
                        <td className="border p-2 space-x-2">
                          {order.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateOrderStatus(order._id, order.restaurantId._id, "Accepted")
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  updateOrderStatus(order._id, order.restaurantId._id, "Rejected")
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {order.status === "Accepted" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(
                                  order._id,
                                  order.restaurantId._id,
                                  "Out for Delivery",
                                  order.deliveryBoy
                                )
                              }
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                            >
                              Out for Delivery
                            </button>
                          )}
                          {(order.status === "Accepted" || order.status === "Out for Delivery") && (
                            <button
                              onClick={() =>
                                updateOrderStatus(
                                  order._id,
                                  order.restaurantId._id,
                                  "Delivered",
                                  order.deliveryBoy
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
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

              {/* Mobile View */}
              <div className="sm:hidden space-y-4">
                {groupedOrders[date].map((order, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-md p-4 border border-orange-200"
                  >
                    <p><strong>🕒 Time:</strong> {moment(order.createdAt).format("hh:mm A")}</p>
                    <p><strong>👤 User:</strong> {order.userId?.name || "N/A"}</p>
                    <p><strong>🍱 Items:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                      {order.items.map((item, i) => (
                        <li key={i}>{item.name} × {item.quantity}</li>
                      ))}
                    </ul>
                    <p className="mt-1"><strong>💰 Total:</strong> ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
                    <p className={`mt-1 font-semibold py-1 px-2 inline-block rounded ${getStatusColor(order.status)}`}>
                      {order.status}
                    </p>
                    <div className="mt-2">
                      <p><strong>🚚 Delivery Boy:</strong></p>
                      {order.status === "Accepted" ? (
                        <select
                          value={order.deliveryBoy || ""}
                          onChange={(e) =>
                            handleDeliveryBoyChange(order._id, e.target.value)
                          }
                          className="w-full border px-2 py-1 rounded"
                        >
                          <option value="">Select</option>
                          {deliveryBoyOptions.map((boy) => (
                            <option key={boy} value={boy}>
                              {boy}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="font-medium">{order.deliveryBoy || "N/A"}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {order.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, order.restaurantId._id, "Accepted")
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, order.restaurantId._id, "Rejected")
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {order.status === "Accepted" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, order.restaurantId._id, "Out for Delivery", order.deliveryBoy)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                        >
                          Out for Delivery
                        </button>
                      )}
                      {(order.status === "Accepted" || order.status === "Out for Delivery") && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, order.restaurantId._id, "Delivered", order.deliveryBoy)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                        >
                          Delivered
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Orders;

