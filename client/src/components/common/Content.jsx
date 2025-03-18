import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide4 from "../../assets/slide4.jpg";
import slide5 from "../../assets/slide5.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/rest.jpg";
import Menu from "../common/Menu";
import image1 from "../../assets/restaurant1.jpg";
import Navbar from "./Navbar";

function Content({ restaurant }) {
  const { id } = useParams();
  const navigate = useNavigate();

    // Extracting all unique sections
    const allSections = restaurant.flatMap((restaurant) =>
      restaurant.menu ? restaurant.menu.map((section) => section.section) : []
    );

    // Remove duplicates using Set
    const uniqueSections = [...new Set(allSections)];
    console.log("Unique Sections:", uniqueSections);
    
    const handleViewMenu = (selectedRestaurant) => {
      if (!id) {
        navigate(`/home/${selectedRestaurant.restaurantName}`, {
          state: { restaurant: selectedRestaurant },
        });
      } else {
        navigate(`/user/${id}/${selectedRestaurant.restaurantName}`, {
          state: { restaurant: selectedRestaurant },
        });
      }
    };

  return (
    <>
      <div className="bg-orange-500  w-full absolute mt-20 h-[70vh]"></div>

      <div className="border-30 mx-15 my-6 relative border-gray-300 rounded-2xl bg-white h-[65vh]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop={true}
          className="h-full w-full"
        >
          {[slide1, slide2, slide3, slide4, slide5].map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover absolute"
              />
              <h1 className="text-white block bg-white/10 backdrop-blur-xs font-bold text-4xl relative text-center top-1/3">
                FoodHub
              </h1>
              <h1 className="text-white bg-white/10 backdrop-blur-xs text-2xl relative text-center top-1/3">
                Your Favorite Food, Delivered Fast!
              </h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mx-15 ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
        >
          {uniqueSections.map((section, index) => (
            <SwiperSlide key={index}>
              <div className="border-10 mx-5 my-5 h-50 text-center bg-white border-white transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-lg">
               
                <img
                  src={image1}
                  className="w-full h-full object-cover rounded-lg"
                  alt={restaurant.restaurantName}
                />
                 <h1 className="absolute bottom-2 left-0 right-0 text-lg font-bold  bg-orange-500 text-black py-1 ">{section}</h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className=" mx-15">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
        >
          {restaurant.map((restaurant, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => handleViewMenu(restaurant)} className="border-20 mx-5 my-5  h-[300px] text-center bg-white border-white transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-lg relative overflow-hidden rounded-lg">
                <img
                  src={restaurant.imageUrl || image1}
                  className="w-full h-full object-cover rounded-lg"
                  alt={restaurant.restaurantName}
                />
                {/* <button
                  className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white w-[50%] rounded-md shadow-lg opacity-90 hover:opacity-100 transition"
                  onClick={() => handleViewMenu(restaurant)}
                >
                  Open Menu
                </button> */}
                <h1 className="absolute bottom-2 left-0 right-0 text-lg font-bold  bg-orange-500 text-black py-3 ">
                  {restaurant.restaurantName || "Unnamed Restaurant"}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-center my-6">
        <hr className="flex-grow border-2 border-gray-500 mx-20" />
        <span className="text-black text-2xl font-bold">Favorite Food</span>
        <hr className="flex-grow border-2 border-gray-500 mx-20" />
      </div>
      
    </>
  );
}

export default Content;