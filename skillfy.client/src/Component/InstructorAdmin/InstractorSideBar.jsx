import React from 'react';
import { Link } from 'react-router-dom';

import './InstractorSideBar.css';

export default function InstractorSideBar() {
  return (
    <nav className='InstractorSideBar-nav'>
      
        <Link to="/courses" className='logo-button'>Skillfy</Link> 
     
        <ul>
            <li>
                <Link to="/courses">Courses</Link> 
            </li>
            <li>
                <Link to="/analysis">Analysis</Link>
            </li>
        </ul>
    </nav>
  );
}
