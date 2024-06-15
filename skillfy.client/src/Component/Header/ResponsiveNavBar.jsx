import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import authService from '../../Services/authService';
import './ResponsiveNavBar.css'

export default function ResponsiveNavBar() {
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
        setIsAuthenticated(false);
        setUser(null);
      };
  return (
    <div className='ResponsiveNav'>
        <nav>
        <ul className="nav-list">
        {!isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/api/Account/signin" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="api/Account/register" className="nav-link register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Avatar alt={user?.FName} src="/static/images/avatar/1.jpg" />
            </li>
            <li className="nav-item">
                <Link to="/MyLearning" className="nav-link">My learning</Link>
            </li>
          </>
        )}
            <li className="nav-item">
                <Link to="#" className="nav-link">Categories</Link>
            </li>
            <li className="nav-item">
            <Link to="/Courses" className="nav-link">Courses</Link>

            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    <Badge badgeContent={4} color="error">
                        <ShoppingCartOutlinedIcon/>
                    </Badge>
                </a>
            </li> 
        </ul>
    </nav>
    </div>
  )
}
