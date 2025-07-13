import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { FaHome, FaInfoCircle, FaPhoneAlt, FaBed, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // ✅ Added icons

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <Link to="/">StayNest</Link>
      </div>

      {/* Center: Main navigation */}
      <div className="navbar-center-links">
        <Link to="/"><FaHome className="nav-icon" /> Home</Link>
        <Link to="/listings"><FaBed className="nav-icon" /> Browse PGs</Link>
        <Link to="/about"><FaInfoCircle className="nav-icon" /> About</Link>
        <Link to="/contact"><FaPhoneAlt className="nav-icon" /> Contact</Link>
      </div>

      {/* Right: Login/Register */}
      <div className="navbar-auth">
        <Link to="/login" className="login-link">
          <FaSignInAlt className="nav-icon" /> Login
        </Link>
        <Link to="/register" className="btn-register">
          <FaUserPlus className="nav-icon" /> Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


