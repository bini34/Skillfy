import React from 'react';
import './CourseDetail.css';
import CourseDetailHeader from '../Component/CourseDetail/CourseDetailHeader';
import VideoPlayer from '../Component/ui/VideoPlayer';
import CourseDetailsCard from '../Component/CourseDetail/CourseDetailsCard';
import Header from '../Component/Header/Header';

export default function CourseDetail() {
  return (
    <>
    <main className='main-courseDetail-Container'>
      <div className='courseDetail-Container'>
        <CourseDetailHeader />
        <div className='courseDetail'>
          <div className='courseDetail-main'>
            <div className="courseDetail-Video">
              <VideoPlayer />
            </div>
            <div className='courseDetail-main-header'>
              <nav>
                <ul>
                  <li>Overview</li>
                  <li>Curriculum</li>
                  <li>Instructor</li>
                  <li>Reviews</li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="courseDetail-card">
            <CourseDetailsCard />
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
