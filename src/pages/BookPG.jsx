import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaWifi, FaUtensils, FaSnowflake, FaTshirt, FaCar, FaLock, FaBroom, FaDumbbell, FaFemale, FaMale, FaUsers, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/BookPG.css';

const BookPG = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock PG data for different listings
  const pgDataMap = {
    'sunshine-pg': {
      id: 'sunshine-pg',
      name: "Sunshine PG for Girls, Koramangala",
      location: "Koramangala, Bangalore",
      rating: 4.5,
      totalReviews: 127,
      rent: 8500,
      securityDeposit: 5000,
      bookingFee: 1000,
      gender: "Girls",
      verified: true,
      availability: "Available",
      description: "A comfortable and well-maintained PG for girls in the heart of Koramangala. Clean rooms, nutritious food, and a friendly environment. Perfect for students and working professionals.",
      amenities: [
        { id: 'wifi', name: 'Wi-Fi', icon: <FaWifi />, available: true },
        { id: 'food', name: 'Meals', icon: <FaUtensils />, available: true },
        { id: 'ac', name: 'AC', icon: <FaSnowflake />, available: true },
        { id: 'laundry', name: 'Laundry', icon: <FaTshirt />, available: true },
        { id: 'parking', name: 'Parking', icon: <FaCar />, available: true },
        { id: 'security', name: 'CCTV', icon: <FaLock />, available: true },
        { id: 'cleaning', name: 'Cleaning', icon: <FaBroom />, available: true },
        { id: 'gym', name: 'Gym', icon: <FaDumbbell />, available: false }
      ],
      roomOptions: [
        { type: 'Shared', rent: 8500, availability: 'Available', beds: 2 },
        { type: 'Private', rent: 12000, availability: 'Available', beds: 1 }
      ],
      owner: {
        name: "Mrs. Priya Sharma",
        verified: true,
        phone: "+91 98765 43210",
        icon: <FaFemale />
      },
      nearby: ["Metro Station", "Shopping Mall", "Colleges", "Hospitals"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
        "https://images.unsplash.com/photo-1560448204-5c9a0c9a0c9a?w=800"
      ],
      reviews: [
        {
          id: 1,
          name: "Anjali K.",
          avatar: <FaFemale />,
          rating: 5,
          date: "2 weeks ago",
          comment: "Amazing experience! Clean rooms, good food, and very helpful staff. Highly recommended!"
        },
        {
          id: 2,
          name: "Priya M.",
          avatar: <FaFemale />,
          rating: 4,
          date: "1 month ago",
          comment: "Great location and facilities. The food is really good and the rooms are well-maintained."
        },
        {
          id: 3,
          name: "Riya S.",
          avatar: <FaFemale />,
          rating: 5,
          date: "2 months ago",
          comment: "Best PG I've stayed in! Very safe and comfortable environment."
        }
      ]
    },
    'skyline-pg': {
      id: 'skyline-pg',
      name: "Skyline PG for Girls, Koramangala",
      location: "Koramangala, Bangalore",
      rating: 4.8,
      totalReviews: 89,
      rent: 12500,
      securityDeposit: 8000,
      bookingFee: 1500,
      gender: "Girls",
      verified: true,
      availability: "Available",
      description: "Premium PG accommodation with modern amenities and excellent location. Perfect for working professionals and students.",
      amenities: [
        { id: 'wifi', name: 'Wi-Fi', icon: <FaWifi />, available: true },
        { id: 'food', name: 'Meals', icon: <FaUtensils />, available: true },
        { id: 'ac', name: 'AC', icon: <FaSnowflake />, available: true },
        { id: 'laundry', name: 'Laundry', icon: <FaTshirt />, available: true },
        { id: 'parking', name: 'Parking', icon: <FaCar />, available: true },
        { id: 'security', name: 'CCTV', icon: <FaLock />, available: true },
        { id: 'cleaning', name: 'Cleaning', icon: <FaBroom />, available: true },
        { id: 'gym', name: 'Gym', icon: <FaDumbbell />, available: true }
      ],
      roomOptions: [
        { type: 'Shared', rent: 12500, availability: 'Available', beds: 2 },
        { type: 'Private', rent: 18000, availability: 'Available', beds: 1 }
      ],
      owner: {
        name: "Mrs. Sunita Patel",
        verified: true,
        phone: "+91 98765 43211",
        icon: <FaFemale />
      },
      nearby: ["Metro Station", "Shopping Mall", "IT Parks", "Restaurants"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
        "https://images.unsplash.com/photo-1560448204-5c9a0c9a0c9a?w=800"
      ],
      reviews: [
        {
          id: 1,
          name: "Meera R.",
          avatar: <FaFemale />,
          rating: 5,
          date: "1 week ago",
          comment: "Excellent facilities and very clean environment. Highly recommended!"
        },
        {
          id: 2,
          name: "Divya K.",
          avatar: <FaFemale />,
          rating: 4,
          date: "3 weeks ago",
          comment: "Great location and very safe. The food quality is excellent."
        }
      ]
    },
    'urban-nest': {
      id: 'urban-nest',
      name: "Urban Nest Co-living, Gachibowli",
      location: "Gachibowli, Hyderabad",
      rating: 4.6,
      totalReviews: 156,
      rent: 9800,
      securityDeposit: 6000,
      bookingFee: 1200,
      gender: "Co-ed",
      verified: true,
      availability: "Available",
      description: "Modern co-living space with community living experience. Perfect for young professionals and students.",
      amenities: [
        { id: 'wifi', name: 'Wi-Fi', icon: <FaWifi />, available: true },
        { id: 'food', name: 'Meals', icon: <FaUtensils />, available: true },
        { id: 'ac', name: 'AC', icon: <FaSnowflake />, available: true },
        { id: 'laundry', name: 'Laundry', icon: <FaTshirt />, available: true },
        { id: 'parking', name: 'Parking', icon: <FaCar />, available: true },
        { id: 'security', name: 'CCTV', icon: <FaLock />, available: true },
        { id: 'cleaning', name: 'Cleaning', icon: <FaBroom />, available: true },
        { id: 'gym', name: 'Gym', icon: <FaDumbbell />, available: true }
      ],
      roomOptions: [
        { type: 'Shared', rent: 9800, availability: 'Available', beds: 2 },
        { type: 'Private', rent: 15000, availability: 'Available', beds: 1 }
      ],
      owner: {
        name: "Shreya",
        verified: true,
        phone: "+91 98765 43212",
        icon: <FaMale />
      },
      nearby: ["Tech Parks", "Universities", "Shopping Centers", "Hospitals"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
        "https://images.unsplash.com/photo-1560448204-5c9a0c9a0c9a?w=800"
      ],
      reviews: [
        {
          id: 1,
          name: "Arjun S.",
          avatar: <FaMale />,
          rating: 4,
          date: "2 weeks ago",
          comment: "Great community living experience. Very modern facilities."
        },
        {
          id: 2,
          name: "Priya L.",
          avatar: <FaFemale />,
          rating: 5,
          date: "1 month ago",
          comment: "Excellent location and very friendly community."
        }
      ]
    }
  };

  // Get PG data based on ID, fallback to first one if not found
  const pgData = pgDataMap[id] || pgDataMap['sunshine-pg'];

  const [selectedRoom, setSelectedRoom] = useState(pgData.roomOptions[0]);
  const [checkInDate, setCheckInDate] = useState('');
  const [duration, setDuration] = useState('3');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookNow = () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    // Create booking data
    const bookingData = {
      pgName: pgData.name,
      location: pgData.location,
      checkInDate: checkInDate,
      checkOutDate: checkInDate, // Assuming check-out is the same as check-in for simplicity in mock data
      roomType: selectedRoom.type,
      rent: selectedRoom.rent,
      totalAmount: totalAmount,
      bookingDate: new Date().toISOString().split('T')[0]
    };

    // Save to localStorage for Tenant Dashboard to pick up
    const existingBookings = JSON.parse(localStorage.getItem('newBookings') || '[]');
    existingBookings.push(bookingData);
    localStorage.setItem('newBookings', JSON.stringify(existingBookings));

    // Here you would typically send booking data to backend
    alert('Booking confirmed successfully!');
    setShowBookingModal(false);
    navigate('/tenant/dashboard');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pgData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pgData.images.length) % pgData.images.length);
  };

  const totalAmount = selectedRoom.rent + pgData.securityDeposit + pgData.bookingFee;

  return (
    <div className="book-pg-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="image-carousel">
          <img src={pgData.images[currentImageIndex]} alt={pgData.name} />
          <button className="carousel-btn prev" onClick={prevImage}>‹</button>
          <button className="carousel-btn next" onClick={nextImage}>›</button>
          <div className="carousel-dots">
            {pgData.images.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="hero-overlay">
          <div className="hero-content">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Back
            </button>
            
            <div className="pg-basic-info">
              <h1>{pgData.name}</h1>
              <p className="location"><FaMapMarkerAlt /> {pgData.location}</p>
              <div className="rating">
                <FaStar />
                <span>{pgData.rating}</span>
                <span className="review-count">({pgData.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="quick-info-card">
            <div className="price-info">
              <span className="amount">₹{pgData.rent}</span>
              <span className="period">/month</span>
            </div>
            <div className="status-badge available">
              <FaCheck />
              {pgData.availability}
            </div>
            <div className="gender-badge">
              {pgData.gender === "Girls" ? <FaFemale /> : pgData.gender === "Boys" ? <FaMale /> : <FaUsers />}
              {pgData.gender} PG
            </div>
            {pgData.verified && <div className="verified-badge">✓ Verified</div>}
          </div>
        </div>
      </section>

      <div className="content-wrapper">
        <div className="main-content">
          {/* PG Overview Section */}
          <section className="pg-overview">
            <h2>About This PG</h2>
            <p>{pgData.description}</p>
            
            <div className="amenities-grid">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {pgData.amenities.map(amenity => (
                  <div key={amenity.id} className={`amenity-item ${amenity.available ? 'available' : 'unavailable'}`}>
                    <span className="amenity-icon">{amenity.icon}</span>
                    <span className="amenity-name">{amenity.name}</span>
                    {!amenity.available && <span className="unavailable-mark"><FaTimes /></span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="room-options">
              <h3>Room Options</h3>
              <div className="room-table">
                <div className="room-header">
                  <span>Type</span>
                  <span>Rent</span>
                  <span>Availability</span>
                </div>
                {pgData.roomOptions.map((room, index) => (
                  <div key={index} className={`room-row`}>
                    <span>{room.type}</span>
                    <span>₹{room.rent}/month</span>
                    <span className="availability">{room.availability}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section className="location-section">
            <h2>Location</h2>
            <div className="map-placeholder">
              <div className="map-content">
                <FaMapMarkerAlt className="map-icon" />
                <p>Interactive map showing {pgData.location}</p>
                <p>Google Maps integration would go here</p>
              </div>
            </div>
            <div className="nearby-tags">
              <h3>Nearby</h3>
              <div className="tags">
                {pgData.nearby.map(tag => (
                  <span key={tag} className="nearby-tag">{tag}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Owner Info */}
          <section className="owner-section">
            <h2>Owner Information</h2>
            <div className="owner-card">
              <div className="owner-avatar">{pgData.owner.icon}</div>
              <div className="owner-details">
                <h3>{pgData.owner.name}</h3>
                {pgData.owner.verified && <span className="verified-badge">✓ Verified Owner</span>}
                <p className="owner-phone"><FaPhone /> {pgData.owner.phone}</p>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="reviews-section">
            <h2>Reviews</h2>
            <div className="reviews-list">
              {pgData.reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <span className="reviewer-avatar">{review.avatar}</span>
                      <div>
                        <h4>{review.name}</h4>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
            <button className="write-review-btn" onClick={() => navigate('/my-reviews')}>Write a Review</button>
          </section>
        </div>

        {/* Booking Panel */}
        <div className="booking-panel">
          <div className="booking-card">
            <h3>Book This PG</h3>
            
            <div className="booking-form">
              <div className="form-group">
                <label>Check-in Date</label>
                <input 
                  type="date" 
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Room Type</label>
                <select 
                  value={selectedRoom.type}
                  onChange={(e) => setSelectedRoom(pgData.roomOptions.find(r => r.type === e.target.value))}
                >
                  {pgData.roomOptions.map(room => (
                    <option key={room.type} value={room.type}>
                      {room.type} - ₹{room.rent}/month
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Duration (months)</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option value="1">1 month</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </select>
              </div>

              <div className="price-breakdown">
                <h4>Price Breakdown</h4>
                <div className="price-item">
                  <span>Monthly Rent</span>
                  <span>₹{selectedRoom.rent}</span>
                </div>
                <div className="price-item">
                  <span>Security Deposit</span>
                  <span>₹{pgData.securityDeposit}</span>
                </div>
                <div className="price-item">
                  <span>Booking Fee</span>
                  <span>₹{pgData.bookingFee}</span>
                </div>
                <div className="price-item total">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <div className="terms-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span>I agree to the terms and conditions</span>
                </label>
              </div>

              <button 
                className="book-now-btn"
                onClick={handleBookNow}
                disabled={!termsAccepted}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <h2>Confirm Your Booking</h2>
            <div className="booking-summary">
              <p><strong>PG:</strong> {pgData.name}</p>
              <p><strong>Room Type:</strong> {selectedRoom.type}</p>
              <p><strong>Check-in:</strong> {checkInDate}</p>
              <p><strong>Duration:</strong> {duration} months</p>
              <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowBookingModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPG; 