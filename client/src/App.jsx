import './App.css';
import AdminSignup from "./pages/admin/AdminSignup";
import UserSignup from '../../server/models/UserSignup';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <>
      {/* <AdminSignup /> */}
      {/* <UserSignup /> */}
      <AdminDashboard />
    </>
  );
}
export default App;
