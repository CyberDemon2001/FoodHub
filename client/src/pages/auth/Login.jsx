import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../../assets/background.jpg"; // Use your background image path
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is "student"
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log({ email, password, role });

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role,
      });
      if (response.status === 200) {
        const { token, name, id } = response.data;
        console.log("Login successful:", response.data);
        localStorage.setItem("user", JSON.stringify({ name, token, id, role }));

        if (role === "admin") {
          navigate(`/admin/${id}/dashboard`);
        } else {
          navigate(`/user/${id}/Home`);
        }
        alert(response.data.message);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error:", error.response?.data?.message || "Login error");
      alert(error.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-[90vh]">
      {/* Full-Screen Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(0px)", // Slight blur effect
          zIndex: "-1", // Keeps it behind other content
        }}
      ></div>

      {/* Login Form */}
      <div className="relative z-10 h-auto w-[350px] bg-transparent p-8 rounded-2xl shadow-2xl border border-gray-300 ">
        <h2 className="text-3xl font-bold text-orange-400 text-left mb-6">Login</h2>

        {/* Role Toggle Switch */}
        <div
          className="relative w-full h-12 border-2 border-gray-400 bg-gray-200 rounded-full flex items-center mb-6 cursor-pointer p-1 transition-all"
          onClick={() => setRole(role === "student" ? "admin" : "student")}
        >
          {/* Sliding Background */}
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all ${
              role === "admin" ? "translate-x-full bg-orange-400" : "translate-x-0 bg-orange-500"
            }`}
          ></div>

          {/* Student Role */}
          <span
            className={`w-1/2 text-center font-semibold transition-all relative z-10 ${
              role === "student" ? "text-white" : "text-gray-700"
            }`}
          >
            User
          </span>

          {/* Admin Role */}
          <span
            className={`w-1/2 text-center font-semibold transition-all relative z-10 ${
              role === "admin" ? "text-white" : "text-gray-700"
            }`}
          >
            Admin
          </span>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
              className="w-full p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition placeholder:font-bold placeholder:text-gray-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="w-full p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition placeholder:font-bold placeholder:text-gray-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition mt-6"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
