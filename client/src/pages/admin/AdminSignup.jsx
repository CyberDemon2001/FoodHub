import React from 'react';
import axios from 'axios';
import './AdminSignup.css';

function AdminSignup() {
  // State to store form input values
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    dob: '',
    restaurantName: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  // State to handle errors
  const [error, setError] = React.useState('');
  // const [loading, setLoading] = React.useState(false);

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return; // Prevent submission if passwords don't match
    }

    // Clear error if passwords match
    setError('');

    // Handle form validation and submission logic here
    console.log('Form data submitted:', formData);

    //https request to backend
    try{
      const response = await axios.post('http://localhost:5000/api/admin/signup', formData);
      console.log("Form data",response.data);
      alert(response.data.message);
      // setLoading(true);
    }
    catch(err){
      if(err.response && err.response.status === 400){
        setError(err.response.data.message);
      }
      else{
        console.error("Error in admin registration:",err);
        setError('Registration failed! Please try again.');
      }
      
      // setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Admin Register</h1>
        
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <label>DOB</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        
        <label>Restaurant Name</label>
        <input
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          required
        />
        
        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        {/* {loading && <p>Loading...</p>} Display loading message */}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminSignup;
