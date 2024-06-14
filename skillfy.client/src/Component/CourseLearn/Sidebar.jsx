import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/mycourse">
          <div className="circle">
            <KeyboardReturnIcon/>
          </div>
          Back
        </Link>
        <h1>Learn Adobe XD & Prototyping</h1>
        <p>60% Complete</p>
      </div>

      <nav>
        <h3>Change simplification</h3>
        <ul>
          <li>Lesson 01 Introduction about xd [30 min]</li>
          <li>Lesson 02 Introduction about xd [30 min]</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
