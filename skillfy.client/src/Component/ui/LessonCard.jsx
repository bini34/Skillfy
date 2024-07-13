import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonCard.css'; // Import the CSS file for styling
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';



const LessonCard = ({ courseID, imageUrl, Title, instructorImage, instructorName, rated }) => {
  const navigate = useNavigate();
  const baseUrl = 'https://localhost:7182';
  const ImageUrl = `${baseUrl}${imageUrl}`;
  const instaractorImageUrl = `${baseUrl}/teacherprofile/${instructorImage}`;
  function sendtocourselearning(){
    navigate('/course/learn', { state: { courseID : courseID, israted:rated } });

    }
  return (
    <button onClick={sendtocourselearning} className="course-card-button">
    <div className="enrolled-lesson-card">
    <img className="enrolled-lesson-card-image" src={ImageUrl} alt="Lesson" />
    <div className="enrolled-lesson-card-info">
      {/* <p className="enrolled-lesson-card-number">LESSON 5 OF 17 | 5m</p> */}
      <h2 className="enrolled-lesson-card-title">{Title}</h2>
      <div className="enrolled-lesson-card-instructor">
        <Avatar   sx={{ width: 34, height: 34 }} alt={instructorName}  src={instaractorImageUrl} />
        <h4>  {instructorName}</h4>
      </div>
      <LinearProgress 
          variant="determinate" 
          value={100} 
          sx={{ 
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'red',
            },
          }} 
        />
    </div>
  </div>
  </button>
  );
};

export default LessonCard;
