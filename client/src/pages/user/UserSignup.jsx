import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../../assets/background.jpg";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    department: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", formData);
      alert(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed! Please try again.");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(0px)",
          zIndex: "-1",
        }}
      ></div>

      <div className="relative z-10 h-auto w-[350px] bg-transparent p-6 rounded-2xl shadow-2xl border border-gray-300">
        <h2 className="text-2xl font-bold text-orange-400 text-left mb-3">User Signup</h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Department", name: "department", type: "text" },
            { label: "Mobile", name: "mobile", type: "text" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
          ].map(({ label, name, type }) => (
            <div className="mb-1" key={name}>
              <label className="block text-white font-medium text-sm mb-1">{label}:</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>
          ))}

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition mt-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
