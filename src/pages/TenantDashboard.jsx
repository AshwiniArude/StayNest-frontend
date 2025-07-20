import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TenantDashboard.css";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaSearch, FaUser, FaRegCommentDots, FaHeart, FaCog, FaArrowRight, FaHome, FaStar } from "react-icons/fa";
import TenantSearchBar from '../components/TenantSearchBar';

const TenantDashboard = () => {
  const navigate = useNavigate();
  
  // Convert bookings to state so it can be updated
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Skyline PG for Girls, Koramangala",
      location: "Koramangala, Bangalore",
      checkIn: "15 July 2025",
      checkOut: "15 Dec 2025",
      status: "Booked",
    },
    {
      id: 2,
      name: "Urban Nest Co-living, Gachibowli",
      location: "Gachibowli, Hyderabad",
      checkIn: "10 Jan 2025",
      checkOut: "10 June 2025",
      status: "Completed",
    },
    {
      id: 3,
      name: "Student Haven, Sector 18",
      location: "Sector 18, Noida",
      checkIn: "20 Aug 2024",
      checkOut: "20 Dec 2024",
      status: "Cancelled",
    },
  ]);

  // Function to add new booking
  const addNewBooking = (newBooking) => {
    setBookings(prevBookings => [newBooking, ...prevBookings]);
  };

  // Listen for new bookings from localStorage or other sources
  useEffect(() => {
    const checkForNewBookings = () => {
      const newBookings = JSON.parse(localStorage.getItem('newBookings') || '[]');
      if (newBookings.length > 0) {
        newBookings.forEach(booking => {
          addNewBooking({
            id: Date.now() + Math.random(), // Generate unique ID
            name: booking.pgName,
            location: booking.location,
            checkIn: booking.checkInDate,
            checkOut: booking.checkOutDate,
            status: "Booked",
          });
        });
        // Clear the new bookings from localStorage
        localStorage.removeItem('newBookings');
      }
    };

    checkForNewBookings();
  }, []);

  const handleCreateReview = () => {
    navigate('/my-reviews');
  };

  const handleViewDetails = (bookingId) => {
    // Navigate to booking details page (for now, always go to /booking-details)
    navigate('/booking-details');
  };

  const handleUpdateProfile = () => {
    navigate('/my-profile');
  };

  const handleAccountSettings = () => {
    navigate('/account-settings');
  };

  const handleContactSupport = () => {
    navigate('/contact-support');
  };

  const handleBrowsePGs = () => {
    navigate('/listings');
  };

  // Calculate active bookings count
  const activeBookingsCount = bookings.filter(booking => booking.status === 'Booked').length;

  return (
    <div className="dashboard-container">
      <section className="hero-section">
        <div className="hero-card-gradient">
          <div className="hero-card-header">
            <div>
              <h1 className="hero-welcome hero-welcome-dark">Hi Shreya, welcome back to StayNest!</h1>
              <p className="hero-subtitle hero-subtitle-orange">Here's a quick look at your upcoming stays and reviews.</p>
            </div>
            <div className="hero-icon-box">
              <FaHome />
            </div>
          </div>
          <div className="stats-pills">
            <div className="stat-pill">
              <span className="stat-number">{activeBookingsCount}</span>
              <span className="stat-label">Active Bookings</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">4.8</span>
              <span className="stat-label"><span className="star">★</span> Avg Rating</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">8</span>
              <span className="stat-label">Total Reviews</span>
            </div>
          </div>
        </div>
        {/* Advanced search bar below the purple hero box */}
        <TenantSearchBar />
      </section>

      <section className="section" style={{ marginTop: '3.5rem' }}>
        <h2>My Bookings</h2>
        <div className="card-grid">
        {bookings.map((booking) => (
        <div className="card" key={booking.id}>
        <div className={`status-label status-${booking.status.toLowerCase()}`}>
        {booking.status}
         </div>
        <h3>{booking.name}</h3>
         <p><FaMapMarkerAlt /> {booking.location}</p>
         <p><FaRegCalendarAlt /> Check-in: {booking.checkIn}</p>
         <p><FaRegCalendarAlt /> Check-out: {booking.checkOut}</p>
         <button 
           className="view-all-btn"
           onClick={() => handleViewDetails(booking.id)}
         >
           View Details
         </button>
         </div>
         ))}
        </div>
      </section>

      <section className="section quick-actions-section">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <p className="quick-actions-subtitle">Everything you need is just a click away</p>
        <div className="quick-actions-grid">
          <div className="quick-action-card green" onClick={handleBrowsePGs} style={{cursor:'pointer'}}>
            <div className="icon-bg"><FaSearch /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>Browse New PGs</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">Discover more amazing places</p>
              <div className="accent-bar green"></div>
            </div>
          </div>
          <div className="quick-action-card yellow" onClick={handleUpdateProfile}>
            <div className="icon-bg"><FaUser /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>Update My Profile</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">Keep your info current</p>
              <div className="accent-bar yellow"></div>
            </div>
          </div>
          <div className="quick-action-card green" onClick={handleContactSupport}>
            <div className="icon-bg"><FaRegCommentDots /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>Contact Support</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">We're here to help 24/7</p>
              <div className="accent-bar green"></div>
            </div>
          </div>
          <div className="quick-action-card pink">
            <div className="icon-bg"><FaHeart /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>My Favorites</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">Saved PGs & Hostels</p>
              <div className="accent-bar pink"></div>
            </div>
          </div>
          <div className="quick-action-card gray" onClick={handleAccountSettings}>
            <div className="icon-bg"><FaCog /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>Account Settings</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">Privacy & preferences</p>
              <div className="accent-bar gray"></div>
            </div>
          </div>
          <div className="quick-action-card purple" onClick={handleCreateReview}>
            <div className="icon-bg"><FaStar /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>Create Review</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">Share your experience</p>
              <div className="accent-bar purple"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>My Reviews & Ratings</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Skyline PG for Girls, Koramangala</h3>
            <p>⭐ 5 - Amazing experience! Clean, safe, and very responsive owner.</p>
          </div>
          <div className="card">
            <h3>Urban Nest Co-living, Gachibowli</h3>
            <p>⭐ 4 - Good facilities. Friendly community and well-maintained.</p>
          </div>
          <div className="card">
            <h3>Student Haven, Sector 18</h3>
            <p>⭐ 3 - Could improve on cleanliness and Wi-Fi. Okay for budget.</p>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>
    </div>
  );
};

export default TenantDashboard;