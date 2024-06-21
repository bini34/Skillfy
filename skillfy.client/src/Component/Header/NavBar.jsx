import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import authService from '../../Services/authService';
import menu from '../../assets/icon/menu.png';
import ResponsiveNavBar from './ResponsiveNavBar';
import './NavBar.css';

const NavBar = ({ color }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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

  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="#" className="nav-link" style={{ color }}>Categories</Link>
        </li>
        <li className="nav-item search">
          <input type="text" placeholder="What do you want learn ?" />
          <button><i className="fas fa-search"></i></button>
        </li>
        <li className="nav-item">
          <Link to="/Courses" className="nav-link" style={{ color }}>Courses</Link>
        </li>
        <li className="nav-item">
          <Link to="/MyLearning" className="nav-link" style={{ color }}>My learning</Link>
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
              <Link to="/auth/account/registor" className="nav-link register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Avatar alt={user?.FName} src="/static/images/avatar/1.jpg" />
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link" style={{ color }}>Logout</button>
            </li>
          </>
        )}
        {/* <li className="nav-item">
          <button> <img src={menu} alt="Menu icon" /></button>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
