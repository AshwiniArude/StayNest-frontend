import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TenantDashboardNavbar from '../components/TenantDashboardNavbar';
import { FaArrowLeft, FaMapMarkerAlt, FaStar, FaRegCalendarAlt, FaBed, FaHashtag, FaCalendarCheck, FaCreditCard, FaFilePdf, FaEnvelope, FaComments, FaCheckCircle, FaClock, FaTimesCircle, FaChevronDown, FaChevronUp, FaHeadset } from 'react-icons/fa';
import '../styles/BookingDetails.css';

const BookingDetails = () => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [collapsed, setCollapsed] = useState({
    pg: false,
    summary: false,
    actions: false,
    support: false,
  });

  // Responsive handler
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data
  const booking = {
    pg: {
      name: 'Skyline PG for Girls, Koramangala',
      location: 'Koramangala, Bangalore',
      rating: 4.5,
      reviews: 120,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    },
    status: 'Booked', // Booked | Pending | Cancelled
    checkIn: '15 July 2025',
    checkOut: '15 Dec 2025',
    roomType: 'Twin Sharing',
    bookingId: '#SN-2025-09182',
    bookingDate: '10 July 2025',
    amountPaid: 25000,
    owner: {
      name: 'Mrs. Sunita Patel',
      email: 'owner@skylinepg.com',
    },
  };

  // Collapsible card handler
  const toggleCollapse = (key) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Status color
  const statusColor = booking.status === 'Booked' ? '#1ec28b' : booking.status === 'Pending' ? '#ff9f59' : '#FF6B6B';
  const statusIcon = booking.status === 'Booked' ? <FaCheckCircle color={statusColor} /> : booking.status === 'Pending' ? <FaClock color={statusColor} /> : <FaTimesCircle color={statusColor} />;

  // Actions
  const handleDownloadReceipt = () => {
    // Placeholder for download logic
    alert('Download receipt PDF');
  };
  const handleContactOwner = () => {
    window.location.href = `mailto:${booking.owner.email}`;
  };
  const handleEarlyCheckout = () => {
    alert('Request for early checkout sent!');
  };
  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };
  const confirmCancel = () => {
    setShowCancelModal(false);
    alert('Booking cancelled.');
  };
  const handleLeaveReview = () => {
    navigate('/my-reviews');
  };
  const handleChatSupport = () => {
    alert('Chat with support coming soon!');
  };
  const handleRaiseTicket = () => {
    alert('Raise a support ticket!');
  };

  // Collapsible wrapper
  const Card = ({ title, icon, children, sectionKey, defaultOpen = true }) => (
    <div className={`bd-card fade-in${isMobile ? ' collapsible' : ''}${collapsed[sectionKey] ? ' collapsed' : ''}`}
      onMouseEnter={e => e.currentTarget.classList.add('lift')}
      onMouseLeave={e => e.currentTarget.classList.remove('lift')}
    >
      <div className="bd-card-header" onClick={() => isMobile && toggleCollapse(sectionKey)}>
        <div className="bd-card-title">{icon} {title}</div>
        {isMobile && (
          <span className="bd-card-chevron">{collapsed[sectionKey] ? <FaChevronDown color="#7c5ff0" /> : <FaChevronUp color="#7c5ff0" />}</span>
        )}
      </div>
      {(!isMobile || !collapsed[sectionKey]) && <div className="bd-card-content">{children}</div>}
    </div>
  );

  return (
    <>
      <div className="booking-details-bg">
        {/* Header */}
        <div className="bd-header">
          <button className="bd-back-btn" onClick={() => navigate(-1)}><FaArrowLeft color="#7c5ff0" /> My Bookings</button>
          <h1>Booking Details</h1>
          <p className="bd-subtitle">Here are the full details of your stay.</p>
        </div>

        {/* PG Info Card */}
        <Card title="PG/Hostel Information" icon={<FaBed color="#7c5ff0" />} sectionKey="pg">
          <div className="bd-pg-info">
            <div className="bd-pg-img">
              <img src={booking.pg.image} alt={booking.pg.name} />
            </div>
            <div className="bd-pg-meta">
              <h2>{booking.pg.name}</h2>
              <div className="bd-pg-location"><FaMapMarkerAlt color="#7c5ff0" /> {booking.pg.location}</div>
              <div className="bd-pg-rating"><FaStar color="#ff9f59" /> {booking.pg.rating} <span className="bd-pg-reviews">({booking.pg.reviews} reviews)</span></div>
            </div>
          </div>
        </Card>

        {/* Booking Summary Card */}
        <Card title="Booking Summary" icon={<FaRegCalendarAlt color="#7c5ff0" />} sectionKey="summary">
          <div className="bd-summary-grid">
            <div className="bd-summary-row">
              <span>Status</span>
              <span className="bd-status" style={{color:statusColor, fontWeight:600}}>{statusIcon} {booking.status}</span>
            </div>
            <div className="bd-summary-row"><span>Check-In Date</span><span><FaRegCalendarAlt color="#7c5ff0" /> {booking.checkIn}</span></div>
            <div className="bd-summary-row"><span>Check-Out Date</span><span><FaRegCalendarAlt color="#7c5ff0" /> {booking.checkOut}</span></div>
            <div className="bd-summary-row"><span>Room Type</span><span><FaBed color="#7c5ff0" /> {booking.roomType}</span></div>
            <div className="bd-summary-row"><span>Booking ID</span><span><FaHashtag color="#7c5ff0" /> {booking.bookingId}</span></div>
            <div className="bd-summary-row"><span>Booking Date</span><span><FaCalendarCheck color="#7c5ff0" /> {booking.bookingDate}</span></div>
            <div className="bd-summary-row"><span>Amount Paid</span><span><FaCreditCard color="#1ec28b" /> ₹{booking.amountPaid.toLocaleString()}</span></div>
          </div>
          <div className="bd-summary-actions">
            <button className="bd-btn bd-btn-pdf" onClick={handleDownloadReceipt}><FaFilePdf color="#7c5ff0" /> Download Receipt</button>
            <button className="bd-btn bd-btn-contact" onClick={handleContactOwner}><FaEnvelope color="#ff9f59" /> Contact PG Owner</button>
          </div>
        </Card>

        {/* Actions Card (only if active) */}
        {booking.status === 'Booked' && (
          <Card title="Actions" icon={<FaCheckCircle color="#1ec28b" />} sectionKey="actions">
            <div className="bd-actions">
              <button className="bd-btn bd-btn-early" onClick={handleEarlyCheckout}><FaClock color="#7c5ff0" /> Request Early Checkout</button>
              <button className="bd-btn bd-btn-cancel" onClick={handleCancelBooking}><FaTimesCircle color="#FF6B6B" /> Cancel Booking</button>
              <button className="bd-btn bd-btn-review" onClick={handleLeaveReview}><FaStar color="#ff9f59" /> Leave a Review</button>
            </div>
          </Card>
        )}

        {/* Support Card */}
        <Card title="Need Help?" icon={<FaHeadset color="#7c5ff0" />} sectionKey="support">
          <div className="bd-support">
            <div className="bd-support-actions">
              <button className="bd-btn bd-btn-support" onClick={handleChatSupport}><FaComments color="#7c5ff0" /> Chat with Support</button>
              <button className="bd-btn bd-btn-support" onClick={handleRaiseTicket}><FaEnvelope color="#7c5ff0" /> Raise a Ticket</button>
            </div>
            <div className="bd-faqs">
              <h4>FAQs</h4>
              <ul>
                <li>How do I cancel my booking and get a refund?</li>
                <li>When will I receive my booking receipt?</li>
                <li>How do I contact the PG owner?</li>
                <li>What if I want to change my check-in date?</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="bd-modal-overlay">
            <div className="bd-modal">
              <h3>Cancel Booking?</h3>
              <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
              <div className="bd-modal-actions">
                <button className="bd-btn bd-btn-cancel" onClick={confirmCancel}><FaTimesCircle color="#FF6B6B" /> Yes, Cancel</button>
                <button className="bd-btn" onClick={()=>setShowCancelModal(false)}><FaArrowLeft color="#7c5ff0" /> No, Go Back</button>
              </div>
            </div>
          </div>
        )}

        {/* Sticky mobile actions */}
        {isMobile && booking.status === 'Booked' && (
          <div className="bd-sticky-actions">
            <button className="bd-btn bd-btn-support" onClick={handleChatSupport}><FaHeadset color="#7c5ff0" /> Help</button>
            <button className="bd-btn bd-btn-cancel" onClick={handleCancelBooking}><FaTimesCircle color="#FF6B6B" /> Cancel</button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingDetails; 