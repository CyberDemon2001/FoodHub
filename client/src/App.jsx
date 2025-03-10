import UserSignup from "./pages/user/UserSignup"
import './App.css';
import React from 'react';
import AdminSignup from "./pages/admin/AdminSignup"
import Login from './pages/auth/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Content from "./components/common/Content";
import Footer from "./components/common/Footer";
import Admin from "./components/admin/admin";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import User from "./components/user/UserNavebar";
// import RestaurantMenu from "./pages/user/RestaurantMenu";
import Restaurant from "./pages/user/Restaurant";
import UserOrders from "./pages/user/UserOrders";
import AdminOrders from "./pages/admin/AdminOrders";
import Cart from './pages/user/Cart';
import OurTeam from './components/common/OurTeam';
import Profile from "./pages/user/Profile";
import Menu from "./components/common/Menu";

function App() {

  const [allItems, setAllItems] = React.useState([]);
  return (
    <>
    <Navbar  allItems={allItems} />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Content  setAllItems={setAllItems} />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/:id/*" element={<Admin />} />
      <Route path="/user/:id/home" element={<Content setAllItems={setAllItems}  />} />
      <Route path="/user/:id/orders" element={<UserOrders />} />
      <Route path="/admin/orders/:id" element={<AdminOrders />} />
      <Route path="/user/:id/cart" element={<Cart />} />
      <Route  path="cart" element={<Cart />} />
      {/* <Route path="/user/:id/*" element={<User />}/> */}
      {/* <Route path="/restaurant/:name" element={<RestaurantMenu />}/> */}
      <Route path="/home/:name" element={<Restaurant />}/>
      <Route path="/user/:id/:name" element={<Restaurant />}/>
      <Route path="user/:id/profile" element={<Profile />} />  
      <Route path="/ourteam" element={<OurTeam/>}/>
      <Route path="/menu" element={<Menu />} />

    </Routes>
    <Footer />
    </>
  );
}
export default App;
