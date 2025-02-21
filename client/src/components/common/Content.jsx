
// export default Content
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
      <div className="px-10 h-[80vh]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
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
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Grid Section */}
      <h1 className="py-5 text-orange-500 font-bold text-2xl text-center">Recipes By Restaurant</h1>
      <div className="grid gap-8 px-10 grid-cols-4 text-orange-500 font-bold grid-rows-1 h-70">
        <div className="border-1  border-orange-500">fdjsm</div>
        <div className="border-1 border-orange-500">sdfdsf</div>
        <div className="border-1 border-orange-500">dsfds</div>
        <div className="border-1 border-orange-500">dsf</div>
      </div>
      <h1 className="py-5 text-orange-500 font-bold text-2xl text-center">Recipes By Categories</h1>
      <div className="grid gap-8 px-10 mb-10 grid-cols-4 text-orange-500 font-bold grid-rows-1 h-60">
        <div className="border-1  border-orange-500">fdjsm</div>
        <div className="border-1 border-orange-500">sdfdsf</div>
        <div className="border-1 border-orange-500">dsfds</div>
        <div className="border-1 border-orange-500">dsf</div>
      </div>
    </>
  );
}

export default Content;
