import React from "react";
import { Link, Route, Routes, Navigate, useLocation, useParams } from "react-router-dom";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import Analytics from "../../pages/admin/Analytics";
import MenuManagement from "../../pages/admin/MenuManagement";
import Orders from "../../pages/admin/Orders";
import Settings from "../../pages/admin/Settings";
import Reviews from "../../pages/admin/Reviews";
import Customers from "../../pages/admin/Customers";

const Admin = () => {
  const { id } = useParams(); // Extract restaurant ID from URL
  const location = useLocation();
  const activeSection = location.pathname.split("/").pop(); // Get the last part of the URL

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: "fa-house" },
    { name: "Orders", path: "orders", icon: "fa-clipboard" },
    { name: "Menu", path: "menu", icon: "fa-bars" },
    { name: "Customers", path: "customers", icon: "fa-user-plus" },
    { name: "Reviews", path: "reviews", icon: "fa-pen" },
    { name: "Analytics", path: "analytics", icon: "fa-chart-simple" },
    { name: "Settings", path: "settings", icon: "fa-gear" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 md:w-1/6 bg-white shadow-md p-5">
        <ul className="flex flex-col gap-4">
          {menuItems.map(({ name, path, icon }) => (
            <li key={path}>
              <Link
                to={`/admin/${id}/${path}`}
                className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                  activeSection === path ? "text-white font-bold bg-orange-500" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className={`fa-solid ${icon} text-inherit`}></i> {/* Ensuring text color matches */}
                <span>{name}</span>
              </Link>
            </li>
          ))}
          {/* Logout */}
          <li
            className="cursor-pointer flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-red-400 hover:text-white"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-power-off text-inherit"></i>
            <span>Logout</span>
          </li>
        </ul>

        {/* Help Section */}
        <div className="mt-10 text-center">
          <h1 className="text-gray-600">Having Trouble?</h1>
          <button className="mt-2 px-6 py-2 text-white rounded-3xl bg-orange-500">Contact Us</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
        <Routes>
          <Route path="" element={<Navigate to={id ? `/admin/${id}/dashboard` : "/admin"} replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="menu" element={<MenuManagement adminId={id} />} /> {/* Passed restaurantName */}
          <Route path="customers" element={<Customers />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
