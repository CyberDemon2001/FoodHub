import { React, useState } from "react";

function UserSignup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    department: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
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
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <label>Mobile</label>
        <input
          type="number"
          name="mobile"
          value={user.mobile}
          onChange={handleChange}
        />
        <label>DOB</label>
        <input
          type="date"
          name="dob"
          value={user.dob}
          onChange={handleChange}
        />
        <label>Department</label>
        <input
          type="text"
          name="department"
          value={user.department}
          onChange={handleChange}
        />
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserSignup;
