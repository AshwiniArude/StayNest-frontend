import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaStar, FaMapMarkerAlt, FaPhone, FaWifi, FaUtensils, FaSnowflake, FaTshirt,
  FaCar, FaLock, FaBroom, FaDumbbell, FaFemale, FaMale, FaUsers,
  FaArrowLeft, FaCheck, FaTimes
} from 'react-icons/fa';
import axios from 'axios';
import '../styles/BookPG.css';
import TenantDashboardNavbar from '../components/TenantDashboardNavbar';
import bookingService from '../services/BookingService';

const BookPG = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pgData, setPgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [duration, setDuration] = useState('3');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);

// Sample images for testing
const images = [
  "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1HRqMW.img?w=768&h=432&m=6", // Replace with your backend image URL
  "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1HRqMW.img?w=768&h=432&m=6",
  "https://www.google.com/imgres?q=hostel%20image&imgurl=https%3A%2F%2Fcf.bstatic.com%2Fxdata%2Fimages%2Fhotel%2Fmax1024x768%2F323221867.jpg%3Fk%3D45e7c7a3c5d4b64a8c99b495c05530eb9887e04d1a8c62021f216f6d6615fa54%26o%3D%26hp%3D1&imgrefurl=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fin%2Feness-hostels-pondicherry.html&docid=UF3WnTEv2YdvaM&tbnid=4-OEopFGH77ouM&vet=12ahUKEwjs5NSx3s2OAxXtTmwGHdWVGFIQM3oECH0QAA..i&w=1024&h=768&hcb=2&ved=2ahUKEwjs5NSx3s2OAxXtTmwGHdWVGFIQM3oECH0QAA"
];

// Next and Previous Image Handlers
const nextImage = () => {
  setCurrentImageIndex((prev) => (prev + 1) % images.length);
};

const prevImage = () => {
  setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
};
  useEffect(() => {
    const fetchPGData = async () => {
  try {
    const res = await axios.get(`http://localhost:8086/listing/${id}`);
    const data = res.data;

    const mappedAmenities = [
      { id: 'ac', name: 'AC', icon: <FaSnowflake />, available: data.isAcAvilable },
      { id: 'meals', name: 'Meals', icon: <FaUtensils />, available: data.isMealsAvilable },
      { id: 'laundry', name: 'Laundry', icon: <FaTshirt />, available: data.isLaudryAvilable },
      { id: 'cctv', name: 'CCTV', icon: <FaLock />, available: data.isCctvAvilable },
      { id: 'parking', name: 'Parking', icon: <FaCar />, available: data.isParkingAvilable },
      { id: 'common', name: 'Common Areas', icon: <FaBroom />, available: data.isCommonAreasAvilable },
      { id: 'study', name: 'Study Desk', icon: <FaWifi />, available: data.isStudyDeskAvilable }
    ];

    const mappedRoomOptions = [
      {
        type: data.roomType,
        rent: data.rent,
        availability: "Available"
      }
    ];

    // Use placeholder image if data.url is null
    const mappedImages = [data.url || 'https://feeds.abplive.com/onecms/images/uploaded-images/2022/02/27/6e0333158bad98f5a39917a646828a0b_original.jpg'];

    const mappedNearby = ["Metro Station", "Mall", "Hospital"];

    const mappedReviews = [];

    setPgData({
      ...data,
      amenities: mappedAmenities,
      roomOptions: mappedRoomOptions,
      images: mappedImages,
      nearby: mappedNearby,
      reviews: mappedReviews,
      owner: {
        name: data.owner?.name || 'Owner',
        phone: data.owner?.phoneNumber || 'N/A',
        icon: null,
        verified: true
      },
      name: data.title,
      location: data.address,
      rating: 4.2,
      totalReviews: 18,
      availability: "Available",
      securityDeposit: data.deposite || 0,
      bookingFee: data.discount || 0
    });

    setSelectedRoom({ type: data.roomType, rent: data.rent });
  } catch (err) {
    console.error('Failed to fetch PG:', err);
    navigate('/404');
  } finally {
    setLoading(false);
  }
};

    fetchPGData();
  }, [id, navigate]);

  if (loading) return <div>Loading PG details...</div>;
  if (!pgData) return <div>No PG found.</div>;

  const amenities = [
    { id: 'ac', name: 'AC', icon: <FaSnowflake />, available: pgData.isAcAvilable },
    { id: 'meals', name: 'Meals', icon: <FaUtensils />, available: pgData.isMealsAvilable },
    { id: 'laundry', name: 'Laundry', icon: <FaTshirt />, available: pgData.isLaudryAvilable },
    { id: 'cctv', name: 'CCTV', icon: <FaLock />, available: pgData.isCctvAvilable },
    { id: 'parking', name: 'Parking', icon: <FaCar />, available: pgData.isParkingAvilable },
    { id: 'common', name: 'Common Areas', icon: <FaBroom />, available: pgData.isCommonAreasAvilable },
    { id: 'study', name: 'Study Desk', icon: <FaWifi />, available: pgData.isStudyDeskAvilable },
  ];

  const totalAmount = (selectedRoom?.rent || 0) + (pgData.deposite || 0) - (pgData.discount || 0);

  const handleBookNow = () => {
    if (!termsAccepted) {
      alert('Please accept terms & conditions');
      return;
    }
    setShowBookingModal(true);
  };

const handleConfirmBooking = async () => {
  try {
    const bookingData = {
      listing: { id },
      id: Date.now(),
      startDate: checkInDate,
      endDate: new Date(
        new Date(checkInDate).setMonth(new Date(checkInDate).getMonth() + parseInt(duration))
      ).toISOString().split('T')[0]
    };

    // Send the booking to backend
    const response = await bookingService.createBooking(bookingData);

    alert('Booking Confirmed!');
    navigate('/tenant/dashboard');
  } catch (err) {
    console.error('Booking failed:', err);
    alert('Failed to book PG. Please try again later.');
  }
};

  return (
    <>
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
                    //change here
                    <span>Rent</span>
                    <span>₹{selectedRoom.Totalrent}</span>
                  </div>
                  <div className="price-item">
                    <span>Security Deposit</span>
                    <span>₹{pgData.securityDeposit}</span>
                  </div>
                  <div className="price-item">
                    <span>Booking Fee</span>
                    <span>₹{pgData.bookingFee}</span>
                  
                  </div>
                  <div className="price-item">
                    <span>Discount</span>
                    <span>₹{pgData.Discount}</span>
                  
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
</>
  );
};

export default BookPG; 