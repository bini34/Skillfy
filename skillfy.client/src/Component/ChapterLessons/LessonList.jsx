import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MuxUploader from '@mux/mux-uploader-react';
import './LessonList.css';
import EditIcon from '@mui/icons-material/Edit';
import apiService from '../../Services/apiService';

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [playbackId, setPlaybackId] = useState('');
  const navigate = useNavigate();

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
    <div className='courseCreate-LeftMainContainer-CourseChapters'>
      <div className="ChapterLesson-Header">
        <h3>Lessons List</h3>
        {!isAdding ? (
          <button onClick={}>Add Lesson</button>
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
          <input
            type="text"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            placeholder="Lesson Title"
          />
          <div className="course-video-container">
            <div className="course-video-title">Course Video</div>
            {(
              <MuxUploader
                endpoint={uploadUrl}
                onSuccess={handleSuccess}
                onError={(error) => console.error('Upload error:', error)}
              />
            ) }
          </div>
          <Button type="submit" variant="contained">Add Lesson</Button>
            </div>
          )}
    </div>
  );
}
