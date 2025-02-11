import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogin = async () => {
        // Handle login logic here
        console.log({ email, password, isAdmin });
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password, isAdmin });
            
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                // Handle successful login
            } else {
                console.error('Login failed');
                // Handle login failure
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="button" onClick={() => setIsAdmin(false)}>
                        User
                    </button>
                    <button type="button" onClick={() => setIsAdmin(true)}>
                        Admin
                    </button>
                </div>
                <div>
                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;