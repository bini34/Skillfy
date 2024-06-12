import React from 'react'
import { Link} from 'react-router-dom';
import LessonHistory from './LessonHistory'
import LessonCard from './LessonCard'
import Header from '../Header/Header'
import './AuthHero.css'

export default function AuthHero() {
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
          </div>
          <div className="navigation">
              <button className="nav-button">{'<'}</button>
              <button className="nav-button">{'>'}</button>
          </div>
        </div>
      </div>

    </div>
  )
}
