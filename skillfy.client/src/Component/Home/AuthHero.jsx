import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LessonCard from '../ui/LessonCard';
import Header from '../Header/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import authService from '../../Services/authService';
import apiService from '../../Services/apiService';

import './AuthHero.css';

export default function AuthHero() {
  const lessonContainerRef = useRef(null);
  const user = authService.getCurrentUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');




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

  const scrollLeft = () => {
    lessonContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    lessonContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };


  return (
    <div className="Authhero-section">
      <div className="Authhero-container">
        <Header color="black" backgroundcolor="inherit" />
        <div className="Authhero-Header">
          <h1>Welcome Back, ready for your next lesson?</h1>
          <Link to="/mycourse">My Learning</Link>
        </div>
        <div className="Authhero-main">
          <div className="lesson-container" ref={lessonContainerRef}>
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
          <div className="navigation">
          <button className="nav-button" onClick={scrollLeft}>
              <ArrowBackIcon
                sx={{
                  '&:hover': {
                    color: 'red',
                  },
                  '&:active': {
                    color: 'red',
                  },
                }}
              />
            </button>
            <button className="nav-button" onClick={scrollRight}>
              <ArrowForwardIcon
                sx={{
                  '&:hover': {
                    color: 'red',
                  },
                  '&:active': {
                    color: 'red',
                  },
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
