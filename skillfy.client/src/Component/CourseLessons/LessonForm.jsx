import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MuxUploader from '@mux/mux-uploader-react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function LessonForm({ addLesson }) {
  const [uploadUrl, setUploadUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  useEffect(() => {
    getUploadUrl();
  }, []);

  const getUploadUrl = async () => {
    try {
      const response = await axios.post('https://localhost:7182/api/mux/upload-url');
      setUploadUrl(response.data.uploadUrl);
      setVideoId(response.data.videoId);
    } catch (error) {
      console.error('Error fetching upload URL', error);
    }
  };

  const handleSuccess = (event) => {
    const videoId = event.detail.asset_id;
    setVideoId(videoId);
    sendVideoIdToBackend(videoId);
  };

  const sendVideoIdToBackend = async (videoId) => {
    try {
      await axios.post('https://localhost:7182/api/lesson/uploadLesson', { videoId, title: lessonTitle });
      console.log('Video ID sent to backend successfully');
    } catch (error) {
      console.error('Error sending video ID to backend', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lessonTitle) {
      setSnackbarMessage('Please enter a lesson title');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (!videoId) {
      setSnackbarMessage('Please upload a video');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    addLesson({ title: lessonTitle, videoId });
    setLessonTitle('');
    setVideoId('');
    setSnackbarMessage('Lesson added successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="LessonForm">
      <TextField
        id="standard-basic"
        value={lessonTitle}
        label="Lesson Title"
        onChange={(e) => setLessonTitle(e.target.value)}
        variant="standard"
        required
      />
      <div className="course-video-container">
        <div className="course-video-title">Course Video</div>
        {uploadUrl ? (
          <MuxUploader
            endpoint={uploadUrl}
            onSuccess={handleSuccess}
            onError={(error) => console.error('Upload error:', error)}
          />
        ) : (
          <p>Loading upload URL...</p>
        )}
      </div>
      <Button type="submit" variant="contained">Add Lesson</Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default LessonForm;
