import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogo = () => {
    if(user){navigate(`/user/${user.id}/home`)}
    else {navigate('/home')}
    }


  const clickLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-[#101010] text-white w-full h-[10vh] shadow-xl flex justify-between items-end px-18">
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
      {/* <ul className="flex items-center gap-6 font-bold text-lg"> */}

      {/* Student Links */}
      {user && user.role === "student" && (
        <ul className="h-full items-center flex list-none gap-20">
          <li
            className="cursor-pointer  hover:text-white"
            onClick={() =>navigate(`/user/${user.id}/home`)}
          >
            Home
          </li>
          <li
            className="cursor-pointer list-none hover:text-white"
            onClick={() => navigate(`/user/${user.id}/orders`)}
          >
            Orders
          </li>
          <li
            className="cursor-pointer list-none hover:text-white"
            onClick={() => navigate(`/user/${user.id}/profile`)}
          >
            Profile
          </li>
          <li
            className="cursor-pointer list-none hover:text-white"
            onClick={() => navigate(`/user/${user.id}/cart`)}
          >
            Cart
          </li>
        </ul>
      )}

      {/* Admin Links */}
      {user && user.role === "admin" && (
        <>
          {/* <li className="cursor-pointer hover:text-white" onClick={() => navigate(`/admin/${user.restaurantId}/dashboard`)}>Dashboard</li> */}
          {/* <li className="cursor-pointer hover:text-white" onClick={() => navigate(`/admin/${user.restaurantId}/menu`)}>Menu</li> */}
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
            className="bg-white text-orange-500 px-4 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      ) : (
        <ul className="list-none h-full items-center flex text-xl gap-8 pb-2">
          <li
            className="cursor-pointer hover:text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </li>
          <li
            className="cursor-pointer hover:text-white"
            onClick={() => navigate("/user/signup")}
          >
            User Signup
          </li>
          <li
            className="cursor-pointer hover:text-white"
            onClick={() => navigate("/admin/signup")}
          >
            Admin Signup
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
