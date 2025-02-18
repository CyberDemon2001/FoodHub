// import React from 'react'

// function Content() {
//   return (
//     <>
//     <div className='h-[300px] w-screen bg-amber-900'>this is image</div>
//     <div className='grid gap-8 px-10 py-7 border-2 grid-cols-4 grid-rows-2 h-[90vh] bg-amber-400'>
//       <div className="border-2 border-white">fdjsm</div>
//       <div className="border-2 border-white">sdfdsf</div>
//       <div className="border-2 border-white">dsfds</div>
//       <div className="border-2 border-white">dsf</div>
//       {/* <div className="border-2">dsf</div> */}
//     </div>
//     </>
//   )
// }

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

function Content() {
  return (
    <>
      {/* Swiper Carousel */}
      <div className="h-[60vh] w-screen bg-black">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="h-full w-full "
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
      <h1 className="px-6 py-3 font-bold text-xl ">We Deliver</h1>
      <div className="grid gap-8 px-10 grid-cols-4 grid-rows-2 h-[90vh]">
        <div className="border-1 border-black">fdjsm</div>
        <div className="border-1 border-black">sdfdsf</div>
        <div className="border-1 border-black">dsfds</div>
        <div className="border-1 border-black">dsf</div>
      </div>
    </>
  );
}

export default Content;
