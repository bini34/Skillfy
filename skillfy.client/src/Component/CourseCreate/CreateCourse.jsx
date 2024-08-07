import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    about: '',
    course_audience: '',
    description: '',
    category: '',
    price: '',
    image: null,
    chapters: []
  });
  const [courseDetailsfromResponse, setCourseDetailsfromResponse] = useState({
    id: null,
    title: '',
    about: '',
    course_audience: '',
    description: '',
    category: null,
    price: '',
    image: null,
    chapters: []
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isCreated, setIsCreated] = useState(false);
  const location = useLocation();
  const courseDetailsfromlesson = location.state?.courseDetailsfromResponse;

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUserid(currentUser.id);
    }
  }, []);

  useEffect(() => {
    if (courseDetailsfromlesson) {
      setIsCreated(true);
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        title: courseDetailsfromlesson.title || '',
        about: courseDetailsfromlesson.about || '',
        course_audience: courseDetailsfromlesson.course_audience || '',
        description: courseDetailsfromlesson.description || '',
        category: courseDetailsfromlesson.category || '',
        price: courseDetailsfromlesson.price || '',
        image: courseDetailsfromlesson.image || null,
        chapters: courseDetailsfromlesson.chapters || [],
      }));
    }
  }, [courseDetailsfromlesson]);

  useEffect(() => {
    console.log('courseDetailsfromResponse updated:', courseDetailsfromResponse);
  }, [courseDetailsfromResponse]);

  const handleDetailChange = (key, value) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!courseDetails.title || !courseDetails.about || !courseDetails.course_audience || !courseDetails.description || !courseDetails.category || !courseDetails.price || !courseDetails.image || courseDetails.chapters.length === 0) {
      setSnackbar({ open: true, message: 'Please complete all fields before creating the course.', severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('courseCreateDto.CourseName', courseDetails.title);
    formData.append('courseCreateDto.about', courseDetails.about);
    formData.append('courseCreateDto.course_audience', courseDetails.course_audience);
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
        console.log("hello")
        const responseData = response.data.data;
        const chapters = responseData.chapters.$values;

        console.log('API Response:', responseData);  // Debugging line
        console.log('Chapters:', chapters);  // Debugging line

        setSnackbar({ open: true, message: 'Course Created Successfully', severity: 'success' });
        setIsCreated(true);

        setCourseDetailsfromResponse({
          id: responseData.courseID,
          title: responseData.title,
          about: responseData.about,
          course_audience: responseData.course_audience,
          description: responseData.description,
          category: responseData.catagoryId,
          price: responseData.price,
          image: responseData.thumbnailImage,
          chapters: chapters
        });

        setChapterinfo(chapters);

        const updatedChapters = courseDetails.chapters.map((chapter, index) => ({
          ...chapter,
          id: chapters[index].chapterId,
        }));

        console.log('Updated Chapters:', updatedChapters);  // Debugging line

        setCourseDetails((prevState) => ({
          ...prevState,
          chapters: updatedChapters
        }));
        
        /*console.log('Course Details: after update', courseDetails);   Debugging line*/
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
        <h1>Customize your course</h1>
        <div className="courseCreate-HeaderContainerbtn">
          {!isCreated && <button className='createBtn' onClick={handleCreate}>Create</button>}
          {isCreated && (
            <>
              <button className='deleteBtn'><DeleteIcon style={{ color: 'white' }} /></button>
              {/* <button className='publishBtn'>Publish</button> */}
            </>
          )}
        </div>
      </div>
      <div className="courseCreate-MainContainer">
        <div className="courseCreate-LeftContainer">
          <CourseDetail courseDetailsfromlesson={courseDetailsfromlesson} handleDetailChange={handleDetailChange} />
        </div>
        <div className="courseCreate-RightContainer">
          <CourseChapters courseDetailsfromlesson={courseDetailsfromlesson} handleDetailChange={handleDetailChange} chapterinfo={chapterinfo} courseDetailsfromResponse={courseDetailsfromResponse} />
          <CourseImage courseDetailsfromlesson={courseDetailsfromlesson} handleDetailChange={handleDetailChange} />
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
