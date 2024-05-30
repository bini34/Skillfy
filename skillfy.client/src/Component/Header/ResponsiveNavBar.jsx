import React from 'react'

export default function ResponsiveNavBar() {
  return (
    <div className='ResponsiveNav'>
        <nav>
        <ul className="nav-list">
            <li className="nav-item">
                <a href="#" className="nav-link">Categories</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">Courses</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    <Badge badgeContent={4} color="error">
                        <ShoppingCartOutlinedIcon/>
                    </Badge>
                </a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">Login</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link register">Register</a>
            </li>
        </ul>
    </nav>
    </div>
  )
}
