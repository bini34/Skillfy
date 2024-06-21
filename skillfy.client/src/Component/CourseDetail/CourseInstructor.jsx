import React from 'react';
import './CourseInstructor.css';

const CourseInstructor = () => {
  return (
      <div className="instructor-content">
        <div className="instructor-header">
          <img
            src="https://via.placeholder.com/150"
            alt="Instructor"
            className="instructor-image"
          />
          <div className="instructor-info">
            <h2>Demetri Caron</h2>
            <div className="ratings">
              <span>⭐ 4.5 (1,348 ratings)</span>
              <span>👁️ 271,658 Students</span>
              <span>🎓 28 Courses</span>
            </div>
            <p>
              CBE brings you courses that are affordable, current, entertaining and based on practical work experience instead of theory.
            </p>
          </div>
        </div>
        <h3>Adobe Certified Instructor & Adobe Certified Expert</h3>
        <p>
          Effortless comfortable full leather lining eye-catching unique detail to the toe low ‘cut away’ sides clean and sleek. Polished finish elegant court shoe work duty stretchy mid kitten heel this ladylike design slingback strap mid kitten heel this ladylike design. Sharing is who I am, and teaching is where I am at my best, because I’ve been on both sides of that equation, and getting to deliver useful training is my meaningful way to be a part of the creative community. I’ve spent a long time watching others learn, and teach, to refine how I work with you to be efficient, useful and, most importantly, memorable. I want you to carry what I’ve shown you into a bright future.
        </p>
      </div>
  );
}

export default CourseInstructor;
