import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';
import Avatar from '@mui/material/Avatar';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CourseCard = ({ id, coursename, teachername, price, rating, students, lessons, coursethumbline, enrollmentcount }) => {
  const navigate = useNavigate();
  const baseUrl = 'https://localhost:7182';
  const imageUrl = `${baseUrl}${coursethumbline}`;

  const handleImageError = (e) => {
    console.error('Failed to load image:', e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/path/to/placeholder/image.jpg'; // Set a placeholder image
  };

  const sendtoCourseDetail = () => {
    navigate(`${coursename}/`, { state: { courseid: id } });
  };

  return (
    <button onClick={sendtoCourseDetail} className="course-card-button">
      <div className="course-card">
        <img 
          src={imageUrl}
          alt={coursename} 
          className="course-card-image" 
          onError={handleImageError} 
        />
        <div className="course-card-info">
          <div className="course-card-stats">
            <span>⭐{rating} ({students})</span>
            <span>{enrollmentcount}</span>
            <span>{lessons} lessons</span>
          </div>
          <hr />
          <h3 className="course-card-title">{coursename}</h3>
          <div className="name-price">
            <div className="course-card-instructor">
              <Avatar alt={teachername} src="/static/images/avatar/1.jpg" />
              <p className="course-card-instructor-name">{teachername}</p>
            </div>
            <div className="course-card-pricing">
              <span className="course-card-price">${price}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CourseCard;
