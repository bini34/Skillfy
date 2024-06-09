import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LessonList from './LessonList';
import LessonForm from './LessonForm';


export default function ChapterLessons() {
  const [isVisible, setIsVisible] = useState(false);
  const [lessons, setLessons] = useState([]);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
  };

  return (
    <div className='lessonsContainer'>
        <div>
            <ChecklistIcon/>
            <h1>Chapter Lessons</h1>
        </div>
        <div className="lessonsContainer-header">
            <Button variant="contained" onClick={handleClick} startIcon={<AddIcon />}>
            Add Lesson
            </Button>
            {isVisible && <div className="Add-lesson">
                            <LessonForm addLesson={addLesson} />
                          </div>}
        </div>
        <div className="lesson-list">
           
            <LessonList lessons={lessons} />
        </div>
    </div>
  );
}
