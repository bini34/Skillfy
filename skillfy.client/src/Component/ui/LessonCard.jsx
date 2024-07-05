import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonCard.css'; // Import the CSS file for styling
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 400],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const LessonCard = ({ courseID, imageUrl, Title, instructorImage, instructorName }) => {
  const navigate = useNavigate();
  const baseUrl = 'https://localhost:7182';
  const ImageUrl = `${baseUrl}${imageUrl}`;

  function sendtocourselearning(){
    navigate('/course/learn', { state: { courseID : courseID} });

    }
  return (
    <button onClick={sendtocourselearning} className="course-card-button">
    <div className="enrolled-lesson-card">
    <img className="enrolled-lesson-card-image" src={ImageUrl} alt="Lesson" />
    <div className="enrolled-lesson-card-info">
      <p className="enrolled-lesson-card-number">LESSON 5 OF 17 | 5m</p>
      <h2 className="enrolled-lesson-card-title">{Title}</h2>
      <div className="enrolled-lesson-card-instructor">
        <Avatar   sx={{ width: 34, height: 34 }} alt={instructorName}  src={instructorImage} />
        <h4>  {instructorName}</h4>
      </div>
      <BorderLinearProgress variant="determinate" value={50} />
    </div>
  </div>
  </button>
  );
};

export default LessonCard;
