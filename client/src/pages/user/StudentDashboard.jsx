import React from "react";

const StudentDashboard = () => {
  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <p className="text-gray-600">No Orders</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Most Ordered Item</h2>
          <p className="text-gray-600">No Item</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Money</h2>
          <p className="text-gray-600">No Money Poor Kid</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;