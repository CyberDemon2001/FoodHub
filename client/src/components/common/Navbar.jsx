import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogo = () => {
    if (user) {
      navigate(`/user/${user.id}/home`);
    } else {
      navigate("/home");
    }
  };

  const clickLogout = () => {
    localStorage.removeItem("user");
    setTimeout(()=>{navigate("/home")},1000)
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-orange-500 px-3 py-5 rounded-lg" : "text-white";

  return (
    <nav className="bg-[#101010] text-white w-full h-[10vh] sticky shadow-xl flex justify-between items-end px-18">
      {/* Logo & Home Navigation */}
      <div
        className="flex items-end gap-4 h-full cursor-pointer"
        onClick={handleLogo}
      >
        <img src={logo} alt="FOODHUB" className="h-full py-2" />
        <div className="pb-2">
          <h1 className="font-bold mt-2 text-2xl font-[cursive] leading-5">
            FOODHUB
          </h1>
          <h2 className="text-sm ml-10">Food For Your Soul...</h2>
        </div>
      </div>

      {/* Navigation Links */}
      {user && user.role === "student" && (
        <ul className="h-full text-lg items-center flex list-none gap-15">
          {/* <li
            className={`cursor-pointer list-none hover:text-white ${isActive(
              `/user/${user.id}/cart`
            )}`}
            onClick={() => navigate(`/user/${user.id}/cart`)}
          >
            <i className="fa-solid fa-cart-shopping pr-1"></i>Cart
          </li> */}
          <li
            className={`cursor-pointer hover:text-white ${isActive(
              `/user/${user.id}/home`
            )}`}
            onClick={() => navigate(`/user/${user.id}/home`)}
          >
            <i className="fa-solid fa-house pr-2"></i>Home
          </li>
          <li
            className={`cursor-pointer list-none hover:text-white ${isActive(
              `/user/${user.id}/orders`
            )}`}
            onClick={() => navigate(`/user/${user.id}/orders`)}
          >
            <i className="fa-regular fa-address-book pr-2"></i>Orders
          </li>
          <li
            className={`cursor-pointer list-none hover:text-white ${isActive(
              `/user/${user.id}/profile`
            )}`}
            onClick={() => navigate(`/user/${user.id}/profile`)}
          >
            <i className="fa-solid fa-user pr-2"></i>Profile
          </li>
          <li
            className={`cursor-pointer list-none hover:text-white ${isActive(
              `/user/${user.id}/cart`
            )}`}
            onClick={() => navigate(`/user/${user.id}/cart`)}
          >
            <i className="fa-solid fa-cart-shopping pr-1"></i>Cart
          </li>
        </ul>
      )}

      {/* Admin Links */}
      {user && user.role === "admin" && (
        <>
          {/* Add Admin Links Here */}
        </>
      )}

      {/* User Profile / Logout Section */}
      {user ? (
        <div className="flex h-full gap-6 items-center">
          <div className="font-bold text-right">
            <p className="text-white">Welcome, {user.name}</p>
            <p className="text-sm text-gray-200 capitalize">{user.role}</p>
          </div>
          <button
            onClick={clickLogout}
            className="text-red-600 bg-white px-2 py-2 text-lg rounded-full hover:bg-red-600 hover:text-white"
          >
            <i className="fas fa-sign-out pr-2"></i>
            Logout
          </button>
        </div>
      ) : (
        <ul className="list-none h-full items-center flex text-lg gap-8">
           <li
            className={`cursor-pointer hover:text-white ${isActive(
              "/menu"
            )}`}
            onClick={() => navigate("/menu")}
          >
            <i className="fa-solid fa-bowl-food pr-2"></i>Menu
          </li>

          <li
            className={`cursor-pointer hover:text-white ${isActive("/login")}`}
            onClick={() => navigate("/login")}
          >
            <i className="fa-solid fa-arrow-right-to-bracket pr-2"></i>Login
          </li>
          <li
            className={`cursor-pointer hover:text-white ${isActive(
              "/user/signup"
            )}`}
            onClick={() => navigate("/user/signup")}
          >
            <i className="fa-solid fa-address-card pr-2"></i>User Signup
          </li>
          <li
            className={`cursor-pointer hover:text-white ${isActive(
              "/admin/signup"
            )}`}
            onClick={() => navigate("/admin/signup")}
          >
            <i className="fa-solid fa-address-card pr-2"></i>Admin Signup
          </li>
          <li
            className={`cursor-pointer hover:text-white ${isActive("/cart")}`}
            onClick={() => navigate("/cart")}
          >
            <i className="fa-solid fa-cart-shopping pr-1"></i>Cart
          </li>
        </ul>
      )}
      
    </nav>
  );
};

export default Navbar;
