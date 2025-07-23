import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // Make sure path is correct
import authService from '../services/AuthService';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:'TENANT'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (formData.role === 'TENANT') {
    const result = await authService.login(formData);
    localStorage.setItem('token', result.jwtToken);
    alert("Login successful");
    localStorage.setItem('id', result.userId); // Store tenant ID if needed
    console.log(result.jwtToken);
    console.log(result.userId);
    console.log(formData.role);
    console.log(localStorage.getItem('id'));
    console.log("Login successful, redirecting...");
    
      navigate('/tenant/dashboard');
    } else if (formData.role === 'OWNER') {
       const result = await authService.ownerLogin(formData);
    localStorage.setItem('token', result.jwtToken);
    alert("Login successful");
    localStorage.setItem('id', result.userId); // Store tenant ID if needed
    console.log(result.jwtToken);
    console.log(result.userId);
    console.log(formData.role);
    console.log(localStorage.getItem('id'));
    console.log("Login successful, redirecting...");
      navigate('/owner/dashboard');
    }
  } catch (err) {
    // Show login error
    console.error(err?.response?.data?.message || "Login failed. Please try again.");
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