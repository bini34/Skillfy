import React from 'react';
import './InstractorProfileInfo.css'; // Import the CSS file

const InstractorProfileInfo = () => {
  return (
    <div className="profile-card">
      <img 
        src="https://via.placeholder.com/150" 
        alt="Profile" 
        className="profile-image"
      />
      <div className="profile-details">
        <h2 className="profile-name">Hardy Fowler <span className="profile-title">illustrator & Artist</span></h2>
        <p className="profile-intro">Hi, my name is Amelie.</p>
        <p className="profile-description">
          I am a photo artist and art director from Munich. Last year I was chosen to be one of the nine Adobe Creative Residents in 2019/2020. My pictures are widely known for their colorful, surrealistic touch. By books, lyrics and words in total, I am able to abstract and visualize them into new artworks.
        </p>
        <div className="profile-stats">
          <span className="profile-stat">
            <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927C9.3 2.36 9.924 2 10.5 2c.576 0 1.2.36 1.451.927l1.2 2.43 2.683.39c.623.09 1.164.502 1.394 1.098.229.596.145 1.25-.22 1.74l-1.94 1.89.458 2.672c.1.622-.164 1.248-.693 1.596a1.81 1.81 0 01-1.78.077L10 14.347l-2.4 1.26a1.81 1.81 0 01-1.78-.077 1.655 1.655 0 01-.693-1.596l.458-2.672-1.94-1.89a1.7 1.7 0 01-.22-1.74c.229-.596.771-1.008 1.394-1.098l2.683-.39 1.2-2.43z"/>
            </svg>
            4.6 Instractor Rating
          </span>
          <span className="profile-stat">
            <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 3a4 4 0 100 8h8a4 4 0 100-8H6zM2 11a4 4 0 014-4h8a4 4 0 110 8H6a4 4 0 01-4-4z"/>
            </svg>
            1,258 Students
          </span>
          <span className="profile-stat">
            <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 4a1 1 0 011 1v4.382l2.276 2.276a1 1 0 01-1.414 1.415l-2.829-2.828A1 1 0 019 10V5a1 1 0 011-1z"/>
            </svg>
            Course
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstractorProfileInfo;
