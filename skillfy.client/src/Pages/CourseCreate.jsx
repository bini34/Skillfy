import React from 'react'
import InstractorSideBar from '../Component/InstructorAdmin/InstractorSideBar'
import InstractorAdminHeader from '../Component/InstructorAdmin/InstractorAdminHeader'
import './CourseCreate.css'
import CreateCourse from '../Component/CourseCreate/CreateCourse'
export default function CourseCreate() {
  return (
    <div className="instructorAdminContainer">
      <header className="instractorAdminHeader">
        <InstractorAdminHeader/>
      </header>
      <div className='instructorAdminSidebar'>
        <InstractorSideBar/>
      </div>
      <div className='InstractorAdminMain'>
      <CreateCourse/>
      {/* *<CourseEditor/> */}
      </div>
    </div>
  )
}


