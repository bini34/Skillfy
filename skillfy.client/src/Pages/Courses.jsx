import React, { useEffect, useState } from 'react';
import './Courses.css'
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import axios from 'axios';
import CourseCard from '../Component/ui/CourseCard';

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
    <>
    <Header color="black" />

    {/* <Header/> */}
    <div className='courseContainer'>
      <div className="coursemainContainer">
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
    <Footer/>
    </>
  )
}
