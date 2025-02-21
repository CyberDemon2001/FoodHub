import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slide1 from '../../assets/slide1.jpg';
import slide2 from '../../assets/slide2.jpeg';
import slide3 from '../../assets/slide3.jpeg';
import { useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Content() {
  const restaurants = ["fdjsm", "sdfdsf", "sdas"];
  const items = ["fdjsm", "sdfdsf", "dsfds", "dsf"];
  

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/");
        setRestaurant(response.data);
        console.log("Restaurant Data:", response.data);
        console.log("Restaurant Data:", response.data.map(r => r.restaurantName));


      } catch (error) {
        console.error("Error fetching restaurant:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to fetch restaurant details");
        toast.error("Failed to fetch restaurant details");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      {/* Swiper Carousel */}
      {/*absolute top-0 left-0 w-full h-[60vh] -z-10 */}
    
    <div className="bg-orange-500 w-full absolute mt-20 h-[80vh]"></div>
    <div className="border-20 mx-15 my-6 relative border-gray-900 h-[70vh]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay:10000000 }}
          loop={true}
          className="h-full w-full"
        >
          <SwiperSlide>
            <img
              src={slide1}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slide2}
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slide3}
              alt="Slide 3"
              className="w-full h-full object-fit"
            />
          </SwiperSlide>
        </Swiper>
        
      </div>

      {/* Grid Section */}
      <div className="grid gap-20 relative px-20 grid-cols-3 font-bold grid-rows-1 h-70">
      {
        restaurants.map((restaurant, index)=>(
          <div key={index} className="border-10 bg-white border-gray-900">
            {restaurant}
            </div>
        ))}
      </div>

      <div className="flex items-center justify-center my-6">
  <hr className="flex-grow border-2 border-gray-500 mx-20" />
  <span className="text-white text-2xl font-bold">Favorite Food</span>
  <hr className="flex-grow border-2 border-gray-500 mx-20" />
</div>
      <div className="grid gap-15 px-10 mb-10 grid-cols-4 text-orange-500 font-bold grid-rows-1 h-80">
       {
        items.map((item, index)=>(
          <div key={index} className="border-10 bg-white border-gray-900">
            {item}
            </div>
        ))}
      </div>
      
    </>
  );
}

export default Content;
