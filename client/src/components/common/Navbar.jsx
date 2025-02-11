import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => navigate('/')}>
                FoodHub
            </div>
            <ul className="navbar-links">
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/login')}>Login</li>
                <li onClick={() => navigate('/user/signup')}>UserSignup</li>
                <li onClick={() => navigate('/admin/signup')}>AdminSignup</li>
            </ul>
        </nav>
        </>
    );
};

export default Navbar;