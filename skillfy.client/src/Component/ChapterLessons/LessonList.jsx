import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonList.css';
import EditIcon from '@mui/icons-material/Edit';

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   handleDetailChange('lessons', lessons.map(lessons => lessons.title));
  // }, [lessons]);

  const handleAddLesson = () => {
    setIsAdding(true);
  };

  const handleSaveLesson = () => {
    if (newLessonTitle.trim()) {
      setLessons([...lessons, { title: newLessonTitle }]);
      setNewLessonTitle('');
    }
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewLessonTitle('');
    setIsAdding(false);
  };

  const handleEditChapter = (chapterId) => {
    navigate(`add-lessons/`);
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
          {newLessonTitle.length === 0 ? (
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
          
          <div className="CreateLessonBtn">
            <button onClick={handleSaveLesson}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
}
