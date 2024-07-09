import React from 'react';
import './CourseOverview.css';

const CourseOverview = ({courseData}) => {
    return (
        <div className="course-info">
            <section className="course-description_container">
                <h2>Course Description</h2>
                <p>{courseData.description}</p>
            </section>
            <section className="target-audience">
                <h2>Who this course is for</h2>
                <p>{courseData.course_audience}</p>
            </section>
        </div>
    );
};

export default CourseOverview;
