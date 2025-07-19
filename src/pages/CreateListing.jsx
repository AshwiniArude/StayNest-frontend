import React, { useState, useRef } from 'react';
import '../styles/CreateListing.css';
import { FaWifi, FaSnowflake, FaUtensils, FaTshirt, FaVideo, FaCar, FaUsers, FaGraduationCap, FaUpload, FaCheck } from 'react-icons/fa';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    pgName: '',
    monthlyRent: '',
    description: '',
    address: '',
    city: '',
    locality: '',
    gender: 'co-ed',
    totalRooms: '',
    bedsPerRoom: '',
    roomType: 'shared',
    amenities: [],
    securityDeposit: '',
    bookingFee: '',
    discount: ''
  });
  const [photoPreviews, setPhotoPreviews] = useState([]); // Store preview URLs
  const fileInputRef = useRef(null);

  const amenitiesList = [
    { id: 'wifi', name: 'WiFi', icon: <FaWifi /> },
    { id: 'ac', name: 'AC', icon: <FaSnowflake /> },
    { id: 'meals', name: 'Meals', icon: <FaUtensils /> },
    { id: 'laundry', name: 'Laundry', icon: <FaTshirt /> },
    { id: 'cctv', name: 'CCTV', icon: <FaVideo /> },
    { id: 'parking', name: 'Parking', icon: <FaCar /> },
    { id: 'commonArea', name: 'Common Area', icon: <FaUsers /> },
    { id: 'studyDesk', name: 'Study Desk', icon: <FaGraduationCap /> }
  ];

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
    // Save listing to localStorage
    const newListing = {
      ...formData,
      photos: photoPreviews // Save preview URLs for now
    };
    const existingListings = JSON.parse(localStorage.getItem('ownerListings') || '[]');
    existingListings.push(newListing);
    localStorage.setItem('ownerListings', JSON.stringify(existingListings));
    alert('Listing published successfully!');
    // Optionally, redirect to dashboard
  };

  // Handle file selection
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotoPreviews(files.map(file => URL.createObjectURL(file)));
  };

  // Trigger file input
  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="create-listing-container">
      {/* Main Form */}
      <div className="form-container">
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
            <h2>Upload Photos</h2>
            <div className="upload-area">
              <div className="upload-box" onClick={handleUploadClick} style={{ cursor: 'pointer' }}>
                <FaUpload className="upload-icon" />
                <h3>Drag & Drop Photos Here</h3>
                <p>or click to browse files</p>
                <p className="upload-hint">Recommended: 1200x800px, JPG/PNG format</p>
                <button type="button" className="upload-btn" onClick={handleUploadClick}>Upload Photos</button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                />
              </div>
              {photoPreviews.length > 0 && (
                <div className="photo-previews">
                  {photoPreviews.map((src, idx) => (
                    <img key={idx} src={src} alt={`Preview ${idx + 1}`} className="photo-preview-img" />
                  ))}
                </div>
              )}
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
              Publish Listing
            </button>
            <p className="submit-hint">You can edit this later from your dashboard.</p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateListing; 