import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import axios from 'axios';
import './Sidebar.css';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'dark' ? '#1a90ff' : '#308fe8',
  },
}));

const Sidebar = ({ setCurrentLessonData }) => {
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
        const response = await axios.get(`https://localhost:7182/api/course/detailenrolled9`);
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
    // Assume 60% is the completion percentage for example purposes
    return 60;
  };

  const handleLessonClick = (url, title) => {
    const playbackId = url.split('/').pop().replace('.m3u8', '');
    setCurrentLessonData({ 
      lessonUrl: playbackId,
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
          <h1>Learn Adobe XD & Prototyping</h1>
        </div>
        <div className="progress">
          <BorderLinearProgress variant="determinate" value={calculateProgress()} />
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
                      <li  key={lessonIndex} onClick={() => handleLessonClick(lesson.url, lesson.title)}>
                       <PlayLessonIcon /> {lesson.title} <span>{lesson.duration}</span>
                      </li>
                    ))
                  ) : (
                    <li>No lessons available</li>
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
