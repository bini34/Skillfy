import React, { useState, useEffect } from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import LessonCard from '../Component/ui/LessonCard';
import './MyCourse.css';
import authService from '../Services/authService';
import apiService from '../Services/apiService';

export default function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getCurrentUser();

  useEffect(() => {
    console.log("user", user.id);

    if (user && user.id) {
      apiService.getData(`api/course/enrolledcourse${user.id}`)
        .then((response) => {
          setCourses(response.data.$values);
          console.log('Courses:', response.data.$values);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch courses');
          setLoading(false);
        });
    } else {
      setError('User ID is not available');
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <Header color="black" />
      <div className='mycourseContainer'>
        <div className='mycourseHeader'>
          <h1>My Courses</h1>
        </div>
        <div className='mycourseBody'>
          {loading ? (
            <p>Loading...</p>
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
