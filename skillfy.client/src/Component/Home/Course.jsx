import React, { useEffect, useState } from 'react';
import './Courses.css';
import CourseCard from '../ui/CourseCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { toArray } from '../../lib/utils';


export default function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://localhost:7182/api/course/coursecard');
        const courses = toArray(response.data);
        const sortedCourses = courses.sort((a, b) => (b.enrollmentcount || 0) - (a.enrollmentcount || 0));
        setCourseData(sortedCourses.slice(0, 6));
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  

  return (
    <div className='courses-section'>
      <div className='courses-container'>
        <div className='courses-header'>
          <h1>Get choice of your courses</h1>
          <Link to={'/courses'} className="view-all-btn">View all</Link>
        </div>
        <div className="courses-grid">
          {loading ? (
            <CircularProgress color="inherit" />
          ) : courseData.length > 0 ? (
            courseData.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
