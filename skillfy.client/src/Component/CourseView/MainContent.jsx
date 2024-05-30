import React from 'react';
import './MainContent.css'
const MainContent = () => {
  return (
    <div className="main-content">
      <div className="video-section">
        <h1>Introduction about xd</h1>
        <p>30 Min</p>
        <video controls>
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="course-details">
        <h2>Overview of the Unit</h2>
        <p>User access can be revoked only...</p>
        <h2>Who this course is for:</h2>
        <p>User access can be revoked only...</p>
        <h2>Achievable</h2>
        <p>User access can be revoked only...</p>
        <div className="student-feedback">
          <h3>Student feedback</h3>
          <p>Wynton McCurdy</p>
          <p>This course is really...</p>
        </div>
        <div className="students-also-bought">
          <h3>Students also bought</h3>
          {/* Add course items similarly */}
          <div className="course-item">
            <img src="course-image.jpg" alt="Course" />
            <p>Everything You Need to Know About Business</p>
            <p>Nicole Brown</p>
            <p>$48.95</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
