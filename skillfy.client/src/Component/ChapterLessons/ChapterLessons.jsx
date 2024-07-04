import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';
import LessonList from './LessonList';
import DeleteIcon from '@mui/icons-material/Delete';
import './ChapterLessons.css';

function ChapterLessons() {
  const location = useLocation();
  const { chapterId, courseDetails } = location.state || {};

  return (
    <div className='chapter-lessons-container'>
      <div className='chapter-lessons-header'>
        <Link to='/instructor/courses/create' state={{ courseDetails }} className='back-btn'>
          <ArrowBackIcon />
          <p>Back to course setup</p>
        </Link>
        <div className='lessonbtns'>
          <button>Publish</button>
          <button className='deleteBtn'><DeleteIcon style={{ color: 'white' }}/></button>
        </div>
      </div>
      <div className='chapter-lessons-body'>
        <div className='chapter-customization'>
          <div className="chapter-customization_header">
            <h1>Chapter Customization</h1>
          </div>
          <div className="chapter-customization_body">
            <h3>Chapter Title</h3>
            <input type='text' placeholder='Chapter Title' id='title' defaultValue={courseDetails?.find(chapter => chapter.id === chapterId)?.title || ''} />
          </div>
        </div>
        <div className='chapter-lessons'>
          <div className="chapter-lessons_Header">
            <h3>Chapter Lessons</h3>
          </div>
          <div className="chapter-lessons_List">
            <LessonList />
          </div>     
        </div>
      </div>
    </div>
  );
}

export default ChapterLessons;
