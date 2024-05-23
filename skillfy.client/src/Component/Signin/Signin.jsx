// src/components/LoginPage.js
import React from 'react';
import './Signin.css';

function Signin() {
  return (
    <div className="login-container">
      <div className="side-banner">
        <div className="banner-content">
          <h1>Turn your ambition into a success story</h1>
          <p>Choose from over 100,000 online video.</p>
        </div>
      </div>
      <div className="login-form">
        <h2>Hello! Welcome back.</h2>
        <p>Log in with your data that you entered during your registration.</p>
        <form>
          <label>Email address</label>
          <input type="email" placeholder="Example@email.com" />
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          <button type="submit">Start now!</button>
        </form>
        <div className="alternative-login">
          <p>OR</p>
          <button className="google-login">Sign with Google</button>
        </div>
        <p>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
