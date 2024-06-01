import React from 'react';
import './CourseDetailHeader.css';

const CourseDetailHeader = () => {
  return (
    <div className="course-header">
      <h1>Adobe Masterclass Photoshop, Illustrator, XD & InDesign</h1>
      <div className='course-header-main'>
        <div className='course-header-about'>
          <p>Learn graphic design today with Photoshop, Illustrator, Adobe XD, InDesign & more in this Adobe CC Masterclass!</p>
        </div>
        <div className="course-stats">
          <div className="course-rating">
            <span className="star"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F19E39"><path d="m352-293 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243-144l63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Zm237-333Z"/></svg></span> 
            <span className="rating">4.5</span>
            <span className="total-ratings">(1,348 ratings)</span>
          </div>
          <div className="course-enrollment">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg>
              Enrolled 415 students</span>
          </div>
          <div className="course-duration">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="m614-310 51-51-149-149v-210h-72v240l170 170ZM480-96q-79.38 0-149.19-30T208.5-208.5Q156-261 126-330.96t-30-149.5Q96-560 126-630q30-70 82.5-122t122.46-82q69.96-30 149.5-30t149.55 30.24q70 30.24 121.79 82.08 51.78 51.84 81.99 121.92Q864-559.68 864-480q0 79.38-30 149.19T752-208.5Q700-156 629.87-126T480-96Zm0-384Zm.48 312q129.47 0 220.5-91.5Q792-351 792-480.48q0-129.47-91.02-220.5Q609.95-792 480.48-792 351-792 259.5-700.98 168-609.95 168-480.48 168-351 259.5-259.5T480.48-168Z"/></svg>
               Duration 10 weeks</span>
          </div>
          <div className="course-lessons">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C"><path d="m384-312 264-168-264-168v336Zm96.28 216Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
              38 Lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
