import React, { useEffect, useState } from 'react';
import './Courses.css';
import CourseCard from '../ui/CourseCard';
import axios from 'axios';

export default function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://localhost:7182/api/course/coursecard');
        console.log('Response:', response.data.$values);
        setCourseData(response.data.$values);
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
          <button className="view-all-btn">View all</button>
        </div>
        <div className="courses-grid">
          {loading ? (
            <p>Loading courses...</p>
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
