import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUpload, FaCheck, FaArrowLeft } from 'react-icons/fa';
import '../styles/CreateListing.css';
import api from '../services/ApiService';
import listingService from '../services/ListingService';
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
  const fetchListing = async () => {
    try {
      const res = await api.get(`/listing/${listingId}`);
      const data = res.data;
      console.log('Fetched listing data:', data);
      setFormData({
        pgName: data.title || '',
        monthlyRent: data.rent || '',
        description: data.description || '',
        address: data.address || '',
        city: data.city || '',
        locality: data.locality || '',
        gender: data.gender || '',
        totalRooms: data.totalRooms || '',
        bedsPerRoom: data.bedsPerRoom || '',
        roomType: data.roomType || '',
        amenities: [
          data.isWifiAvilable && 'wifi',
          data.isAcAvilable && 'ac',
          data.isMealsAvilable && 'meals',
          data.isLaudryAvilable && 'laundry',
          data.isCctvAvilable && 'cctv',
          data.isParkingAvilable && 'parking',
          data.isCommonAreasAvilable && 'commonArea',
          data.isStudyDeskAvilable && 'studyDesk'
        ].filter(Boolean),
        securityDeposit: data.deposite || '',
        bookingFee: data.bookingFee || '',
        discount: data.discount || '0',
        url: data.url || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
      });
    } catch (err) {
      console.error('Error fetching listing:', err);
      alert('Failed to fetch listing. Please try again.');
    }
  };

  fetchListing();
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

  const handleSubmit = async (e) => {
  e.preventDefault();
console.log('Submitting form with data:', formData);
  const updatedListing = {
    id: listingId,
    title: formData.pgName,
    address: formData.address,
    gender: formData.gender,
    isWifiAvilable: formData.amenities.includes('wifi'),
    isAcAvilable: formData.amenities.includes('ac'),
    isMealsAvilable: formData.amenities.includes('meals'),
    isLaudryAvilable: formData.amenities.includes('laundry'),
    isCctvAvilable: formData.amenities.includes('cctv'),
    isParkingAvilable: formData.amenities.includes('parking'),
    isCommonAreasAvilable: formData.amenities.includes('commonArea'),
    isStudyDeskAvilable: formData.amenities.includes('studyDesk'),
    rent: parseFloat(formData.monthlyRent),
    deposite: parseFloat(formData.securityDeposit),
    discount: parseFloat(formData.discount),
    url: formData.url || '',
    description: formData.description,
    roomType: formData.roomType,
    totalRooms: parseInt(formData.totalRooms),
    bedsPerRoom: parseInt(formData.bedsPerRoom),
    startDate: formData.startDate,
    endDate: formData.endDate,
    bookingFee: parseFloat(formData.bookingFee)
  };

  try {
    const res = await listingService.updateListing(updatedListing);
    console.log('Listing updated successfully:', updatedListing);
    console.log(res);
    alert('Listing updated successfully!');
    navigate('/owner/dashboard');
  } catch (err) {
    console.error('Error updating listing:', err);
    alert('Failed to update listing. Please try again.');
  }
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