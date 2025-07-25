import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaStar } from 'react-icons/fa';
import '../styles/ManageBookings.css';
import bookingService from '../services/BookingService';

const ManageBookings = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled
  const [loading, setLoading] = useState(true);

  // Mock data for booking requests
  // useEffect(() => {
  //   // Simulate API call
  //   setTimeout(() => {
  //     // setRequests([
  //     //   {
  //     //     id: 1,
  //     //     tenantName: "Priya Sharma",
  //     //     tenantEmail: "priya.sharma@email.com",
  //     //     tenantPhone: "+91 98765 43210",
  //     //     tenantRating: 4.8,
  //     //     pgName: "Skyline PG for Girls, Koramangala",
  //     //     location: "Koramangala, Bangalore",
  //     //     checkInDate: "15 July 2025",
  //     //     checkOutDate: "15 Dec 2025",
  //     //     requestDate: "10 June 2025",
  //     //     status: "pending",
  //     //     sharing: "Double Sharing",
  //     //     price: 12500,
  //     //     message: "Hi, I'm interested in your PG. I'm a working professional and looking for a clean, safe accommodation.",
  //     //     tenantImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  //     //   },
  //     //   {
  //     //     id: 2,
  //     //     tenantName: "Rahul Kumar",
  //     //     tenantEmail: "rahul.kumar@email.com",
  //     //     tenantPhone: "+91 87654 32109",
  //     //     tenantRating: 4.5,
  //     //     pgName: "Urban Nest Co-living, Gachibowli",
  //     //     location: "Gachibowli, Hyderabad",
  //     //     checkInDate: "20 July 2025",
  //     //     checkOutDate: "20 Dec 2025",
  //     //     requestDate: "12 June 2025",
  //     //     status: "confirmed",
  //     //     sharing: "Single Sharing",
  //     //     price: 9800,
  //     //     message: "Looking for a quiet place to stay while working in the IT sector. Your PG seems perfect!",
  //     //     tenantImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  //     //   },
  //     //   {
  //     //     id: 3,
  //     //     tenantName: "Anjali Patel",
  //     //     tenantEmail: "anjali.patel@email.com",
  //     //     tenantPhone: "+91 76543 21098",
  //     //     tenantRating: 4.9,
  //     //     pgName: "Comfort Zone PG, Andheri West",
  //     //     location: "Andheri West, Mumbai",
  //     //     checkInDate: "25 July 2025",
  //     //     checkOutDate: "25 Dec 2025",
  //     //     requestDate: "14 June 2025",
  //     //     status: "pending",
  //     //     sharing: "Triple Sharing",
  //     //     price: 15000,
  //     //     message: "I'm a student and need accommodation near my college. Your PG location is ideal.",
  //     //     tenantImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  //     //   },
  //     //   {
  //     //     id: 4,
  //     //     tenantName: "Vikram Singh",
  //     //     tenantEmail: "vikram.singh@email.com",
  //     //     tenantPhone: "+91 65432 10987",
  //     //     tenantRating: 4.2,
  //     //     pgName: "Student Haven, Sector 18",
  //     //     location: "Sector 18, Noida",
  //     //     checkInDate: "30 July 2025",
  //     //     checkOutDate: "30 Dec 2025",
  //     //     requestDate: "16 June 2025",
  //     //     status: "cancelled",
  //     //     sharing: "Double Sharing",
  //     //     price: 8500,
  //     //     message: "Interested in your PG. Can you provide more details about the facilities?",
  //     //     tenantImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  //     //   },
  //     //   {
  //     //     id: 5,
  //     //     tenantName: "Meera Reddy",
  //     //     tenantEmail: "meera.reddy@email.com",
  //     //     tenantPhone: "+91 54321 09876",
  //     //     tenantRating: 4.7,
  //     //     pgName: "Elite Girls Hostel, HSR Layout",
  //     //     location: "HSR Layout, Bangalore",
  //     //     checkInDate: "5 August 2025",
  //     //     checkOutDate: "5 Jan 2026",
  //     //     requestDate: "18 June 2025",
  //     //     status: "confirmed",
  //     //     sharing: "Single Sharing",
  //     //     price: 13500,
  //     //     message: "I'm a working professional looking for a premium accommodation. Your PG looks perfect!",
  //     //     tenantImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  //     //   }
  //     // ]);
  //     console.log("Fetching booking requests for owner ID:", id);
  //     const res = await bookingService.getBookingsByOWner();
  //     console.log("Fetched booking requests:", res.data);
  //     setRequests(res.data);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};


  useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("Fetching booking requests for owner");
      const res = await bookingService.getBookingsByOWner();
      console.log("Fetched booking requests:", res);

      const mapped = res.map(req => {
        let uiStatus = 'unknown';
        switch (req.status) {
          case 'PENDING': uiStatus = 'pending'; break;
          case 'ACCEPTED':
          case 'CONFIRMED': uiStatus = 'confirmed'; break;
          case 'NOT BOOKED': uiStatus = 'cancelled'; break;
        }

        return {
          id: req.id,
          tenantName: req.tenant?.name,
          tenantEmail: req.tenant?.email,
          tenantPhone: req.tenant?.phoneNumber,
          tenantRating: '4.5',
          tenantImage: 'https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjg4MTI5OThiOTg0ODE5MTkxZGY2YjI0M2RhODkzZGM6ZmlsZV8wMDAwMDAwMDljZTQ2MWY2OGVlZTk2MGNlYjgwOTYyMSIsInRzIjoiNDg3MDI2IiwicCI6InB5aSIsInNpZyI6ImJkNmI4ODIxNzA4ZmZmMWUyM2RmMjU3NzlhYTVlZDdkN2ZhNWJkNmZjMTBhYTk5MTZlYzVkYTEwZmY0NjdhZDAiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==',
          pgName: req.listing?.title,
          location: req.listing?.address,
          sharing: req.listing?.roomType,
          checkInDate: formatDate(req.startDate),
          checkOutDate: formatDate(req.endDate),
          requestDate: new Date(req.id).toLocaleString(),
          price: req.listing?.rent,
          status: uiStatus
        };
      });

      setRequests(mapped);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData(); // <- Don't forget to call the async function!
}, []);

   const handleConfirmBooking = (requestId) => {
    try{
      const res = bookingService.bookingAction(requestId, 'ACCEPT');
      alert("Booking confirmed successfully");
      console.log("Booking confirmed:", res);
    }catch (error) {
      console.error("Failed to confirm booking:", error);}
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: 'confirmed' }
          : request
      )
    );

  };

  const handleCancelBooking = (requestId) => {
    try{
      const res = bookingService.bookingAction(requestId, 'REJECT');
      alert("Booking cancelled successfully");
      console.log("Booking cancelled:", res);
    }catch (error) {
      console.error("Failed to confirm booking:", error);}
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: 'cancelled' }
          : request
      )
    );
  };
  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'confirmed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="manage-bookings-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading booking requests...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="manage-bookings-container">
        <div className="header-section">
          <h1>Manage Booking Requests</h1>
          <p>Review and manage booking requests for your properties</p>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <h3>{requests.length}</h3>
            <p>Total Requests</p>
          </div>
          <div className="stat-card">
            <h3>{requests.filter(r => r.status === 'pending').length}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{requests.filter(r => r.status === 'confirmed').length}</h3>
            <p>Confirmed</p>
          </div>
          <div className="stat-card">
            <h3>{requests.filter(r => r.status === 'cancelled').length}</h3>
            <p>Cancelled</p>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({requests.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({requests.filter(r => r.status === 'pending').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({requests.filter(r => r.status === 'confirmed').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled ({requests.filter(r => r.status === 'cancelled').length})
            </button>
          </div>
        </div>

        <div className="requests-grid">
          {filteredRequests.map((request) => (
            <div key={request.id} className={`request-card ${request.status}`}>
              <div className="request-header">
                <div className="tenant-info">
                  <img 
                    src={request.tenantImage} 
                    alt={request.tenantName} 
                    className="tenant-avatar"
                  />
                  <div className="tenant-details">
                    <h3>{request.tenantName}</h3>
                    <div className="tenant-rating">
                      <FaStar className="star-icon" />
                      <span>{request.tenantRating}</span>
                    </div>
                  </div>
                </div>
                <div className="status-badge" style={{ backgroundColor: getStatusColor(request.status) }}>
                  {getStatusText(request.status)}
                </div>
              </div>

              <div className="property-info">
                <h4>{request.pgName}</h4>
                <p><FaMapMarkerAlt /> {request.location}</p>
                <p><FaCalendarAlt /> {request.checkInDate} - {request.checkOutDate}</p>
                <p className="sharing-info">{request.sharing}</p>
                <p className="price-info">₹{request.price.toLocaleString()}/month</p>
              </div>

              <div className="contact-info">
                <p><FaEnvelope /> {request.tenantEmail}</p>
                <p><FaPhone /> {request.tenantPhone}</p>
                <p><FaClock /> Requested on {request.requestDate}</p>
              </div>

              {request.status === 'pending' && (
                <div className="action-buttons">
                  <button 
                    className="confirm-btn"
                    onClick={() => handleConfirmBooking(request.id)}
                  >
                    <FaCheck /> Confirm Booking
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => handleCancelBooking(request.id)}
                  >
                    <FaTimes /> Cancel Request
                  </button>
                </div>
              )}

              {request.status === 'confirmed' && (
                <div className="confirmed-info">
                  <FaCheck className="confirmed-icon" />
                  <span>Booking confirmed</span>
                </div>
              )}

              {request.status === 'cancelled' && (
                <div className="cancelled-info">
                  <FaTimes className="cancelled-icon" />
                  <span>Request cancelled</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="no-requests">
            <div className="no-requests-icon">📋</div>
            <h3>No requests found</h3>
            <p>There are no {filter === 'all' ? '' : filter} requests at the moment.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageBookings; 