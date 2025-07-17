import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'TENANT' // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 Simulate successful login & role check
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
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
    </div>
  );
};

export default Login;