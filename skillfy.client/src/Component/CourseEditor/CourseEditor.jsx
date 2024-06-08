import React, { useState, useEffect } from 'react';
import CourseDetails from './CourseDetails';
import CourseChapter from './CourseChapter';
import CourseImage from './CourseImage';
import CourseSell from './CourseSell';
import CourseCategory from './CourseCategory';
import { Apps } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import axios from 'axios';
import authService from '../../Services/authService';

import './CourseEditor.css';

const CourseEditor = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [courseCategory, setCourseCategory] = useState('');
  const [courseChapters, setCourseChapters] = useState([]);
  const [coursePrice, setCoursePrice] = useState('');
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUserid(currentUser);
    }
  }, []);

  useEffect(() => {
    console.log('Course Chapters in CourseEditor:', courseChapters);
  }, [courseChapters]);

  const handleSave = async (event) => {
    if (!userid) {
      console.error('User ID is missing');
      return;
    }
    event.preventDefault();
    const formData = new FormData();
    formData.append('courseCreateDto.CourseName', courseName);
    formData.append('courseCreateDto.Description', courseDescription);
    formData.append('courseCreateDto.catagory', courseCategory);
    formData.append('courseCreateDto.Thumbline', courseImage);
    formData.append('courseCreateDto.price', coursePrice);
    formData.append('courseCreateDto.userid', userid);

    courseChapters.forEach((courseChapter, index) => {
      formData.append(`chapterDtos[${index}].name`, courseChapter);
      console.log(courseChapter)
    });

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
