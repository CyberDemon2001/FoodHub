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

function Content() {
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [uniqueSection, setUniqueSection] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/home");
        // console.log("Api Response", response.data);
        if (Array.isArray(response.data)) {
          setRestaurant(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Invalid Restaurants Data Received");
        }
      } catch (error) {
        console.error(
          "Error fetching restaurant:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message || "Failed to fetch restaurant details"
        );
        toast.error("Failed to fetch restaurant details");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, []);

  // Extracting all unique sections
  const allSections = restaurant.flatMap((restaurant) =>
    restaurant.menu ? restaurant.menu.map((section) => section.section) : []
  );

  // Remove duplicates using Set
  const uniqueSections = [...new Set(allSections)];
  // console.log("Unique Sections:", uniqueSections);

  // Flatten the items while keeping track of restaurant
  const allItems = restaurant.flatMap(
    (res) =>
      res.menu?.flatMap(
        (section) =>
          section.items?.map((item) => ({
            restaurantName: res.restaurantName,
            section: section.section,
            itemId: item._id,
            name: item.name,
            price: item.price,
          })) || []
      ) || []
  );
  console.log("All items:", allItems);

  // const handleViewMenu=(restaurantName)=>{
  //   navigate(`/home/${restaurantName}`, {state:{restaurant}})
  // }

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

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      {/* Background Section */}
      <div className="bg-orange-500 w-full absolute mt-20 h-[70vh]"></div>

      {/* Swiper Carousel */}
      <div className="border-20 mx-15 my-6 relative bg-gray-900 border-gray-900 h-[65vh]">
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

      {/* Restaurant Swiper with Hover Effect */}
      <div className="border-2 mx-15">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={70}
          slidesPerView={4}
          loop={true}
        >
          {restaurant.map((restaurant, index) => (
            <SwiperSlide key={index}>
              <div className="border-10 mx-5 my-5  h-[250px] text-center bg-white border-gray-900 transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-lg relative overflow-hidden rounded-lg">
                {/* Restaurant Image */}
                <p className="text-sm ">{restaurant.adminId}</p>
                <img
                  src={`https://res.cloudinary.com/dzkiozbbk/image/upload/FoodHub/${restaurant.adminId}`}
                  className="w-full h-full object-cover rounded-lg"
                  alt={restaurant.restaurantName}
                />

                {/* Open Menu Button */}
                <button
                  className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white w-[50%] rounded-md shadow-lg opacity-90 hover:opacity-100 transition"
                  onClick={() => handleViewMenu(restaurant)}
                >
                  Open Menu
                </button>

                {/* Restaurant Name at the Bottom */}
                <h1 className="absolute bottom-2 left-0 right-0 text-lg font-bold bg-white text-black py-1">
                  {restaurant.restaurantName || "Unnamed Restaurant"}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Favorite Food Section */}
      <div className="flex items-center justify-center my-6">
        <hr className="flex-grow border-2 border-gray-500 mx-20" />
        <span className="text-white text-2xl font-bold">Favorite Food</span>
        <hr className="flex-grow border-2 border-gray-500 mx-20" />
      </div>
      <div className="border-2 mx-15">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 1000 }}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
        >
          {uniqueSections.map((section, index) => (
            <SwiperSlide key={index}>
              <div className="border-15 mx-5 my-5 h-70 text-center bg-white border-gray-900 transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-lg">
                {section}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Content;
