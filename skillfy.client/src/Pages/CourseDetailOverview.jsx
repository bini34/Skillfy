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
  const [courseId, setCourseId] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseData, setCourseData] = useState(null); // Initialize as null to check loading state
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.courseid) {
      console.log('Course ID from location state:', location.state.courseid);
      console.log('Type of Course ID from location state:', typeof location.state.courseid);
      setCourseId(location.state.courseid);
      setCourseName(location.state.coursename);
    }
  }, [location.state]);

  useEffect(() => {
    console.log('Updated Course ID:', courseId);
    if (courseId) {
      fetchCourseDetail();
    }
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      console.log('Fetching course details for Course ID:', courseId);
      const response = await axios.get(`https://localhost:7182/api/course/coursedetail${courseId}`);
      setCourseData({
        id: courseId,
        coursename: response.data.coursename,
        price: response.data.price,
        description: response.data.description,
        chapter: response.data.chapter,
        lessonname: response.data.lessonname,
        rating: response.data.rating,
        bio: response.data.bio,
        totalLessons: response.data.totalLessons,
        about: response.data.about,
        course_audience: response.data.course_audience
      });
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const formatCourseName = (name) => {
    return name ? name.replace(/\s+/g, '-') : '';
  };

  if(!courseName) return null; // Return null if course name is not set (i.e. no course ID is passed from the previous page
  const formattedCourseName = formatCourseName(courseName);

  const renderOverviewContent = () => {
    if (!formattedCourseName) return null;

    switch (location.pathname) {
      case `/course/${formattedCourseName}/overview`:
        return <CourseOverview  courseData={courseData}/>;
      case `/course/${formattedCourseName}/curriculum`:
        return <TestCurriclum />;
      case `/course/${formattedCourseName}/instructor`:
        return <CourseInstructor courseData={courseData} />;
      case `/course/${formattedCourseName}/reviews`:
        return <CourseReviews courseData={courseData} />;
      default:
        return <CourseOverview courseData={courseData}/>; // Default to Overview if no match is found
    }
  };

  return (
    <>
      <Header color="black" />
      <main className='main-courseDetail-Container'>
        <div className='courseDetail-Container'>
          {courseData ? (
            <>
              <CourseDetailHeader courseData={courseData}  courseName={formattedCourseName}/>
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
                            to={`/course/${formattedCourseName}/overview`}
                            className={location.pathname === `/course/${formattedCourseName}/overview` ? 'active' : ''}
                          >
                            Overview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/course/${formattedCourseName}/curriculum`}
                            className={location.pathname === `/course/${formattedCourseName}/curriculum` ? 'active' : ''}
                          >
                            Curriculum
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/course/${formattedCourseName}/instructor`}
                            className={location.pathname === `/course/${formattedCourseName}/instructor` ? 'active' : ''}
                          >
                            Instructor
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/course/${formattedCourseName}/reviews`}
                            className={location.pathname === `/course/${formattedCourseName}/reviews` ? 'active' : ''}
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
                  <CourseDetailsCard courseId={courseId} price={courseData.price} />
                </div>
              </div>
            </>
          ) : (
            <p>Loading course details...</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
