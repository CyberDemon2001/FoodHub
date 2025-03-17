import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import defaultRestaurant from "../../assets/defaultRestaurant.jpg";

function Settings() {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  // Fetch the latest profile image from Cloudinary
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/${id}/settings`);
        setImage(res.data.imageUrl || "https://via.placeholder.com/150"); // ✅ Use default if no image
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };
  
    fetchImage();
  }, [id]);
  

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show a temporary preview before uploading
    const imagePreviewURL = URL.createObjectURL(file);
    setPreview(imagePreviewURL);

    // Upload the file
    await handleImageUpload(file);
  };

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/admin/${id}/settings`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Uploaded Image URL:", res.data.imageUrl);
      
      // Update image state to show the new uploaded image
      setImage(`${res.data.imageUrl}?v=${Math.random()}`); // Force browser cache refresh
      
      alert("Profile image updated!");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="mb-6 text-center">
        <h3 className="text-lg font-medium">Profile Picture</h3>

        <div className="relative w-24 h-24 mx-auto mt-4 cursor-pointer" onClick={handleProfileClick}>
          <img
            src={preview || image}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
          />

          <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 p-1.5 rounded-full">
            <i className="fa-solid fa-pen-to-square text-white text-lg"></i>
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full">
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default Settings;
