import React from 'react'
import { Link } from 'react-router-dom'

const Content = () => {
  // const handleOrderNowClick = () => {
  //   alert('Order Now button clicked!')
  //   // You can add more functionality here
  // }

  return (
    <div className="relative h-[calc(100vh)] mt-[-70px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/bg.jpg')", filter: 'blur(4px)' }}
        aria-hidden="true"
      >
      </div>
      <div className="flex items-center justify-center h-full relative">
        <div className="flex">
         
         <div className="h-[100vh] w-[30%] flex items-end">
          <img src='DE-on-bike-2-2.png' alt='s'/>
          </div>
          <div className="h-[100vh] w-[70%] flex flex-col items-center justify-center">
          <p className="text-[#FE5005] text-[150px] leading-[120px] p-5 rounded-xl">
            FOOD HUB
          </p>
          <p className="text-white text-2xl font-extrabold">DISCOVER FOOD IN YOUR TMU</p>
          
          <Link
            className="hover:transition-all duration-300 ease-in hover:scale-[1.10]  bg-[#fe8d00] text-white text-xl py-2 px-4 mt-12 rounded-lg border-none cursor-pointer"
          to = "/menu" >
            ORDER NOW
          </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
