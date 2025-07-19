import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUpload, FaCheck, FaArrowLeft } from 'react-icons/fa';
import '../styles/CreateListing.css';

const EditListing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    pgName: '',
    monthlyRent: '',
    description: '',
    address: '',
    city: '',
    locality: '',
    gender: '',
    totalRooms: '',
    bedsPerRoom: '',
    roomType: '',
    amenities: [],
    securityDeposit: '',
    bookingFee: '',
    discount: '0'
  });

  const amenitiesList = [
    { id: 'wifi', name: 'Wi-Fi', icon: '📶' },
    { id: 'ac', name: 'AC', icon: '❄️' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'laundry', name: 'Laundry', icon: '👕' },
    { id: 'parking', name: 'Parking', icon: '🚗' },
    { id: 'gym', name: 'Gym', icon: '💪' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' }
  ];

  useEffect(() => {
    // Move existingListings inside useEffect
    const existingListings = {
      'sunshine-pg': {
        pgName: 'Sunshine PG for Boys, Pune',
        monthlyRent: '8500',
        description: 'A comfortable and well-maintained PG for boys in Kothrud area. Clean rooms, good food, and friendly environment.',
        address: '123 Sunshine Lane, Kothrud, Pune',
        city: 'Pune',
        locality: 'Kothrud',
        gender: 'boys',
        totalRooms: '10',
        bedsPerRoom: '2',
        roomType: 'shared',
        amenities: ['wifi', 'ac', 'food', 'laundry', 'parking'],
        securityDeposit: '5000',
        bookingFee: '1000',
        discount: '0'
      },
      'elite-hostel': {
        pgName: 'Elite Girls Hostel, Mumbai',
        monthlyRent: '15000',
        description: 'Premium girls hostel with modern amenities and 24/7 security. Located in a safe neighborhood.',
        address: '456 Elite Street, Andheri West, Mumbai',
        city: 'Mumbai',
        locality: 'Andheri West',
        gender: 'girls',
        totalRooms: '15',
        bedsPerRoom: '1',
        roomType: 'private',
        amenities: ['wifi', 'ac', 'food', 'laundry', 'parking', 'gym', 'security'],
        securityDeposit: '10000',
        bookingFee: '2000',
        discount: '5'
      },
      'metro-coliving': {
        pgName: 'Metro Co-living Space',
        monthlyRent: '12000',
        description: 'Modern co-living space with shared amenities and community living experience.',
        address: '789 Metro Road, Gurgaon, Delhi NCR',
        city: 'Gurgaon',
        locality: 'Delhi NCR',
        gender: 'co-ed',
        totalRooms: '8',
        bedsPerRoom: '2',
        roomType: 'shared',
        amenities: ['wifi', 'ac', 'food', 'laundry', 'parking', 'gym'],
        securityDeposit: '8000',
        bookingFee: '1500',
        discount: '0'
      }
    };
    // Load existing listing data
    const listingData = existingListings[listingId];
    if (listingData) {
      setFormData(listingData);
    }
  }, [listingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated listing data:', formData);
    // Here you would typically send the data to your backend
    alert('Listing updated successfully!');
    navigate('/owner/dashboard');
  };

  const handleBack = () => {
    navigate('/owner/dashboard');
  };

  return (
    <div className="create-listing-container">
      {/* Header with Back Button */}
      <div className="form-container">
        <div className="edit-header">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
          <h1 className="edit-title">Edit Listing</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: PG Details */}
          <section className="form-section">
            <h2>PG Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>PG/Hostel Name</label>
                <input
                  type="text"
                  name="pgName"
                  value={formData.pgName}
                  onChange={handleInputChange}
                  placeholder="Enter PG name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Monthly Rent (₹)</label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={handleInputChange}
                  placeholder="Enter monthly rent"
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your PG (amenities, rules, etc.)"
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Complete Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter complete address"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Locality</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  placeholder="Enter locality"
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Gender Selection</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="boys"
                      checked={formData.gender === 'boys'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    Boys
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="girls"
                      checked={formData.gender === 'girls'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    Girls
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="co-ed"
                      checked={formData.gender === 'co-ed'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    Co-ed
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Room & Amenities */}
          <section className="form-section">
            <div className="section-header">
              <h2>Room & Amenities</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Total Rooms</label>
                <input
                  type="number"
                  name="totalRooms"
                  value={formData.totalRooms}
                  onChange={handleInputChange}
                  placeholder="Number of rooms"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Beds per Room</label>
                <input
                  type="number"
                  name="bedsPerRoom"
                  value={formData.bedsPerRoom}
                  onChange={handleInputChange}
                  placeholder="Beds per room"
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Room Type</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="roomType"
                      value="private"
                      checked={formData.roomType === 'private'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    Private
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="roomType"
                      value="shared"
                      checked={formData.roomType === 'shared'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    Shared
                  </label>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Amenities</label>
                <div className="amenities-grid">
                  {amenitiesList.map(amenity => (
                    <label key={amenity.id} className="amenity-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.id)}
                        onChange={() => handleAmenityChange(amenity.id)}
                      />
                      <span className="checkbox-custom">
                        {amenity.icon}
                        <span className="amenity-name">{amenity.name}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Upload Photos */}
          <section className="form-section">
            <h2>Update Photos</h2>
            <div className="upload-area">
              <div className="upload-box">
                <FaUpload className="upload-icon" />
                <h3>Drag & Drop New Photos Here</h3>
                <p>or click to browse files</p>
                <p className="upload-hint">Recommended: 1200x800px, JPG/PNG format</p>
                <button type="button" className="upload-btn">Upload Photos</button>
              </div>
            </div>
          </section>

          {/* Section 4: Pricing Details */}
          <section className="form-section">
            <h2>Pricing Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Security Deposit (₹)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                  placeholder="Enter security deposit"
                />
              </div>
              
              <div className="form-group">
                <label>Booking Fee (₹)</label>
                <input
                  type="number"
                  name="bookingFee"
                  value={formData.bookingFee}
                  onChange={handleInputChange}
                  placeholder="Enter booking fee"
                />
              </div>
              
              <div className="form-group">
                <label>Optional Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Enter discount percentage"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </section>

          {/* Section 5: Submit */}
          <section className="submit-section">
            <button type="submit" className="submit-btn">
              <FaCheck />
              Update Listing
            </button>
            <p className="submit-hint">Changes will be reflected immediately on your dashboard.</p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default EditListing; 