import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'; // ✅ Added icons

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-section centered-text">
      <h1 className="hero-heading">
      Your nest away from home<br />
      <span>Find it. <strong>Book it.</strong> Live it.</span>
      </h1>
        <p>
          Explore verified PGs and hostels across your city in just a few clicks.
          Your next home away from home is waiting — safe, cozy, and affordable.
        </p>

        {/* --- Search Bar Section --- */}
        <div className="search-box">
          <FaMapMarkerAlt className="icon" />
          <input
            className="square-search-input"
            placeholder="Enter city or locality..."
          />
          <button className="square-search-btn">
            <FaSearch className="icon white-icon" />
            <span>Search PGs</span>
          </button>
        </div>

        {/* --- CTA Buttons --- */}
        <div className="cta-buttons">
          <Link to="/listings" className="btn lavender">Browse PGs</Link>
          <Link to="/register" className="btn outline">List Your PG</Link>
        </div>

        {/* --- Stats --- */}
        <div className="stats-bar">
          <div className="stat">
            <span className="highlight">1,00,000+</span><br />
            Homes Rented / Sold
          </div>
          <div className="stat">
            <span className="highlight">2,00,000+</span><br />
            Happy Customers
          </div>
          <div className="stat">
            <span className="highlight">1,00,000+</span><br />
            Trusted Owners
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;






