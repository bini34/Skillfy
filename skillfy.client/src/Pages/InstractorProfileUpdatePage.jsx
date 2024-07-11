import React from 'react'
import InstractorSideBar from '../Component/InstructorAdmin/InstractorSideBar'
import InstractorAdminHeader from '../Component/InstructorAdmin/InstractorAdminHeader'
import InstractorProfileUpdate from '../Component/InstractorProfile/InstructorProfileUpdate'
import './InstractorProfileUpdate.css'
export default function InstractorProfileUpdatePage() {
  return (
    <div className="InstractorAdminContainer">
        <header className="instractorAdminHeader">
            <InstractorAdminHeader/>
        </header>
        <div className='InstractorAdminSidebar'>
            <InstractorSideBar/>
        </div>
        <div className='InstractorAdminMain'>
            <InstractorProfileUpdate/>
        </div>
    </div>
  )
}



