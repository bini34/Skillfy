import React from 'react'
import InstractorSideBar from '../Component/InstructorAdmin/InstractorSideBar'
import InstractorAdminHeader from '../Component/InstructorAdmin/InstractorAdminHeader'
import { Link } from 'react-router-dom';
import './InstructorAdminDashBoardPage.css'
import TestDataGrid from '../Component/ui/TestDataGrid'
import CourseEditor from '../Component/CourseEditor/CourseEditor';

export default function InstructorCreateCourse() {
  return (
    <div className="instructorAdminContainer">
      <header className="instractorAdminHeader">
        <InstractorAdminHeader/>
      </header>
      <div className='instructorAdminSidebar'>
        <InstractorSideBar/>
      </div>
      <div className='InstractorAdminMain'>
      <CourseEditor/>
      </div>
    </div>
  )
}
