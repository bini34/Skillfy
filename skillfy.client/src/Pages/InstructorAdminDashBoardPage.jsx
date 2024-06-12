import React from 'react'
import InstractorSideBar from '../Component/InstructorAdmin/InstractorSideBar'
import InstractorAdminHeader from '../Component/InstructorAdmin/InstractorAdminHeader'
import './InstructorAdminDashBoardPage.css'
export default function InstructorAdminDashBoardPage() {
  return (
    <div className="instructorAdminContainer">
      <header className="instractorHeader">
      <InstractorAdminHeader/>
      </header>
      <div className='instructorAdminSidebar'>
        <InstractorSideBar/>
      </div>
      <div className='InstractorAdminMain'>
        
      </div>
    </div>
  )
}
