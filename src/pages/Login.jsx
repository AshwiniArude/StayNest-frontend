import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Handle login logic
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">🔒</div>
          <h2>
            Welcome back to <span>StayNest</span>
          </h2>
          <p>Sign in to your account and continue your journey</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
        <button type="button" className="link-button" onClick={() => alert("Forgot password flow not implemented yet")}>
  Forgot password?
</button>

          </div>

          <button type="submit" className="login-btn">
            Sign In →
          </button>

          <div className="divider">or continue with</div>

          <div className="social-login">
            <button className="social google">Google</button>
            <button className="social facebook">Facebook</button>
          </div>

          <p className="signup-text">
            Don’t have an account? <a href="/register">Create one now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
