import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const clickLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="h-[10vh] bg-orange-500 flex justify-between items-center px-6">
      {/* Logo & Text Container */}
      <div
        className="flex items-center gap-4 h-full cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="FOODHUB" className="h-full py-1" />
        <div>
          <h1 className="font-bold mt-2 text-2xl font-[cursive] leading-5">
            FOODHUB
          </h1>
          <h2>Food For Your Soul...</h2>
        </div>
      </div>
      {user && user.role === 'student' && (
          <div className="flex items-center gap-6">
            {/* Student-specific links */}
            <ul className="flex items-center text-center leading-5 gap-6 font-bold text-lg">
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/student/dashboard")}>
                Dashboard
              </li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/student/courses")}>
                Courses
              </li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/student/profile")}>
                Profile
              </li>
            </ul>
          </div>
        )}
      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {user ? (
          // Show when user is logged in
          <div className="flex items-center gap-6">
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
          // Show when no user is logged in
          <ul className="flex items-center text-center leading-5 gap-6 font-bold text-lg">
            <li className="cursor-pointer hover:text-white" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="cursor-pointer hover:text-white" onClick={() => navigate("/login")}>
              Login
            </li>
            <li className="cursor-pointer hover:text-white" onClick={() => navigate("/user/signup")}>
              User<br/>Signup
            </li>
            <li className="cursor-pointer hover:text-white" onClick={() => navigate("/admin/signup")}>
              Admin<br/>Signup
            </li>
          </ul>
        )}

        
      </div>
    </nav>
  );
};

export default Navbar;

