import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonCard.css'; // Import the CSS file for styling
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const LessonCard = ({ courseID, imageUrl, CourseTitle, instructorImage, instructorName }) => {
  const navigate = useNavigate();
  const baseUrl = 'https://localhost:7182';
  const ImageUrl = `${baseUrl}${imageUrl}`;

  function sendtocourselearning(){
    navigate('/course/learn', { state: { courseID : courseID} });

    }
  return (
    <button onClick={sendtocourselearning} className="course-card-button">
    <div className="lesson-card">
    <img className="lesson-card-image" src={ImageUrl} alt="Lesson" />
    <div className="lesson-card-info">
      <p className="lesson-card-number">LESSON 5 OF 17 | 5m</p>
      <h2 className="lesson-card-title">'{CourseTitle}'</h2>
      <div className="lesson-card-instructor">
        <img className="instructor-card-image" src={instructorImage} alt="Nicole Brown" />
        <p>{instructorName}</p>
      </div>
      <BorderLinearProgress variant="determinate" value={50} />
    </div>
  </div>
  </button>
  );
};

export default LessonCard;
