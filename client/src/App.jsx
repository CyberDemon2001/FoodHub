import UserSignup from "./pages/user/UserSignup"
import './App.css';
import AdminSignup from "./pages/admin/AdminSignup"
import UserLogin from './pages/auth/Login';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Content from "./components/common/Content";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
    </Routes>
    <Footer />
    </>
  );
}
export default App;
