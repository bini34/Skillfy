import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import LessonCard from './LessonCard';
import Header from '../Header/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './AuthHero.css';

export default function AuthHero() {
  const lessonContainerRef = useRef(null);

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
            <LessonCard />
            <LessonCard />
            <LessonCard />
            <LessonCard /> 
            <LessonCard /> 

          </div>
          <div className="navigation">
            <button className="nav-button" onClick={scrollLeft}><ArrowBackIcon/></button>
            <button className="nav-button" onClick={scrollRight}><ArrowForwardIcon/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
