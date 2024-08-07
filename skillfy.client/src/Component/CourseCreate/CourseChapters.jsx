import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseChapters.css';
import EditIcon from '@mui/icons-material/Edit';

export default function CourseChapters({ handleDetailChange, chapterinfo, courseDetailsfromResponse, courseDetailsfromlesson }) {
  const [chapters, setChapters] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [courseCreated, setCourseCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseDetailsfromlesson && Array.isArray(courseDetailsfromlesson.chapters)) {
      setChapters(courseDetailsfromlesson.chapters);
    }
  }, [courseDetailsfromlesson]);

  useEffect(() => {
    if (chapterinfo.length > 0) {
      setChapters((prevChapters) => {
        return prevChapters.map((chapter, index) => ({
          ...chapter,
          id: chapterinfo[index].chapterId,
        }));
      });
    }
    console.log('chapterinfo x', chapterinfo);
    console.log('chapters  x', chapters);
  }, [chapterinfo]);

  useEffect(() => {
    handleDetailChange('chapters', chapters);
  }, [chapters, handleDetailChange]);

  useEffect(() => {
    console.log('courseDetailsfromResponse', courseDetailsfromResponse);
    if (courseDetailsfromResponse.id && courseDetailsfromResponse.id > 0) {
      setCourseCreated(true);
    }
  }, [courseDetailsfromResponse]);

  const handleAddChapter = () => {
    setIsAdding(true);
  };

  const handleSaveChapter = () => {
    if (newChapterTitle.trim()) {
      const newChapter = {
        id: chapters.length + 1,
        title: newChapterTitle,
      };
      setChapters([...chapters, newChapter]);
      setNewChapterTitle('');
    }
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewChapterTitle('');
    setIsAdding(false);
  };

  const handleEditChapter = (chapterId) => {
    console.log('chapterId', chapterId);
    navigate(`add-lessons/`, { state: { chapterId, courseDetailsfromResponse } });
  };

  return (
    <div className='courseCreate-LeftMainContainer-CourseChapters'>
      <div className="CourseChapters-Header">
        <h3>Course chapters</h3>
        {!isAdding ? (
          <button onClick={handleAddChapter}>Add Chapter</button>
        ) : (
          <button onClick={handleCancel}>Cancel</button>
        )}
      </div>
      {!isAdding && (
        <div className="CourseChapters-List">
          {chapters.length === 0 ? (
            <p>No chapter added</p>
          ) : (
            chapters.map((chapter, index) => (
              <div className="CourseChapter" key={index}>
                <p>{chapter.title || chapter.chaptername}</p>
                {courseCreated && (chapter.chapterId || chapter.id) && (
                  <button onClick={() => handleEditChapter(chapter.chapterId || chapter.id)}>
                    <EditIcon fontSize="small" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
      {isAdding && (
        <div className="CreateChapterContainer">
          <input
            type="text"
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
            placeholder="Chapter title"
          />
          <div className="CreateChapterBtn">
            <button onClick={handleSaveChapter}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
}
