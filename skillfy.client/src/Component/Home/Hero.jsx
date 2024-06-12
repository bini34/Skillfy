import React from 'react'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import PeopleIcon from '@mui/icons-material/People';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import './Hero.css'


export default function Hero() {
  return (
    <div className="hero-section">

        <div className="hero-container">
            <Header/>
            <div className="hero-content">
                <h1>Distant learning for further expansion</h1>
                <p>Choose from over 100,000 online video courses with new additions published every month.</p>
                <Link to="/registor" className="cta-btn">Get Started Now for Free</Link>
            </div>
            <div className="features">
                <div className="feature-item">
                    <div className="icon-container">
                        <ImportContactsTwoToneIcon/>
                    </div> 
                    <span>100k Online Courses</span>
                </div>
                <div className="feature-item">
                    <div className="icon-container">
                        <PeopleIcon/>
                    </div>                    
                    <span>Expert Instruction</span>
                 </div>
                    <div className="feature-item">
                        <div className="icon-container">
                            <WatchLaterOutlinedIcon/>
                        </div> 
                        <span>Lifetime access</span>
                    </div>
            </div>
        </div>
    </div>
  )
}
