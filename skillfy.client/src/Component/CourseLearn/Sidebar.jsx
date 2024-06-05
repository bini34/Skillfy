import React from 'react';
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Learn Adobe XD & Prototyping</h2>
      <p>60% Complete</p>
      <input type="text" placeholder="Search" />
      <nav>
        <h3>Change simplification</h3>
        <ul>
          <li>Lesson 01 Introduction about xd [30 min]</li>
          <li>Lesson 02 Introduction about xd [30 min]</li>
          {/* Add more lessons similarly */}
        </ul>
        {/* Add more sections similarly */}
      </nav>
    </div>
  );
};

export default Sidebar;
