import React, { useState } from 'react';
import LessonForm from '../Component/CourseLessons/LessonForm';
import LessonList from '../Component/CourseLessons/LessonList';
import CourseChapter from '../Component/CourseLessons/CourseChapter'
import ChapterLessons from '../Component/CourseLessons/ChapterLessons'
import './CourseLessons.css'
export default function CourseLessons() {
  //   const [lessons, setLessons] = useState([]);

  // const addLesson = (lesson) => {
  //   setLessons([...lessons, lesson]);
  // };

  // return (
  //   <div className="App">
  //     <h1>Course Lessons</h1>
  //     <LessonForm addLesson={addLesson} />
  //     <LessonList lessons={lessons} />
  //   </div>
  // );
  return (
    
    <div className='courseLesson-mainContainer'>
        <div className='courseLesson-rightContainer'>
        <CourseChapter/>
        </div>
        <div className='courseLesson-leftContainer'>
        <ChapterLessons/>
        </div>
    </div>
  )
}
