import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './CourseView.css';

function CourseView() {
  return (
    <div className="app">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default CourseView;
