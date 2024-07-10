import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, Navigate, useLocation } from 'react-router-dom';
import LessonList from './LessonList';
import DeleteIcon from '@mui/icons-material/Delete';
import './ChapterLessons.css';

function ChapterLessons() {
  const location = useLocation();
  const courseDetailsfromResponse = location.state.courseDetailsfromResponse;
console.log("coursedata from ",location.state);
console.log("coursedata from ",courseDetailsfromResponse);

function sendCoursedetail(){
  Navigate('/instructor/courses/create', {state: {courseDetailsfromResponse: courseDetailsfromResponse}});
}
  return (
    <div className='chapter-lessons-container'>
      <div className='chapter-lessons-header'>
        <button onClick={sendCoursedetail} className='back-btn'>
          <ArrowBackIcon />
          <p>Back to course setup</p>
        </button>
      </div>
      <div className='chapter-lessons-body'>
        <div className='chapter-lessons'>
          <div className="chapter-lessons_Header">
            <h1>Chapter Lessons</h1>
          </div>
          <div className="chapter-lessons_List">
            <LessonList/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterLessons;
