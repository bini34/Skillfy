import React from 'react';
import './LessonCard.css';

function LessonCard() {
  return (
    <div className="lesson-card">
      <img className="lesson-image" src="https://via.placeholder.com/150" alt="Lesson" />
      <div className="lesson-info">
        <p className="lesson-number">LESSON 5 OF 17 | 5m</p>
        <h2 className="lesson-title">Merge Duplicates in Sketch - Inconsistent Symbols & Styles</h2>
        <div className="lesson-instructor">
          <img className="instructor-image" src="https://via.placeholder.com/50" alt="Nicole Brown" />
          <p>Nicole Brown</p>
        </div>
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}

export default LessonCard;
