import React from 'react';
import Sidebar from '../Component/CourseLearn/Sidebar';
import MainContent from '../Component/CourseLearn/MainContent';
import './CourseLearn.css';

function CourseLearn() {
  return (
    <div className="app">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default CourseLearn;