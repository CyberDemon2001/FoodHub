import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#101010] text-white py-2 flex justify-center">
      {/* Left Section */}
      <div className="">
        <div className="items-center mb-2">
          <i className="fas fa-phone-alt text-amber-500 mr-2"></i>
          <span className="pr-8">+91 XXXXXXXXXX</span>
          <i className="fas fa-envelope text-amber-500 mr-2"></i>
          <a href="mailto:support@company.com" className="text-blue-400 hover:underline">
            foodhub@gmail.com
          </a>
        </div>
        
        <div className="flex gap-4 justify-center">
        <a href="#" className="text-gray-400 hover:text-white text-lg">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white text-lg">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white text-lg">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white text-lg">
          <i className="fab fa-github"></i>
        </a>
      </div>
      <button className="cursor-pointer text-gray-400 hover:text-white" onClick={()=>navigate("/ourteam")}>Our Team</button>
      <div className="text-center text-gray-400 text-sm mt-3">
        &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
        </div>
        </div>

      // /* Right Section
      // <div className="text-center md:text-left">
      //   {/* <h2 className="font-bold text-lg mb-2">About the company</h2>
      //   <p className="text-gray-400 text-sm">
      //     Lorem ipsum dolor sit amet,
      //   </p> */
      //    /* Social Media Icons *
      

    
  );
};

export default Footer;
