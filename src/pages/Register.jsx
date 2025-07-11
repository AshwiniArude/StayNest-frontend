import React from 'react';

import '../styles/global.css';

const Register = () => {
  return (
    <div className="register-container">
      <form className="register-form">
        <h2 className="register-title">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="register-input"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="register-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="register-input"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="register-input"
          required
        />

        <button type="submit" className="register-button">
          Sign Up
        </button>

        <p className="register-login">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;