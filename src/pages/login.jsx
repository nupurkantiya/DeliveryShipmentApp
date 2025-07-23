import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="login-background">
      <div className="login-card">
        <h2 className="login-header">Welcome Back 👋</h2>
        <p className="login-subtext">Please login to continue</p>
        <form className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
