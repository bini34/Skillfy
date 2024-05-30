import React from 'react';
import './CourseDetailHeader.css';

const CourseDetailHeader = () => {
  return (
    <div className="course-detail-header">
      <h1>Adobe Masterclass Photoshop, Illustrator, XD & InDesign</h1>
      <p>Learn graphic design today with Photoshop, Illustrator, Adobe XD, InDesign & more in this Adobe CC Masterclass!</p>
      <div className="course-stats">
        <div className="course-rating">
          <span className="star">⭐</span> 
          <span className="rating">4.5</span>
          <span className="total-ratings">(1,348 ratings)</span>
        </div>
        <div className="course-enrollment">
          <span>Enrolled 415 students</span>
        </div>
        <div className="course-duration">
          <span>⏳ Duration 10 weeks</span>
        </div>
        <div className="course-lessons">
          <span>📚 38 Lessons</span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
