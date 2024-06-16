import React from 'react';
import CourseCategory from './CourseCategory';
import './CourseDetail.css';

export default function CourseDetail({ handleDetailChange }) {
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    handleDetailChange(id, value);
  };

  return (
    <>
      <div className="courseCreate-LeftMainContainer-CourseTitle">
        <h3>Course Title</h3>
        <input type="text" placeholder="Course Title" id="title" onChange={handleInputChange} />
      </div>
      <div className="courseCreate-LeftMainContainer-CourseDescription">
        <h3>Course Description</h3>
        <textarea type="text" placeholder="Course Description" id="description" onChange={handleInputChange} />
      </div>
      <div className="courseCreate-LeftMainContainer-CourseCategory">
        <h3>Course Category</h3>
        <CourseCategory  handleDetailChange={handleDetailChange}/>
      </div>
      <div className="courseCreate-LeftMainContainer-CoursePrice">
        <h3>Course Price</h3>
        <input type="number" placeholder="Course Price" id="price" onChange={handleInputChange} />
      </div>
    </>
  );
}
