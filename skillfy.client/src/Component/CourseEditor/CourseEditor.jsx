import React, { useState, useEffect } from 'react';
import CourseDetails from './CourseDetails';
import CourseChapter from './CourseChapter';
import CourseImage from '../CourseCreate/CourseImage';
import CourseSell from './CourseSell';
import CourseCategory from '../CourseCreate/CourseCategory';
import { Apps } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import axios from 'axios';
import authService from '../../Services/authService';
import Header from '../Header/Header'

import './CourseEditor.css';

const CourseEditor = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [courseCategory, setCourseCategory] = useState('');
  const [courseChapters, setCourseChapters] = useState([]);
  const [coursePrice, setCoursePrice] = useState('');
  const [userid, setUserid] = useState('7c8db928-040b-4f2b-bc2e-d95deddef30a');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUserid(currentUser.id);
    }
  }, []);

  useEffect(() => {
    console.log('Course Chapters in CourseEditor:', courseChapters);
  }, [courseChapters]);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!userid) {
      console.error('User ID is missing');
      return;
    }
    console.log(courseChapters)
  
    const formData = new FormData();
    formData.append('courseCreateDto.CourseName', courseName);
    formData.append('courseCreateDto.Description', courseDescription);
    formData.append('courseCreateDto.catagory', courseCategory);
    formData.append('courseCreateDto.Thumbline', courseImage);
    formData.append('courseCreateDto.price', coursePrice);
    formData.append('courseCreateDto.userid', userid);
  
    if (courseChapters.length === 0) {
      console.error('At least one chapter is required');
      return;
    }
    else{
      console.log(courseChapters)
      formData.append(`courseCreateDto.Chapters`, courseChapters);
    }
  

  
    try {
      const response = await axios.post('https://localhost:7182/api/course/createcourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error uploading the course!', error);
    }
  };
  

  const setCourseDetails = ({ title, description }) => {
    setCourseName(title);
    setCourseDescription(description);
  };

  return (
    <div className="course-editor_container">
      <div>
        <Button variant="contained" onClick={handleSave}>
          <SaveIcon /> Save
        </Button>
      </div>
      <div className="course-editor">
        <div className="left-panel">
          <div className="left-panel_header">
            <h1><Apps fontSize='large'/> Customize your course</h1>
          </div>
          <CourseDetails setCourseDetails={setCourseDetails} />
          <CourseImage setCourseImage={setCourseImage} />
          <CourseCategory setCourseCategory={setCourseCategory} />
        </div>
        <div className="right-panel">
          <div className="right-panel_header"></div>
          <CourseChapter setCourseChapters={setCourseChapters} />
          <CourseSell setCoursePrice={setCoursePrice} />
        </div>
      </div>
    </div>
  );
};

export default CourseEditor;
