import React, { useState } from 'react';
import Sidebar from '../Component/CourseLearn/Sidebar';
import MainContent from '../Component/CourseLearn/MainContent';
import './CourseLearn.css';

function CourseLearn() {
  const [currentLessonData, setCurrentLessonData] = useState({
    lessonUrl: '',
    lessonTitle: ''
  });

  return (
    <div className="courselearnContainer">
      <Sidebar SetCurrentLessonData={setCurrentLessonData} />
      <MainContent CurrentLessonData={currentLessonData} />
    </div>
  );
}

export default CourseLearn;
