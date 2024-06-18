import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import LessonList from './LessonList';
import './ChapterLessons.css';

function ChapterLessons() {
    return (
        <div className='chapter-lessons-container'>
            <div className='chapter-lessons-header'>
                <Link to='/course-setup' className='back-btn'>
                    <ArrowBackIcon />
                    <p>Back to course setup</p>
                </Link>
            </div>
            <div className='chapter-lessons-body'>
                <div className='chapter-customization'>
                    <div className="chapter-customization_header">
                        <h1>Chapter Customization</h1>
                    </div>
                    <div className="chapter-customization_body">
                        <h3>Chapter Title</h3>
                        <input type='text' placeholder='Chapter Title' id='title' />
    
                    </div>
                </div>
                <div className='chapter-lessons'>
                    <div className="chapter-lessons_Header">
                        <h3>Chapter Lessons</h3>
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
