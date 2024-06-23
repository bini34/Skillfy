import React, {useEffect,useState} from 'react';
import './CourseDetailOverview.css';
import CourseDetailHeader from '../Component/CourseDetail/CourseDetailHeader';
import VideoPlayer from '../Component/ui/VideoPlayer';
import CourseDetailsCard from '../Component/CourseDetail/CourseDetailsCard';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import CourseOverview from '../Component/CourseDetail/CourseOverview';
import TestCurriclum from '../Component/CourseDetail/TestCurriclum';
import CourseInstructor from '../Component/CourseDetail/CourseInstructor';
import CourseReviews from '../Component/CourseDetail/CourseReviews';
import { Link, useLocation } from 'react-router-dom';

export default function CourseDetail() {
  const location = useLocation();

  const renderOverviewContent = () => {
    switch (location.pathname) {
      case '/course-detail-overview':
        return <CourseOverview />;
      case '/course-detail-curriculum':
        return <TestCurriclum />;
      case '/course-detail-instructor':
        return <CourseInstructor />;
      case '/course-detail-reviews':
        return <CourseReviews />;
      default:
        return <CourseOverview />; // Default to Overview if no match is found
    }
  };

  return (
    <>
      <Header color="black" />
      <main className='main-courseDetail-Container'>
        <div className='courseDetail-Container'>
          <CourseDetailHeader />
          <div className='courseDetail'>
            <div className='courseDetail-main_container'>
              <div className="courseDetail-Video">
                <VideoPlayer />
              </div>
              <div className='courseDetail-main-header'>
                <nav>
                  <ul>
                    <li>
                      <Link
                        to='/course-detail-overview'
                        className={location.pathname === '/course-detail-overview' ? 'active' : ''}
                      >
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/course-detail-curriculum'
                        className={location.pathname === '/course-detail-curriculum' ? 'active' : ''}
                      >
                        Curriculum
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/course-detail-instructor'
                        className={location.pathname === '/course-detail-instructor' ? 'active' : ''}
                      >
                        Instructor
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/course-detail-reviews'
                        className={location.pathname === '/course-detail-reviews' ? 'active' : ''}
                      >
                        Reviews
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="courseDetail-main-main">
                {renderOverviewContent()}
              </div>
            </div>
            <div className="courseDetail-card">
              <CourseDetailsCard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
