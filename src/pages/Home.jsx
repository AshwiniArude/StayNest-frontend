import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="text-section">
          <h1>Find Your Perfect PG</h1>
          <p>Browse verified PGs and hostels near your college or workplace. Stay safe, stay comfortable — only on StayNest.</p>
          <div className="cta-buttons">
            <Link to="/listings" className="btn lavender">Browse PGs</Link>
            <Link to="/register" className="btn outline">List Your PG</Link>
          </div>
        </div>
        <div className="image-section">
          <img
            src="https://images.unsplash.com/photo-1600585153490-76b9c3e2c6d1?auto=format&fit=crop&w=800&q=80"
            alt="StayNest Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
