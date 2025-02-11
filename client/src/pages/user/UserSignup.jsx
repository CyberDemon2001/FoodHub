import React, { useState } from "react";
import axios from "axios";

function UserSignup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    department: "",
  });

  const [message, setMessage] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== repeatPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", user);
      setMessage("User registered successfully");
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange} 
          required
        />
        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={user.mobile}
          onChange={handleChange}
          required
          pattern="^\d{10}$" 
          title="Mobile number must be exactly 10 digits."
        />
        <label>DOB</label>
        <input
          type="date"
          name="dob"
          value={user.dob}
          onChange={handleChange}
          required
        />
        <label>Department</label>
        <input
          type="text"
          name="department"
          value={user.department}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserSignup;
