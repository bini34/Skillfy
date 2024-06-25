import React from 'react';
import './LessonCard.css';

function LessonCard() {
  return (
    <div className="lesson-card">
      <img className="lesson-card-image" src="https://via.placeholder.com/150" alt="Lesson" />
      <div className="lesson-card-info">
        <p className="lesson-card-number">LESSON 5 OF 17 | 5m</p>
        <h2 className="lesson-card-title">Merge Duplicates in Sketch - Inconsistent Symbols & Styles</h2>
        <div className="lesson-card-instructor">
          <img className="instructor-card-image" src="https://via.placeholder.com/50" alt="Nicole Brown" />
          <p>Nicole Brown</p>
        </div>
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}

export default LessonCard;
