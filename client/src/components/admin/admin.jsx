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
  const {id} = useParams();
  const location = useLocation();
  const activeSection = location.pathname.split("/").pop(); // Get the last part of the URL
  // const activeSection = location.pathname.replace("/admin/", ""); 

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: "fa-solid fa-house" },
    { name: "Orders", path: "orders", icon: "fa-solid fa-clipboard" },
    { name: "Menu", path: "menu", icon: "fa-solid fa-bars" },
    { name: "Customers", path: "customers", icon: "fa-solid fa-user-plus" },
    { name: "Reviews", path: "reviews", icon: "fa-solid fa-pen" },
    { name: "Analytics", path: "analytics", icon: "fa-solid fa-chart-simple" },
    { name: "Settings", path: "settings", icon: "fa-solid fa-gear" },
    { name: "Logout", path: "logout", icon: "fa-solid fa-power-off" }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/7 bg-white shadow-md mt-5">
        <ul className="flex flex-col gap-4">
          {menuItems.map(({ name, path, icon }) => (
            <li
              key={path}
              className={`text-lg pl-4 py-1${
                activeSection === path ? "text-black font-bold bg-orange-400" : "text-gray-700 hover:text-black"}`}>
              <Link
                to={`/admin/${id}/${path}`}
                className="flex items-center gap-3">
                <i className={`${icon} text-gray-700`}></i>
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h1 className="mt-10 text-center">Having Trouble?</h1>
        <button className="mt-2 ml-7 px-6 py-2 text-white rounded-3xl bg-orange-500 ">
          Contact US
        </button>
      </aside>

      {/* Main Content */}
      <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
        <Routes>
          {/* Redirect /admin to /admin/dashboard */} 
          {/* <Route path="" element={<Navigate to="dashboard" replace />} /> */}
          <Route path="" element={<Navigate to={`/admin/${id}/dashboard`} replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="menu" element={<MenuManagement />} />
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
