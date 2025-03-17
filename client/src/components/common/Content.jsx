import React from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import image1 from "../../assets/restaurant1.jpg";

function Content({ restaurant = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Extracting all unique sections
  const allSections = restaurant.flatMap((restaurant) =>
    restaurant.menu ? restaurant.menu.map((section) => section.section) : []
  );
  const uniqueSections = [...new Set(allSections)];

  const handleViewMenu = (selectedRestaurant) => {
    const path = id
      ? `/user/${id}/${selectedRestaurant.restaurantName}`
      : `/home/${selectedRestaurant.restaurantName}`;
    navigate(path, { state: { restaurant: selectedRestaurant } });
  };

  const renderSwiperSlides = (data, isRestaurant = true) => {
    return data.map((item, index) => (
      <SwiperSlide key={index}>
        <div className="border-20 mx-5 my-5 h-[300px] text-center bg-white border-white transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-lg relative overflow-hidden rounded-lg">
          <img
            src={image1}
            className="w-full h-full object-cover rounded-lg"
            alt={isRestaurant ? item.restaurantName : item}
          />
          {isRestaurant && (
            <>
              <button
                className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white w-[50%] rounded-md shadow-lg opacity-90 hover:opacity-100 transition"
                onClick={() => handleViewMenu(item)}
              >
                Open Menu
              </button>
              <h1 className="absolute bottom-2 left-0 right-0 text-lg font-bold bg-orange-500 text-black py-3">
                {item.restaurantName || "Unnamed Restaurant"}
              </h1>
            </>
          )}
          {!isRestaurant && (
            <h1 className="absolute bottom-2 left-0 right-0 text-lg font-bold bg-orange-500 text-black py-3">
              {item}
            </h1>
          )}
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <>
      <div className="bg-orange-500 w-full absolute mt-20 h-[70vh]"></div>

      <div className="border-30 mx-15 my-6 relative border-gray-300 rounded-2xl bg-white h-[65vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
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

      <div className="mx-15">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
          spaceBetween={30}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
        >
          {restaurant.map((restaurant, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => handleViewMenu(restaurant)} className="border-20 mx-5 my-5  h-[300px] text-center bg-white border-white transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-lg relative overflow-hidden rounded-lg">
                <img
                  src={image1}
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

      <div className="mx-15">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
          spaceBetween={30}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
        >
          {renderSwiperSlides(uniqueSections, false)}
        </Swiper>
      </div>
    </>
  );
}

export default Content;