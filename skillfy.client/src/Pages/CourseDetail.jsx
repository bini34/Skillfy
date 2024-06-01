import React from 'react'
import './CourseDetail.css'
import CourseDetailHeader from '../Component/CourseDetail/CourseDetailHeader'
import VideoPlayer from '../Component/ui/VideoPlayer'
export default function CourseDetail() {
  return (
    <main className='main-courseDetail-Container'>
        <div className='courseDetail-Container'>
        <CourseDetailHeader/>
        <VideoPlayer/>
        </div>
    </main>
  )
}
