import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavbarDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const menuRef = useRef(null); // Ref for the menu container
  const iconRef = useRef(null); // Ref for the menu icon

  const handleLogout = () => {
    console.log("User logged out!");
    setIsMenuOpen(false); // Close menu on logout
    navigate('/'); // Navigate to the home page or login page after logout
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotifications = () => {
    setIsMenuOpen(false);
    navigate('/owner/notifications');
  };

  const handleAccountSettings = () => {
    setIsMenuOpen(false);
    navigate('/account-settings');
  };

  return (
    <>
      {/* Global Styles for the component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f2f5;
          box-sizing: border-box;
        }
        .navbar {
           grid-template-columns: auto 1fr auto
          justify-content: space-between;
          align-items: center;
          background-color: #ffffff;
          padding: 15px 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: fixed; /* Make navbar sticky at the top */
          top: 0;
          left: 0;
          width: 100%;
          z-index: 20; /* Ensure navbar is above other elements */
        }
        .navbar-logo a {
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
        }
        .navbar-center-links {
          display: flex;
          gap: 20px; /* Spacing between links */
        }
        .navbar-center-links a {
          text-decoration: none;
          color: #444;
          font-weight: 500;
          padding: 5px 0;
          position: relative;
          transition: color 0.3s ease;
        }
        .navbar-center-links a:hover {
          color: #2563eb; /* Blue on hover */
        }
        .navbar-center-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #2563eb; /* Blue underline */
          transition: width 0.3s ease;
        }
        .navbar-center-links a:hover::after {
          width: 100%;
        }
        .navbar-auth {
            display: flex;
            align-items: center;
            gap: 15px; /* Space between avatar and menu icon */
        }
        .navbar-auth .header-avatar { /* Reusing header-avatar for consistency */
            width: 38px;
            height: 38px;
            background-color: #333;
            color: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer; /* Make avatar clickable too if needed */
        }
        .navbar-auth .menu-toggle-icon {
            font-size: 1.5rem;
            color: #555;
            cursor: pointer;
            transition: color 0.2s ease;
        }
        .navbar-auth .menu-toggle-icon:hover {
            color: #2563eb;
        }

        /* Menu Container (Header + Menu Card) */
        .user-menu-wrapper {
          position: fixed; /* Position relative to viewport */
          top: 70px; /* Adjust based on navbar height */
          right: 20px; /* Position to the right */
          width: 100%;
          max-width: 300px; /* Smaller max-width for dropdown menu */
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 100; /* Ensure it's on top of everything */

          /* Animation properties */
          opacity: 0;
          transform: translateY(-10px);
          visibility: hidden;
          transition: opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0.3s ease-out;
        }

        .user-menu-wrapper.open {
          opacity: 1;
          transform: translateY(0);
          visibility: visible;
        }

        /* Header (User Menu Top Bar) - now part of the dropdown */
        .user-menu-wrapper .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: #ffffff;
          width: 100%;
          box-sizing: border-box;
          border-radius: 15px 15px 0 0; /* Rounded top corners */
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* Subtle shadow for header */
          position: static; /* No longer absolutely positioned on the page */
          top: auto;
          left: auto;
          transform: none;
        }
        .user-menu-wrapper .header-text {
          font-weight: 600;
          color: #333;
          font-size: 1.1rem;
        }
        /* No header-avatar or header-menu-icon here, they are in the navbar now */


        /* Menu Card */
        .user-menu-wrapper .menu-card {
          padding: 10px 0;
          background-color: #ffffff;
          width: 100%;
          box-sizing: border-box;
        }
        .menu-section {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .menu-section:last-child {
          border-bottom: none;
        }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #333;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .menu-item:hover {
          background-color: #f5f5f5;
        }
        .menu-item i {
          margin-right: 15px;
          width: 20px;
          text-align: center;
          color: #555;
        }
        .notification-badge {
          margin-left: auto;
          background-color: #ff3b30;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 10px;
        }
        .menu-item.host-option {
          flex-direction: column;
          align-items: flex-start;
          padding: 15px 20px;
        }
        .host-option-text {
          font-weight: 500;
          margin-bottom: 5px;
        }
        .host-option-description {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.3;
          margin-bottom: 10px;
        }
        .host-option-image {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
          align-self: flex-end;
          margin-top: -30px;
          margin-right: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .logout-item { /* Renamed from .logout to avoid conflict and be more specific */
          color: #e74c3c;
          font-weight: 500;
        }

        /* Backdrop overlay */
        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent black */
            z-index: 90; /* Below the menu, above other content */
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
            .navbar {
                padding: 10px 15px;
            }
            .navbar-logo a {
                font-size: 1.3rem;
            }
            .navbar-center-links {
                gap: 10px;
            }
            .navbar-center-links a {
                font-size: 0.9rem;
            }
            .navbar-auth .header-avatar {
                width: 32px;
                height: 32px;
                font-size: 0.9rem;
            }
            .navbar-auth .menu-toggle-icon {
                font-size: 1.3rem;
            }
            .user-menu-wrapper {
                top: 60px; /* Adjust for smaller navbar */
                right: 10px;
                max-width: 280px;
            }
            .user-menu-wrapper .header {
                padding: 12px 15px;
            }
            .user-menu-wrapper .menu-card {
                padding: 5px 0;
            }
            .menu-item {
                padding: 10px 15px;
                font-size: 0.9rem;
            }
            .menu-item i {
                margin-right: 10px;
            }
            .host-option-image {
                width: 50px;
                height: 50px;
                margin-top: -20px;
            }
        }
      `}</style>

      {/* FontAwesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">StayNest</Link>
        </div>
        <div className="navbar-center-links">
          <Link to="/">Home</Link>
          <Link to="/listings">Browse PGs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="navbar-auth">
          {/* Avatar and Menu Toggle Icon */}
          <div className="header-avatar">S</div>
          <i
            ref={iconRef}
            className="fas fa-bars menu-toggle-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></i>
        </div>
      </div>

      {/* Backdrop to close menu on outside click */}
      {isMenuOpen && <div className="backdrop" onClick={() => setIsMenuOpen(false)}></div>}

      {/* User Menu Container - Conditionally rendered and positioned */}
      <div ref={menuRef} className={`user-menu-wrapper ${isMenuOpen ? 'open' : ''}`}>
        {/* Header (User Menu Top Bar) - now inside the dropdown */}
        <div className="header">
          <div className="header-text">Account</div> {/* Changed text to 'Account' as per common dropdowns */}
          {/* No avatar or menu icon here, they are in the main navbar */}
        </div>

        {/* Main User Menu Card */}
        <div className="menu-card">
          <div className="menu-section">
            <div className="menu-item" onClick={() => setIsMenuOpen(false)}><i className="far fa-comment-dots"></i><span>Messages</span></div>
            <div className="menu-item" onClick={() => { navigate('/my-profile'); setIsMenuOpen(false); }}><i className="far fa-user"></i><span>Profile</span></div>
          </div>
          <div className="menu-section">
            <div className="menu-item" onClick={handleNotifications}><i className="far fa-bell"></i><span>Notifications</span><span className="notification-badge">1</span></div>
            <div className="menu-item" onClick={handleAccountSettings}><i className="fas fa-cog"></i><span>Account settings</span></div>
          </div>
          <div className="menu-section">
            <div className="menu-item logout-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i><span>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavbarDashboard;