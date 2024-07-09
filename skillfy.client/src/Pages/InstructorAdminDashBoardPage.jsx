import React from 'react'
import InstructorSideBar from '../Component/InstructorAdmin/InstractorSideBar'
import InstructorAdminHeader from '../Component/InstructorAdmin/InstractorAdminHeader'
import { Link } from 'react-router-dom';
import './InstructorAdminDashBoardPage.css'
import InstructorCoursesDatagrid from '../Component/InstructorAdmin/InstractorCoursesDatagrid'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function InstructorAdminDashBoardPage() {
  return (
    <div className="instructorAdminContainer">
      <header className="instructorAdminHeader">
        <InstructorAdminHeader/>
      </header>
      <div className='instructorAdminSidebar'>
        <InstructorSideBar/>
      </div>
      <div className='instructorAdminMain'>
        <div className="instructorAdminMainHeader">
          <Link className='newCourseCreateBtn' to="/instructor/courses/create">
            <AddOutlinedIcon/> 
            New Course
          </Link>
        </div>
        <div className="instructorAdminMainDatagrid">
          <InstructorCoursesDatagrid/>
        </div>
      </div>
    </div>
  )
}
