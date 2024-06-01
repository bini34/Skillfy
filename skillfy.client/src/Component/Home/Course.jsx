import React from 'react'
import './Courses.css'
import CourseCard from '../ui/CourseCard'
import young from '../../assets/image/young.png'

const courseData = [
  {
    title: "Full Stack Web Development",
    instructor: "Abebe Kebede",
    price: 40,
    originalPrice: 70,
    rating: 4.5,
    students: 28500,
    lessons: 36,
    image: young,
  },
  {
    title: "Data Science and Machine Learning",
    instructor: "Bethany Smith",
    price: 50,
    originalPrice: 100,
    rating: 4.7,
    students: 35000,
    lessons: 45,
    image: young,
  },
  {
    title: "Introduction to Python Programming",
    instructor: "Carlos Martinez",
    price: 30,
    originalPrice: 60,
    rating: 4.6,
    students: 20000,
    lessons: 25,
    image: young,
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Diane Johnson",
    price: 45,
    originalPrice: 90,
    rating: 4.8,
    students: 18000,
    lessons: 30,
    image: young,
  },
  {
    title: "Cybersecurity Essentials",
    instructor: "Ethan Brown",
    price: 60,
    originalPrice: 120,
    rating: 4.9,
    students: 25000,
    lessons: 40,
    image: young,
  },
  {
    title: "Digital Marketing Masterclass",
    instructor: "Fiona Green",
    price: 35,
    originalPrice: 70,
    rating: 4.4,
    students: 22000,
    lessons: 28,
    image: young,
  }
];

export default function Courses() {
  return (
    <div className='courses-section'>
        <div className='courses-container'>
            <div className='courses-header'>
                <h1>Get choice of your courses</h1>
                <button className="view-all-btn">View all</button>
            </div>
            <div className="courses-grid">
              {courseData.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
        </div>
    </div>
  )
}
