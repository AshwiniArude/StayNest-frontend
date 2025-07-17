import React from 'react';
import '../styles/OwnerDashboard.css';

const OwnerDashboard = () => {
  return (
    <div className="owner-dashboard">
      {/* Header Welcome Section */}
      <div className="dashboard-header">
        <h1>Welcome back, Mr. Mehta 👋</h1>
        <p>Here’s a quick look at your PG performance.</p>
        <div className="dashboard-stats">
          <div className="stat-box">
            <span>3</span>
            <label>Active Listings</label>
          </div>
          <div className="stat-box">
            <span>12</span>
            <label>Tenants</label>
          </div>
          <div className="stat-box">
            <span>4.7</span>
            <label>Average Rating</label>
          </div>
          <div className="stat-box">
            <span>85%</span>
            <label>Occupancy</label>
          </div>
        </div>
      </div>

      {/* My PG Listings Section */}
      <div className="pg-listings">
        <div className="listings-header">
          <h2>My PG Listings</h2>
          <button className="add-button">+ Add New Listing</button>
        </div>
        <div className="pg-cards">
          {[1, 2, 3].map((item) => (
            <div className="pg-card" key={item}>
              <img src="/placeholder.jpg" alt="PG" />
              <h3>PG Residency #{item}</h3>
              <p>Location: Andheri West</p>
              <p className="price">₹8,500/month</p>
              <div className="card-footer">
                <span>7/10 Occupied</span>
                <button>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Overview */}
      <div className="quick-overview">
        <div className="overview-box">
          <h4>Occupancy</h4>
          <span>85%</span>
        </div>
        <div className="overview-box">
          <h4>Total Bookings</h4>
          <span>19</span>
        </div>
        <div className="overview-box">
          <h4>Revenue</h4>
          <span>₹38,500</span>
        </div>
        <div className="overview-box">
          <h4>Avg Rating</h4>
          <span>4.3 ⭐</span>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="recent-bookings">
        <h2>Recent Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Property</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Priya Sharma</td>
              <td>Sunshine PG</td>
              <td>Dec 2024 - Jun 2025</td>
              <td><span className="status-booked">Booked</span></td>
              <td>Paid</td>
              <td>₹8,500</td>
              <td><button>View</button></td>
            </tr>
            <tr>
              <td>Rahul Kumar</td>
              <td>Elite Hostel</td>
              <td>Jan 2025 - Dec 2025</td>
              <td><span className="status-booked">Booked</span></td>
              <td>Pending</td>
              <td>₹15,000</td>
              <td><button>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary + Reviews */}
      <div className="two-column">
        <div className="summary-card">
          <h3>Booking Summary</h3>
          <p>3 Active Bookings</p>
          <p>2 Pending Payments</p>
          <p>₹38,500 Monthly Revenue</p>
        </div>
        <div className="summary-card">
          <h3>Latest Reviews</h3>
          <p>⭐ 4.5 - "Great PG! Clean rooms."</p>
          <p>⭐ 4.0 - "Owner is responsive."</p>
          <p>⭐ 5.0 - "Best PG in the area."</p>
        </div>
      </div>

      {/* Performance + Actions */}
      <div className="two-column">
        <div className="summary-card">
          <h3>Performance Goals</h3>
          <p>Occupancy: 85% (Target: 90%)</p>
          <p>Rating: 4.7 (Goal: 4.8+)</p>
          <p>Monthly Revenue: ₹38.5K (Goal: ₹50K)</p>
        </div>
        <div className="summary-card">
          <h3>Quick Actions</h3>
          <button className="cta-button">Add New Listing</button><br/>
          <button className="cta-button">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
