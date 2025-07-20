import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaCheck, FaTimes, FaStar, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

// Mock data for specific listing bookings
const mockListingBookings = {
  'elite-girls-hostel': [
    {
      id: 1,
      tenantName: "Priya Sharma",
      tenantEmail: "priya.sharma@email.com",
      tenantPhone: "+91 98765 43210",
      tenantRating: 4.8,
      checkInDate: "15 July 2025",
      checkOutDate: "15 Dec 2025",
      requestDate: "10 June 2025",
      status: "pending",
      sharing: "Double Sharing",
      price: 15000,
      message: "Hi, I'm interested in your PG. I'm a working professional and looking for a clean, safe accommodation.",
      tenantImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      tenantName: "Aarti Mehta",
      tenantEmail: "aarti.mehta@email.com",
      tenantPhone: "+91 91234 56789",
      tenantRating: 4.5,
      checkInDate: "20 July 2025",
      checkOutDate: "20 Dec 2025",
      requestDate: "12 June 2025",
      status: "confirmed",
      sharing: "Single Sharing",
      price: 15000,
      message: "Looking for a quiet place to stay while working in the IT sector. Your PG seems perfect!",
      tenantImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      tenantName: "Meera Reddy",
      tenantEmail: "meera.reddy@email.com",
      tenantPhone: "+91 54321 09876",
      tenantRating: 4.7,
      checkInDate: "5 August 2025",
      checkOutDate: "5 Jan 2026",
      requestDate: "18 June 2025",
      status: "pending",
      sharing: "Triple Sharing",
      price: 15000,
      message: "I'm a working professional looking for a premium accommodation. Your PG looks perfect!",
      tenantImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ],
  'sunshine-pg-for-boys-pune': [
    {
      id: 4,
      tenantName: "Rahul Kumar",
      tenantEmail: "rahul.kumar@email.com",
      tenantPhone: "+91 87654 32109",
      tenantRating: 4.3,
      checkInDate: "25 July 2025",
      checkOutDate: "25 Dec 2025",
      requestDate: "15 June 2025",
      status: "confirmed",
      sharing: "Double Sharing",
      price: 8500,
      message: "I'm a student looking for affordable accommodation near my college. Your PG seems perfect!",
      tenantImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      tenantName: "Amit Patel",
      tenantEmail: "amit.patel@email.com",
      tenantPhone: "+91 76543 21098",
      tenantRating: 4.6,
      checkInDate: "1 August 2025",
      checkOutDate: "1 Jan 2026",
      requestDate: "20 June 2025",
      status: "pending",
      sharing: "Single Sharing",
      price: 8500,
      message: "Looking for a clean and safe place to stay. Your PG looks great!",
      tenantImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ],
  'metro-co-living-space': [
    {
      id: 6,
      tenantName: "Sneha Singh",
      tenantEmail: "sneha.singh@email.com",
      tenantPhone: "+91 65432 10987",
      tenantRating: 4.4,
      checkInDate: "10 August 2025",
      checkOutDate: "10 Feb 2026",
      requestDate: "25 June 2025",
      status: "cancelled",
      sharing: "Triple Sharing",
      price: 12000,
      message: "Interested in your co-living space. Can you provide more details about the facilities?",
      tenantImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ]
};

const ListingBookings = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get bookings for specific listing
    setTimeout(() => {
      const listingRequests = mockListingBookings[listingId] || [];
      setRequests(listingRequests);
      setLoading(false);
    }, 1000);
  }, [listingId]);

  const handleConfirmBooking = (requestId) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: 'confirmed' }
          : request
      )
    );
  };

  const handleCancelBooking = (requestId) => {
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
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading booking requests...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer', 
            marginRight: '1rem',
            color: '#666'
          }}
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>Booking Requests</h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
            Elite Girls Hostel, Mumbai - Andheri West
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px #eee', textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#7c5ff0' }}>{requests.length}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Total Requests</p>
        </div>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px #eee', textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#FFA500' }}>{requests.filter(r => r.status === 'pending').length}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Pending</p>
        </div>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px #eee', textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#4CAF50' }}>{requests.filter(r => r.status === 'confirmed').length}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Confirmed</p>
        </div>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px #eee', textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#F44336' }}>{requests.filter(r => r.status === 'cancelled').length}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Cancelled</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              background: filter === 'all' ? '#7c5ff0' : '#f0f0f0',
              color: filter === 'all' ? '#fff' : '#333'
            }}
            onClick={() => setFilter('all')}
          >
            All ({requests.length})
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              background: filter === 'pending' ? '#FFA500' : '#f0f0f0',
              color: filter === 'pending' ? '#fff' : '#333'
            }}
            onClick={() => setFilter('pending')}
          >
            Pending ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              background: filter === 'confirmed' ? '#4CAF50' : '#f0f0f0',
              color: filter === 'confirmed' ? '#fff' : '#333'
            }}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({requests.filter(r => r.status === 'confirmed').length})
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              background: filter === 'cancelled' ? '#F44336' : '#f0f0f0',
              color: filter === 'cancelled' ? '#fff' : '#333'
            }}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled ({requests.filter(r => r.status === 'cancelled').length})
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredRequests.map((request) => (
          <div key={request.id} style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px #eee', 
            padding: '1.5rem',
            border: `2px solid ${getStatusColor(request.status)}20`
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img 
                src={request.tenantImage} 
                alt={request.tenantName} 
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  marginRight: '1rem',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: '#333' }}>{request.tenantName}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <FaStar style={{ color: '#FFD700' }} />
                  <span style={{ color: '#666' }}>{request.tenantRating}</span>
                </div>
              </div>
              <div style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '20px', 
                color: '#fff',
                fontWeight: 'bold',
                background: getStatusColor(request.status)
              }}>
                {getStatusText(request.status)}
              </div>
            </div>

            {/* Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <p style={{ margin: '0.5rem 0', color: '#666' }}>
                  <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                  {request.checkInDate} - {request.checkOutDate}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#666' }}>
                  <FaEnvelope style={{ marginRight: '0.5rem' }} />
                  {request.tenantEmail}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#666' }}>
                  <FaPhone style={{ marginRight: '0.5rem' }} />
                  {request.tenantPhone}
                </p>
              </div>
              <div>
                <p style={{ margin: '0.5rem 0', color: '#333', fontWeight: 'bold' }}>
                  {request.sharing}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#333', fontWeight: 'bold' }}>
                  ₹{request.price.toLocaleString()}/month
                </p>
                <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  Requested on {request.requestDate}
                </p>
              </div>
            </div>

            {/* Message */}
            <div style={{ 
              background: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem' 
            }}>
              <h5 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Message from tenant:</h5>
              <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>{request.message}</p>
            </div>

            {/* Action Buttons */}
            {request.status === 'pending' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    background: '#4CAF50',
                    color: '#fff',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={() => handleConfirmBooking(request.id)}
                >
                  <FaCheck /> Confirm Booking
                </button>
                <button 
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    background: '#F44336',
                    color: '#fff',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={() => handleCancelBooking(request.id)}
                >
                  <FaTimes /> Cancel Request
                </button>
              </div>
            )}

            {request.status === 'confirmed' && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: '#4CAF50', 
                fontWeight: 'bold' 
              }}>
                <FaCheck /> Booking confirmed
              </div>
            )}

            {request.status === 'cancelled' && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: '#F44336', 
                fontWeight: 'bold' 
              }}>
                <FaTimes /> Request cancelled
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: '#fff', 
          borderRadius: '12px', 
          boxShadow: '0 2px 8px #eee' 
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>No requests found</h3>
          <p style={{ margin: 0, color: '#666' }}>
            There are no {filter === 'all' ? '' : filter} requests for this listing at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListingBookings; 