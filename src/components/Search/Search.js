import React, { useState } from 'react';
import data from '../../data.json';

function Search() {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };


  const filteredData = text
    ? data.restaurants.flatMap(res =>
        res.menu.flatMap(section =>
          section.items.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
          )
        )
      )
    : [];

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col items-center pt-5">
      <div className='border-2 border-solid border-black h-[50px] w-[500px] flex rounded mb-5'>
        <input
          className='h-[100%] w-[100%] text-2xl px-2 text-[#FE5005] outline-none'
          type='text'
          placeholder='Search Food Here...'
          value={text}
          onChange={handleInputChange}
        />
        <button className='bg-[#FE5005] px-4 font-extrabold border-l-2 border-black'>Search</button>
      </div>
      <div className='w-[500px] overflow-x-auto grid grid-cols-2 gap-5'>
        {filteredData.map((item, index) => (
          <div className='h-[200px] bg-red-400 p-10' key={index}>
            <h2>Item: {item.name}</h2>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
