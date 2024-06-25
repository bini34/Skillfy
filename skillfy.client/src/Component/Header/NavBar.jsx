import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import authService from '../../Services/authService';
import AppsIcon from '@mui/icons-material/Apps';
import './NavBar.css';

const NavBar = ({ color }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <AppsIcon sx={{ color: color }} />
          <Link to="#" className="nav-link" style={{ color }}>Categories</Link>
        </li>
        <li className="nav-item search">
          <input type="text" placeholder="What do you want to learn?" />
          <button><i className="fas fa-search"></i></button>
        </li>
        <li className="nav-item">
          <Link to="/Courses" className="nav-link" style={{ color }}>Courses</Link>
        </li>
        <li className="nav-item">
          <Link to="/mylearning" className="nav-link" style={{ color }}>My Learning</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link" style={{ color }}>
            <Badge badgeContent={0} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/auth/account/signin" className="nav-link" style={{ color }}>Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/auth/account/register" className="nav-link register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Avatar alt={user?.FName} onClick={toggleMenu} src="/static/images/avatar/1.jpg" />
              {isMenuOpen && (
                <div className="menu">
                  <ul>
                    <li>
                      <Link to="/profile" className="nav-link" style={{ color }}>Profile</Link>
                    </li>
                    <li>
                       <button onClick={handleLogout} className="nav-link" style={{ color }}>Logout</button>

                    </li>             
                  </ul>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
