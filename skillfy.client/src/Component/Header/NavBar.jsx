import React from 'react'
import Badge  from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
        <ul className="nav-list">
            <li className="nav-item">
                <Link to="#" className="nav-link">Categories</Link>
            </li>
            <li className="nav-item search">
                <input type="text" placeholder="What do you want learn ?" />
                <button><i className="fas fa-search"></i></button>
            </li>
            <li className="nav-item">
                <Link to="/Courses" className="nav-link">Courses</Link>
            </li>
            <li className="nav-item">
                <Link to="/MyLearning" className="nav-link">My learning</Link>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">
                    <Badge badgeContent={4} color="error">
                        <ShoppingCartOutlinedIcon/>
                    </Badge>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="api/Account/signin" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="api/Account/registor" className="nav-link register">Register</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar