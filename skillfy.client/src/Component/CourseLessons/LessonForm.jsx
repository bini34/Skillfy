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
      const response = await axios.post(
        'https://api.mux.com/video/v1/uploads',
        {
          cors_origin: "*",
          new_asset_settings: {
            playback_policy: ["public"],
            encoding_tier: "baseline"
          }
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          auth: {
            username: 'bd98d4b0-5ecf-4872-816b-cebaadfe0026',
            password: 'XLb24WYLW6KC2ummrWP26EBnYjdu4TIa4jqIyFEBLJ+lQ5bEFup8mBJQlqeh0IOUxK6L7CDWrF2'
          }
        }
      );
      setUploadUrl(response.data.data.url);
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
      await axios.post('https://your-backend.com/api/videos', { videoId, title: lessonTitle });
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
