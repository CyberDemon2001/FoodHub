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
    <nav className="fixed z-10 bg-black text-orange-500 w-[100vw] h-[10vh] backdrop-blur-sm shadow-xl flex justify-between items-center px-6">
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
<<<<<<< HEAD
      <ul className="flex items-center text-center leading-5 gap-10 font-bold text-lg">
        <li className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </li>
        <li className="cursor-pointer" onClick={() => navigate("/login")}>
          Login
        </li>
        <li className="cursor-pointer" onClick={() => navigate("/user/signup")}>
          User<br></br>Signup
        </li>
        <li
          className="cursor-pointer"
          onClick={() => navigate("/admin/signup")}
        >
          Admin<br></br>Signup
        </li>
      </ul>
      {/* <div className="font-bold leading-5 text-center"> */}
        {/* <span className=" text-lg">Welcome,{user.name}</span> */}
        {/* <br></br> */}
        {/* <span className="text-gray-300">{user.role}</span> */}
        {/* </div> */}
        {/* <button onClick={clickLogout}>Logout</button> */}
=======
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
>>>>>>> 01ed0b9967a82b942b24d2d4357759a2ffa47314
    </nav>
  );
};

export default Navbar;

