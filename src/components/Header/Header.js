import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

const Header = () => {
  const username = JSON.parse(localStorage.getItem("Logged User"));
  console.log(username);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("Logged User")
    navigate('/signin')

  }
  return (
    <>
    <div className="h-[70px] w-[100%] flex justify-around items-center text-lg bg-white fixed top-0 z-10 bg-opacity-50">

      <div className="ml-8 "><img className='h-20' src='foodhub logo.png' alt='logo'/></div>

        <div className="flex gap-8">
          <NavLink className={({ isActive }) => `text-black ${isActive ? 'text-orange-500' : 'hover:text-orange-500'} flex items-center`} to="/search">
          <SearchIcon />
          SEARCH
          </NavLink>

          <NavLink className={({ isActive }) => `text-black ${isActive ? 'text-orange-500' : 'hover:text-orange-500'} flex items-center`} to="/">
          <HomeIcon />
          HOME
          </NavLink>

          <NavLink className={({ isActive }) => `text-black ${isActive ? 'text-orange-500' : 'hover:text-orange-500'} flex items-center`} to="/menu">
          <RestaurantMenuIcon />
          MENU
          </NavLink>
          <NavLink className={({ isActive }) => `text-black ${isActive ? 'text-orange-500' : 'hover:text-orange-500'} flex items-center`} to="/aboutus">
          <InfoIcon />
          ABOUT US
          </NavLink>
        </div>

        <div className='flex gap-4'>
        { username ? (
          <>
          <p className="text-2xl">{username}!</p>
          <button className='hover:text-orange-500' onClick={handleLogout} type='submit'>SIGN OUT</button>
        </>
        ):
          <NavLink className={({ isActive }) => `text-black ${isActive ? 'text-orange-500' : 'hover:text-orange-500'} flex items-center`} to="/signin">
          <PersonIcon />
          SIGN IN
          </NavLink>
        }
        
        <NavLink className={({ isActive }) => `text-black ${isActive ? 'text-orange-500' : 'hover:text-orange-500'} flex items-center`} to="/cart">
        <ShoppingCartIcon />
        CART
        </NavLink>
        </div>
        
    </div>
    </>
  )
}

export default Header;
