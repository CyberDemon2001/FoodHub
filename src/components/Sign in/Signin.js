
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/* <Link className="text-blue-500" to="/signup">Sign Up</Link> */


function Signin() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault()
    const storedUsers = JSON.parse(localStorage.getItem("Form Data") || [])
    const user = storedUsers.find(user=>
      user.userName === userName || user.password === password
    );
    
    if(user){
      navigate('/menu');
      alert("Login Succesfully");  
      localStorage.setItem("Logged User", JSON.stringify(user.name))
    }
    
    else{
      setError("Username or Password is incorrect");
    }
    localStorage.setItem("Logged User", JSON.stringify(user.name))
  }

  return (
    <div className='h-[calc(100vh-70px)]  flex items-center justify-center'>
      <div className='h-[90%] w-[70%] flex border-2 border-solid border-black'>
        <form className="flex flex-col justify-center w-[30%] px-[20px]" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-extrabold mb-2">Sign In</h1>
        <label htmlFor="username">Username</label>
            <input
            className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              required
            ></input>

<label htmlFor="password">Password</label>
            <input
            className="my-[4px] outline-none border-b-2 border-solid border-custom-gray"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            ></input>
            <button className="bg-[#fe8d00] py-1 rounded-full mt-4" type="submit">Sign In</button>
            <p className="text-sm text-[red]">{error}</p>
            <p className="text-sm my-1">Don't have an account? <Link className="text-[#fe8d00] underline" to="/signup">Sign up</Link></p>
        </form>
        <img className="h-[100%] w-[70%]" src="login.jpg" alt="raman" />
      </div>
    </div>
  )
}

export default Signin
