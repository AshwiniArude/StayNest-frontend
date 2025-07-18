import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Login to your account and manage your space</p>
        <form onSubmit={handleSubmit}>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="TENANT">Tenant</option>
            <option value="OWNER">Owner</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign In</button>
        </form>
        <div className="signup-text">
          Don’t have an account? <a href="/register">Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
