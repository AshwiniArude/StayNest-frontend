import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // Make sure path is correct

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'TENANT'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userRole = formData.role;

    if (userRole === 'TENANT') {
      navigate('/tenant/dashboard');
    } else if (userRole === 'OWNER') {
      navigate('/owner/dashboard');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <Link to="/">
            <h1 className="logo">StayNest</h1>
          </Link>
        </div>
        <div className="header-content">
        <h2>Welcome Back</h2>
        <p>Login to your account and manage your space</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select name="role" id="role" value={formData.role} onChange={handleChange}>
            <option value="TENANT">Tenant</option>
            <option value="OWNER">Owner</option>
          </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
          <input
            type="email"
              id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
          <input
            type="password"
              id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          </div>
          <div className="forgot-password">
            <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        <div className="signup-text">
          Don't have an account? <a href="/register">Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;