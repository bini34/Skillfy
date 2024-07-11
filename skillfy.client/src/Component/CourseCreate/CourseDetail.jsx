import React, { useState, useEffect } from 'react';
import CourseCategory from './CourseCategory';
import './CourseDetail.css';

export default function CourseDetail({ handleDetailChange, courseDetailsfromlesson }) {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    about: '',
    description: '',
    course_audience: '',
    price: '',
  });

  useEffect(() => {
    if (courseDetailsfromlesson) {
      setCourseDetails({
        title: courseDetailsfromlesson.title || '',
        about: courseDetailsfromlesson.about || '',
        description: courseDetailsfromlesson.description || '',
        course_audience: courseDetailsfromlesson.course_audience || '',
        price: courseDetailsfromlesson.price || '',
      });
      Object.keys(courseDetailsfromlesson).forEach((key) => {
        handleDetailChange(key, courseDetailsfromlesson[key]);
      });
    }
  }, [courseDetailsfromlesson, handleDetailChange]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
    handleDetailChange(id, value);
  };

  return (
    <>
      <div className="courseCreate-LeftMainContainer-CourseTitle">
        <h3>Course Title</h3>
        <input
          type="text"
          placeholder="Course Title"
          id="title"
          value={courseDetails.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="courseCreate-LeftMainContainer-CourseAbout">
        <h3>Course About</h3>
        <textarea
          type="text"
          placeholder="Course About"
          id="about"
          value={courseDetails.about}
          onChange={handleInputChange}
        />
      </div>
      <div className="courseCreate-LeftMainContainer-CourseDescription">
        <h3>Course Description</h3>
        <textarea
          type="text"
          placeholder="Course Description"
          id="description"
          value={courseDetails.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="courseCreate-LeftMainContainer-CourseAudiance">
        <h3>Course Audience</h3>
        <textarea
          type="text"
          placeholder="Course Audience"
          id="course_audience"
          value={courseDetails.course_audience}
          onChange={handleInputChange}
        />
      </div>
      <div className="courseCreate-LeftMainContainer-CourseCategory">
        <h3>Course Category</h3>
        <CourseCategory
          handleDetailChange={handleDetailChange}
          courseDetailsfromlesson={courseDetailsfromlesson}
        />
      </div>
      <div className="courseCreate-LeftMainContainer-CoursePrice">
        <h3>Course Price</h3>
        <input
          type="number"
          placeholder="Course Price"
          id="price"
          value={courseDetails.price}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
