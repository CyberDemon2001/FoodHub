import UserSignup from "./pages/user/UserSignup"
import './App.css';
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
import Menu from "./pages/user/Menu";
import Orders from "./pages/user/Orders";
import Cart from './pages/user/Cart';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Content />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/:id/*" element={<Admin />} />
      <Route path="/user/:id/home" element={<Content />} />
      <Route path="/user/:id/orders" element={<Orders />} />
      <Route path="/user/:id/cart" element={<Cart />} />
      {/* <Route path="/user/:id/*" element={<User />}/> */}
      {/* <Route path="/restaurant/:name" element={<RestaurantMenu />}/> */}
      <Route path="/home/:name" element={<Menu />}/>
      <Route path="/user/:id/:name" element={<Menu />}/>
    </Routes>
    <Footer />
    </>
  );
}
export default App;
