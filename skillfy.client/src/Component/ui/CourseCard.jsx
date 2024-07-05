import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';
import Avatar from '@mui/material/Avatar';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

const CourseCard = ({ id, coursename, teachername, price, rating, students, lessons, coursethumbline, enrollmentcount }) => {
  const navigate = useNavigate();
  const baseUrl = 'https://localhost:7182';
  const imageUrl = `${baseUrl}${coursethumbline}`;

  const handleImageError = useCallback((e) => {
    console.error('Failed to load image:', e.target.src);
    e.target.onerror = null; // Prevent infinite loop
  }, []);

  const sendtoCourseDetail = useCallback(() => {
    navigate(`/course/${coursename}/overview`, { state: { courseid: id, coursename: coursename } });
  }, [navigate, id, coursename]);

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
            <span>
              <StarBorderOutlinedIcon fontSize="small" sx={{ color: "#F3B23A" }} />
              {rating} ({students})
            </span>
            <span>
              <RemoveRedEyeIcon fontSize="small" sx={{ color: "#DD5416" }} />
              {enrollmentcount}
            </span>
            <span>
              <PlayCircleOutlinedIcon fontSize="small" sx={{ color: "#409466" }} />
              {lessons} lessons
            </span>
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
