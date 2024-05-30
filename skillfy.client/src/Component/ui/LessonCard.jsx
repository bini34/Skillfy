import React from 'react';
import './LessonCard.css'; // Import the CSS file for styling

const LessonCard = () => {
  return (
    <div className="lesson-card">
      <div className="lesson-image">
        <img src="https://via.placeholder.com/150" alt="Lesson" />
      </div>
      <div className="lesson-content">
        <div className="lesson-info">
          <span>LESSON 5 OF 17 | 5m</span>
        </div>
        <div className="lesson-title">
          Merge Duplicates in Sketch - Inconsistent Symbols & Styles
        </div>
        <div className="lesson-instructor">
          <img src="https://via.placeholder.com/40" alt="Instructor" />
          <span>Nicole Brown</span>
        </div>
        <div className="lesson-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
