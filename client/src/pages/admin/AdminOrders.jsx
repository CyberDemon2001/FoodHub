import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

const baseURL = import.meta.env.VITE_API_BASE_URL;

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
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [adminId]);

  const updateOrderStatus = async (orderId, restaurantId, newStatus) => {
    try {
      const response = await axios.put(
        `${baseURL}/admin/orders/${orderId}/status`,
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

  return (
    <>
      <div className="px-2 sm:px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl bg-orange-500 py-3 sm:py-4 my-4 font-bold text-center text-white rounded-md">
          Manage Orders
        </h2>

        {Object.keys(groupedOrders).length === 0 ? (
          <p className="text-center text-lg font-medium">No orders found.</p>
        ) : (
          Object.keys(groupedOrders).map((date, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 bg-gray-300 p-2 rounded-md text-center">
                {date === todayDate
                  ? "📌 Today's Orders"
                  : moment(date).format("DD MMMM YYYY")}
              </h3>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-[600px] w-full border-collapse border border-gray-400 text-sm sm:text-base">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Time</th>
                      <th className="border p-2">User</th>
                      <th className="border p-2">Items</th>
                      <th className="border p-2">Total Price</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedOrders[date].map((order, idx) => (
                      <tr key={idx} className="border text-center">
                        <td className="border p-2">
                          {moment(order.createdAt).format("hh:mm A")}
                        </td>
                        <td className="border p-2">
                          {order.userId?.name || "N/A"}
                        </td>
                        <td className="border p-2">
                          <table className="w-full text-xs sm:text-sm">
                            <tbody>
                              {order.items.map((item, i) => (
                                <tr key={i}>
                                  <td className="text-left p-1">{item.name}</td>
                                  <td className="text-center p-1">
                                    {item.quantity}x
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                        <td className="border font-semibold p-2">
                          ₹
                          {order.items
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border font-semibold p-2">
                          {order.status || "Pending"}
                        </td>
                        <td className="border p-2 space-x-2">
                          {order.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateOrderStatus(
                                    order._id,
                                    order.restaurantId._id,
                                    "Accepted"
                                  )
                                }
                                className="bg-green-500 text-white px-3 py-1 rounded-md"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  updateOrderStatus(
                                    order._id,
                                    order.restaurantId._id,
                                    "Rejected"
                                  )
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
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
                                  "Out for Delivery"
                                )
                              }
                              className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                            >
                              Out for Delivery
                            </button>
                          )}
                          {(order.status === "Accepted" ||
                            order.status === "Out for Delivery") && (
                            <button
                              onClick={() =>
                                updateOrderStatus(
                                  order._id,
                                  order.restaurantId._id,
                                  "Delivered"
                                )
                              }
                              className="bg-blue-500 text-white px-3 py-1 rounded-md"
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

              {/* Mobile Card View */}
              <div className="block md:hidden space-y-4">
                {groupedOrders[date].map((order, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 shadow-md bg-white"
                  >
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {moment(order.createdAt).format("hh:mm A")}
                    </p>
                    <p>
                      <span className="font-semibold">User:</span>{" "}
                      {order.userId?.name || "N/A"}
                    </p>
                    <div>
                      <p className="font-semibold mt-2 mb-1">Items:</p>
                      <ul className="list-disc ml-4 text-sm">
                        {order.items.map((item, i) => (
                          <li key={i}>
                            {item.name} - {item.quantity}x
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="font-semibold mt-2">
                      Total: ₹
                      {order.items
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                    <p className="font-semibold mt-1">
                      Status: {order.status || "Pending"}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {order.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order._id,
                                order.restaurantId._id,
                                "Accepted"
                              )
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded-md"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order._id,
                                order.restaurantId._id,
                                "Rejected"
                              )
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded-md"
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
                              "Out for Delivery"
                            )
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                        >
                          Out for Delivery
                        </button>
                      )}
                      {(order.status === "Accepted" ||
                        order.status === "Out for Delivery") && (
                        <button
                          onClick={() =>
                            updateOrderStatus(
                              order._id,
                              order.restaurantId._id,
                              "Delivered"
                            )
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded-md"
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
