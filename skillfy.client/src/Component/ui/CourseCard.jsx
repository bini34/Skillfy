import React from 'react';
import './CourseCard.css';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, instructor, price, rating, students, lessons, image }) => {
  return (
    <Link to="/Course-Detail" className="course-link">
      <div className="course-card">
        <img src={image} alt={title} className="course-image" />
        <div className="course-info">
          <div className="course-stats">
            <span>⭐{rating} ({students})</span>
            <span>{students}</span>
            <span>{lessons} lessons</span>
          </div>
          <hr />
          <h3 className="course-title">{title}</h3>
          <div className='name-price'>
            <div className='course-instructor'>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <p className="course-instructor-name"> {instructor}</p>
            </div>
            <div className="course-pricing">
              <span className="course-price">${price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
