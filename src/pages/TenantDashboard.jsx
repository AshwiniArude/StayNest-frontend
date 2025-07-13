import React from "react";
import "../styles/TenantDashboard.css";
import { FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";


const bookings = [
  {
    id: 1,
    name: "Skyline PG for Girls, Koramangala",
    location: "Koramangala, Bangalore",
    checkIn: "15 July 2025",
    checkOut: "15 Dec 2025",
    status: "Booked",
  },
  {
    id: 2,
    name: "Urban Nest Co-living, Gachibowli",
    location: "Gachibowli, Hyderabad",
    checkIn: "10 Jan 2025",
    checkOut: "10 June 2025",
    status: "Completed",
  },
  {
    id: 3,
    name: "Student Haven, Sector 18",
    location: "Sector 18, Noida",
    checkIn: "20 Aug 2024",
    checkOut: "20 Dec 2024",
    status: "Cancelled",
  },
];

const TenantDashboard = () => {
  return (
    <div className="dashboard-container">
      <section className="hero-section">
        <h1>
          Hi Shreya, welcome back to StayNest! 🌸
        </h1>
        <p>Here’s a quick look at your upcoming stays and reviews.</p>
        <div className="stats-cards">
          <div className="stat-card">
            <h2>2</h2>
            <p>Active Bookings</p>
          </div>
          <div className="stat-card">
            <h2>4.8</h2>
            <p>Avg Rating</p>
          </div>
          <div className="stat-card">
            <h2>8</h2>
            <p>Total Reviews</p>
          </div>
        </div>
      </section>

      <section className="section">
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
              <button className="view-all-btn">View Details</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Quick Actions</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Browse New PGs</h3>
            <p>Discover more amazing places</p>
          </div>
          <div className="card">
            <h3>Update My Profile</h3>
            <p>Keep your info current</p>
          </div>
          <div className="card">
            <h3>Contact Support</h3>
            <p>We're here to help 24/7</p>
          </div>
          <div className="card">
            <h3>Payment History</h3>
            <p>View all transactions</p>
          </div>
          <div className="card">
            <h3>My Favorites</h3>
            <p>Saved PGs & Hostels</p>
          </div>
          <div className="card">
            <h3>Account Settings</h3>
            <p>Privacy & preferences</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>My Reviews & Ratings</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Skyline PG for Girls, Koramangala</h3>
            <p>⭐ 5 - Amazing experience! Clean, safe, and very responsive owner.</p>
          </div>
          <div className="card">
            <h3>Urban Nest Co-living, Gachibowli</h3>
            <p>⭐ 4 - Good facilities. Friendly community and well-maintained.</p>
          </div>
          <div className="card">
            <h3>Student Haven, Sector 18</h3>
            <p>⭐ 3 - Could improve on cleanliness and Wi-Fi. Okay for budget.</p>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>
    </div>
  );
};

export default TenantDashboard;
