import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MuxUploader from '@mux/mux-uploader-react';
import './LessonList.css';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import MuxPlayer from "@mux/mux-player-react";

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [playbackId, setPlaybackId] = useState('');
  const [uploadId, setUploadId] = useState('');
  const [uploadVideo, setUploadVideo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [chapterId, setChapterId] = useState('');
  console.log("chapter id from location",location.state.chapterId);

  useEffect(() => {
    if (location.state && location.state.chapterId) {
      console.log("chapter id from location",location.state.chapterId);
      const id = parseInt(location.state.chapterId, 10);
      console.log("chapter id",typeof id);

      if (!isNaN(id)) {
        setChapterId(id);
        console.log("chapter id",typeof id);
      } else {
        console.log("Invalid chapter ID");
      }
    }
    getUploadUrl();
  }, [location.state]);

  const getUploadUrl = async () => {
    try {
      const response = await axios.post('https://localhost:7182/api/mux/upload-url');
      if (response.data.data.url) {
        setUploadUrl(response.data.data.url);
        setUploadId(response.data.data.id);
      }
    } catch (error) {
      console.error('Error fetching upload URL', error);
    }
  };

 
  const handleSuccess = (event) => {
    setUploadVideo(true);
  };

  const sendVideoIdToBackend = async () => {
    try {
      const response = await axios.post('https://localhost:7182/api/mux/getid', {
        title: newLessonTitle,
        chpaterid: chapterId,
        uploadId: uploadId
      });
      setPlaybackId(response.data.playbackId);
      addLesson({
        title: newLessonTitle,
        playbackId: response.data.playbackId
      });
    } catch (error) {
      console.error('Error sending video ID to backend:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddLesson = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendVideoIdToBackend();
    setNewLessonTitle('');
    setPlaybackId('');
    setUploadVideo(false);
  };

  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
    setIsAdding(false);
  };

  return (
    <div className='courseCreate-LeftMainContainer-CourseChapters'>
      <div className="ChapterLesson-Header">
        <h3>Lessons List</h3>
        {!isAdding ? (
          <button onClick={handleAddLesson}>Add Lesson</button>
        ) : (
          <button onClick={handleCancel}>Cancel</button>
        )}
      </div>
      {!isAdding && (
        <div className="ChapterLesson-List">
          {lessons.length === 0 ? (
            <p>No Lesson added</p>
          ) : (
            lessons.map((lesson, index) => (
              <div className="ChapterLesson" key={index}>
                <p>{lesson.title}</p>
                <button onClick={() => handleEditChapter(index)}>
                  <EditIcon fontSize="small" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
      {isAdding && (
        <div className="CreateChapterContainer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newLessonTitle}
              onChange={(e) => setNewLessonTitle(e.target.value)}
              placeholder="Lesson Title"
            />
            <div className="course-video-container">
              <div className="course-video-title">Course Video</div>
              {playbackId && (
                <MuxPlayer
                  playbackId={playbackId}
                  metadata={{
                    video_id: uploadId,
                    video_title: newLessonTitle,
                    viewer_user_id: "user-d-007",
                  }}
                />
              )}
              {uploadUrl && (
                <MuxUploader
                  endpoint={uploadUrl}
                  onSuccess={handleSuccess}
                  onError={(error) => console.error('Upload error:', error)}
                />
              )}
            </div>
            <button type="submit">Create Lesson</button>
          </form>
        </div>
      )}
    </div>
  );
}
