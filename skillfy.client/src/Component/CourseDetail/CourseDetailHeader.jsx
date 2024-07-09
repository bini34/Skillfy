import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import './CourseDetailHeader.css';

const CourseDetailHeader = ({courseData, courseName}) => {
  console.log('Course name:', courseName);
  console.log('Course Data from detail header:', courseData);
  return (
    <div className="course-header-container">

      <h1>{courseData.coursename}</h1>
      <div className='course-header-main'>
        <div className='course-header-about'>
          <h3>{courseData.about}</h3>
        </div>
        <div className="course-stats">
          <div className="course-rating">
            <StarBorderOutlinedIcon fontSize="small" sx={{color:"#F3B23A"}}/>
            <span className="rating">{courseData.rating}</span>
            <span className="total-ratings">(5 ratings)</span>
          </div>
          <div className="course-enrollment">
            <RemoveRedEyeIcon fontSize="small" sx={{color:"#DD5416"}}/>
            <span>Enrolled 415 students</span>
          </div>
          <div className="course-duration">
            <AccessTimeIcon fontSize="small"/>
            <span>Duration 10 weeks</span>
          </div>
          <div className="course-lessons">
            <PlayCircleOutlinedIcon fontSize="small" sx={{color:"#409466"}}/>
            <span>{courseData.totalLessons} Lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
