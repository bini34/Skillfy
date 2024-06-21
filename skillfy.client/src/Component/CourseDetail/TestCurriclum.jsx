import React from 'react'
import Curriculum from './Curriculum'

export default function TestCurriclum() {
    const courseData = [
        {
          title: "Introduction to Networking",
          lectures: [
            { title: "What you will learn in this course", duration: "03:58", preview: true }
          ]
        },
        {
          title: "Fundamentals of Network Programming",
          lectures: [
            { title: "Introduction to Networking", duration: "02:18" },
            { title: "What is Internetworking", duration: "01:39" },
            { title: "Introduction to Area Networks", duration: "02:42" },
            { title: "LAN", duration: "01:35" },
            { title: "MAN", duration: "01:07" },
            { title: "WAN", duration: "02:17" },
          ]
        },
        {
          title: "Main Concepts of Networking",
          lectures: [
            { title: "Lecture 1", duration: "04:00" },
            { title: "Lecture 2", duration: "05:00" },
            { title: "Lecture 3", duration: "06:00" },
          ]
        }
      ];
  return (
    <>
      {courseData.map((section, index) => (
        <Curriculum key={index} section={section} />
      ))}
    </>
  
  )
}
