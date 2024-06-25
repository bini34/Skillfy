import React from 'react';
import './LessonCard.css'; // Import the CSS file for styling

const LessonCard = () => {
  return (
    <div className="lesson-card">
      <div className="lesson-card-image">
        <img src="https://via.placeholder.com/150" alt="Lesson" />
      </div>
      <div className="lesson-card-content">
        <div className="lesson-card-info">
          <span>LESSON 5 OF 17 | 5m</span>
        </div>
        <div className="lesson-card-title">
          Merge Duplicates in Sketch - Inconsistent Symbols & Styles
        </div>
        <div className="lesson-card-instructor">
          <img src="https://via.placeholder.com/40" alt="Instructor" />
          <span>Nicole Brown</span>
        </div>
        <div className="lesson-card-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
