import React from 'react';
import './CourseCard.css';

const CourseCard = ({ title, instructor, price, originalPrice, rating, students, lessons, image }) => {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-image" />
      <div className="course-info">
        <div className="course-rating">
          <span>⭐ {rating} ({students})</span>
        </div>
        <div className="course-stats">
          <span>{students} students</span>
          <span>{lessons} lessons</span>
        </div>
        <h3 className="course-title">{title}</h3>
        <p className="course-instructor">by {instructor}</p>
        <div className="course-pricing">
          <span className="course-original-price">${originalPrice}</span>
          <span className="course-price">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
