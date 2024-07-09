import React, { useEffect, useState } from 'react';
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'
import axios from 'axios';
import CourseCard from '../Component/ui/CourseCard';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import './Search.css'

export default function SearchPage() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState('');
  const location = useLocation();

  useEffect(() => {
      console.log('Type of Course ID from location state:', location.state);
      setCourseName(location.state.coursename);
  }, [location.state]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`https://localhost:7182/api/course/search${courseName}`);
        console.log('Response:', response.data.$values);
        setCourseData(response.data.$values);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseName) {
      fetchCourses();
    }
  }, [courseName]);

  return (
    <>
      <Header color="black"/>
      <div className='searchMainContainer'>
        <div className='searchContainer'>
          <div className="searchHeader">
            <h1>Search Results for "{courseName}"</h1>
            <p>Explore our collection of courses related to "{courseName}".</p>
          </div>
          <div className="searchBody">
            {loading ? (
              <div className="loading">
                <CircularProgress />
              </div>
            ) : courseData.length > 0 ? (
              courseData.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))
            ) : (
              <div>
                <p>Sorry, we couldn't find any results for "{courseName}".</p>
                <p>Try adjusting your search. Here are some ideas:</p>
                <ul>
                  <li>Make sure all words are spelled correctly</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
