import React from 'react';
import './LessonCard.css'; // Import the CSS file for styling
import { bubbleFormats } from 'quill/blots/block';

const LessonCard = ({ imageUrl, lessonInfo, lessonTitle, instructorImage, instructorName }) => {
  function sendtocourselearning(){
               
    }
  return (
    // <button onClick={sendtocourselearning} className="course-card-button">
    <div className="lesson-card">
      <div className="lesson-card-image">
        <img src={imageUrl} alt="Lesson" />
      </div>
      <div className="lesson-card-content">
        <div className="lesson-card-info">
          <span>{lessonInfo}</span>
        </div>
        <div className="lesson-card-title">
          {lessonTitle}
        </div>
        <div className="lesson-card-instructor">
          <img src={instructorImage} alt="Instructor" />
          <span>{instructorName}</span>
        </div>
        <div className="lesson-card-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
    // </button>
  );
};

export default LessonCard;
