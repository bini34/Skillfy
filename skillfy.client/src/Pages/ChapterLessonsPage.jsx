
import React from 'react'
import InstractorSideBar from '../Component/InstructorAdmin/InstractorSideBar'
import InstractorAdminHeader from '../Component/InstructorAdmin/InstractorAdminHeader'
import './InstructorAdminDashBoardPage.css'
import CourseEditor from '../Component/CourseEditor/CourseEditor';
import CreateCourse from '../Component/CourseCreate/CreateCourse'
import ChapterLessons from '../Component/ChapterLessons/ChapterLessons';
export default function ChapterLessonsPage() {
  return (
    <div className="instructorAdminContainer">
      <header className="instractorAdminHeader">
        <InstractorAdminHeader/>
      </header>
      <div className='instructorAdminSidebar'>
        <InstractorSideBar/>
      </div>
      <div className='InstractorAdminMain'>
      <ChapterLessons/>
      </div>
    </div>
  )
}


