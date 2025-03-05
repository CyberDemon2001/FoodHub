import React, { useState } from "react";
import axios from "axios";
import image from "../../assets/profile.jpeg";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const today = new Date();
  const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const fields = [
    { label: "Full Name", key: "name", placeholder: "Your First Name" },
    { label: "Mobile", key: "mobile", placeholder: "Your Mobile Number" },
    { label: "Date of Birth", key: "dob", placeholder: "Your DOB" },
    { label: "Department", key: "department", placeholder: "Your Department" },
  ];

  const [editableFields, setEditableFields] = useState({});
  const [formData, setFormData] = useState({ ...user });
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const handleEditClick = (key) => {
    setEditableFields({ ...editableFields, [key]: !editableFields[key] });
  };

  const handleChange = (e, key) => {
    let value = e.target.value;
    // Allow only numbers for mobile and limit to 10 digits
  if (key === "mobile") {
    value = value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 10) return; // Restrict to 10 digits
  }

    setFormData({ ...formData, [key]:  value });
  };

  const handleSave = async (key) => {
    const updatedField = { [key]: formData[key] };

    try {
      const response = await axios.patch(`http://localhost:5000/api/user/${user.id}/profile`, updatedField);

      if (response.status === 200) {
        const updatedUser = { ...user, ...updatedField };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setEditableFields({ ...editableFields, [key]: false });
      }
    } catch (error) {
      console.error("Error updating user field:", error);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-blue-100 to-yellow-100">
      <div className="w-full h-[90%] max-w-6xl bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
        <p className="text-gray-500">{formattedDate}</p>

        {/* Profile Section */}
        <div className="mt-6 flex items-center space-x-4 relative">
          <div className="relative">
            <img className="w-25 h-25 rounded-full border" src={image} alt="Profile" />
            <button
              className="absolute -top-1 -right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-md"
              onClick={() => setIsProfileEditing(!isProfileEditing)}
            >
              <i className="fa-solid fa-pencil"></i>
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 relative">
              <div className="flex-1">
                <label className="text-gray-600">{field.label}</label>
                <div className="relative">
                <input
  type={field.key === "dob" && editableFields[field.key] ? "date" : "text"}
  value={
    field.key === "dob" && formData.dob
      ? editableFields[field.key]
        ? new Date(formData.dob).toISOString().split("T")[0] // Format for <input type="date">
        : new Date(formData.dob).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) // Readable format when not editing
      : formData[field.key] || ""
  }
  placeholder={field.placeholder}
  className={`mt-1 w-full p-2 pr-10 rounded-lg transition-all duration-300 ${
    editableFields[field.key]
      ? "border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      : "border-none bg-transparent"
  }`}
  disabled={!editableFields[field.key]}
  onChange={(e) => handleChange(e, field.key)}
/>

                  <button
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-2 py-1 rounded-lg transition-all duration-300 ${
                      editableFields[field.key] ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={() =>
                      editableFields[field.key] ? handleSave(field.key) : handleEditClick(field.key)
                    }
                  >
                    {editableFields[field.key] ? (
                      <i className="fa-solid fa-floppy-disk"></i>
                    ) : (
                      <i className="fa-solid fa-pencil"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
