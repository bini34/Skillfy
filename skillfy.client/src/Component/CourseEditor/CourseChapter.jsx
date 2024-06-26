import React, { useState, useEffect } from 'react';
import './CourseChapters.css';

export default function CourseChapter({ setCourseChapters }) {
  const [chapters, setChapters] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  useEffect(() => {
    console.log('Updating parent state with chapters:', chapters.map(chapter => chapter.title));
    setCourseChapters(chapters.map(chapter => chapter.title));
  }, [chapters, setCourseChapters]);

  const handleAddChapter = () => {
    if (newChapterTitle.trim() !== '') {
      const newChapters = [
        ...chapters,
        { title: newChapterTitle, status: 'Draft', isEditing: false, tempTitle: newChapterTitle },
      ];
      setChapters(newChapters);
      setIsAdding(false);
      setNewChapterTitle('');
    }
  };

  const handleEditChapter = (index) => {
    const newChapters = [...chapters];
    if (newChapters[index].isEditing) {
      newChapters[index].title = newChapters[index].tempTitle;
    }
    newChapters[index].isEditing = !newChapters[index].isEditing;
    setChapters(newChapters);
  };

  const handleChangeChapterTitle = (index, value) => {
    const newChapters = [...chapters];
    newChapters[index].tempTitle = value;
    setChapters(newChapters);
  };

  const cancelChapterEdit = (index) => {
    const newChapters = [...chapters];
    newChapters[index].tempTitle = newChapters[index].title;
    newChapters[index].isEditing = false;
    setChapters(newChapters);
  };

  return (
    <div className='course-chapters'>
      <div className="course-chapter_header">
        <h2>Course chapters</h2>
        <div className="buttons">
          {chapters.length === 0 && !isAdding && (
            <button onClick={() => setIsAdding(true)}>+ Add a chapter</button>
          )}
          {isAdding && (
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          )}
          {chapters.length > 0 && (
            <>
              {!isAdding && <button onClick={() => setIsAdding(true)}>+ Add a chapter</button>}
            </>
          )}
        </div>
      </div>
      <div className="course-chapter_main">
        {chapters.length === 0 && !isAdding && (
          <p>No chapters</p>
        )}
        {isAdding && (
          <div>
            <input
              type="text"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              placeholder="Chapter title"
            />
            <button onClick={handleAddChapter}>Create</button>
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        )}
        {chapters.length > 0 && (
          <>
            {!isAdding && <button onClick={() => setIsAdding(true)}>+ Add a chapter</button>}
            <ul>
              {chapters.map((chapter, index) => (
                <li key={index} className="chapter-item">
                  {chapter.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={chapter.tempTitle}
                        onChange={(e) => handleChangeChapterTitle(index, e.target.value)}
                      />
                      <button onClick={() => handleEditChapter(index)}>Save</button>
                      <button onClick={() => cancelChapterEdit(index)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <span>{chapter.title}</span>
                      {chapter.status && <span className="status">{chapter.status}</span>}
                      <button onClick={() => handleEditChapter(index)}>Edit</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
