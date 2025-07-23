import React, { useState } from 'react';
import { FaHome, FaBell, FaBook, FaStar, FaCog, FaSignOutAlt, FaUserCircle, FaCalendarAlt, FaMoneyBill, FaInfoCircle, FaSearch } from 'react-icons/fa';
import '../styles/TenantDashboard.css'; // You may need to create or update this CSS file

const mockNotifications = [
  {
    id: 1,
    type: 'booking',
    title: 'Your booking has been confirmed!',
    message: 'Your booking at Skyline PG, Koramangala from 15 July is confirmed. Welcome!',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'We have received your payment for the booking at GreenNest PG.',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 3,
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on 20th July, 2AM - 4AM. Some features may be unavailable.',
    timestamp: '3 days ago',
    read: true,
  },
];

const notificationIcons = {
  booking: <FaCalendarAlt color="#2AB7CA" />,
  payment: <FaMoneyBill color="#FFC857" />,
  system: <FaInfoCircle color="#2AB7CA" />,
};

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'booking', label: 'Booking Updates' },
  { value: 'payment', label: 'Payments' },
  { value: 'system', label: 'System' },
];

const TenantDashboardNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Filter and search logic
  const filteredNotifications = mockNotifications.filter(n =>
    (activeFilter === 'all' || n.type === activeFilter) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase()))
  );

  // Count unread
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  // Responsive tab state (for mobile)
  const [mobileTab, setMobileTab] = useState('booking');
  const mobileTabs = [
    { value: 'booking', label: 'Bookings' },
    { value: 'payment', label: 'Payments' },
    { value: 'system', label: 'System' },
  ];

  // Responsive check
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="tenant-dashboard-root">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">StayNest</div>
        <nav className="sidebar-nav">
          <a href="/tenant/dashboard" className="sidebar-link"><FaHome /> Home</a>
          <a href="/tenant/bookings" className="sidebar-link"><FaBook /> My Bookings</a>
          <a href="/tenant/notifications" className="sidebar-link active"><FaBell /> Notifications</a>
          <a href="/tenant/reviews" className="sidebar-link"><FaStar /> Reviews</a>
          <a href="/tenant/account-settings" className="sidebar-link"><FaCog /> Account Settings</a>
          <a href="/logout" className="sidebar-link"><FaSignOutAlt /> Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="welcome-message">Hello, Shreya <span role="img" aria-label="wave">👋</span></div>
          <div className="header-actions">
            <div className="profile-dropdown">
              <FaUserCircle className="profile-icon" />
              {/* Dropdown menu can be implemented here */}
            </div>
            <div className="notifications-bell">
              <FaBell />
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        <section className="notifications-panel">
          <h2>Notifications</h2>
          <p className="subtitle">Stay updated on your bookings and account activity.</p>

          {/* Filters & Search */}
          {!isMobile ? (
            <div className="filters-row">
              <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="filter-dropdown">
                {filterOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="mobile-tabs">
              {mobileTabs.map(tab => (
                <button
                  key={tab.value}
                  className={`mobile-tab-btn${mobileTab === tab.value ? ' active' : ''}`}
                  onClick={() => { setMobileTab(tab.value); setActiveFilter(tab.value); }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Notification Cards */}
          <div className="notifications-list">
            {filteredNotifications.length === 0 ? (
              <div className="no-notifications">
                <FaBell className="no-bell" />
                <div className="no-msg">You’re all caught up! 🎉</div>
              </div>
            ) : (
              filteredNotifications.map(n => (
                <div
                  key={n.id}
                  className={`notification-card${n.read ? ' read' : ' unread'}`}
                  onClick={() => setSelectedNotification(n)}
                >
                  <div className="notif-icon">{notificationIcons[n.type]}</div>
                  <div className="notif-content">
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-message">{n.message}</div>
                  </div>
                  <div className="notif-meta">
                    <span className="notif-time">{n.timestamp}</span>
                    <span className={`status-dot${n.read ? ' read' : ' unread'}`}></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Notification Modal */}
      {selectedNotification && (
        <div className="notif-modal-overlay" onClick={() => setSelectedNotification(null)}>
          <div className="notif-modal" onClick={e => e.stopPropagation()}>
            <div className="notif-modal-header">
              {notificationIcons[selectedNotification.type]}
              <span className="notif-modal-title">{selectedNotification.title}</span>
              <span className="notif-modal-time">{selectedNotification.timestamp}</span>
            </div>
            <div className="notif-modal-message">{selectedNotification.message}</div>
            <button className="notif-modal-close" onClick={() => setSelectedNotification(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboardNotifications; 