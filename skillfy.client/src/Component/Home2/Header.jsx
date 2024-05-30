import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo">Skillify</div>
      <nav className="header-nav">
        <a className="header-nav-link" to="/">Home</a>
        <a className="header-nav-link" to="/categories">Categories</a>
        <a className="header-nav-link" to="/courses">Courses</a>
        <a className="header-nav-link" to="/about">About</a>
        <a className="header-nav-link" to="/login">Login</a>
        <button className="header-register-button">Register</button>
      </nav>
    </header>
  );
};

export default Header;
