// src/components/NavbarDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavbarDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or token logic if needed
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">StayNest</Link>
      </div>

      <div className="navbar-center-links">
        <Link to="/">Home</Link>
        <Link to="/listings">Browse PGs</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="navbar-auth">
        <button onClick={handleLogout} className="btn-register">Logout</button>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
