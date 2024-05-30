// src/CourseDetailsCard.js
import React from 'react';
import './CourseDetailsCard.css';

const CourseDetailsCard = () => {
  return (
    <div className="course-details-card">
      <div className="price-section">
        <span className="current-price">$49.65</span>
        <span className="discount">50% Off</span>
        <div className="time-left">
          <span role="img" aria-label="clock">⏰</span> 11 Hour left at this price
        </div>
        <button className="buy-now-button">Buy Now</button>
      </div>
      <div className="course-includes">
        <h3>This course includes</h3>
        <ul>
          <li><span role="img" aria-label="book">📚</span> Language - English</li>
          <li><span role="img" aria-label="computer">💻</span> Use on desktop, tablet & mobile</li>
          <li><span role="img" aria-label="infinity">♾️</span> Full lifetime access</li>
          <li><span role="img" aria-label="certificate">📜</span> Certificate of Completion</li>
        </ul>
      </div>
      <div className="team-access">
        <p>Training 5 or more people?</p>
        <p>Get your team access to 3,500+ top courses anytime, <a href="#">Contact our sale</a></p>
      </div>
      <div className="share-course">
        <p>Share this course</p>
        <div className="social-icons">
          <span role="img" aria-label="facebook">📘</span>
          <span role="img" aria-label="instagram">📸</span>
          <span role="img" aria-label="whatsapp">📲</span>
          <span role="img" aria-label="twitter">🐦</span>
          <span role="img" aria-label="linkedin">🔗</span>
          <span role="img" aria-label="youtube">▶️</span>
          <span role="img" aria-label="reddit">👽</span>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
