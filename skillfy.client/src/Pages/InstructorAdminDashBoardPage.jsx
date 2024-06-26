import React from 'react'
import InstractorSideBar from '../Component/InstructorAdmin/InstractorSideBar'
import InstractorAdminHeader from '../Component/InstructorAdmin/InstractorAdminHeader'
import { Link } from 'react-router-dom';
import './InstructorAdminDashBoardPage.css'
import TestDataGrid from '../Component/ui/TestDataGrid'
export default function InstructorAdminDashBoardPage() {
  return (
    <div className="instructorAdminContainer">
      <header className="instractorAdminHeader">
        <InstractorAdminHeader/>
      </header>
      <div className='instructorAdminSidebar'>
        <InstractorSideBar/>
      </div>
      <div className='InstractorAdminMain'>
        <div className="InstractorAdminMain-header">
          <Link to="/instructor/courses/create">
          New Course
          </Link>
        </div>
        <div className="InstractorAdminMain-datagrid">
          <TestDataGrid/>
        </div>
      </div>
    </div>
  )
}
