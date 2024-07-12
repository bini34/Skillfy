import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { styled } from '@mui/material/styles';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import axios from 'axios';
import './Sidebar.css';


const Sidebar = ({ SetCurrentLessonData }) => {
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState({});
  const [courseID, setCourseID] = useState(0);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.courseID) {
      const id = parseInt(location.state.courseID, 10);
      if (!isNaN(id)) {
        setCourseID(id);
      } else {
        console.error("Invalid course ID");
      }
    }
  }, [location.state]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://localhost:7182/api/course/detailenrolled56`);
        setCourseData(response.data);
        console.log('Course data:', response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course data.');
        setCourseData(null);
      } finally {
        setLoading(false);
      }
    };

    if (courseID) {
      fetchCourses();
    }
  }, [courseID]);

  const calculateProgress = () => {
    return 60; // Example progress calculation
  };

  const handleLessonClick = (url, title) => {
    const strippedUrl = url.replace("https://stream.mux.com/", "").replace(".m3u8", "");

    SetCurrentLessonData({ 
      lessonUrl: strippedUrl,
      lessonTitle: title,
    });
  };



  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-header">
          <Link to="/mycourse">
            <div className="circle">
              <KeyboardReturnIcon />
            </div>
            Back
          </Link>
          <h1>{courseData.title}</h1>
        </div>
        <div className="progress">
          <p>{calculateProgress()}% Complete</p>
        </div>
      </div>
      <input type="text" placeholder="Search" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="learnLessonList">
          {courseData?.chapters?.$values?.length > 0 ? (
            courseData.chapters.$values.map((chapter, index) => (
              <nav key={index}>
                <h3>{chapter.chaptername}</h3>
                <ul>
                  {chapter.lessons?.$values?.length > 0 ? (
                    chapter.lessons.$values.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} onClick={() => handleLessonClick(lesson.url, lesson.title)}>
                        <PlayLessonIcon /> {lesson.title} <span>{lesson.duration}</span>
                      </li>
                    ))
                  ) : (
                    <>No lessons available</>
                  )}
                </ul>
              </nav>
            ))
          ) : (
            <p>No chapters available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
