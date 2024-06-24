import React from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import MyCourseCard from '../Component/MyCourseCard/MyCourseCard';
import './MyCourse.css';

export default function MyCourse() {
  const courses = [
    {
      imageUrl: 'https://via.placeholder.com/150',
      coursename: 'React for Beginners',
      rating: 4.8,
      students: 150,
      enrollmentcount: 300,
      lessons: 12,
      teachername: 'John Doe',
      price: 59.99,
      handleImageError: () => { console.log('Image failed to load'); },
      sendToCourseDetail: () => { console.log('Navigating to React for Beginners details'); }
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      coursename: 'Advanced JavaScript',
      rating: 4.7,
      students: 200,
      enrollmentcount: 500,
      lessons: 15,
      teachername: 'Jane Smith',
      price: 79.99,
      handleImageError: () => { console.log('Image failed to load'); },
      sendToCourseDetail: () => { console.log('Navigating to Advanced JavaScript details'); }
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      coursename: 'UI/UX Design Essentials',
      rating: 4.9,
      students: 180,
      enrollmentcount: 450,
      lessons: 10,
      teachername: 'Alice Johnson',
      price: 69.99,
      handleImageError: () => { console.log('Image failed to load'); },
      sendToCourseDetail: () => { console.log('Navigating to UI/UX Design Essentials details'); }
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      coursename: 'Full-Stack Web Development',
      rating: 4.6,
      students: 220,
      enrollmentcount: 600,
      lessons: 20,
      teachername: 'Bob Brown',
      price: 89.99,
      handleImageError: () => { console.log('Image failed to load'); },
      sendToCourseDetail: () => { console.log('Navigating to Full-Stack Web Development details'); }
    }
  ];

  return (
    <>
      <Header color="black" />
      <div className='mycourseContainer'>
        <div className='mycourseHeader'>
          <h1>My Courses</h1>
        </div>
        <div className='mycourseBody'>
          {courses.map((course, index) => (
            <MyCourseCard
              key={index}
              imageUrl={course.imageUrl}
              coursename={course.coursename}
              rating={course.rating}
              students={course.students}
              enrollmentcount={course.enrollmentcount}
              lessons={course.lessons}
              teachername={course.teachername}
              price={course.price}
              handleImageError={course.handleImageError}
              sendToCourseDetail={course.sendToCourseDetail}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
