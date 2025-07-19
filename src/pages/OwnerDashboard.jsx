import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OwnerDashboard.css';
import { FaHome, FaSearch, FaUser, FaRegCommentDots, FaHeart, FaCog, FaArrowRight, FaRegCalendarAlt, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [ownerListings, setOwnerListings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ownerListings') || '[]');
    setOwnerListings(stored);
  }, []);

  const handleAddListing = () => {
    navigate('/owner/create-listing');
  };

  const handleEditListing = (listingId) => {
    // Navigate to edit page with listing ID
    navigate(`/owner/edit-listing/${listingId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Hero Section with Stats */}
      <section className="hero-section">
        <div className="hero-card-gradient">
          <div className="hero-card-header">
            <div>
              <h1 className="hero-welcome hero-welcome-orange">Welcome back, Shreya! </h1>
              <p className="hero-subtitle hero-subtitle-orange">Here's a quick look at your PG performance.</p>
            </div>
            <div className="hero-icon-box">
              <FaHome />
            </div>
          </div>
          <div className="stats-pills">
            <div className="stat-pill">
              <span className="stat-number">3</span>
              <span className="stat-label">Active Listings</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">12</span>
              <span className="stat-label">Total Tenants</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">4.7</span>
              <span className="stat-label"><span className="star">★</span> Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* My PG Listings Section */}
      <section className="section">
        <div className="listings-header">
          <h2>My PG Listings</h2>
          <button className="add-listing-btn" onClick={handleAddListing}>Add New Listing</button>
        </div>
        <div className="listings-grid">
          {/* Render dynamic listings from localStorage */}
          {ownerListings.map((listing, idx) => (
            <div className="listing-card" key={idx}>
              <div className="listing-status">
                <span className="status-badge active">Active</span>
                <span className="status-badge verified">Verified</span>
              </div>
              {listing.photos && listing.photos.length > 0 ? (
                <img src={listing.photos[0]} alt="Listing" className="listing-image-placeholder" style={{objectFit:'cover',width:'100%',height:'120px',borderRadius:'12px'}} />
              ) : (
                <div className="listing-image-placeholder"></div>
              )}
              <div className="listing-content">
                <h3>{listing.pgName}</h3>
                <p className="listing-location"><FaMapMarkerAlt /> {listing.locality}, {listing.city}</p>
                <p className="listing-occupancy"><FaUser /> ?/? occupied</p>
                <div className="listing-price-rating">
                  <span className="listing-price">₹{listing.monthlyRent}<span className="price-period">/month</span></span>
                  <span className="listing-rating">⭐ --</span>
                </div>
              </div>
              <div className="listing-actions">
                <button className="action-btn edit-btn" onClick={() => navigate(`/owner/edit-listing/${idx}`)}>Edit</button>
                <button className="action-btn bookings-btn">Bookings</button>
              </div>
              <div className="listing-toggle">
                <span className="toggle-label">Listing Status</span>
                <div className="toggle-switch active">
                  <div className="toggle-slider"></div>
                </div>
              </div>
            </div>
          ))}

          <div className="listing-card">
            <div className="listing-status">
              <span className="status-badge active">Active</span>
              <span className="status-badge verified">Verified</span>
            </div>
            <div className="listing-image-placeholder"></div>
            <div className="listing-content">
              <h3>Sunshine PG for Boys, Pune</h3>
              <p className="listing-location"><FaMapMarkerAlt /> Kothrud, Pune</p>
              <p className="listing-occupancy"><FaUser /> 7/10 occupied</p>
              <div className="listing-price-rating">
                <span className="listing-price">₹8,500<span className="price-period">/month</span></span>
                <span className="listing-rating">⭐ 4.5</span>
              </div>
            </div>
            <div className="listing-actions">
              <button className="action-btn edit-btn" onClick={() => handleEditListing('sunshine-pg')}>Edit</button>
              <button className="action-btn bookings-btn">Bookings</button>
            </div>
            <div className="listing-toggle">
              <span className="toggle-label">Listing Status</span>
              <div className="toggle-switch active">
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>

          <div className="listing-card">
            <div className="listing-status">
              <span className="status-badge active">Active</span>
              <span className="status-badge verified">Verified</span>
            </div>
            <div className="listing-image-placeholder"></div>
            <div className="listing-content">
              <h3>Elite Girls Hostel, Mumbai</h3>
              <p className="listing-location"><FaMapMarkerAlt /> Andheri West, Mumbai</p>
              <p className="listing-occupancy"><FaUser /> 12/15 occupied</p>
              <div className="listing-price-rating">
                <span className="listing-price">₹15,000<span className="price-period">/month</span></span>
                <span className="listing-rating">⭐ 4.8</span>
              </div>
            </div>
            <div className="listing-actions">
              <button className="action-btn edit-btn" onClick={() => handleEditListing('elite-hostel')}>Edit</button>
              <button className="action-btn bookings-btn">Bookings</button>
            </div>
            <div className="listing-toggle">
              <span className="toggle-label">Listing Status</span>
              <div className="toggle-switch active">
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>

          <div className="listing-card inactive">
            <div className="listing-status">
              <span className="status-badge inactive">Inactive</span>
            </div>
            <div className="listing-image-placeholder"></div>
            <div className="listing-content">
              <h3>Metro Co-living Space</h3>
              <p className="listing-location"><FaMapMarkerAlt /> Gurgaon, Delhi NCR</p>
              <p className="listing-occupancy"><FaUser /> 0/8 occupied</p>
              <div className="listing-price-rating">
                <span className="listing-price">₹12,000<span className="price-period">/month</span></span>
                <span className="listing-rating">⭐ 4.2</span>
              </div>
            </div>
            <div className="listing-actions">
              <button className="action-btn edit-btn" onClick={() => handleEditListing('metro-coliving')}>Edit</button>
              <button className="action-btn bookings-btn disabled">Bookings</button>
            </div>
            <div className="listing-toggle">
              <span className="toggle-label">Listing Status</span>
              <div className="toggle-switch inactive">
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>

          <div className="add-listing-card" onClick={handleAddListing}>
            <div className="add-listing-icon">
              <span>+</span>
            </div>
            <h3>Add New Listing</h3>
            <p>List a new PG or hostel and start getting bookings</p>
            <button className="get-started-btn">Get Started</button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section quick-actions-section">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <p className="quick-actions-subtitle">Manage your properties efficiently</p>
        <div className="quick-actions-grid">
          <div className="quick-action-card green" onClick={handleAddListing}>
            <div className="icon-bg"><FaSearch /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>Add New Listing</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">List your new PG</p>
              <div className="accent-bar green"></div>
            </div>
          </div>
          <div className="quick-action-card yellow">
            <div className="icon-bg"><FaUser /></div>
            <div className="action-content">
              <div className="action-title-row">
                <h3>Manage Tenants</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">View tenant details</p>
              <div className="accent-bar yellow"></div>
            </div>
          </div>
          <div className="quick-action-card green">
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
                <h3>View Reviews</h3>
                <FaArrowRight className="action-arrow" />
              </div>
              <p className="action-desc">Check tenant feedback</p>
              <div className="accent-bar pink"></div>
            </div>
          </div>
          <div className="quick-action-card gray">
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
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="section">
        <h2>Recent Bookings</h2>
        <div className="card-grid">
          <div className="card">
            <div className="status-label status-booked">Booked</div>
            <h3>Priya Sharma</h3>
            <p><FaMapMarkerAlt /> Sunshine PG</p>
            <p><FaRegCalendarAlt /> Dec 2024 - Jun 2025</p>
            <p>₹8,500 - Paid</p>
            <button className="view-all-btn">View Details</button>
          </div>
          <div className="card">
            <div className="status-label status-booked">Booked</div>
            <h3>Rahul Kumar</h3>
            <p><FaMapMarkerAlt /> Elite Hostel</p>
            <p><FaRegCalendarAlt /> Jan 2025 - Dec 2025</p>
            <p>₹15,000 - Pending</p>
            <button className="view-all-btn">View Details</button>
          </div>
        </div>
      </section>

      {/* Performance Overview */}
      <section className="section">
        <div className="performance-header">
          <h2>Performance Overview</h2>
          <p>Track your business growth and key metrics</p>
        </div>
        
        {/* Stat Cards */}
        <div className="performance-stats">
          <div className="performance-stat-card">
            <div className="stat-icon teal">
              <FaRegCalendarAlt />
            </div>
            <div className="stat-content">
              <div className="stat-main">
                <span className="stat-number">47</span>
                <div className="stat-change">
                  <span className="change-arrow">↗</span>
                  <span className="change-percent">+12%</span>
                </div>
              </div>
              <span className="stat-label">Total Bookings</span>
            </div>
          </div>
          
          <div className="performance-stat-card">
            <div className="stat-icon blue">
              <FaUser />
            </div>
            <div className="stat-content">
              <div className="stat-main">
                <span className="stat-number">85%</span>
                <div className="stat-change">
                  <span className="change-arrow">↗</span>
                  <span className="change-percent">+5%</span>
                </div>
              </div>
              <span className="stat-label">Average Occupancy</span>
            </div>
          </div>
          
          <div className="performance-stat-card">
            <div className="stat-icon green">
              <FaCreditCard />
            </div>
            <div className="stat-content">
              <div className="stat-main">
                <span className="stat-number">₹1,24,500</span>
                <div className="stat-change">
                  <span className="change-arrow">↗</span>
                  <span className="change-percent">+18%</span>
                </div>
              </div>
              <span className="stat-label">Monthly Revenue</span>
            </div>
          </div>
          
          <div className="performance-stat-card">
            <div className="stat-icon yellow">
              <FaHeart />
            </div>
            <div className="stat-content">
              <div className="stat-main">
                <span className="stat-number">4.7</span>
                <div className="stat-change">
                  <span className="change-arrow">↗</span>
                  <span className="change-percent">+0.2</span>
                </div>
              </div>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
        
        {/* Bar Charts */}
        <div className="charts-container">
          <div className="chart-card">
            <h3>Monthly Bookings</h3>
            <div className="chart-bars">
              <div className="chart-bar">
                <span className="bar-label">Jan</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '68%'}}></div>
                </div>
                <span className="bar-value">32</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Feb</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '81%'}}></div>
                </div>
                <span className="bar-value">38</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Mar</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '89%'}}></div>
                </div>
                <span className="bar-value">42</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Apr</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '96%'}}></div>
                </div>
                <span className="bar-value">45</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">May</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '87%'}}></div>
                </div>
                <span className="bar-value">41</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Jun</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '100%'}}></div>
                </div>
                <span className="bar-value">47</span>
              </div>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Monthly Revenue</h3>
            <div className="chart-bars">
              <div className="chart-bar">
                <span className="bar-label">Jan</span>
                <div className="bar-container">
                  <div className="bar-fill revenue" style={{width: '69%'}}></div>
                </div>
                <span className="bar-value">₹98k</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Feb</span>
                <div className="bar-container">
                  <div className="bar-fill revenue" style={{width: '81%'}}></div>
                </div>
                <span className="bar-value">₹115k</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Mar</span>
                <div className="bar-container">
                  <div className="bar-fill revenue" style={{width: '90%'}}></div>
                </div>
                <span className="bar-value">₹128k</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Apr</span>
                <div className="bar-container">
                  <div className="bar-fill revenue" style={{width: '95%'}}></div>
                </div>
                <span className="bar-value">₹135k</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">May</span>
                <div className="bar-container">
                  <div className="bar-fill revenue" style={{width: '88%'}}></div>
                </div>
                <span className="bar-value">₹125k</span>
              </div>
              <div className="chart-bar">
                <span className="bar-label">Jun</span>
                <div className="bar-container">
                  <div className="bar-fill revenue" style={{width: '100%'}}></div>
                </div>
                <span className="bar-value">₹142k</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>
    </div>
  );
};

export default OwnerDashboard;
