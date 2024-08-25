import React from 'react'

function Search() {
  return (
    <div className="h-[calc(100vh-70px)] flex justify-center pt-5">
      <div className='border-2 border-solid border-black h-[50px] w-[500px] flex'>
        <input className='h-[100%] w-[100%] text-2xl px-2 text-[#FE5005] outline-none' type='text' placeholder='Search Food Here...'></input>
        <button className='bg-[#FE5005] px-4 font-extrabold border-l-2 border-black'>Search</button>
      </div>
    </div>
  )
}

export default Search
