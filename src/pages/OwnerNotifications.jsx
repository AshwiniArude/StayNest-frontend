import React, { useState } from 'react';
import { FaBell, FaChevronDown, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import '../styles/OwnerNotifications.css';

const mockNotifications = [
  {
    id: 1,
    type: 'booking',
    isNew: true,
    tenant: 'Shreya Newaskar',
    pgName: 'Skyline PG for Girls, Koramangala',
    checkIn: '15 July 2025',
    checkOut: '15 Dec 2025',
    location: 'Koramangala, Bangalore',
    timestamp: '2 mins ago',
    status: 'pending',
  },
  // Add more mock notifications as needed
];

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Bookings', value: 'booking' },
  { label: 'Reviews', value: 'review' },
  { label: 'System Alerts', value: 'system' },
];

const OwnerNotifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);
  const [toast, setToast] = useState('');

  const handleAction = (id, action) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: action, isNew: false } : n
      )
    );
    setToast(
      action === 'accepted'
        ? '✅ Booking accepted successfully!'
        : '❌ Booking declined.'
    );
    setTimeout(() => setToast(''), 1800);
  };

  const filtered =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="owner-notifications-page">
      {toast && <div className="notif-toast">{toast}</div>}
      <div className="notif-header-section">
        <div className="notif-header">
          <div className="notif-title-row">
            <h1 className="notif-title">Notifications</h1>
            <div className="notif-bell-wrapper">
              <FaBell className="notif-bell" />
              {notifications.some((n) => n.isNew) && <span className="notif-dot" />}
            </div>
          </div>
          <div className="notif-filter">
            <span>Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="notif-filter-dropdown"
            >
              {FILTERS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="notif-filter-arrow" />
          </div>
        </div>
      </div>

      <div className="notif-list">
        {filtered.length === 0 && (
          <div className="notif-empty">No notifications found.</div>
        )}
        {filtered.map((notif) => (
          <div
            key={notif.id}
            className={`notif-card notif-slide-in ${notif.isNew ? 'notif-new' : ''} ${notif.status !== 'pending' ? 'notif-read' : ''}`}
          >
            <div className="notif-icon-block">🏠</div>
            <div className="notif-content">
              <div className="notif-main-row">
                <span className="notif-main-title">New Booking Request</span>
                {notif.isNew && <span className="notif-badge">New</span>}
              </div>
              <div className="notif-subtext">
                <strong>{notif.tenant}</strong> has requested to book your PG: <strong>{notif.pgName}</strong>.
              </div>
              <div className="notif-details">
                <span><FaCalendarAlt /> Check-in: {notif.checkIn}</span>
                <span><FaCalendarAlt /> Check-out: {notif.checkOut}</span>
                <span><FaUser /> Tenant: {notif.tenant}</span>
                <span><FaMapMarkerAlt /> {notif.location}</span>
              </div>
              <div className="notif-actions-row">
                {notif.status === 'pending' ? (
                  <>
                    <button
                      className="notif-btn accept"
                      onClick={() => handleAction(notif.id, 'accepted')}
                    >
                      Accept Booking
                    </button>
                    <button
                      className="notif-btn decline"
                      onClick={() => handleAction(notif.id, 'declined')}
                    >
                      Decline
                    </button>
                  </>
                ) : notif.status === 'accepted' ? (
                  <span className="notif-status accepted">Accepted</span>
                ) : (
                  <span className="notif-status declined">Declined</span>
                )}
                <span className="notif-timestamp">
                  <FaClock /> {notif.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerNotifications; 