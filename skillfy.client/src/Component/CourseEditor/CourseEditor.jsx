import React from 'react';
import CourseDetails from './CourseDetails';
import CourseChapter from './CourseChapter';
import CourseImage from './CourseImage';
import CourseSell from './CourseSell';
import CourseCategory from './CourseCategory'
import { Apps } from '@mui/icons-material';

import './CourseEditor.css';

const CourseEditor = () => {
  return (
    <div className="course-editor">
      <div className="left-panel">
        <div className="left-panel_header">
          <h1><Apps fontSize='large'/>  Customize your course</h1>
        </div>
        <CourseDetails />
        <CourseImage />
        <CourseCategory/>

      </div>
      <div className="right-panel">
      <div className="right-panel_header">

      </div>
        <CourseChapter />
        <CourseSell />
      </div>
    </div>
  );
};

export default CourseEditor;
