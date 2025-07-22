import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TenantDashboard.css";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaSearch, FaUser, FaRegCommentDots, FaHeart, FaCog, FaArrowRight, FaHome, FaStar, FaChevronDown } from "react-icons/fa";
import bookingService from "../services/BookingService";
import userService from "../services/UserService";
import {getReviewsByTenant} from "../services/ReviewService";
const genderOptions = [
  { label: 'Girls', value: 'girls' },
  { label: 'Boys', value: 'boys' },
  { label: 'Unisex', value: 'unisex' },
];
const budgetOptions = [
  { label: 'Below ₹5,000', value: [1000, 5000] },
  { label: '₹5,000 - ₹10,000', value: [5000, 10000] },
  { label: '₹10,000 - ₹20,000', value: [10000, 20000] },
  { label: 'Above ₹20,000', value: [20000, 50000] },
];
function TenantDashboardSearchBar({ onSearch }) {
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [budget, setBudget] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  
  const handleSearch = () => {
    if (onSearch) onSearch({ location, gender, budget });
  };
  const handleClear = () => {
    setLocation('');
    setGender('');
    setBudget('');
  };

  return (
    <div style={{ border: '3px solid orange', borderRadius: 20, padding: '2rem 2.5rem', margin: '2rem auto', maxWidth: 1800, minWidth: 1200, background: '#fff', display: 'flex', alignItems: 'center', boxShadow: '0 4px 24px rgba(44,34,84,0.08)' }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', marginRight: 24 }}>
        <label style={{ color: '#4a2c8c', fontWeight: 600, fontSize: 20, marginBottom: 6 }}>Where</label>
        <div style={{ display: 'flex', alignItems: 'center', background: '#222', borderRadius: 10, padding: '0.5rem 1rem' }}>
          <FaMapMarkerAlt style={{ color: '#a78bfa', fontSize: 20, marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 20, flex: 1 }}
          />
        </div>
      </div>
      <div style={{ width: 1, background: '#eee', height: 60, margin: '0 24px' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: 24, position: 'relative' }}>
        <label style={{ color: '#4a2c8c', fontWeight: 600, fontSize: 20, marginBottom: 6 }}>Who</label>
        <div
          style={{ background: 'none', border: 'none', borderRadius: 10, padding: '0.7rem 1rem', fontSize: 20, color: gender ? '#222' : '#bbb', fontStyle: gender ? 'normal' : 'italic', cursor: 'pointer', backgroundColor: '#fff', boxShadow: 'none', display: 'flex', alignItems: 'center', position: 'relative' }}
          onClick={() => setShowGenderDropdown(v => !v)}
        >
          {gender ? genderOptions.find(g => g.value === gender).label : 'Select Gender'}
          <FaChevronDown style={{ marginLeft: 8, color: '#bbb' }} />
        </div>
        {showGenderDropdown && (
          <div style={{ position: 'absolute', top: 60, left: 0, background: '#fff', borderRadius: 10, boxShadow: '0 8px 32px rgba(44,34,84,0.13)', zIndex: 100, minWidth: '100%' }}>
            {genderOptions.map(opt => (
              <div key={opt.value} style={{ padding: '0.7rem 1.2rem', cursor: 'pointer', color: '#222', fontSize: 18 }} onClick={() => { setGender(opt.value); setShowGenderDropdown(false); }}>{opt.label}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ width: 1, background: '#eee', height: 60, margin: '0 24px' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: 24, position: 'relative' }}>
        <label style={{ color: '#4a2c8c', fontWeight: 600, fontSize: 20, marginBottom: 6 }}>Budget</label>
        <div
          style={{ background: '#f7f3ff', border: 'none', borderRadius: 10, padding: '0.7rem 1rem', fontSize: 20, color: budget ? '#222' : '#bbb', fontStyle: budget ? 'normal' : 'italic', cursor: 'pointer', boxShadow: 'none', display: 'flex', alignItems: 'center', position: 'relative' }}
          onClick={() => setShowBudgetDropdown(v => !v)}
        >
          {budget ? budgetOptions.find(b => b.value[0] === budget[0] && b.value[1] === budget[1])?.label || 'Select budget' : 'Select budget'}
          <FaChevronDown style={{ marginLeft: 8, color: '#bbb' }} />
        </div>
        {showBudgetDropdown && (
          <div style={{ position: 'absolute', top: 60, left: 0, background: '#fff', borderRadius: 10, boxShadow: '0 8px 32px rgba(44,34,84,0.13)', zIndex: 100, minWidth: '100%' }}>
            {budgetOptions.map(opt => (
              <div key={opt.label} style={{ padding: '0.7rem 1.2rem', cursor: 'pointer', color: '#222', fontSize: 18 }} onClick={() => { setBudget(opt.value); setShowBudgetDropdown(false); }}>{opt.label}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 24 }}>
        <button onClick={handleSearch} style={{ background: 'orange', color: '#fff', border: 'none', borderRadius: 30, padding: '0.7rem 2.5rem', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px #ffa72633', cursor: 'pointer' }}>
          <FaSearch style={{ fontSize: 22 }} /> Search
        </button>
        <button onClick={handleClear} style={{ background: 'none', color: '#a78bfa', border: 'none', fontWeight: 700, fontSize: 20, marginLeft: 10, boxShadow: '0 2px 8px #a78bfa33', borderRadius: 30, padding: '0.7rem 1.5rem', cursor: 'pointer' }}>Clear</button>
      </div>
    </div>
  );
}

const TenantDashboard = () => {
  const navigate = useNavigate();
const [bookings, setBookings] = useState([]);
  const [userName, setUserName] = useState(''); 
  const [reviews, setReviews] = useState([]);
useEffect(() => {
 // Set name from user data
  const fetchBookings = async () => {
    try {
        const user = await userService.getCurrentUser();
      setUserName(user.name || 'User'); // Set name from user data
      console.log("Current user data:", user); // for verification
      const data = await bookingService.getMyBookings();
      console.log("Raw bookings data:", data); // for verification

      const mapped = data.map((b) => ({
        id: b.id,
        name: b.listing?.title || "N/A",
        location: b.listing?.address || "N/A",
        checkIn: b.startDate ? new Date(b.startDate).toLocaleDateString() : "N/A",
        checkOut: b.endDate ? new Date(b.endDate).toLocaleDateString() : "N/A",
        status: b.status || "N/A",
      }));

      setBookings(mapped);
      console.log("Mapped bookings:", mapped);

      const reviewData = await getReviewsByTenant(localStorage.getItem('id'));
      setReviews(reviewData);
      console.log("Reviews data:", reviewData);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  fetchBookings();
}, []);

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

  // Add search state and handler as in Listings.jsx
  const [searchParams, setSearchParams] = useState({ location: '', tenantType: '', budget: [3000, 20000] });
  const handleSearch = (params) => {
    setSearchParams(params);
    // Optionally, filter bookings or trigger other actions here
  };

  const handleCreateReview = () => {
    navigate('/my-reviews');
  };

  const handleViewDetails = (bookingId) => {
  navigate(`/booking-details/${bookingId}`);
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
              <h1 className="hero-welcome hero-welcome-dark">Hi {userName}, welcome back to StayNest!</h1>
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
        {/* Restore previous search bar below the purple hero box */}
        {/* <div className="search-wrapper">
          <TenantSearchBar onSearch={handleSearch} />
        </div> */}
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
          <div className="quick-action-card green" onClick={() => navigate('/contactsupport')}>
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
          <div className="quick-action-card gray" onClick={handleAccountSettings} style={{cursor:'pointer'}}>
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
          <div className="quick-action-card purple" onClick={() => navigate('/my-reviews')}>
            <div className="icon-bg"><FaStar /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>View Reviews</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">See all your reviews and ratings</p>
              <div className="accent-bar purple"></div>
            </div>
          </div>
        </div>
      </section>

     <section className="section">
  <h2>My Reviews & Ratings</h2>
  <div className="card-grid">
    {reviews.map((review, index) => (
      <div className="card" key={index}>
        <h3>{review.listing.title}</h3>
 <p>
  Stayed From {new Date(review.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })} to {
    (() => {
      const startDate = new Date(review.createdAt);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + review.duration); // 👈 add months
      return endDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    })()
  }
</p>


        <p>⭐ {review.rating} - {review.feedback}</p>
      </div>
    ))}
  </div>
</section>



      <div className="footer-spacing"></div>
    </div>
  );
};

export default TenantDashboard;