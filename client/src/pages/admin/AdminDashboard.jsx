import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

  return (
    <div className="flex  bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Stats Buttons */}
        <div className="grid grid-cols-4 gap-4">
          <button className="bg-orange-500 p-4 rounded-lg text-center text-white shadow font-bold text-lg hover:bg-orange-600">
            Total Orders <br></br>190
          </button>
          <button className="bg-red-500 rounded-lg text-center text-white shadow font-bold text-lg hover:bg-red-600">
            Total Menu <br></br>507
          </button>
          <button className="bg-orange-400 rounded-lg text-center text-white shadow font-bold text-lg hover:bg-orange-500">
            Total Customers<br></br>9040
          </button>
          <button className="bg-orange-600 rounded-lg text-center text-white shadow font-bold text-lg hover:bg-orange-700">
            Total Revenue <br></br>$9040
          </button>
        </div>

        {/* Placeholder for charts and additional sections */}
        <div className="mt-6 font-bold grid grid-cols-[2fr_1fr] gap-4">
          <div className="bg-white p-4 shadow-gray-400 shadow-xl rounded-lg h-48">Order Summary Chart</div>
          <div className="bg-white p-4 shadow-gray-400 shadow-xl rounded-lg h-48">Customer Info Chart</div>
        </div>
        <div className="mt-6 font-bold grid grid-cols-[1fr_2fr] gap-4">
          <div className="bg-white p-4 shadow-gray-400 shadow-xl rounded-lg h-48">Customer Location Chart</div>
          <div className="bg-white p-4 shadow-gray-400 shadow-xl rounded-lg h-48">Total Revenue Chart</div>
        </div>

        <div className="mt-6" >
        <h1 className="font-bold text-xl">Custromer Reviews</h1>
        <div className="mt-2 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 shadow rounded-lg h-48">Customer 1</div>
          <div className="bg-white p-4 shadow rounded-lg h-48">Customer 2</div>
          <div className="bg-white p-4 shadow rounded-lg h-48">Customer 3</div>
          <div className="bg-white p-4 shadow rounded-lg h-48">Customer 4</div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
