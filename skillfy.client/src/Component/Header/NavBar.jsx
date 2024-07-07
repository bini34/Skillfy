import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import authService from '../../Services/authService';
import AppsIcon from '@mui/icons-material/Apps';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import './NavBar.css';

const NavBar = ({ color }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
      console.log("user", user?.fname);
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

  const toggleCategoriesMenu = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setIsCategoriesMenuOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/course/search?query=${searchInput}`, { state: { coursename: searchInput } });
    }
  };
 

  const categories = ['Design', 'Development', 'IT &Software', 'Business', 'Marketing', 'Photography', 'Health & care', 'Technology'];

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item" onClick={toggleCategoriesMenu}>
          <AppsIcon sx={{ color }} />
          <Link to="#" className="nav-link" style={{ color }}>Categories</Link>
          {isCategoriesMenuOpen && (
            <div className="categories-menu">
              <ul>
                {categories.map((category, index) => (
                  <li key={index} onClick={handleMenuItemClick}>
                    <Link to={`/categories/${category.toLowerCase()}`} className="nav-link" style={{ color }}>{category}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
        <li className="nav-item search">
          <input
            type="text"
            placeholder="What do you want to learn?"
            aria-label="Search courses"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
          />
          <button aria-label="Search"><i className="fas fa-search"></i></button>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link" style={{ color }}>Courses</Link>
        </li>
        {isAuthenticated && (
          <li className="nav-item">
            <Link to="/mycourse" className="nav-link" style={{ color }}>My Learning</Link>
          </li>
        )}
        {/* <li className="nav-item">
          <Link to="/cart" className="nav-link" style={{ color }}>
            <Badge badgeContent={0} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
        </li> */}
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
          <li className="nav-item avatar">
            <Avatar alt={user?.fname} onClick={toggleMenu} src={user} />
            {isMenuOpen && (
              <div className="menu">
                <ul>
                  <li onClick={handleMenuItemClick}>
                    <Person2Icon />
                    <Link to="/profile" className="nav-link" style={{ color }}>Profile</Link>
                  </li>
                  <li onClick={handleMenuItemClick}>
                    <LogoutIcon />
                    <button onClick={handleLogout} className="nav-link" style={{ color }}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
