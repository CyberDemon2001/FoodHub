// import React from "react";
// import { Link, Route, Routes, Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
// import StudentDashboard from "../../pages/user/StudentDashboard";
// import Menu from "../../pages/user/Menu";
// import Profile from "../../pages/user/Profile";
// import Cart from "../../pages/user/Cart";
// import {toast, ToastContainer} from "react-toastify";

// const Student = () => {
//   const { id } = useParams(); 
//   const location = useLocation();
//   const navigate = useNavigate();

 
//   const activeSection = location.pathname.split("/").pop();

//   const menuItems = [
//     {name:"Cart",path:"cart",icon:"fa-solid fa-cart-shopping"},
//     {name:"Profile",path:"profile",icon:"fa-solid fa-user"},
   
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user"); 
//     toast.success("Logged out successfully!");
//     setTimeout(() => navigate("/login"), 1000); 
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-1/5 md:w-1/6 bg-white shadow-md p-5">
//         <ul className="flex flex-col gap-4">
//           {menuItems.map(({ name, path, icon }) => (
//             <li key={path}>
//               <Link
//                 to={`/user/${id}/${path}`}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-md ${
//                   activeSection === path ? "text-white font-bold bg-blue-500" : "text-gray-700 hover:bg-gray-200"
//                 }`}
//                 aria-label={`Navigate to ${name}`}
//               >
//                 <i className={`${icon} text-inherit`}></i>
//                 <span>{name}</span>
//               </Link>
//             </li>
//           ))}
//           {/* Logout */}
//           <li
//             className="cursor-pointer flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-red-400 hover:text-white"
//             onClick={handleLogout}
//             role="button"
//             aria-label="Logout"
//           >
//             <i className="fa-solid fa-power-off text-inherit"></i>
//             <span>Logout</span>
//           </li>
//         </ul>

//         {/* Help Section */}
//         <div className="mt-10 text-center">
//           <h1 className="text-gray-600">Need Help?</h1>
//           <button
//             className="mt-2 px-6 py-2 text-white rounded-3xl bg-blue-500"
//             aria-label="Contact Support"
//           >
//             Contact Support
//           </button>
//         </div>
//       </aside>


//       <ToastContainer />
//     </div>
//   );
// };

// export default Student;