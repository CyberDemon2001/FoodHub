import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

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
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const isActive = (path) =>
    location.pathname === path ? "text-orange-500 font-bold" : "text-white";

  return (
    <nav className="bg-[#101010] z-50 text-white w-full h-[10vh] sticky top-0 shadow-md flex justify-between items-center px-8 md:px-16">
      {/* Logo & Home Navigation */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={handleLogo}
      >
        <img src={logo} alt="FOODHUB" className="h-12" />
        <div>
          <h1 className="font-bold text-2xl font-[cursive]">FOODHUB</h1>
          <h2 className="text-sm text-gray-300">Food For Your Soul...</h2>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center text-lg gap-6">
        {user && user.role === "student" && (
          <>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive(`/user/${user.id}/home`)}`}
              onClick={() => navigate(`/user/${user.id}/home`)}
            >
              <i className="fa-solid fa-house pr-2"></i>Home
            </li>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive(`/user/${user.id}/orders`)}`}
              onClick={() => navigate(`/user/${user.id}/orders`)}
            >
              <i className="fa-regular fa-address-book pr-2"></i>Orders
            </li>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive(`/user/${user.id}/profile`)}`}
              onClick={() => navigate(`/user/${user.id}/profile`)}
            >
              <i className="fa-solid fa-user pr-2"></i>Profile
            </li>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive(`/user/${user.id}/cart`)}`}
              onClick={() => navigate(`/user/${user.id}/cart`)}
            >
              <i className="fa-solid fa-cart-shopping pr-1"></i>Cart
            </li>
          </>
        )}

        {/* Guest Links */}
        {!user && (
          <>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive("/menu")}`}
              onClick={() => navigate("/menu")}
            >
              <i className="fa-solid fa-bowl-food pr-2"></i>Menu
            </li>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive("/login")}`}
              onClick={() => navigate("/login")}
            >
              <i className="fa-solid fa-arrow-right-to-bracket pr-2"></i>Login
            </li>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive("/user/signup")}`}
              onClick={() => navigate("/user/signup")}
            >
              <i className="fa-solid fa-address-card pr-2"></i>User Signup
            </li>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive("/admin/signup")}`}
              onClick={() => navigate("/admin/signup")}
            >
              <i className="fa-solid fa-address-card pr-2"></i>Admin Signup
            </li>
            <li
              className={`cursor-pointer hover:text-orange-400 ${isActive("/cart")}`}
              onClick={() => navigate("/cart")}
            >
              <i className="fa-solid fa-cart-shopping pr-1"></i>Cart
            </li>
          </>
        )}
      </ul>

      {/* User Profile / Logout Section */}
      {user ? (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-white font-semibold">Welcome, {user.name}</p>
            <p className="text-sm text-gray-400 capitalize">{user.role}</p>
          </div>
          <button
            onClick={clickLogout}
            className="text-red-600 bg-white px-3 py-2 text-lg rounded-full hover:bg-red-600 hover:text-white transition-all"
          >
            <i className="fas fa-sign-out pr-2"></i>Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
