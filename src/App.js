import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aboutus from "./components/About us/Aboutus";
import Menu from "./components/Menu/Menu";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Signin from "./components/Sign in/Signin";
import Search from "./components/Search/Search";
import Signup from "./components/Sign in/Signup";
import Cart from "./components/Cart/Cart";
// import data from './data.json';
import RestaurantMenu from "./components/Menu/Items/RestaurantMenu";
import RestaurantList from "./components/Menu/Items/RestaurantList";

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<RestaurantList />} />
        <Route path="/menu/restaurants/:restaurantName" element={<RestaurantMenu />} />
                    
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
