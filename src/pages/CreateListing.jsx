import React, { useState, useRef } from 'react';
import '../styles/CreateListing.css';
import {
    FaWifi, FaSnowflake, FaUtensils, FaTshirt, FaVideo, FaCar,
    FaUsers, FaGraduationCap, FaUpload, FaCheck
} from 'react-icons/fa';
import api from '../services/ApiService'; // Assuming ApiService is correctly configured
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for Cloudinary upload

const CreateListing = () => {
    const navigate = useNavigate();

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
        deposite: '',
        bookingFee: '',
        discount: ''
    });
    const [photos, setPhotos] = useState([]); // Store actual File objects for upload
    const fileInputRef = useRef(null);

    // --- Cloudinary Configuration ---
    const CLOUD_NAME = 'dqzdhaxkv';
    const UPLOAD_PRESET = 'Staynest'; // Make sure this upload preset is configured in your Cloudinary dashboard

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

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(files); // Store the actual files for upload
        // No longer generating or storing photo previews
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImageUrls = [];

        // ✅ 1. Upload images to Cloudinary
        if (photos.length > 0) {
            try {
                for (const photo of photos) {
                    const cloudinaryData = new FormData();
                    cloudinaryData.append('file', photo);
                    cloudinaryData.append('upload_preset', UPLOAD_PRESET);

                    const res = await axios.post(
                        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // Use CLOUD_NAME constant
                        cloudinaryData
                    );

                    uploadedImageUrls.push(res.data.secure_url);
                }
            } catch (cloudinaryError) {
                console.error('Error uploading image to Cloudinary:', cloudinaryError);
                alert('Failed to upload images. Please check your upload preset and try again.');
                return;
            }
        }

        // ✅ 2. Build payload for backend
        const newListing = {
            id:Date.now(), // Use current timestamp as unique ID
            title: formData.pgName,
            address: formData.address,
            city: formData.city,
            locality: formData.locality,
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
            deposite: parseFloat(formData.deposite),
            discount: parseFloat(formData.discount),
            url: uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : '', // Using the first uploaded URL as the main URL
            description: formData.description,
            roomType: formData.roomType,
            startDate: formData.startDate || new Date().toISOString().slice(0, 10),
            endDate:
                formData.endDate ||
                new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10),
            totalRooms: parseInt(formData.totalRooms),
            bedsPerRoom: parseInt(formData.bedsPerRoom),
            bookingFee: parseFloat(formData.bookingFee)
        };

        // ✅ 3. Send listing to backend
        try {
            await api.post('/listing/add', newListing);
            alert('Listing published successfully!');
            navigate('/owner/dashboard');
        } catch (err) {
            console.error('Error saving listing:', err);
            alert('Failed to publish listing. Please try again.');
        }
    };

    const handleUploadClick = () => {
        // Programmatically click the hidden file input
        if (fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div className="create-listing-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* PG Details */}
                    <section className="form-section">
                        <h2>PG Details</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>PG/Hostel Name</label>
                                <input type="text" name="pgName" value={formData.pgName} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Monthly Rent (₹)</label>
                                <input type="number" name="monthlyRent" value={formData.monthlyRent} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group full-width">
                                <label>Short Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" required />
                            </div>
                            <div className="form-group full-width">
                                <label>Complete Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Locality</label>
                                <input type="text" name="locality" value={formData.locality} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group full-width">
                                <label>Gender Selection</label>
                                <div className="radio-group">
                                    {['boys', 'girls', 'co-ed'].map(option => (
                                        <label key={option} className="radio-option">
                                            <input type="radio" name="gender" value={option} checked={formData.gender === option} onChange={handleInputChange} />
                                            <span className="radio-custom"></span>{option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Room & Amenities */}
                    <section className="form-section">
                        <div className="section-header"><h2>Room & Amenities</h2></div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Total Rooms</label>
                                <input type="number" name="totalRooms" value={formData.totalRooms} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Beds per Room</label>
                                <input type="number" name="bedsPerRoom" value={formData.bedsPerRoom} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group full-width">
                                <label>Room Type</label>
                                <div className="radio-group">
                                    {['private', 'shared'].map(type => (
                                        <label key={type} className="radio-option">
                                            <input type="radio" name="roomType" value={type} checked={formData.roomType === type} onChange={handleInputChange} />
                                            <span className="radio-custom"></span>{type.charAt(0).toUpperCase() + type.slice(1)}
                                        </label>
                                    ))}
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

                    {/* Upload Photos */}
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
                                    style={{ display: 'none' }} // Hidden input
                                    accept="image/*" // Accept only image files
                                    multiple // Allow multiple file selection
                                    onChange={handlePhotoChange}
                                />
                            </div>
                            {/* --- Start of UI Change --- */}
                            {photos.length > 0 && (
                                <div className="file-upload-summary">
                                    <p>Selected {photos.length} file(s):</p>
                                    <ul>
                                        {photos.map((file, idx) => (
                                            <li key={idx}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* --- End of UI Change --- */}
                        </div>
                    </section>

                    {/* Pricing */}
                    <section className="form-section">
                        <h2>Pricing Details</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Security Deposit (₹)</label>
                                <input type="number" name="deposite" value={formData.deposite} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Booking Fee (₹)</label>
                                <input type="number" name="bookingFee" value={formData.bookingFee} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Optional Discount (%)</label>
                                <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} min="0" max="100" />
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <section className="submit-section">
                        <button type="submit" className="submit-btn">
                            <FaCheck /> Publish Listing
                        </button>
                        <p className="submit-hint">You can edit this later from your dashboard.</p>
                    </section>
                </form>
            </div>
        </div>
    );
};

export default CreateListing;