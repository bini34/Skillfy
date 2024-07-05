import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseDetail from './CourseDetail';
import './CreateCourse.css';
import CourseChapters from './CourseChapters';
import CourseImage from './CourseImage';
import DeleteIcon from '@mui/icons-material/Delete';
import authService from '../../Services/authService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateCourse() {
  const [userid, setUserid] = useState('');
  const [chapterinfo, setChapterinfo] = useState([]);
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: null,
    chapters: []
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isCreated, setIsCreated] = useState(false);

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

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!courseDetails.title || !courseDetails.description || !courseDetails.category || !courseDetails.price || !courseDetails.image || courseDetails.chapters.length === 0) {
      setSnackbar({ open: true, message: 'Please complete all fields before creating the course.', severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('courseCreateDto.CourseName', courseDetails.title);
    formData.append('courseCreateDto.Description', courseDetails.description);
    formData.append('courseCreateDto.catagory', courseDetails.category);
    formData.append('courseCreateDto.Thumbline', courseDetails.image);
    formData.append('courseCreateDto.price', courseDetails.price);
    formData.append('courseCreateDto.userid', userid);

    courseDetails.chapters.forEach((chapter, index) => {
      formData.append(`courseCreateDto.Chapters[${index}]`, chapter.title);
    });

    try {
      const response = await axios.post('https://localhost:7182/api/course/createcourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSnackbar({ open: true, message: 'Course Created Successfully', severity: 'success' });
        setIsCreated(true);
        const chapters = response.data.data.chapters.$values; 
        console.log("chaptrers",chapters);
        console.log("from respo",response.data.data.chapters.$values);
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
      setSnackbar({ open: true, message: 'There was an error creating the course.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <div className='courseCreate-Container'>
      <div className="courseCreate-HeaderContainer">
        {!isCreated && <button onClick={handleCreate}>Create</button>}
        {isCreated && (
          <>
            <button className='deleteBtn'><DeleteIcon style={{ color: 'white' }} /></button>
            <button className='publishBtn'>Publish</button>
          </>
        )}
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
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
