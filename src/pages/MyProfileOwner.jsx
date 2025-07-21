import React, { useState } from 'react';
import OwnerNavbarDashboard from '../components/OwnerNavbarDashboard';
import { FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash, FaBell, FaGlobe, FaShieldAlt, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/MyProfile.css';

const MyProfileOwner = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User profile data
  const [profileData, setProfileData] = useState({
    fullName: 'Shreya ',
    email: 'shreyaa@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1998-05-15',
    gender: 'Female',
    preferredCity: 'Pune',
    preferredLocality: 'Alandi',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
  });

  // Form data for editing
  const [formData, setFormData] = useState({ ...profileData });

  // Account preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    language: 'English',
    defaultCity: 'Bangalore'
  });

  // Password change form
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditProfile = () => {
    setFormData({ ...profileData });
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfileData(formData);
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancelEdit = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    // Here you would typically send to backend
    console.log('Password updated:', passwordData);
    setShowPasswordForm(false);
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
    setShowAvatarModal(false);
  };

  return (
    <>
      <div className="profile-container">
        {/* Header */}
        <section className="header-section">
          <div className="header-content">
            <h1>My Profile</h1>
            <p>Manage your personal details and preferences.</p>
          </div>
        </section>
        {/* Profile Overview Card */}
        <section className="profile-overview-section">
          <div className="profile-card">
            <div className="profile-info">
              <div className="avatar-section">
                <div className="avatar-container">
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.fullName}
                    className="avatar"
                  />
                  <div className="avatar-edit-overlay" onClick={() => setShowAvatarModal(true)}>
                    <FaEdit />
                  </div>
                </div>
              </div>
              
              <div className="profile-details">
                <h2>{profileData.fullName}</h2>
                <div className="detail-item">
                  <FaEnvelope />
                  <span>{profileData.email}</span>
                </div>
                <div className="detail-item">
                  <FaPhone />
                  <span>{profileData.phone}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{profileData.preferredCity}, {profileData.preferredLocality}</span>
                </div>
              </div>
            </div>
            
            {!isEditing && (
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                <FaEdit />
                Edit Profile
              </button>
            )}
          </div>
        </section>
        {/* Tabs */}
        <section className="tabs-section">
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser />
              Profile Details
            </button>
            <button 
              className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <FaBell />
              Preferences
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FaShieldAlt />
              Security
            </button>
          </div>
        </section>
        {/* Profile Details Form */}
        {activeTab === 'profile' && (
          <section className="form-section">
            <div className="form-card">
              <h3>Personal Information</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred City</label>
                  <input
                    type="text"
                    value={formData.preferredCity}
                    onChange={(e) => handleInputChange('preferredCity', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Locality</label>
                  <input
                    type="text"
                    value={formData.preferredLocality}
                    onChange={(e) => handleInputChange('preferredLocality', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
        {/* Account Preferences */}
        {activeTab === 'preferences' && (
          <section className="form-section">
            <div className="form-card">
              <h3>Account Preferences</h3>
              
              <div className="preferences-grid">
                <div className="preference-item">
                  <div className="preference-header">
                    <FaBell />
                    <h4>Email Notifications</h4>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.emailNotifications}
                      onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-header">
                    <FaPhone />
                    <h4>SMS Notifications</h4>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.smsNotifications}
                      onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-header">
                    <FaGlobe />
                    <h4>Language Preference</h4>
                  </div>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                </div>

                <div className="preference-item">
                  <div className="preference-header">
                    <FaMapMarkerAlt />
                    <h4>Default City</h4>
                  </div>
                  <select
                    value={preferences.defaultCity}
                    onChange={(e) => handlePreferenceChange('defaultCity', e.target.value)}
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Security Settings */}
        {activeTab === 'security' && (
          <section className="form-section">
            <div className="form-card">
              <h3>Security Settings</h3>
              
              <div className="security-section">
                <div className="security-item">
                  <div className="security-info">
                    <h4>Change Password</h4>
                    <p>Update your password to keep your account secure</p>
                  </div>
                  <button 
                    className="change-password-btn"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Avatar Change Modal */}
        {showAvatarModal && (
          <div className="modal-overlay">
            <div className="avatar-modal">
              <div className="modal-header">
                <h3>Change Profile Picture</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowAvatarModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="modal-content">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  id="avatar-input"
                  style={{ display: 'none' }}
                />
                <label htmlFor="avatar-input" className="upload-btn">
                  Choose Photo
                </label>
              </div>
            </div>
          </div>
        )}
        {/* Password Change Modal */}
        {showPasswordForm && (
          <div className="modal-overlay">
            <div className="password-modal">
              <div className="modal-header">
                <h3>Change Password</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowPasswordForm(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-input">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      value={passwordData.oldPassword}
                      onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                      placeholder="Enter current password"
                    />
                    <button 
                      className="password-toggle"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-input">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                    />
                    <button 
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <button 
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="cancel-btn"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="update-btn"
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <FaCheck />
            Your profile has been updated successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default MyProfileOwner; 