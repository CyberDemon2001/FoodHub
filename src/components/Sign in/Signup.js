import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        number: "",
        college: "",
        username: "",
        password: "",
        repeatPassword: "",
    });

    const handleChange = (event)=>{
        setFormData((prevData)=>({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(formData.password !== formData.repeatPassword){
            alert("Password do not match");
            return;
        }
        if (formData.number.length !== 10) {
            alert("Mobile number must be 10 digits.");
            return;
        }

        
        const existingUsers = JSON.parse(localStorage.getItem("Form Data")) || [];

         const isDuplicate = existingUsers.some(user=>
            user.username===formData.username || user.email === formData.email
         );

         if(isDuplicate){
            alert("User Already Exist")
            return;
         }
        existingUsers.push(formData);
        localStorage.setItem("Form Data", JSON.stringify(existingUsers));
        alert("Registered Successfully")

        setFormData({
            fullname: "",
            email: "",
            number: "",
            college: "",
            username: "",
            password: "",
            repeatPassword: "",
        });

        // console.log(formData);
        // console.log(JSON.parse(localStorage.getItem("Form Data")))
    }

  
  return (
    <>
      <div className="h-[calc(100vh-70px)] mt-[70px] flex justify-center items-center">
        <div className="flex h-[90%] w-[70%] border border-solid border-black">
          <img className="h-[100%] w-[70%]" src="login.jpg" alt="raman" />
          <form onSubmit={handleSubmit} className="flex flex-col justify-center w-[30%] px-[20px]">
            <h1 className="text-3xl font-extrabold mb-2">Sign Up</h1>
            <label htmlFor="fullname">Full Name</label>
            <input
              className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            ></input>

            <label htmlFor="email">Email</label>
            <input
              className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            ></input>

            <label htmlFor="number">Number</label>
            <input
            className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="number"
              id="number"
              name="number"
              placeholder="Mobile Number"
              value={formData.number}
              onChange={handleChange}
              required
            ></input>

            <label htmlFor="college">College</label>
            <input
            className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="text"
              id="college"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              required
            ></input>

            <label htmlFor="username">Username</label>
            <input
            className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            ></input>

            <label htmlFor="password">Password</label>
            <input
            className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></input>

            <label htmlFor="repeatpassword">Repeat Password</label>
            <input
            className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat Password"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            ></input>
            
            <button className="bg-[#fe8d00] py-1 rounded-full" type="submit">Sign Up</button>
            <p className="text-sm my-1">Already have an account? <Link className="text-[#fe8d00] underline" to="/signin">Sign in</Link></p>
          </form>
        </div>
      </div>
    </>
    
  );
}
