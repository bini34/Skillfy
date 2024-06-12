import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MuxUploader from '@mux/mux-uploader-react';

function LessonForm({ addLesson }) {
  const [uploadUrl, setUploadUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');

  useEffect(() => {
    getUploadUrl();
  }, []);

  const getUploadUrl = async () => {
    try {
      const response = await axios.post('https://localhost:7182/api/mux/upload-url');
      setUploadUrl(response.data.uploadUrl);
      setVideoId(response.data.videoId);
     /*setUploadUrl(response.data.data.url); */
    } catch (error) {
      console.error('Error fetching upload URL', error);
    }
  };

  const handleSuccess = (event) => {
    console.log()
    const videoId = event.detail.asset_id;
    setVideoId(videoId);
    sendVideoIdToBackend(videoId);
    console.log(videoId)
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
    if (lessonTitle && videoId) {
      addLesson({ title: lessonTitle, videoId });
      setLessonTitle('');
      setVideoId('');
    }
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
    </form>
  );
}

export default LessonForm;
