import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MuxUploader from '@mux/mux-uploader-react';
import './LessonList.css';
import EditIcon from '@mui/icons-material/Edit';
import apiService from '../../Services/apiService';
import Button from '@mui/material/Button';
import axios from 'axios';
import MuxPlayer from "@mux/mux-player-react";

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [playbackId, setPlaybackId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [uploadVideo, setUploadVideo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [chapterId, setChapterId] = useState('');

  useEffect(() => {
    if (location.state && location.state.chapterid) {
      setChapterId(location.state.chapterid);
    }
    getUploadUrl();
  }, [location.state]);

  const getUploadUrl = async () => {
    try {
      const response = await axios.post('https://localhost:7182/api/mux/upload-url');
      console.log("upload url",response)
      if (response.data.data.url)
       {
        setUploadUrl(response.data.data.url);
        setVideoId(response.data.data.id);

        console.log('Successfully fetched upload URL');
      }
    } catch (error) {
      console.error('Error fetching upload URL', error);
    }
  };



  const handleSuccess = (event) => {
    console.log('Upload successful:', event);
    setUploadVideo(true);
  };

  // const sendVideoIdToBackend = async () => {
  //   try {
  //     console.log( newLessonTitle)
  //     console.log( chapterId)
  //     console.log( videoId)

  //     await apiService.createData('api/mux/getplaybackid', { title: newLessonTitle, chapterId: chapterId, assetId: videoId });

  //     console.log('Video ID sent');
  //   } catch (error) {
  //     console.error('Error sending video ID to backend', error);
  //   }
  // };
  const sendVideoIdToBackend = async () => {
    try {
      const response = await axios.post('https://localhost:7182/api/mux/getid', {
        // // title: newLessonTitle,
        // // chapterId: chapterId,
        // uploadId: videoId
      });
      console.log('Playback ID:', response.data.playbackId);
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
    sendVideoIdToBackend();
    if (newLessonTitle && videoId) {
      addLesson({ title: newLessonTitle, videoId });
      setNewLessonTitle('');
      setVideoId('');
    }
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
              <MuxPlayer
                playbackId={playbackId}
                metadata={{
                  video_id: videoId,
                  video_title: newLessonTitle,
                  viewer_user_id: "user-d-007",
                }}
              />
              {uploadUrl && (
                <MuxUploader
                  endpoint={uploadUrl}
                  onSuccess={handleSuccess}
                  onError={(error) => console.error('Upload error:', error)}
                />
              )}
            </div>
            <button type="button" onClick={sendVideoIdToBackend}>Create Lesson</button>
          </form>
        </div>
      )}
    </div>
  );
}
