import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-header">
        <Link to="/mycourse">
          <div className="circle">
            <KeyboardReturnIcon/>
          </div>
          Back
        </Link>
        <h1>Learn Adobe XD & Prototyping</h1>
        </div>
        <div className="progress">
        <p>60% Complete</p>
        <BorderLinearProgress variant="determinate" value={50} />
        </div>
      </div>
      <input type="text" placeholder="Search" />
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
