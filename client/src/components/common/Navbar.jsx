import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-[10vh] bg-orange-400 flex justify-between items-center px-6">
      {/* Logo & Text Container */}
      <div
        className="flex items-center gap-4 h-full"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="FOODHUB" className="h-full py-1" />
        <div className="">
          <h1 className="font-bold mt-2 text-2xl font-[cursive] leading-5">
            FOODHUB
          </h1>
          <h2 className="">Food For Your Soul...</h2>
        </div>
      </div>

      {/* Navigation Links */}
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
      <div className="font-bold leading-5 text-center">
        <span className=" text-lg">Raman Cauhan</span>
        <br></br>
        <span className="text-gray-300">Admin</span></div>
    </nav>
  );
};

export default Navbar;
