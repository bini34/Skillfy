import React, { useEffect, useState } from 'react';
import './CourseDetailOverview.css';
import axios from 'axios';
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
  const [courseId, setCourseId] = useState(0);
  const [courseData, setCourseData] = useState({
    id: '',
    price: 0,
    description: '',
    chapter: [],
    lessonname: [],
    rating: 0
  });
  const location = useLocation();

  useEffect(() => {
    console.log("courseidfromlocation", location.state.courseid);

    if (location.state && location.state.courseid) {
      setCourseId(location.state.courseid);
      console.log("courseid", courseId);
      console.log("courseidfromlocation", location.state.courseid);
    }
  }, [location.state]);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail();
    }
  }, [courseId]);

  const fetchCourseDetail = async () => {
    console.log('Course id:', courseId);
    console.log('courseidtype', typeof(courseId));
    try {
      const response = await axios.get(`https://localhost:7182/api/course/coursedetail${courseId}`);
      setCourseData({
        id :response.data.id,
        price : response.data.price,
        description : response.data.description,
        chapter : response.data.chapter,
        lessonname : response.data.lessonname,
        rating : response.data.rating
      });
      console.log('Response:', response.data);
      console.log('Course Data:', courseData);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

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
          <CourseDetailHeader courseData={courseData || {}} />
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
              <CourseDetailsCard courseId={courseId} price={courseData.price}           />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
