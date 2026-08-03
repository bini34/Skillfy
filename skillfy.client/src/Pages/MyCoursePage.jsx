import React, { useState, useEffect } from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import LessonCard from '../Component/ui/LessonCard';
import './MyCourse.css';
import apiService from '../Services/apiService';
import CircularProgress from '@mui/material/CircularProgress';
import useAuthStore from '../store/authStore';
import { toArray } from '../lib/utils';


export default function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user && user.Id) {
      apiService.getData(`api/course/enrolledcourse${user.Id}`)
        .then((response) => {
          setCourses(toArray(response.data));
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch courses');
          setLoading(false);
        });
    } else {
      setError('User ID is not available');
      setLoading(false);
    }
  }, [user?.Id]);

  return (
    <>
      <Header color="black" />
      <div className='mycourseContainer'>
        <div className='mycourseHeader'>
          <h1>My Courses</h1>
        </div>
        <div className='mycourseBody'>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : error ? (
            <p>{error}</p>
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <LessonCard
                key={index}
                courseID={course.courseid}
                imageUrl={course.thumbline}
                Title={course.coursename}
                instructorImage={course.teacherpicture}
                instructorName={course.teachername}
              />
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
