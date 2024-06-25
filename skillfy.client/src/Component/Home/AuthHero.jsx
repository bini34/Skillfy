import React, {useState} from 'react'
import { Link} from 'react-router-dom';
import LessonHistory from './LessonHistory'
import LessonCard from './LessonCard'
import Header from '../Header/Header'
import './AuthHero.css'

export default function AuthHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lessons = [<LessonCard />, <LessonCard />, <LessonCard />, <LessonCard />]; // Add more LessonCards as needed

  const goPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : lessons.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lessons.length);
  };
  return (
    <div className="Authhero-section">
      <div className="Authhero-container">
      <Header color="black" backgroundcolor="inherit"/>

        <div className="Authhero-Header">
          <h1>Welocome Back, ready for you next lesson?</h1>
          <Link to="/my_learning">
           My Learning
          </Link>
        </div>
        <div className="Authhero-main">
          <div className="lesson-container">
              <LessonCard />
              <LessonCard />
              <LessonCard />
              <LessonCard />
          </div>
          <div className="navigation">
            <button className="nav-button" onClick={goPrev}>{'<'}</button>
            <button className="nav-button" onClick={goNext}>{'>'}</button>
          </div>
        </div>
      </div>

    </div>
  )
}
