import UserSignup from "./pages/user/UserSignup"
import './App.css';
import AdminSignup from "./pages/admin/AdminSignup"
import UserLogin from './pages/auth/Login';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
    </Routes>
    </>
  );
}
export default App;
