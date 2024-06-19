import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseDetail from './CourseDetail';
import './CreateCourse.css';
import CourseChapters from './CourseChapters';
import CourseImage from './CourseImage';
import DeleteIcon from '@mui/icons-material/Delete';
import authService from '../../Services/authService';
import Alert from '@mui/material/Alert';

export default function CreateCourse() {
  const [userid, setUserid] = useState('');
  const [chapterinfo, setChapterinfo] = useState([])

  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: null,
    chapters: []
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUserid(currentUser.id);
    }
  }, []);

  const handleDetailChange = (key, value) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    if (!userid) {
      console.error('User ID is missing');
      return;
    }

    const formData = new FormData();
    formData.append('courseCreateDto.CourseName', courseDetails.title);
    formData.append('courseCreateDto.Description', courseDetails.description);
    formData.append('courseCreateDto.catagory', courseDetails.category);
    formData.append('courseCreateDto.Thumbline', courseDetails.image);
    formData.append('courseCreateDto.price', courseDetails.price);
    formData.append('courseCreateDto.userid', userid);

    if (courseDetails.chapters.length === 0) {
      console.error('At least one chapter is required');
      return;
    } else {
      courseDetails.chapters.forEach((chapter, index) => {
        formData.append(`courseCreateDto.Chapters[${index}]`, chapter.title); // Only append the title
      });
    }

    try {
      const response = await axios.post('https://localhost:7182/api/course/createcourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log(response)
        alert('Course Created Successfully');
        const chapters = response.data.data.chapters.$values; // Adjust this based on actual API response structure
        setChapterinfo(chapters);
        const updatedChapters = courseDetails.chapters.map((chapter, index) => ({
          ...chapter,
          id: chapters[index].chapterId, // Adjust this based on actual API response structure
        }));
        setCourseDetails((prevState) => ({
          ...prevState,
          chapters: updatedChapters
        }));
      }
    } catch (error) {
      console.error('There was an error uploading the course!', error);
    }
  };

  return (
    <div className='courseCreate-Container'>
      <div className="courseCreate-HeaderContainer">
        <button onClick={handlePublish}>Publish</button>
        <button className='deleteBtn'><DeleteIcon style={{ color: 'white' }}/></button>
      </div>
      <div className="courseCreate-MainContainer">
        <div className="courseCreate-LeftContainer">
          <div className="courseCreate-LeftHeaderContainer">
            <h1>Customize your course</h1>
          </div>
          <div className="courseCreate-LeftMainContainer">
            <CourseDetail handleDetailChange={handleDetailChange} />
          </div>
        </div>
        <div className="courseCreate-RightContainer">
          <div className="courseCreate-RightHeaderContainer">
            <h1>Course chapters</h1>
          </div>
          <div className="courseCreate-RightMainContainer">
            <CourseChapters handleDetailChange={handleDetailChange} chapterinfo={chapterinfo} />
            <CourseImage handleDetailChange={handleDetailChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
