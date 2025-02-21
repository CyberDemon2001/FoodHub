import React from "react";

const Profile = () => {
  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Name</h2>
          <p className="text-gray-600">__________</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-600">__________</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;