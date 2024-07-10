import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseChapters.css';
import EditIcon from '@mui/icons-material/Edit';

export default function CourseChapters({ handleDetailChange, chapterinfo , courseDetailsfromResponse}) {
  const [chapters, setChapters] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleDetailChange('chapters', chapters);
  }, [chapters, handleDetailChange]);

  const handleAddChapter = () => {
    setIsAdding(true);
  };

  const handleSaveChapter = () => {
    if (newChapterTitle.trim()) {
      const newChapter = {
        id: chapters.length + 1, // Ensure a unique ID for each chapter
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
    navigate(`add-lessons/`, { state: {chapterId, courseDetailsfromResponse: courseDetailsfromResponse } });
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
                <p>{chapter.title}</p>
                {chapterinfo[index]?.chapterId && (
                  <button onClick={() => handleEditChapter(chapterinfo[index].chapterId)}>
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
