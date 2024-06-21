import React from 'react';
import Rating from '@mui/material/Rating';

import './CourseReviews.css';

const CourseReviews = () => {
  return (
      <div className="reviews-content">
        <h2>Student feedback</h2>
        <div className="rating-summary">
          <div className="rating-value">
            <h3>4.6</h3>
            <div className="stars"><Rating name="read-only" value= {4.6} readOnly /></div>
            <p>Course Rating</p>
          </div>
          <div className="rating-distribution">
            <div className="rating-bar">
              <Rating name="read-only" value= {5} readOnly />
              <div className="bar">
                <div className="filled-bar" style={{ width: '59%' }}></div>
              </div>
              <span>59%</span>
            </div>
            <div className="rating-bar">
            <Rating name="read-only" value= {4} readOnly />
              <div className="bar">
                <div className="filled-bar" style={{ width: '31%' }}></div>
              </div>
              <span>31%</span>
            </div>
            <div className="rating-bar">
              <Rating name="read-only" value= {3} readOnly />
              <div className="bar">
                <div className="filled-bar" style={{ width: '20%' }}></div>
              </div>
              <span>20%</span>
            </div>
            <div className="rating-bar">
            <Rating name="read-only" value= {2} readOnly />
              <div className="bar">
                <div className="filled-bar" style={{ width: '5%' }}></div>
              </div>
              <span>5%</span>
            </div>
            <div className="rating-bar">
            <Rating name="read-only" value= {1} readOnly />
              <div className="bar">
                <div className="filled-bar" style={{ width: '1%' }}></div>
              </div>
              <span>1%</span>
            </div>
          </div>
        </div>
        <div className="reviews-list">
          <div className="review">
            <img
              src="https://via.placeholder.com/50"
              alt="Wynton McCurdy"
              className="review-image"
            />
            <div className="review-content">
              <h3>Wynton McCurdy</h3>
              <p>16 courses, 10 reviews</p>
              <p> <Rating name="read-only" value= {5} readOnly /> a year ago</p>
              <p>Wow, I've learnt so much and it has already changed what and how I do things. I cannot wait to start the next course.</p>
            </div>
          </div>
          <div className="review">
            <img
              src="https://via.placeholder.com/50"
              alt="Wynton McCurdy"
              className="review-image"
            />
            <div className="review-content">
              <h3>Wynton McCurdy</h3>
              <p>16 courses, 10 reviews</p>
              <p> <Rating name="read-only" value= {5} readOnly />
              a year ago</p>
              <p>Wow, I've learnt so much and it has already changed what and how I do things. I cannot wait to start the next course.</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default CourseReviews;
